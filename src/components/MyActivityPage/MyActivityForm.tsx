import { useState } from 'react';

import Modal from '@/components/common/Modal/Modal';
import { MAX_IMG_LENGTH } from '@/constants/myActivityPage';
import useImageManager from '@/hooks/useImageManager';
import useModal from '@/hooks/useModal';
import { checkDuplication } from '@/lib/utils/myActivityPage';
import { Schedule } from '@/types/activityTypes';
import { IMAGE_TYPES } from '@/types/page/myActivityPageTypes';

import ScheduleList from './ScheduleList';

export default function MyActivityForm() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const banner = useImageManager(MAX_IMG_LENGTH[IMAGE_TYPES.BANNER]);
  const sub = useImageManager(MAX_IMG_LENGTH[IMAGE_TYPES.SUB]);

  const { modalType, message, isOpen, closeModal, openModal } = useModal();

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

  return (
    <form className="flex flex-col gap-6">
      <div className="w-fit">
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

      <Modal
        type={modalType}
        message={message}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </form>
  );
}
