/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
export function mannerStatTranslate(mannerStat: number) {
  if (mannerStat === 100) {
    return 'S';
  }
  if (mannerStat >= 90) {
    return 'A+';
  }
  if (mannerStat >= 80) {
    return 'A';
  }
  if (mannerStat >= 70) {
    return 'B+';
  }
  if (mannerStat >= 60) {
    return 'B';
  }
  if (mannerStat >= 50) {
    return 'C+';
  }
  if (mannerStat >= 40) {
    return 'C';
  }
  if (mannerStat >= 30) {
    return 'D+';
  }
  if (mannerStat > 0) {
    return 'D';
  }
  if (mannerStat <= 0) {
    return 'F+';
  }
}

export function defaultProfileImage() {
  const image = 'https://i.ibb.co/d03Jg0k/image.png';
  return image;
}

export function defaultBannerImage() {
  const image = 'https://i.ibb.co/m4XzXbn/banner.jpg';
  return image;
}
