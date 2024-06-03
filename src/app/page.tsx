'use server';

import { redirect } from 'next/navigation';

export default function page() {
  redirect('/home');
  // permanentRedirect('/home');
  redirect('/review');
  return <div>Redirecting...</div>;
}
