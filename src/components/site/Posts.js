import React from "react";

const Posts = ({ postList }) => {

    return (
      <article>
        {
          postList.map(post => {
            const { content, date, time, key } = post;
            return (
              <div className="item" key={key}>
                <p>{content}</p>
                <p>&nbsp;&nbsp;&nbsp;</p>
                <p>
                  {date}
                  <p>{time}</p>
                </p>
              </div>
            )
          })
        }
      </article>
    );
}

export default Posts;