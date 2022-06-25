import { Magic } from 'magic-sdk';

const createMagicClient = () => {
  if (typeof window === 'undefined') {
    throw new Error('Magic SDK can only be used in the browser');
  }
  return new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHBLE_KEY as string);
};

export default createMagicClient;
