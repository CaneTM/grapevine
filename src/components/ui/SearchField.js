import React, { useState } from 'react';
import { serverUrl } from '../../utils';

const SearchField = ({ changeUserStatus, username }) => {

  const [searchfield, setSearchfield] = useState('');

  const handleSearch = (evt) => {
    evt.preventDefault();

    if (searchfield) {
      // username represents the logged-in user
      // checks if user searches for someone other than him/herself
      if (searchfield !== username) {
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
      // executes if user searches for him/herself
      else {
        changeUserStatus('homepage', true, username);
      }
      setSearchfield('');
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input 
        type="text" 
        className='post'
        style={{position: 'absolute', top: '1em', left: '1em'}}
        value={searchfield} 
        placeholder='Search for others...'
        onChange={(evt) => setSearchfield(evt.target.value)} />
    </form>
  );
}

export default SearchField;