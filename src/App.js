import './App.css';
import { initializeApp } from "firebase/app"
import About from "./Pages/About";
import {useState} from "react";
import {CurrentPageContext} from "./Contexts/CurrentPageContext";
import GlobalMenubar from "./Components/global_menubar";

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

  //States
  const [currentPage, setCurrentPage] = useState("About");

  return (
    <CurrentPageContext.Provider value={[currentPage, setCurrentPage]}>
      <div className="App">
        <GlobalMenubar />
        {currentPage === "About" && <About />}
      </div>
    </CurrentPageContext.Provider>
  );
}

export default App;
