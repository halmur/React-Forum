import './App.css';
import rfLogo from './media/rf-logo.png'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id='rf-logo'>
          <img src={rfLogo} alt="react forum logo" />
        </div>
      </header>

      <main className="App-main">
        main
      </main>
    </div>
  );
}

export default App;
