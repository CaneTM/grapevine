import React, { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { serverUrl } from '../../utils';
import Posts from './Posts';

const Visiting = ({ visitorName, searchName, changeUserStatus }) => {

  const [searchfield, setSearchfield] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearch = (evt) => {
    evt.preventDefault();

    if (searchfield) {
      if (searchfield === visitorName) {
        changeUserStatus('homepage', true, visitorName);
      } else {
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
      setSearchfield('');
    }
  };

  useEffect(() => {
    fetch(serverUrl + '/posts/' + searchName)
      .then(resp => resp.json())
      .then(postData => setPosts(postData.reverse()));
  }, [searchName])

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
          onClick={() => changeUserStatus('homepage', true, visitorName)}
          style={{position: 'absolute', top: '3em', right: '1em'}}>
            Home <FaHome />
        </button>
        <button 
          onClick={() => changeUserStatus('logout')}
          style={{position: 'absolute', top: '0.2em', right: '1em'}}>log out</button>
      </div>
      <h3 id='visitor-heading'>
        {`${searchName.charAt(0).toUpperCase() + searchName.slice(1)}`}'s Profile
      </h3>
      <Posts postList={posts} />
    </>
  )
}

export default Visiting;
