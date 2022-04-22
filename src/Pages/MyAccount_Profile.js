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

export default function PersonalProfile(){
    const [user, setUser] = React.useContext(UserContext);
    const userNameRef = React.useRef(null);
    const phoneNumberRef = React.useRef(null);
    const [userName, setUserName] = React.useState(user.username);
    const [phoneNumber, setPhoneNumber] = React.useState(user.phone);

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
                        <TextField defaultValue={userName}
                            inputRef={userNameRef} sx={{width: '50%'}}/>
                    </Box>
                </Typography>
                <Typography sx={{position: 'relative', ml: '32%', mt: '2vh'}}>
                    Email Address: 
                    <Box>
                        <TextField defaultValue={user.email} disabled
                            sx={{width: '50%'}}/>
                    </Box>
                </Typography>
                <Typography sx={{position: 'relative', ml: '32%', mt: '2vh'}}>
                    Phone number: 
                    <Box>
                        <TextField defaultValue={phoneNumber == "" ? "" : phoneNumber}
                            type="number"
                            inputRef={phoneNumberRef}
                            sx={{width: '50%'}}/>
                    </Box>
                </Typography>
            </Box>
            <Box fullWidth sx={{textAlign: 'center'}}>
                <RoundedButton onClick={async (event) => {
                    setUserName(userNameRef.current.value);
                    setPhoneNumber(phoneNumberRef.current.value);
                    var newDetails = {uid: user.uid, phone: phoneNumber, email: user.email, 
                                        username: userName};
                    setUser(newDetails);
                    newDetails = {phone: user.phone, email: user.email, username: user.username};
                    console.log(newDetails.phone + " " + newDetails.email + " " + newDetails.username);
                    //await setDoc(doc(db, "users", user.uid), newDetails);
                    alert("Personal information changed");
                }}>Save</RoundedButton>
            </Box>
        </div>
    );
}