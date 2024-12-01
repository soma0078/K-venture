import { useEffect } from 'react';

interface UseScrollLockProps {
  isOpen: boolean;
  additionalCondition?: boolean;
}

const useScrollLock = ({
  isOpen,
  additionalCondition = true,
}: UseScrollLockProps) => {
  useEffect(() => {
    if (additionalCondition) {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, additionalCondition]);
};

export default useScrollLock;
