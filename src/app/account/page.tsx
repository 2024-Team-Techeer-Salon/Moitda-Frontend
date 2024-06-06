/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { login } from '@/api/user.ts';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function page() {
  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await login();
      return userId;
    };
    fetchUserId().then((data) => {
      if (data.code === 'U003') {
        router.push(`/account/${data.data.user_id}`);
      } else {
        router.push('/login');
      }
    });
  }, [router]);

  return <div className="h-screen w-screen"></div>;
}

export default page;
