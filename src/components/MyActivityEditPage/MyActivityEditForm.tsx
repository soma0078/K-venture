import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useForm } from 'react-hook-form';

import ValueDropdown from '@/components/common/Dropdown/ValueDropdown';
import ErrorText from '@/components/common/ErrorText';
import { Modal, useModal } from '@/components/common/Modal';
import ScheduleList from '@/components/MyActivityPage/ScheduleList';
import { MAX_IMG_LENGTH } from '@/constants/myActivityPage';
import useDropdown from '@/hooks/useDropdown';
import useImageManager from '@/hooks/useImageManager';
import { updateActivity } from '@/lib/apis/patchApis';
import { postActivityImage } from '@/lib/apis/postApis';
import { activityFormSchema } from '@/lib/utils/activityFormSchema';
import {
  convertAPItoSelected,
  convertYYMMDDtoYMD,
} from '@/lib/utils/formatDate';
import { checkDuplication } from '@/lib/utils/myActivityPage';
import { CATEGORIES, Schedule } from '@/types/activityTypes';
import { ActivityDetailResponse } from '@/types/page/myActivityEditPageTypes';
import { IMAGE_TYPES } from '@/types/page/myActivityPageTypes';

interface ErrorResponse {
  message: string;
}

interface AxiosErrorWithMessage extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}
interface InputForm {
  title: string;
  description: string;
  price: number;
  address: string;
}

