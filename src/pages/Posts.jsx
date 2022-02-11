import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';


const Posts = (props) => {
  const [postComments, setPostComments] = useState(null)

  useEffect( async () => {
    const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments')
    const commentsJson = await commentsResponse.json()
    setPostComments(commentsJson)
  }, [])
  
  const x = postID => {
    const comments = postComments && postComments.filter( c => c.postId === postID)
    return comments === null ? [] : comments
  }

  return (
    <>
    {props.posts && props.posts.map( post => (
      <div className="posts" key={post.id}>
        <Link className='title' to={{
          pathname: `/posts/${post.id}`,
          state: [...x(post.id)]
          }}>
            {post.title}
        </Link>
      </div>)
    )}
    </>
  )
}

export default Posts