/* eslint-disable eol-last */
/* eslint-disable no-shadow */

import Classification from './Classification.tsx';
import Profile from './Profile.tsx';

type AccountProps = {
  params: {
    userIdParam: string;
  };
};

function Account(props: AccountProps) {
  const userId = Number(decodeURIComponent(props.params.userIdParam));

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Profile id={userId} />
      <Classification id={userId} />
    </div>
  );
}

export default Account;
