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
    appMain.className += ' app-main_post-grids'

    return _ => appMain.className = 'App-main'
  }, [])

  return (
    <>
    <section id="post">
      {postObj ? 
      <>
      <h1 id="post-title">{postObj.postHeadings.title}</h1>
      <p id="post-body">{postObj.postHeadings.body}</p>

      <div id="comments">
        <span id="total-comments">
          comments (<span>{postObj.postComments.length}</span>)
        </span>
        
        {postObj.postComments.map((comment, i) => (
          <div key={i} className="comment">
            <div className="c-img">
              <span>{`${comment.name.charAt(0)}.${comment.email.charAt(0)}`}</span>
            </div>
            <span className="c-name">{comment.name}</span>
            <span className="c-email">{comment.email}</span>
            <p className="c-txt">{comment.body}</p>
          </div>
        ))}
      </div>

      <div id="add-comment">
        <input type="text" placeholder="Write an answer" />
        <button>comment</button>
      </div>
      </> :
      <h1>loading</h1>}
    </section>

    <Link to="/" id="back-to-posts">back to Posts</Link>
    </>
  )
}

export default Post