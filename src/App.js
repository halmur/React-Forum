import './App.css';
import rfLogo from './media/rf-logo.png'
import { useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Posts from './pages/Posts';
import Post from './pages/Post';


function App() {
  const [posts, setPosts] = useState(null)
  
// fetch all posts
  useEffect( async () => {
    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts')
    const postsJson = await postsResponse.json()
    setPosts(postsJson)
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
          <Route path="/posts/:id" render={ props => <Post {...props} posts={posts}/>} />
          <Route path="/" render={ props => <Posts {...props} posts={posts}/>} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
