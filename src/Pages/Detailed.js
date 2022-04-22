import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {useEffect, useState} from "react";

import { doc, getDoc, getFirestore} from "firebase/firestore";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import Box from "@mui/material/Box";


export default function Detailed(props){
    const [postData, setPostData] = useState(null);

    const db = getFirestore();
    const storage = getStorage();

    useEffect(() => {
        async function getPostData(){
            const docSnap = await getDoc(doc(db, props.type, props.postID))
            if(docSnap.exists()){
                var data = {...docSnap.data()};
                const userData = await getDoc(doc(db, "users", docSnap.data().user));
                if(userData.exists()){
                    data.phone = userData.data().phone;
                    data.email = userData.data().email;
                }else{
                    data.phone = "";
                    data.email = "";
                }

                if(docSnap.data().photos.length > 0){
                    for(var i = 0; i < docSnap.data().photos.length; i++){
                        data.photos[i] = await getDownloadURL(ref(storage, docSnap.data().photos[i]));
                    }
                }else{
                    data.photos = ["https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png"]
                }

                setPostData(data);
            }else{
                alert("Error retrieving post")
            }
        }

        getPostData();
    }, [])

    return(
        <div>
            {postData == null && <h1>Loading...</h1>}
            {postData != null && <div style={{
                display: "flex",
                flexDirection: "row",
                columnGap: "6vw",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                background: "linear-gradient(to bottom, rgba(151, 175, 179, 1), rgba(182, 195, 156, 1), rgba(207, 189, 123, 1))",
                marginTop: "10vh",
                marginLeft: "10vw",
                width: "80vw"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    rowGap: "2vh",
                    width: "20vw"
                }}>
                    <Carousel>
                        {postData.photos.map((image) => {
                            return(
                                <img src={image} style={{maxHeight: "25vh"}}/>
                            )
                        })}
                    </Carousel>
                    <h1>Seller information</h1>
                    <h1 style={{fontSize: "2.5vh"}}>Phone Number</h1>
                    <h1 style={{fontSize: "2.5vh"}}>{postData.phone === "" ? "N/A" : postData.phone}</h1>
                    <h1 style={{fontSize: "2.5vh"}}>Email</h1>
                    <h1 style={{fontSize: "2.5vh"}}>{postData.email === "" ? "N/A" : postData.email}</h1>
                    <h1>Location</h1>
                    <iframe width="100%" height="100%" id="gmap_canvas"
                        src={`https://maps.google.com/maps?q=${postData.location.latitude}%20${postData.location.longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"/>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    rowGap: "5vh",
                    width: "50vw"
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "2vw",
                        width: "50vw",
                        marginTop: "5vh"
                    }}>
                        <div style={{
                            width: "24vw"
                        }}>
                            <h1>Title: {postData.title}</h1>
                        </div>
                        <div style={{
                            width: "24vw"
                        }}>
                            <h1>Current state: {props.type === "sell" ? (postData.isComplete === true ? "Sold" : "Selling") : (postData.isComplete === true ? "Bought" : "Buying")}</h1>
                        </div>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "2vw",
                        width: "50vw",
                    }}>
                        <div style={{
                            width: "24vw"
                        }}>
                            <h1>Type: {postData.category}</h1>
                        </div>
                        <div style={{
                            width: "24vw"
                        }}>
                            <h1>Price: ${postData.price}</h1>
                        </div>
                    </div>
                    <h1>Description: </h1>
                    <div style={{
                        width: "50vw",
                        height: "20vh",
                        overflow: "auto",
                        overflowWrap: "break-word"
                    }}>
                        <p style={{
                            fontSize: "2vh"
                        }}>{postData.description}</p>
                    </div>
                    <h1>Possible uses: </h1>
                    <div style={{
                        width: "50vw",
                        height: "20vh",
                        overflow: "auto",
                        overflowWrap: "break-word"
                    }}>
                        <p style={{
                            fontSize: "2vh"
                        }}>{postData.uses}</p>
                    </div>
                </div>
            </div>}
        </div>
    )
}
