import "../Styles/Market.css";

import Listing from "../Components/Listing";
import {Backdrop, Fade, MenuItem, Modal} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {app} from "../App";
import {RoundedDropDown} from "../Components/RoundedDropDown";
import {RoundedTextBox} from "../Components/RoundedTextBox";
import RoundedButton from "../Components/RoundedButton";
import stringSimilarity from "string-similarity";
import Detailed from "./Detailed";

function Market(props) {
	const db = getFirestore(app);
	const storage = getStorage();
	const [posts, setPosts] = useState(null);
	const [location, setLocation] = useState(null);
	const [preview, setPreview] = useState({});
	const [category, setCategory] = useState("");
	const [maxDist, setMaxDist] = useState(9999999999);
	const [search, setSearch] = useState(null);
	const searchRef = useRef(null);
	const [openModal, setOpenModal] = useState(false);
	const [currPostID, setCurrPostID] = useState(null);
	const distRef = useRef(null);
	const categoryRef = useRef(null);

	function getDistance(lat1,lon1,lat2,lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2-lat1);  // deg2rad below
		var dLon = deg2rad(lon2-lon1);
		var a =
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
			Math.sin(dLon/2) * Math.sin(dLon/2)
		;
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c; // Distance in km

		return Math.round(d);
	}

	function deg2rad(deg) {
		return deg * (Math.PI/180)
	}

	useEffect(() => {
		async function getPosts(){
			const snapShot = await getDocs(query(collection(db, props.type)));

			var localPosts = []

			snapShot.forEach((doc) => {
				if(doc.data().isComplete === false){
					localPosts.push({id: doc.id, ...doc.data()});
					preview[doc.id] = "";
				}
			})

			setPosts(localPosts);
			setPreview({...preview});
		}

		getPosts();
		navigator.geolocation.getCurrentPosition((pos) => {
			setLocation(pos.coords);
		})
	}, [])

    return (
		<div className="market-page">
			<Modal open={openModal} onClose={() => setOpenModal(false)}>
				<Detailed type={props.type} postID={currPostID}/>
			</Modal>
			<div className="search-bar-container">
				<label htmlFor="header-search">
					<p id="search-label">{props.label}</p>
				</label>
				<input
					type="text"
					id="header-search"
					placeholder="Items"
					name="s"
					ref={searchRef}
				/>
				<button id="submit-button" onClick={() => {
					if(searchRef.current.value === ""){
						alert("Search query is empty")
					}else{
						setSearch(searchRef.current.value);
					}
				}}>
					<p>GO</p>
				</button>
			</div>
			<div className="content">
				<div className={"categories"}>
                    <h1>Filter</h1>
					<h1 style={{fontSize: "2vh"}}>Category</h1>
					<RoundedDropDown style={{
						fontSize: "2vh",
						width: "15vw",
					}} onChange={(event) => {
						setCategory(event.target.value);
					}} value={category}>
						<MenuItem value={"Electronic"}>Electronic</MenuItem>
						<MenuItem value={"Paper"}>Paper</MenuItem>
						<MenuItem value={"Cardboard"}>Cardboard</MenuItem>
						<MenuItem value={"Fabric"}>Fabric</MenuItem>
						<MenuItem value={"Raw metals"}>Raw metals</MenuItem>
						<MenuItem value={"Raw wood"}>Raw wood</MenuItem>
						<MenuItem value={"Glass"}>Glass</MenuItem>
						<MenuItem value={"Other"}>Other</MenuItem>
					</RoundedDropDown>
					<h1 style={{fontSize: "2vh"}}>Within distance (km)</h1>
					<RoundedTextBox type={"number"} ref={distRef} onChange={(event) => {
						setMaxDist(event.target.value);
					}}/>
					<RoundedButton style={{fontSize: "1vh", width: "10vw"}} onClick={() => {
						setCategory("");
						setMaxDist(999999999999);
						setSearch(null);
						distRef.current.value = "";
					}}>Reset</RoundedButton>
                </div>
				<div className={"listing"}>
					{posts != null && posts.map((post) => {
						async function getImageUrl(post){
							if(post.photos.length > 0){
								var url = await getDownloadURL(ref(storage, post.photos[0]));
							}else{
								var url = "https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png";
							}

							preview[post.id] = url;
							setPreview({...preview});
						}

						if(preview[post.id] === ""){
							getImageUrl(post);
						}

						if((category === null || post.category === category) &&
							(location === null || getDistance(location.latitude, location.longitude, post.location.latitude, post.location.longitude) < maxDist) &&
							(search == null || stringSimilarity.compareTwoStrings(search, post.title) >= 0.5)
						){
							return(
								<Listing
									title={post.title}
									description={post.description}
									price={post.price}
									location={location === null ? "null" : "Distance(km): " + getDistance(location.latitude, location.longitude, post.location.latitude, post.location.longitude)}
									src={preview[post.id]}
									onClick={() => {
										setOpenModal(true);
										setCurrPostID(post.id);
									}}
								/>
							)
						}else{
							return(
								<div>
								</div>
							)
						}
					})}

				</div>
			</div>
		</div>
	);
}

export default Market;
