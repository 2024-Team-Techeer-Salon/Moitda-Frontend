/** @type {import('next').NextConfig} */
// ES Module syntax
export const images = {
  domains: ['i.ibb.co', 'moitda-image-storage.s3.ap-northeast-2.amazonaws.com'],
};

export async function redirects() {
  return [
    {
      source: '/',
      destination: '/home',
      permanent: true,
    },
  ];
}

export default {
  images,
  redirects,
};
