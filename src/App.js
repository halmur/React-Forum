import './App.css';
import rfLogo from './media/rf-logo.png'
import { useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Posts from './pages/Posts';
import Post from './pages/Post';


function App() {
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  
// fetch all posts
  useEffect( async () => {
    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts')
    const postsJson = await postsResponse.json()
    setPosts(postsJson)
  }, [])

  
  // fetcha all post comments
  useEffect( async () => {
    const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments')
    const commentsJson = await commentsResponse.json()
    setComments(commentsJson)
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <div id='rf-logo'>
          <img src={rfLogo} alt="react forum logo" />
        </div>
      </header>

      <main className="App-main">
        <Switch>
          {comments.length > 0 && <Route path="/posts/:postId" render={ props => <Post {...props} dataObj={{posts, comments}} />} />}
          {posts.length > 0 && <Route path="/" render={ props => <Posts {...props} dataObj={{posts, comments}}/>} />}
        </Switch>
      </main>
    </div>
  );
}

export default App;
