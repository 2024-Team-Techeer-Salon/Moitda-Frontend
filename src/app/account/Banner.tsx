"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const Banner = () => {
  const [contnetact, setContnetact] = useState('1');

  const BannerStyle = {
    width: '90rem',
    height: '12.5rem',
  };

  const UproadStyle = {
    width: '3rem',
    height: '3.5rem',
    // marginTop: '-13rem',
  };

  const BannerImage = () => (
    <Image
      src="https://i.ibb.co/sy7cfbq/image.png"
      alt="banner"
      height={300}
      // width="auto" // Use "auto" for responsive width
      width={2000}
    />
  );

  const UproadImage = () => (
    <Image
    src="https://i.ibb.co/GVVn0zh/Vector.png" 
    alt="upimage"
    height={19}
    width={15}
    style={UproadStyle}
    />
  ); // Use a descriptive alt text for accessibility

  return (
    <div>
      <BannerImage />
      {/* {contnetact === '1' && <UproadImage />} */}
    </div>
  );
};

export default Banner;
