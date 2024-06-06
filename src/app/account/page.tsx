/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { getUserId } from '@/api/user.ts';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function page() {
  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getUserId();
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
