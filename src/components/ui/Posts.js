import React from "react";

const Posts = ({ postList, changeUserStatus, username }) => {

  const handleClickAuthor = (author) => {
    // username represents logged in user
    if (author === username) {
      changeUserStatus('homepage', true, username);
    }
    else {
      changeUserStatus('visiting', true, author);
    }
  };

  return (
    <article>
      {
        postList.map(post => {
          const { content, author, date, time, key } = post;
          return (
            <div className="item" key={key}>
              <p>
                {content}
                <p>&nbsp;</p>
                <p>
                  { 
                    <span>
                      <span className="author" onClick={() => handleClickAuthor(author)}>
                        @{author}
                      </span>
                      &emsp;&emsp;
                    </span>
                  }
                  {date}
                  &emsp;&emsp;
                  {time}
                </p>
              </p>
              {/* <p>&nbsp;&nbsp;&nbsp;</p>
              <p>
                {date}
                <p>&nbsp;</p>
                <p>{time}</p>
              </p> */}
            </div>
          )
        })
      }
    </article>
  );
}

export default Posts;