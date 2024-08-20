export const IMAGE_TYPES = {
  BANNER: 'banner',
  SUB: 'sub',
} as const;

export type ImageType = (typeof IMAGE_TYPES)[keyof typeof IMAGE_TYPES];
