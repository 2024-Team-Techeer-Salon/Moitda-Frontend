/* eslint-disable no-shadow */

import Classification from './Classification.tsx';
import Profile from './Profile.tsx';

function Account(props: any) {
  const userId = Number(decodeURIComponent(props.params.userIdParam));

  return (
    <div>
      <Profile id={userId} />
      <Classification id={userId} />
    </div>
  );
}

export default Account;
