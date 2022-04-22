import "./App.css";
import { initializeApp } from "firebase/app";
import { useState } from "react";
import { CurrentPageContext } from "./Contexts/CurrentPageContext";
import { UserContext } from "./Contexts/UserContext";
import GlobalMenubar from "./Components/global_menubar";

/* Pages */
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AccountListing from './Pages/MyAccount_MyListing';
import Market from "./Pages/Market";
import NewListing from "./Pages/NewListing";
import PersonalProfile from "./Pages/MyAccount_Profile";

function App() {
	//States
	const [currentPage, setCurrentPage] = useState("Market");
	const [user, setUser] = useState(null);

	return (
		<CurrentPageContext.Provider value={[currentPage, setCurrentPage]}>
			<UserContext.Provider value={[user, setUser]}>
				<div className="App">
					<GlobalMenubar/>
          			{currentPage === "My Listing" && <AccountListing />}
					{currentPage === "About" && <About/>}
					{currentPage === "Login" && <Login/>}
					{currentPage === "Register" && <Register/>}
					{currentPage === "Market" && <Market type={"sell"} label={"I'm looking to buy"}/>}
					{currentPage === "BuyRequest" && <Market type={"buy"} label={"I'm looking to sell"}/>}
					{currentPage === "NewPosting" && <NewListing/>}
					{currentPage === "Personal Profile" && <PersonalProfile/>}
				</div>
			</UserContext.Provider>
		</CurrentPageContext.Provider>
	);
}

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCy7Ic92MmSJQ4sSkDLVkeqYm1hzNy39tg",
	authDomain: "codebrew2022.firebaseapp.com",
	projectId: "codebrew2022",
	storageBucket: "codebrew2022.appspot.com",
	messagingSenderId: "1071289216571",
	appId: "1:1071289216571:web:8d10c5bbbab9303d74b61e",
};

export default App;
export const app = initializeApp(firebaseConfig);
