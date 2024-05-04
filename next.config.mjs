/** @type {import('next').NextConfig} */
// ES Module syntax
export const images = {
  domains: ['i.ibb.co'],
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
