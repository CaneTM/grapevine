import React, { useEffect, useState } from 'react';
import SearchField from '../ui/SearchField';
import Posts from '../ui/Posts';
import PostForm from '../ui/PostForm'
import { serverUrl } from '../../utils';
import { FaAlignJustify } from 'react-icons/fa';

const Homepage = ({ username, changeUserStatus }) => {

  const [posts, setPosts] = useState([]);

  const addPost = newPost => {
    setPosts([newPost, ...posts]);
  };

  useEffect(() => {
    fetch(serverUrl + '/posts/' + username)
      .then(resp => resp.json())
      .then(postData => setPosts(postData.reverse()));
  }, [username]);

  return (
    <>
      <div className="nav-links">
        <SearchField changeUserStatus={changeUserStatus} username={username} /> 
        <button 
          onClick={() => changeUserStatus('feed', true, username)}
          style={{position: 'absolute', top: '3em', right: '1em'}}>
            feed <FaAlignJustify />
        </button>
        <button 
          onClick={() => changeUserStatus('logout')}
          style={{position: 'absolute', top: '0.2em', right: '1em'}}>
            log out
        </button>
      </div>
      <PostForm username={username} addPost={addPost} header="what's on your mind?" />
      <Posts postList={posts} changeUserStatus={changeUserStatus} username={username} />
    </>
  );
};

export default Homepage;
