import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';

const Posts = (props) => {
  
  /* Datan som skickas från Posts.jsx är bara synlig i Post.jsx page/comp om
     t.ex användaren navigerar sig dit via en link över Posts.jsx

     - Datan som Filtrerar här är för enskild Post.jsx comp, denna datan
       finns redo i location.state objektet

     - Försöker man att navigera till Post.jsx via url(/posts/4) kommer
       location.state objektet i Post.jsx bli undefined.
       För att få tillgång till datan i Post.jsx när location.state är undefined
       så finns det redan hämtad data tillgänglig i props.posts och props.comments
  */
  return (
    <>
    {props.dataObj.posts && props.dataObj.posts.map( post => (
      <div className="posts" key={post.id}>
        <Link className='title-link' to={{
          pathname: `/posts/${post.id}`,
          state: {
            postHeadings: {title: post.title, body: post.body},
            postComments: props.dataObj.comments.filter( c => c.postId === post.id)
          }
        }}>
          {post.title}
        </Link>
      </div>)
    )}
    </>
  )
}

export default Posts