import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import ValueDropdown from '@/components/common/Dropdown/ValueDropdown';
import ErrorText from '@/components/common/ErrorText';
import Modal from '@/components/common/Modal/Modal';
import ScheduleList from '@/components/MyActivityPage/ScheduleList';
import { MAX_IMG_LENGTH } from '@/constants/myActivityPage';
import useDropdown from '@/hooks/useDropdown';
import useImageManager from '@/hooks/useImageManager';
import useModal from '@/hooks/useModal';
import { postActivity, postActivityImage } from '@/lib/apis/postApis';
import { checkDuplication } from '@/lib/utils/myActivityPage';
import { CATEGORIES, Schedule } from '@/types/activityTypes';
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

const schema = yup.object().shape({
  title: yup.string().required('제목을 입력해주세요.'),
  description: yup.string().required('설명을 입력해주세요.'),
  price: yup
    .number()
    .positive('가격은 양수여야 합니다.')
    .integer('가격은 정수여야 합니다.')
    .required('가격을 입력해주세요.'),
  address: yup.string().required('주소를 입력해주세요.'),
});

export default function MyActivityForm() {
  const category = useDropdown('');
  const [address, setAddress] = useState('');
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const banner = useImageManager(MAX_IMG_LENGTH[IMAGE_TYPES.BANNER]);
  const sub = useImageManager(MAX_IMG_LENGTH[IMAGE_TYPES.SUB]);

  const [isSuccess, setIsSuccess] = useState(false);
  const [activityId, setActivityId] = useState(0);
  const { modalType, message, isOpen, closeModal, openModal } = useModal();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<InputForm>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

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

  // 모달 닫기
  const handleClickModal = () => {
    closeModal();
    if (isSuccess) {
      router.push(`/activity/${activityId}`);
    }
  };

  // 데이터 검증, 폼데이터 형성, 서버 요청 보내기, 리다이렉션
  const onSubmit = async (data: InputForm) => {
    // 필수항목 중 제목, 설명, 가격, 주소는 hook-form으로 처리하고,
    // 카테고리, 배너이미지 값이 있는지 확인합니다.
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

    // 이미지를 서버에 업로드하고, formData를 형성합니다.
    const formActivityData = async () => {
      const bannerImageUrl = await postActivityImage({
        image: banner.imageFiles[0],
      });
      const subImageUrls = await Promise.all(
        sub.imageFiles.map((file) => postActivityImage({ image: file })),
      );

      const formData = {
        ...data,
        category: category.value,
        schedules: [] as Schedule[],
        bannerImageUrl,
        subImageUrls,
      };

      return formData;
    };

    // 데이터를 생성, 서버에 전송하고, 새로 생성된 액티비티 페이지로 이동합니다.
    const postActivityAndMove = async () => {
      try {
        const formData = await formActivityData();
        setActivityId(await postActivity(formData));
        setIsSuccess(true);
        openModal('alert', '체험 생성이 완료되었습니다.');
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
    postActivityAndMove();
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <header className="flex items-center justify-between font-kv-bold">
        <h1 className="text-kv-3xl">내 체험 등록</h1>
        <button
          className="btn-blue h-12 w-[120px] rounded text-kv-lg"
          type="submit"
          disabled={!isValid}
        >
          등록하기
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

      <ValueDropdown
        placeholder={'*카테고리'}
        availableValues={Object.values(CATEGORIES)}
        {...category}
      />

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
          <h2 className="h2-my-act">*가격</h2>
          <input
            className="input-my-act"
            id="price"
            type="number"
            placeholder="가격"
            {...register('price')}
          />
        </div>
        {errors.price?.message && <ErrorText>{errors.price.message}</ErrorText>}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h2 className="h2-my-act">*주소</h2>
          <input
            className="input-my-act cursor-pointer"
            id="address"
            type="string"
            value={address}
            readOnly
            placeholder="주소를 입력해주세요."
            onClick={handleClickAddress}
            {...register('address')}
          />
        </div>
        {errors.address?.message && (
          <ErrorText>{errors.address.message}</ErrorText>
        )}
      </div>

      <div className="w-fit">
        <h2 className="h2-my-act">예약 가능한 시간대</h2>
        <ScheduleList
          schedules={schedules}
          onClickAdd={handleAddSchedule}
          onClickDelete={handleDeleteSchedule}
        />
      </div>

      <div>
        <h2 className="h2-my-act">*배너 이미지</h2>
        {banner.renderImageManager()}
      </div>

      <div>
        <h2 className="h2-my-act">소개 이미지</h2>
        {sub.renderImageManager()}
      </div>
      <p className="text-kv-2lg text-kv-gray-4b">
        *이미지는 최대 4개까지 등록 가능합니다.
      </p>

      <Modal
        type={modalType}
        message={message}
        isOpen={isOpen}
        onClose={handleClickModal}
      />
    </form>
  );
}
