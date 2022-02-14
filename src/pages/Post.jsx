import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Post = (props) => {
  const [comments, setComments] = useState([])
  console.log('Single post comp/page');

  // const a = props.dataObj.posts && props.location.state.filter(c => {
  //   // console.log(c.postId);
  //   return c.postId == props.match.params.postId // olika primitiva datatyper därav två (==)
  // })
  // // const a = props.location.state.filter(c => c.id == props.match.params.postId)
  // console.log('a', a);
  
  
  let {title, body} = ['title', 'body']
  if (props.dataObj.posts) {
    console.log('props.dataObj.posts', props.dataObj.posts);
    console.log('props.match.params.postId', props.match.params.postId);
    const postHeaders = props.dataObj.posts && props.dataObj.posts.filter(post => post.id == props.match.params.postId)
    console.log(postHeaders);
    title = postHeaders[0].title
    body = postHeaders[0].body

  }
  
  if (props.location.state === undefined) {
    const fetchComments = async () => {
      const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments')
      const commentsJson = await commentsResponse.json()
      setComments(commentsJson)
    }
    fetchComments()
  }
 

  useEffect( _=> {
    console.log('post EFX');
    const appMain = document.querySelector('.App-main')
    appMain.className += ' app-main-post-grids'

    return _ => appMain.className = 'App-main'
  }, [])

  console.log('End post.jsx');
  console.log('__________________________');
  return (
    <section className="post">
      {props.location.state ? 
      <>
      <h1>{title}</h1>
      <p>{body}</p>
      {/* <span id="total-comments">({Object.keys(props.location.state).length}) comments</span> */}

      <div id="comments">
        {/* props.location.state skickas som postComments, måste blir bättre på destructuring^^
         */}
        {props.location.state.map((comment, i) => {
          return <div key={i} className="comment">
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