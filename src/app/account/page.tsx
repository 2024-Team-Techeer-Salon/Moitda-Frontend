/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { getUserId } from '@/api/user.ts';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

function page() {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUserId,
  });
  const router = useRouter();
  if (data) {
    router.push(`/account/${data.id}`);
  } else {
    router.push('/login');
  }
  return <div className="h-screen w-screen"></div>;
}

export default page;
