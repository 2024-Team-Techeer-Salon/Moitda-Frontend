"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const Profile = () => {
  const [profilecontent, setProfileContent] = useState('');
  const [contnetact, setContnetact] = useState('0');

  const ProfileStyle = {
    marginLeft: '3rem',
    marginBottom: '-2rem',
  };

  const ProfileImage = () => (
    <Image
      src="https://i.ibb.co/FKS02N6/profile.png"
      width={170}
      height={170}
      alt="profile1"
      style={{ marginBottom: '-4.5rem' }}
    />
  );

  // api호출하면 이름 바꾸기
  const ProfileName = () => {
    const profileName = '정유진';
    const Contenstyle = {
      marginBottom: -75,
      marginLeft: 190,
      fontSize: 25,
      fontWeight: 600,
    };
    return <h1 style={Contenstyle}>{profileName}</h1>;
  }

  // 자기소개 내용 수정
  const handleContentChange = (event) => {
    if (contnetact === '1') {
      setProfileContent(event.target.value);
    }
  };

  const handleButtonClick = () => {
    setContnetact(prevValue => prevValue === '0' ? '1' : '0');
  };

  const CustomButton = ({ onClick, children }) => (
    <div className = "flex justify-end mr-20 mt-28" >
      <button
        className="w-32 h-7 rounded-md bg-gray-200 text-gray-700"
        onClick={onClick}
      >
        {children}
      </button>
      </div>
    );

  return (
    <div style={ProfileStyle}>
      <CustomButton onClick={handleButtonClick}>
        {contnetact === '0' ? '프로필 편집' : '수정 완료'}
      </CustomButton>

      <div className='-mt-36'>
      <ProfileImage />
      </div>

      <div className='mb-10'>
      <ProfileName/>
      </div>

      <input
        value={profilecontent}
        placeholder="자기 소개 입력"
        onChange={handleContentChange}
        style={{
          marginTop: 80,
          marginLeft: 35,
          fontSize: 16,
          fontWeight: 300,
          width: '300px',
          height: '100px',
          pointerEvents: contnetact === '0' ? 'none' : 'auto',
          wordBreak: 'break-all',   //우찌할꼬
        }}
      />
    </div>
  );
};

export default Profile;
