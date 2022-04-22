import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import {MenuItem, Menu} from "@mui/material";
import { collection, query, where, getDocs, getFirestore, setDoc, doc, deleteDoc } from "firebase/firestore";
import {app} from "../App";
import RoundedButton from "../Components/RoundedButton";
import {RoundedTextBox} from "../Components/RoundedTextBox";

export default function PersonalProfile(){
    const [user, setUser] = React.useContext(UserContext);
    const userNameRef = React.useRef(null);
    const phoneNumberRef = React.useRef(null);

    const db = getFirestore(app);

    return (
        <div>
            <Box sx={{position: 'relative', ml: '10%', mt: '4vh'}}>
                <Typography variant="h3" fontFamily="Comfortaa">
                    My information
                </Typography>
            </Box>
            <Box sx={{width: '80%', position: 'relative', ml: '10%', mt: '10vh', height: '40vh'}}>
                <Typography sx={{position: 'relative', ml: '32%', mt: '2vh'}}>
                    Username:
                    <Box>
                        <RoundedTextBox defaultValue={user.username}
                            ref={userNameRef} style={{width: '30vw'}}/>
                    </Box>
                </Typography>
                <Typography sx={{position: 'relative', ml: '32%', mt: '2vh'}}>
                    Email Address:
                    <Box>
                        <RoundedTextBox defaultValue={user.email} disabled
                                        style={{width: '30vw'}}/>
                    </Box>
                </Typography>
                <Typography sx={{position: 'relative', ml: '32%', mt: '2vh'}}>
                    Phone number:
                    <Box>
                        <RoundedTextBox defaultValue={user.phone === "" ? "" : user.phone}
                            type="number"
                            ref={phoneNumberRef}
                            style={{width: '30vw'}}/>
                    </Box>
                </Typography>
            </Box>
            <Box fullWidth sx={{textAlign: 'center'}}>
                <RoundedButton onClick={async (event) => {
                    if(userNameRef.current.value === ""){
                        alert("Username cannot be empty")
                    }else{
                        var newDetails = {uid: user.uid, phone: phoneNumberRef.current.value, email: user.email,
                            username: userNameRef.current.value};
                        setUser(newDetails);
                        try{
                            await setDoc(doc(db, "users", user.uid), {
                                username: userNameRef.current.value,
                                phone: phoneNumberRef.current.value,
                                email: user.email
                            });
                            alert("Success");
                        }catch(error){
                            alert("ERROR: " + error.message);
                        }
                    }
                }} style={{fontSize: "1vh", width: "10vw"}}>Save</RoundedButton>
            </Box>
        </div>
    );
}
