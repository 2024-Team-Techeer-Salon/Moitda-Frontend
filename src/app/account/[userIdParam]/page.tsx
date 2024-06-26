/* eslint-disable eol-last */
/* eslint-disable no-shadow */

import Classification from './Classification.tsx';
import Profile from './Profile.tsx';

function Account(props: { params: { userIdParam: string } }) {
  const userId = Number(decodeURIComponent(props.params.userIdParam));

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <Profile id={userId} />
      <Classification id={userId} />
    </div>
  );
}

export default Account;
