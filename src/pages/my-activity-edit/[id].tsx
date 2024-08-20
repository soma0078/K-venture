import { GetServerSideProps } from 'next';

import MyActivityEditForm from '@/components/MyActivityEditPage/MyActivityEditForm';
import { getActivityDetail } from '@/lib/apis/getApis';
import { ActivityDetailResponse } from '@/types/page/myActivityEditPageTypes';

interface MyActivityProps {
  initialData: ActivityDetailResponse;
}

export default function MyActivityEdit({ initialData }: MyActivityProps) {
  return <MyActivityEditForm initialData={initialData} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  if (!id) {
    return {
      notFound: true,
    };
  }
  try {
    const { data } = await getActivityDetail(Number(id));
    return {
      props: {
        initialData: data,
      },
    };
  } catch (error) {
    console.error('Failed to fetch activity details:', error);
    return {
      notFound: true,
    };
  }
};
