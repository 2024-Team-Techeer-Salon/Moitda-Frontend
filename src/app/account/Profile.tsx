import Image from 'next/image';

const Profile = () => {
  const ProfileStyle = {
    // width: '7.5rem',
    // height: '7.5rem',
    marginLeft: '8.2rem',
    marginBottom: '2rem',
  };

  return (
    <div style={ProfileStyle}>
      <Image src="https://i.ibb.co/FKS02N6/profile.png"
      width={120}
      height={120}
      alt="profile1"
      />
    </div>
  );
};

export default Profile;