export default function MyActivityEditForm({
  initialData,
}: {
  initialData: ActivityDetailResponse;
}) {
  const router = useRouter();

  const category = useDropdown(initialData.category || '');
  const [address, setAddress] = useState(initialData.address || '');
  const [schedules, setSchedules] = useState<Schedule[]>(
    initialData.schedules || [],
  );
  const banner = useImageManager(MAX_IMG_LENGTH[IMAGE_TYPES.BANNER]);
  const sub = useImageManager(MAX_IMG_LENGTH[IMAGE_TYPES.SUB]);

  const [isSuccess, setIsSuccess] = useState(false);
  const { modalProps, openModal } = useModal();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    trigger,
  } = useForm<InputForm>({
    resolver: yupResolver(activityFormSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  useEffect(() => {
    const createFileFromUrl = async (url: string, filename: string) => {
      const response = await fetch(url);
      const data = await response.blob();
      return new File([data], filename, { type: data.type });
    };

    const initializeActivityData = async () => {
      if (initialData) {
        // 폼 필드 초기화
        setValue('title', initialData.title);
        setValue('description', initialData.description);
        setValue('price', initialData.price);
        setValue('address', initialData.address);

        // 상태 값 초기화
        setAddress(initialData.address);
        category.setValue(initialData.category);

        const formattedSchedules = initialData.schedules.map((schedule) => {
          const formattedDate = convertAPItoSelected(schedule.date);

          return {
            ...schedule,
            date: formattedDate,
          };
        });

        setSchedules(formattedSchedules);

        // 이미지 초기화
        if (initialData.bannerImageUrl) {
          const bannerFile = await createFileFromUrl(
            initialData.bannerImageUrl,
            'banner.jpg',
          );
          banner.setFiles([bannerFile]);
        }

        if (initialData.subImages) {
          const subFiles = await Promise.all(
            initialData.subImages.map((image, index) =>
              createFileFromUrl(image.imageUrl, `subImage_${index + 1}.jpg`),
            ),
          );
          sub.setFiles(subFiles);
        }
      }
    };

    initializeActivityData();
  }, []);

  // 스케줄 추가 / 삭제
  const handleAddSchedule = (schedule: Schedule) => {
    if (checkDuplication(schedules, schedule)) {
      openModal('alert', '기존에 추가된 일정과 겹칩니다.');
      return false;
    }

    setSchedules((prev) => [...prev, schedule]);
    return true;
  };
  const handleDeleteSchedule = (idx: number) => {
    setSchedules((prev) => prev.filter((s, i) => i !== idx));
  };

  // 다음 주소 검색 시스템
  const open = useDaumPostcodePopup(process.env.NEXT_PUBLIC_POSTCODE_API_URL);

  const handleClickAddress = () => {
    open({ onComplete: (data) => setAddress(data.address) });
  };

  // 데이터 검증, 폼데이터 형성, 서버 요청 보내기, 리다이렉션
  const onSubmit = async (data: InputForm) => {
    const validateInput = () => {
      if (!category.value) {
        openModal('alert', '카테고리를 선택해주세요');
        return false;
      }
      if (!banner.imageFiles.length) {
        openModal('alert', '배너 이미지를 추가해주세요.');
        return false;
      }
      return true;
    };

    const formActivityData = async () => {
      // 새로운 이미지 업로드
      const bannerImageUrl = banner.imageFiles[0]
        ? await postActivityImage({ image: banner.imageFiles[0] })
        : initialData.bannerImageUrl;
      const subImageUrlsToAdd = await Promise.all(
        sub.imageFiles.map((file) => postActivityImage({ image: file })),
      );

      //삭제할 서브 이미지 id
      const subImageIdsToRemove = initialData.subImages
        .filter(
          (img) =>
            !sub.imageFiles.some(
              (file) => file.name === img.imageUrl.split('/').pop(),
            ),
        )
        .map((img) => img.id);

      //삭제할 스케줄 id
      const scheduleIdsToRemove = initialData.schedules
        .filter((schedule) => !schedules.some((s) => s.id === schedule.id))
        .map((schedule) => schedule.id);

      //추가할 스케줄 데이터
      const schedulesToAdd = schedules
        .filter((s) => !s.id)
        .map((schedule) => {
          const formattedDate = convertYYMMDDtoYMD(schedule.date);

          return {
            date: formattedDate,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
          };
        });

      const formData = {
        ...data,
        category: category.value,
        bannerImageUrl,
        subImageUrlsToAdd,
        subImageIdsToRemove,
        scheduleIdsToRemove,
        schedulesToAdd,
      };

      return formData;
    };

    const updateActivityAndMove = async () => {
      try {
        const formData = await formActivityData();
        await updateActivity(initialData.id, formData);
        setIsSuccess(true);
        openModal('alert', '체험 수정이 완료되었습니다.', {
          onConfirm: () => router.push(`/activity/${initialData.id}`),
        });
      } catch (e) {
        const error = e as AxiosErrorWithMessage;
        if (error.response) {
          openModal('alert', error.response.data.message);
        } else {
          openModal('alert', '오류가 발생했습니다.');
        }
      }
    };

    if (!validateInput()) return;

    updateActivityAndMove();
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <header className="flex items-center justify-between font-kv-bold">
        <h1 className="text-kv-3xl">내 체험 수정</h1>
        <button
          className="btn-blue h-12 w-[120px] rounded text-kv-lg"
          type="submit"
          disabled={!isValid}
        >
          수정하기
        </button>
      </header>

      <div className="flex flex-col gap-2">
        <input
          className="input-my-act"
          id="title"
          type="text"
          placeholder="*제목"
          {...register('title')}
        />
        {errors.title?.message && <ErrorText>{errors.title.message}</ErrorText>}
      </div>

      <div className="category">
        <ValueDropdown
          placeholder={'*카테고리'}
          availableValues={Object.values(CATEGORIES)}
          {...category}
        />
      </div>

      <div className="flex flex-col gap-2">
        <textarea
          className="input-my-act h-[346px] resize-none pc:py-[15px] tablet:py-[15px]"
          id="description"
          placeholder="*설명"
          {...register('description')}
        />
        {errors.description?.message && (
          <ErrorText>{errors.description.message}</ErrorText>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h2 className="h2-my-act">가격</h2>
          <input
            className="input-my-act no-spinner"
            id="price"
            type="number"
            placeholder="*가격"
            {...register('price')}
          />
        </div>
        {errors.price?.message && <ErrorText>{errors.price.message}</ErrorText>}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h2 className="h2-my-act">주소</h2>
          <input
            className="input-my-act cursor-pointer"
            id="address"
            type="string"
            value={address}
            readOnly
            placeholder="*주소"
            onClick={handleClickAddress}
            {...register('address')}
          />
        </div>
        {errors.address?.message && (
          <ErrorText>{errors.address.message}</ErrorText>
        )}
      </div>

      <div>
        <h2 className="h2-my-act">예약 가능한 시간대</h2>
        <ScheduleList
          schedules={schedules}
          onClickAdd={handleAddSchedule}
          onClickDelete={handleDeleteSchedule}
        />
      </div>

      <div>
        <h2 className="h2-my-act">배너 이미지</h2>
        {banner.renderImageManager()}
      </div>

      <div>
        <h2 className="h2-my-act">소개 이미지</h2>
        {sub.renderImageManager()}
      </div>
      <p className="text-kv-2lg text-kv-gray-4b">
        *이미지는 최대 4개까지 등록 가능합니다.
      </p>

      <Modal {...modalProps} />
    </form>
  );
}
