import instance from './axios';

// 프로필 이미지 S3에 저장
export const uploadUrlToS3 = async (presignedUrl: string, file: File) => {
  await instance.put(presignedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};
