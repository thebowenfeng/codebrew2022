import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app"

function App() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCy7Ic92MmSJQ4sSkDLVkeqYm1hzNy39tg",
    authDomain: "codebrew2022.firebaseapp.com",
    projectId: "codebrew2022",
    storageBucket: "codebrew2022.appspot.com",
    messagingSenderId: "1071289216571",
    appId: "1:1071289216571:web:8d10c5bbbab9303d74b61e"
  };

// Initialize Firebase
  const app = initializeApp(firebaseConfig);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
