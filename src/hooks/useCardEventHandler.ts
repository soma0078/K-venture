import { INITIAL_RESERVATION_STATE } from '@/constants/reservationCardConstants';
import {
  CardEventHandlerType,
  ReservationStateType,
} from '@/types/activityDetailPageTypes';

export function useCardEventHandler(
  setReservationState: React.Dispatch<
    React.SetStateAction<ReservationStateType>
  >,
): CardEventHandlerType {
  return {
    stepInit: () => {
      setReservationState((prevState) => ({ ...prevState, step: 1 }));
    },

    handleHeadCountChange: (value: number) => {
      if (value < 1) return;
      setReservationState((prevState) => ({ ...prevState, headCount: value }));
    },

    handleModalToggle: () => {
      setReservationState((prevState) => ({
        ...prevState,
        isToggleModal: !prevState.isToggleModal,
      }));
    },

    handleCalendarClick: (date: string) => {
      setReservationState((prevState) => {
        if (prevState.date === date) return prevState;
        return {
          ...prevState,
          date,
        };
      });
    },

    handleCloseClick: () => {
      setReservationState(INITIAL_RESERVATION_STATE);
    },

    handleNextStepClick: () => {
      setReservationState((prevState) => ({
        ...prevState,
        step: prevState.step + 1,
      }));
    },

    handleTimeChange: (
      startTime: string,
      endTime: string,
      scheduleId: number,
    ) => {
      setReservationState((prevState) => ({
        ...prevState,
        startTime: startTime,
        endTime: endTime,
        scheduleId: scheduleId,
      }));
    },
  };
}
