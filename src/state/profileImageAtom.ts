import { atom } from 'jotai';

import { DEFAULT_PROFILE_IMAGE } from '@/constants/defaultAssets';

export const profileImageAtom = atom<string>(DEFAULT_PROFILE_IMAGE);
