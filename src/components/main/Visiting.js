import React, { useEffect, useState } from 'react';
import { FaHome, FaAlignJustify } from 'react-icons/fa';
import { serverUrl } from '../../utils';
import SearchField from '../ui/SearchField';
import Posts from '../ui/Posts';

const Visiting = ({ visitorName, searchName, changeUserStatus }) => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(serverUrl + '/posts/' + searchName)
      .then(resp => resp.json())
      .then(postData => setPosts(postData.reverse()));
  }, [searchName])

  return (
    <>
      <div className="nav-links">
        <SearchField changeUserStatus={changeUserStatus} username={visitorName} />
        <button 
          onClick={() => changeUserStatus('feed', true, visitorName)}
          style={{position: 'absolute', top: '5.8em', right: '1em'}}>
            feed <FaAlignJustify />
        </button>
        <button 
          onClick={() => changeUserStatus('homepage', true, visitorName)}
          style={{position: 'absolute', top: '3em', right: '1em'}}>
            home <FaHome />
        </button>
        <button 
          onClick={() => changeUserStatus('logout')}
          style={{position: 'absolute', top: '0.2em', right: '1em'}}>
            log out
        </button>
      </div>
      <h3 id='visitor-heading'>
        {`${searchName.charAt(0).toUpperCase() + searchName.slice(1)}`}'s Profile
      </h3>
      <Posts postList={posts} changeUserStatus={changeUserStatus} username={visitorName} />
    </>
  )
}

export default Visiting;
