/* eslint-disable no-shadow */

import Classification from './Classification.tsx';
import Profile from './Profile.tsx';

function Account(props: any) {
  const userId = Number(decodeURIComponent(props.params.userIdParam));

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Profile id={userId} />
      <Classification id={userId} />
    </div>
  );
}

export default Account;
