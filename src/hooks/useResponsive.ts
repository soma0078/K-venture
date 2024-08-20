import { useMediaQuery } from 'usehooks-ts';

function useResponsive() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1199px)');
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}

export default useResponsive;
