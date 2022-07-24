import React, { useEffect, useState } from 'react';
import SearchField from '../ui/SearchField';
import Posts from '../ui/Posts';
import { FaHome } from 'react-icons/fa';
import { serverUrl } from '../../utils';
import PostForm from '../ui/PostForm';

const Feed = ({ changeUserStatus, username }) => {

  const [posts, setPosts] = useState([]);

  const addPost = newPost => {
    setPosts([newPost, ...posts]);
  };

  useEffect(() => {
    fetch(serverUrl + '/posts')
      .then(resp => resp.json())
      .then(postData => setPosts(postData.reverse()));
  }, []);

  return (
    <>
      <div className="nav-links">
        <SearchField changeUserStatus={changeUserStatus} username={username} />
        <button 
          onClick={() => changeUserStatus('homepage', true, username)}
          style={{position: 'absolute', top: '3em', right: '1em'}}>
            home <FaHome />
        </button>
        <button 
          onClick={() => changeUserStatus('logout')}
          style={{position: 'absolute', top: '0.2em', right: '1em'}}>
            log out
        </button>
      </div>
      <PostForm username={username} addPost={addPost} header={`welcome, ${username}`} />
      <Posts postList={posts} changeUserStatus={changeUserStatus} username={username} />
    </>
  );
}

export default Feed;