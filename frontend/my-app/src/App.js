import logo from './logo.png';
import './App.css';
import sample from './memes/image.jpeg'
import sample1 from './memes/450_450__1554909083_gymmeme16.jpg'

function App(props) {
  const subject = "Have fun browsing memes!!";
  console.log(props)
  return (
    <div className="App">
      <header className="App-header">
        <p>
                       
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          You've reached the funniest community.
        </p>
        <p>
          {subject}
        </p>
        
        <img src={sample} className="memes" alt="meme1" />
        <img src={sample1} className="memes" alt="meme2" />

       
        
      </header>
    </div>
  );
}

export default App;
