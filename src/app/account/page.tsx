/* eslint-disable no-shadow */

import React from 'react';
import Classification from './Classification.tsx';
import Profile from './Profile.tsx';
import MannerBar from './MannerBar.tsx';

function Account() {
  return (
    <div>
      <Profile />

      <div className="flex justify-end ">
        <MannerBar />
      </div>

      <div className="flex justify-center">
        <Classification />
      </div>
    </div>
  );
}

export default Account;
