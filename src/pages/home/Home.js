import { Suspense } from 'react';
import { Await, defer, json, redirect, useLoaderData } from 'react-router-dom';

import Home from '@components/home/Home';
import PostList from '@components/home/post/PostList';
import { getPosts, createPost } from '@services/post';
import getCurrentTime from '@utils/date';

const HomePage = () => {
  const { posts } = useLoaderData();

  return (
    <>
      <Home />
      <Suspense
        fallback={
          <h2 style={{ textAlign: 'center', padding: '32px 0' }}>Loading...</h2>
        }
      >
        <Await resolve={posts}>
          {(loadedPosts) => <PostList posts={loadedPosts} />}
        </Await>
      </Suspense>
    </>
  );
};

export default HomePage;

export async function action({ request }) {
  const data = await request.formData();

  const currentTime = getCurrentTime();

  const postForm = {
    user_id: localStorage.getItem('user'),
    content: data.get('content'),
    likes: 0,
    created_at: currentTime,
    updated_at: currentTime,
  };

  const response = await createPost(postForm);

  if (!response.ok) {
    throw json(
      { message: 'Could not found posts.' },
      { status: response.status },
    );
  }

  return redirect('/');
}

export async function loadPosts() {
  const response = await getPosts();

  if (!response.ok) {
    throw json(
      { message: 'Could not found posts.' },
      { status: response.status },
    );
  }

  const resData = await response.json();
  return resData;
}

export function loader() {
  return defer({
    posts: loadPosts(),
  });
}
