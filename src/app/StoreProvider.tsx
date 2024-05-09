'use client';

import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, exampleStore, AppStore } from '../lib/store.ts';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current = exampleStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
