import React, { useEffect, useState } from 'react';
import Posts from './Posts';
import { serverUrl } from '../../utils';

const Homepage = ({ username, changeUserStatus }) => {

  const [currentPost, setCurrentPost] = useState('');
  const [searchfield, setSearchfield] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSubmitPost = async (evt) => {
    evt.preventDefault();

    if (currentPost) {
      const dateObj = new Date();
      const postDate =  dateObj.getMonth() + 1 + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();

      // ***** format post time *****
      const postMins = dateObj.getMinutes();
      const mins = postMins.toString().length === 1 ? '0' + postMins : postMins;

      const postSecs = dateObj.getSeconds();
      const secs = postSecs.toString().length === 1 ? '0' + postSecs : postSecs;

      const postTime = dateObj.getHours() + ':' + mins + ':' + secs;
      // ****************************

      // key prop will eventually be replaced by
      // serial value assigned by database
      const newPost = { 
        content: currentPost, 
        date: postDate, 
        time: postTime,
        key: dateObj.getTime()};

      // add recent post to database
      const resp = await fetch(serverUrl + '/posts', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...newPost, author: username})
      })

      const status = await resp.json();

      if (status === 'success') {
        setPosts([newPost, ...posts]);
        setCurrentPost('');
      }
    }
  }

  const handleSearch = (evt) => {
    evt.preventDefault();

    if (searchfield && searchfield !== username) {
      // check if user exists
      fetch(serverUrl + '/user/' + searchfield)
        .then(resp => resp.json())
        .then(searchData => {
          if (searchData.length) {
            changeUserStatus('visiting', true, searchData[0].username);
          } else {
            alert('No user found');
          }
        })
    }
  }

  useEffect(() => {
    fetch(serverUrl + '/posts/' + username)
      .then(resp => resp.json())
      .then(postData => setPosts(postData.reverse()));
  }, [username]);

  return (
    <>
      <div className="nav-links">
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            className='post'
            style={{position: 'absolute', top: '1em', left: '1em'}}
            value={searchfield} 
            placeholder='Search for others...'
            onChange={(evt) => setSearchfield(evt.target.value)} />
          {/* <button 
            style={{position: 'absolute', top: '0.2em', left: '16em'}}
            type='submit'>search</button> */}
        </form>
        <button 
          onClick={() => changeUserStatus('logout')}
          style={{position: 'absolute', top: '0.2em', right: '1em'}}>log out</button>
      </div>
      <section className='section-center'>
        <form className='homepage-form' onSubmit={handleSubmitPost}>
          <h3>Hello, {username}</h3>
          <div className="form-control" style={{display: 'flex', justifyContent: 'center'}}>
            <input 
              type="text" 
              className='post' 
              value={currentPost} 
              onChange={(evt) => setCurrentPost(evt.target.value)} />
            <button type="submit" className='submit-btn'>post</button>
          </div>
        </form>
      </section>
      <Posts postList={posts} />
    </>
  );
};

export default Homepage;
