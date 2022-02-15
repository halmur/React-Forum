import { useEffect } from "react";
import { Link } from "react-router-dom";

const Post = (props) => {

  /* All needed post data is assigned to the postObj variable
    
     dataOverUrl()
       - when location.state object is undefined, use data from props.posts and props.comments objects

     dataOverLink()
       - when location.state object is defined, use data from location.state 
  */
  const dataOverUrl = () => {
    const post = props.dataObj.posts.find( p => p.id == props.match.params.postId)

    return {
      postHeadings: {title: post.title, body: post.body},
      postComments: props.dataObj.comments.filter( c => c.postId == props.match.params.postId)
    }
  }
  const dataOverLink = () => props.location.state
  const postObj = props.location.state === undefined ? dataOverUrl() : dataOverLink()

  // effect to change grid layout of App-main, the (main) element
  useEffect( _ => {
    const appMain = document.querySelector('.App-main')
    appMain.className += ' app-main-post-grids'

    return _ => appMain.className = 'App-main'
  }, [])

  return (
    <section className="post">
      {postObj ? 
      <>
      <h1>{postObj.postHeadings.title}</h1>
      <p>{postObj.postHeadings.body}</p>
      <span id="total-comments">({postObj.postComments.length}) comments</span>

      <div id="comments">
        {postObj.postComments.map((comment, i) => {
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