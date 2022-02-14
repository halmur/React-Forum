import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';


const Posts = (props) => {
  console.log('All posts comp/page');

  // kan också filtrera titel och body här i Posts.jsx och skicka direkt till Post.jsx. filtreras nu i Post.jsx..
  const postComments = postID => {
    return props.dataObj.comments && props.dataObj.comments.filter( c => c.postId === postID)
  }

  return (
    <>
    {props.dataObj.posts && props.dataObj.posts.map( post => (
      <div className="posts" key={post.id}>
        <Link className='title-link' to={{
          pathname: `/posts/${post.id}`,
          state: [...postComments(post.id)]
          }}>
            {post.title}
        </Link>
      </div>)
    )}
    </>
  )
}

export default Posts