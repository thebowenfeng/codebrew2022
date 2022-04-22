import {RoundedTextBox} from "../Components/RoundedTextBox";
import {RoundedDropDown} from "../Components/RoundedDropDown";
import {Checkbox, FormControlLabel, MenuItem, RadioGroup} from "@mui/material";
import Radio from '@mui/material/Radio'
import {useContext, useEffect, useRef, useState} from "react";
import RoundedButton from "../Components/RoundedButton";
import styled from "@emotion/styled";
import {CurrentPageContext} from "../Contexts/CurrentPageContext";
import {UserContext} from "../Contexts/UserContext";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {doc, getFirestore, setDoc, GeoPoint} from "firebase/firestore";
import {app} from "../App";


export default function NewListing(){
    const [negotiate, setNegotiate] = useState(false);
    const [images, setImages] = useState([null, null, null, null]);
    const [listType, setListType] = useState(null);
    const typeRef = useRef(null);
    const titleRef = useRef(null);
    const priceRef = useRef(null);
    const descriptionRef = useRef(null);
    const usesRef = useRef(null);

    const [currentPage, setCurrentPage] = useContext(CurrentPageContext);
    const [user, setUser] = useContext(UserContext);

    const storage = getStorage();
    const db = getFirestore(app);

    useEffect(() => {
        if(user === null){
            setCurrentPage("Login");
        }
    }, [])

    const Input = styled('input')({
        display: "none"
    })

    function arrayNullity(array){
        for(var i = 0; i < array.length; i++){
            if(array[i] != null){
                return false
            }
        }

        return true;
    }

    const uploadClick = async () => {
        if(titleRef.current.value === ""){
            alert("Title cannot be empty")
        }else if(typeRef.current.value === undefined){
            alert("Must select category")
        }else if(listType === null){
            alert("Must specify whether or not buying/requesting or selling this item")
        }else if(!negotiate && priceRef.current.value === ""){
            alert("Must specify price if price is not negotiable")
        }else if(descriptionRef.current.value === ""){
            alert("Description cannot be empty")
        }else if(listType === "sell" && arrayNullity(images)){
            alert("Must upload at least 1 image if selling")
        }else{
            const postID = Math.random().toString(36).slice(2);

            var imageURLs = [];

            for(var i = 0; i < images.length; i++){
                if(images[i] != null){
                    try{
                        const snapshot = await uploadBytes(ref(storage, `/posts/${postID}/${images[i].obj.name}`), images[i].obj);
                        imageURLs.push(`gs://${snapshot.ref.bucket}/${snapshot.ref.fullPath}`);
                    }catch(error){
                        alert("ERROR: " + error.message);
                    }
                }
            }

            if(negotiate){
                var priceVal = "Negotiable";
            }else{
                var priceVal = priceRef.current.value;
            }

            navigator.geolocation.getCurrentPosition(async (position) => {
                try{
                    await setDoc(doc(db, listType, postID), {
                        user: user.uid,
                        title: titleRef.current.value,
                        category: typeRef.current.value,
                        price: priceVal,
                        description: descriptionRef.current.value,
                        photos: imageURLs,
                        uses: usesRef.current.value,
                        location: new GeoPoint(position.coords.latitude, position.coords.longitude),
                        isComplete: false
                    })
                    setCurrentPage("About");
                }catch(error){
                    alert("ERROR: " + error.message);
                }
            })
        }
    }

    function imageUploadButton(id){
        var imageURL = ""
        if(images[id - 1] != null){
            imageURL = images[id - 1].url;
        }

        return(
            <label htmlFor={"upload" + id.toString()}>
                <Input accept={"image/*"} id={"upload" + id.toString()} type={"file"} onChange={(event) => {
                    var newImages = [...images];
                    newImages[id - 1] = {obj: event.target.files[0], url: URL.createObjectURL(event.target.files[0])};
                    setImages(newImages);
                }}/>
                <RoundedButton style={{
                    height: "20vh",
                    width: "13vw",
                    backgroundImage: `url(${imageURL})`,
                    backgroundSize: "cover"
                }} component={"span"}>+</RoundedButton>
            </label>
        )
    }

    return(
        <div style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            rowGap: "2vh",
            marginLeft: "10vw",
            marginTop: "4vh",
            width: "80vw"
        }}>
            <div className={"New-posting-field"}>
                <h1>Title: </h1>
                <RoundedTextBox style={{
                    fontSize: "2vh",
                    width: "70vw"
                }} ref={titleRef}/>
            </div>
            <div className={"New-posting-field"}>
                <h1>Category: </h1>
                <RoundedDropDown style={{
                    fontSize: "2vh",
                    width: "30vw",
                }} ref={typeRef}>
                    <MenuItem value={"Electronic"}>Electronic</MenuItem>
                    <MenuItem value={"Paper"}>Paper</MenuItem>
                    <MenuItem value={"Cardboard"}>Cardboard</MenuItem>
                    <MenuItem value={"Fabric"}>Fabric</MenuItem>
                    <MenuItem value={"Raw metals"}>Raw metals</MenuItem>
                    <MenuItem value={"Raw wood"}>Raw wood</MenuItem>
                    <MenuItem value={"Glass"}>Glass</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                </RoundedDropDown>
                <RadioGroup
                    row
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "35vw",
                        columnGap: "2vw"
                    }}
                    onChange={(event, value) => {
                        setListType(value);
                    }}
                >
                    <FormControlLabel value="buy" control={<Radio size={"large"}/>} label={<h1>I'm requesting</h1>} />
                    <FormControlLabel value="sell" control={<Radio size={"large"}/>} label={<h1>I'm selling</h1>} />
                </RadioGroup>
            </div>
            <div className={"New-posting-field"}>
                <RadioGroup
                    row
                >
                    <FormControlLabel value="negotiate" control={<Checkbox size={"large"} onChange={() => {setNegotiate(!negotiate)}}/>} label={<h1>Negotiable pricing</h1>} />
                </RadioGroup>
                <h1>Price ($): </h1>
                <RoundedTextBox style={{
                    fontSize: "2vh",
                    width: "42vw"
                }} type={"number"} disabled={negotiate} ref={priceRef}/>
            </div>
            <div className={"New-posting-field"}>
                <h1>Description: </h1>
            </div>
            <div className={"New-posting-field"}>
                <RoundedTextBox style={{
                    width: "77vw",
                    fontSize: "2vh"
                }} multiline={true} rows={4} ref={descriptionRef}/>
            </div>
            <div className={"New-posting-field"} style={{
                columnGap: "4vw"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "20vh",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <h1 style={{
                        width: "10vw",
                        textAlign: "center"
                    }}>Add Image Here</h1>
                </div>
                {imageUploadButton(1)}
                {imageUploadButton(2)}
                {imageUploadButton(3)}
                {imageUploadButton(4)}
            </div>
            <div className={"New-posting-field"}>
                <h1>Possible uses</h1>
            </div>
            <div className={"New-posting-field"}>
                <RoundedTextBox style={{
                    width: "77vw",
                    fontSize: "2vh"
                }} multiline={true} rows={4} ref={usesRef}/>
            </div>
            <div className={"New-posting-field"} style={{
                width: "80vw",
                marginBottom: "7vh"
            }}>
                <RoundedButton style={{
                    width: "20vw"
                }} onClick={uploadClick}>Post</RoundedButton>
            </div>
        </div>
    )
}