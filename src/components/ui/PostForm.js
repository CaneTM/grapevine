import React, { useState } from "react";
import { serverUrl } from "../../utils";

const PostForm = ({ username, addPost, header }) => {

  const [currentPost, setCurrentPost] = useState('');

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
        author: username,
        date: postDate, 
        time: postTime,
        key: dateObj.getTime()
      };

      // add recent post to database
      const resp = await fetch(serverUrl + '/posts', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...newPost})
      })

      const status = await resp.json();

      if (status === 'success') {
        addPost(newPost);
        setCurrentPost('');
      }
    }
  };

  return (
    <>
      <section className='section-center'>
        <form className='homepage-form' onSubmit={handleSubmitPost}>
          <h3>{header}</h3>
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
    </>
  )
}

export default PostForm;