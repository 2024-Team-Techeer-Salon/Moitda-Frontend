import PostCard from './PostCard.tsx';

function LatestComponent() {
  const postList = [];

  for (let i = 0; i < 32; i += 1) {
    postList.push(
      <PostCard
        key={i}
        titleImage="https://i.ibb.co/0GtvPDT/Kakao-Talk-Photo-2024-04-17-21-26-58.jpg"
        title="모각코 할 사람!"
        location="서울"
        like={10}
      />,
    );
  }

  return <div className="flex flex-row items-center flex-wrap">{postList}</div>;
}

export default LatestComponent;