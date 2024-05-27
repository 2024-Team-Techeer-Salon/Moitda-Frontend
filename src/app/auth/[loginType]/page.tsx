/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';

function page(props: any) {
  const loginType = decodeURIComponent(props.params.loginType);
  const cookies = new Cookies();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');

  useEffect(() => {
    setAccessToken(searchParams?.get('accessToken') || '');
    setRefreshToken(searchParams?.get('refreshToken') || '');

    if (accessToken !== '' && refreshToken !== '') {
      cookies.set('accessToken', accessToken, { path: '/' });
      cookies.set('refreshToken', refreshToken, { path: '/' });
      router.push('/home');
      if (loginType === 'signup') {
        router.push('/signup');
      } else {
        router.push('/home');
      }
    }
  }, [accessToken, refreshToken]);
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      로그인 중...
    </div>
  );
}

export default page;
