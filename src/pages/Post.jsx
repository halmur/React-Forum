import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Post = (props) => {
  const [comments, setComments] = useState(null)
  console.log('props', props);
  
  let {title, body} = ['title', 'body']
  if (props.location.state === undefined) {
    const fetchComments = async () => {
      const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments')
      const commentsJson = await commentsResponse.json()
      setComments(commentsJson)
    }
    fetchComments()
  } else {

    const postHeaders = props.posts && props.posts.filter(post => post.id == props.match.params.id)
    title = postHeaders[0].title
    body = postHeaders[0].body
  }
 

  useEffect( _=> {
    const appMain = document.querySelector('.App-main')
    appMain.className += ' app-main-post-grids'

    return _ => appMain.className = 'App-main'
  }, [])


  return (
    <section className="post">
      {props.location.state ? 
      <>
      <h1>{title}</h1>
      <p>{body}</p>
      <span id="total-comments">({Object.keys(props.location.state).length}) comments</span>

      <div id="comments">
        {props.location.state.map(comment => {
          return <div className="comment">
            <p>{comment.name}</p>
            <p>{comment.email}</p>
            <p>{comment.body}</p>
          </div>
        })}
      </div>

      <div id="add-comment">
        <input type="text" placeholder="Write comment" />
        <button>Add Comment</button>
      </div>
      </> :
      <h1>loading</h1>}

      <Link to="/">back to posts</Link>
    </section>
  )
}

export default Post