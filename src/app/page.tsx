'use server';

import { redirect } from 'next/navigation';

export default function page() {
  redirect('/home');
  // permanentRedirect('/home');
  return <div>Redirecting...</div>;
}
