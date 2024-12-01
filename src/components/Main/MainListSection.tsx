import ExperienceList from './ExperienceList';
import ExperienceListNavBar from './ExperienceListNavBar';

export default function MainListSection() {
  return (
    <div className="flex w-[375px] flex-col items-center px-[16px] py-[32px] pc:w-[1200px] pc:py-[80px] tablet:w-[768px] tablet:px-[24px] tablet:py-[70px]">
      <ExperienceListNavBar />
      <ExperienceList />
    </div>
  );
}
