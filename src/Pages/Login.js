import {RoundedTextBox} from "../Components/RoundedTextBox";
import RoundedButton from "../Components/RoundedButton";
import RoundedLogoButton from "../Components/RoundedLogoButton";
import {useRef} from "react";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login(){
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const auth = getAuth();

    const loginClick = () => {
        if(emailRef.current.value === "" || passwordRef.current.value === ""){
            alert("Username and password fields cannot be empty");
        }else{
            signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value).then((userCreds) => {
                alert("Signed in");
                console.log(userCreds.user.email);
                console.log(userCreds.user.uid);
            }).catch((error) => {
                alert("ERROR: " + error.message);
            })
        }
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
            <div className={"Login-block"} style={{
                borderStyle: "solid",
                borderWidth: 0,
                borderRightWidth: 3,
                rowGap: "4vh"
            }}>
                <h1 style={{fontSize: "5vh"}}>Sign In</h1>
                <h1>Email</h1>
                <RoundedTextBox style={{fontSize: "2vh", width: "25vw"}} ref={emailRef}/>
                <h1>Password</h1>
                <RoundedTextBox style={{fontSize: "2vh", width: "25vw"}} type={"password"} ref={passwordRef}/>
                <RoundedButton style={{width: "20vw"}} onClick={loginClick}>Login</RoundedButton>
                <p style={{fontSize: "2vh", cursor: "pointer"}} onClick={() => alert("asfd")}>Do not have an account? Click to register</p>
            </div>
            <div className={"Login-block"} style={{
                rowGap: "8vh",
                marginTop: "-17vh"
            }}>
                <h1 style={{fontSize: "5vh", width: "30vw", textAlign: "center"}}>Login with another account</h1>
                <RoundedLogoButton
                    src={"https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"}
                >Login with Google</RoundedLogoButton>
                <RoundedLogoButton
                    src={"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"}
                >Login with Facebook</RoundedLogoButton>
            </div>
        </div>
    )
}
