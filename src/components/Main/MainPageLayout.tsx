import MainBannerSection from './MainBannerSection';
import MainListSection from './MainListSection';

export default function MainPageLayout() {
  return (
    <div className="flex flex-col items-center">
      <MainBannerSection />
      <MainListSection />
    </div>
  );
}
