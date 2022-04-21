import {RoundedTextBox} from "../Components/RoundedTextBox";
import RoundedButton from "../Components/RoundedButton";
import {useContext, useRef} from "react";
import {getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import {doc, getFirestore, setDoc} from 'firebase/firestore'
import {app} from "../App";
import {UserContext} from "../Contexts/UserContext";
import {CurrentPageContext} from "../Contexts/CurrentPageContext";

export default function Register(){
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const usernameRef = useRef(null);
    const phoneRef = useRef(null);
    const [user, setUser] = useContext(UserContext);
    const [currentPage, setCurrentPage] = useContext(CurrentPageContext);

    const auth = getAuth();
    const db = getFirestore(app);

    const registerOnClick = () => {
        if(emailRef.current.value === "" || passwordRef.current.value === "" || usernameRef.current.value === ""){
            alert("Email and password and username must not be empty");
        }else{
            createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value).then(async (userCreds) => {
                await setDoc(doc(db, "users", userCreds.user.uid), {
                    email: emailRef.current.value,
                    username: usernameRef.current.value,
                    phone: phoneRef.current.value
                })

                setUser({
                    email: emailRef.current.value,
                    username: usernameRef.current.value,
                    phone: phoneRef.current.value,
                    uid: userCreds.user.uid
                })
                setCurrentPage("About");
            }).catch((error) => {
                alert("ERROR: " + error.message);
            })
        }
    }

    return(
        <div style={{
            textAlign: "center",
            marginTop: "10vh"
        }}>
            <h1 style={{fontSize: "5.5vh"}}>Register a new account</h1>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10vh",
                columnGap: "10vw"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "4vh"
                }}>
                    <h1>Email</h1>
                    <RoundedTextBox style={{fontSize: "2vh", width:"25vw"}} ref={emailRef}/>
                    <h1>Password</h1>
                    <RoundedTextBox style={{fontSize: "2vh", width:"25vw"}} type={"password"} ref={passwordRef}/>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "4vh"
                }}>
                    <h1>Username</h1>
                    <RoundedTextBox style={{fontSize: "2vh", width:"25vw"}} ref={usernameRef}/>
                    <h1>Phone (optional)</h1>
                    <RoundedTextBox style={{fontSize: "2vh", width:"25vw"}} ref={phoneRef}/>
                </div>
            </div>
            <RoundedButton style={{marginTop: "10vh", width: "20vw"}} onClick={registerOnClick}>Register</RoundedButton>
        </div>

    )
}
