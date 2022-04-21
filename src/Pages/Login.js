import {RoundedTextBox} from "../Components/RoundedTextBox";
import RoundedButton from "../Components/RoundedButton";
import RoundedLogoButton from "../Components/RoundedLogoButton";
import {useContext, useRef} from "react";

import { getAuth, signInWithEmailAndPassword, FacebookAuthProvider, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {app} from "../App";
import {CurrentPageContext} from "../Contexts/CurrentPageContext";
import {UserContext} from "../Contexts/UserContext";
import {Slide} from "@mui/material";
import Box from "@mui/material/Box";

export default function Login(){
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [currentPage, setCurrentPage] = useContext(CurrentPageContext);
    const [user, setUser] = useContext(UserContext);

    const auth = getAuth();
    const db = getFirestore(app);

    const loginClick = () => {
        if(emailRef.current.value === "" || passwordRef.current.value === ""){
            alert("Username and password fields cannot be empty");
        }else{
            signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value).then(async (userCreds) => {
                const docSnap = await getDoc(doc(db, "users", userCreds.user.uid))
                if(docSnap.exists()){
                    console.log(docSnap.data().username);
                    setUser({
                        email: userCreds.user.email,
                        uid: userCreds.user.uid,
                        username: docSnap.data().username,
                        phone: docSnap.data().phone
                    });
                    setCurrentPage("About");
                }else{
                    alert("ERROR: User document does not exist");
                }
            }).catch((error) => {
                alert("ERROR: " + error.message);
            })
        }
    }

    const fbLoginClick = () => {
        const provider = new FacebookAuthProvider();

        signInWithPopup(auth, provider).then((result) => {
            setUser({
                username: result.user.displayName,
                email: result.user.email,
                phone: result.user.phoneNumber,
                uid: result.user.uid
            })
            setCurrentPage("About");
        }).catch((error) => {
            alert("ERROR: " + error.message);
        })
    }

    const googleLoginClick = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider).then((result) => {
            setUser({
                username: result.user.displayName,
                email: result.user.email,
                phone: result.user.phoneNumber,
                uid: result.user.uid
            })
            setCurrentPage("About");
        }).catch((error) => {
            alert("ERROR: " + error.message);
        })
    }

    return(
        <div style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "15vh",
            marginLeft: "10vw",
            width: "80vw",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Box className={"Login-block"} sx={{
                borderStyle: "solid",
                borderWidth: 0,
                borderRightWidth: 3,
            }}>
                <Slide direction={"right"} in={true} mountOnEnter unmountOnExit timeout={1000}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        rowGap: "4vh"
                    }} >
                        <h1 style={{fontSize: "5vh"}}>Sign In</h1>
                        <h1>Email</h1>
                        <RoundedTextBox style={{fontSize: "2vh", width: "25vw"}} ref={emailRef}/>
                        <h1>Password</h1>
                        <RoundedTextBox style={{fontSize: "2vh", width: "25vw"}} type={"password"} ref={passwordRef}/>
                        <RoundedButton style={{width: "20vw"}} onClick={loginClick}>Login</RoundedButton>
                        <p style={{fontSize: "2vh", cursor: "pointer"}} onClick={() => setCurrentPage("Register")}>Do not have an account? Click to register</p>
                    </div>
                </Slide>
            </Box>
            <div className={"Login-block"} style={{
                rowGap: "8vh",
                marginTop: "-17vh"
            }}>
                <Slide direction={"left"} in={true} mountOnEnter unmountOnExit timeout={1000}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        rowGap: "8vh"
                    }} >
                        <h1 style={{fontSize: "5vh", width: "30vw", textAlign: "center"}}>Login with another account</h1>
                        <RoundedLogoButton
                            src={"https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"}
                            onClick={googleLoginClick}
                        >Login with Google</RoundedLogoButton>
                        <RoundedLogoButton
                            src={"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"}
                            onClick={fbLoginClick}
                        >Login with Facebook</RoundedLogoButton>
                    </div>
                </Slide>
            </div>
        </div>
    )
}
