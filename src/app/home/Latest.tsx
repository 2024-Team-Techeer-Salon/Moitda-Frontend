import PostComponent from '../components/Post.tsx';

function Latest() {
  const postList = [];

  for (let i = 0; i < 32; i += 1) {
    postList.push(
      <PostComponent
        key={i}
        titleImage="https://i.ibb.co/0GtvPDT/Kakao-Talk-Photo-2024-04-17-21-26-58.jpg"
        title="모각코 할 사람!"
        location="서울"
        like={10}
      />,
    );
  }

  return <div className="flex flex-row flex-wrap items-center">{postList}</div>;
}

export default Latest;
