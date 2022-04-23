import * as React from 'react';
import {app} from '../App';
import Box from '@mui/material/Box';
import { Avatar, Button, ToggleButtonGroup, Typography } from '@mui/material';
import { ToggleButton } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { UserContext } from '../Contexts/UserContext';
import { collection, query, where, getDocs, getFirestore, setDoc, doc, deleteDoc } from "firebase/firestore";
import { CurrentPageContext } from '../Contexts/CurrentPageContext';
import {getStorage, ref, getDownloadURL, deleteObject, listAll} from 'firebase/storage';


export default function AccountListing(){
    const [cuList, setCuList] = React.useState("Sell");
    const [refresh, setRefresh] = React.useState(false);
    const [user, setUser] = React.useContext(UserContext);
    const [currentPage, setCurrentPage] = React.useContext(CurrentPageContext);
    const [selList, setSelList] = React.useState(null);
    const [reqList, setcuReqList] = React.useState(null);
    const [preview, setPreview] = React.useState({});

    const storage = getStorage();

    React.useEffect(() => {
        if(user == null){
            setCurrentPage("Login");
        }
    }, [])

    const db = getFirestore(app);
    const requestingsQuery = query(collection(db, "buy"), where("user", "==", user.uid));
    const sellingsQuery = query(collection(db, "sell"), where("user", "==", user.uid));

    React.useEffect(() => {
        async function fetchData(){
            let cuRequestings = await getDocs(requestingsQuery);
            let cuSellings = await getDocs(sellingsQuery);
            var requestList = [];
            var sellingList = [];
            cuRequestings.docs.forEach((cuReqItem) => {
                requestList.push({id: cuReqItem.id, ...cuReqItem.data()})
                preview[cuReqItem.id] = "";
            });
            cuSellings.docs.forEach((cuSelItem) => {
                sellingList.push({id: cuSelItem.id, ...cuSelItem.data()})
                preview[cuSelItem.id] = "";
            });

            setSelList(sellingList);
            setcuReqList(requestList);
            setPreview({...preview});
        }

        fetchData();
    }, [refresh])

    const handleCuList = (event, newCuList) => {
        if (newCuList !== null){
            setCuList(newCuList);
        }
    };

    return(
        <div>
            <Box sx={{position: "relative", ml: '10%', mt: '5vh'}}>
                <ToggleButtonGroup
                    value = {cuList}
                    exclusive
                    onChange={handleCuList}
                    >
                    <ToggleButton value="Sell" sx={{fontWeight: 'bold', 
                            fontFamily: 'Comfortaa'}}>
                        Current Selling
                    </ToggleButton>
                    <ToggleButton value="Request" sx={{fontWeight: 'bold', 
                            fontFamily: 'Comfortaa'}}>
                        Current Requesting
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box sx={{borderRadius: "5px", 
                    width: "80%", ml: "10%", mt: "2vh", minWidth: "800px", 
                    height: "70vh"}}>
                    {cuList === "Sell" && 
                        <Box sx={{fontSize: '1.5vw', position: 'relative',
                                fontWeight: 'bold'}}>
                            List of item selling/sold:
                        </Box>
                    }
                    {cuList === "Request" &&
                        <Box sx={{fontSize: '1.5vw', position: 'relative',
                                fontWeight: 'bold'}}>
                            List of item requesting/completed:
                        </Box>
                    }
                    <Box sx={{border: '2px solid rgba(255, 255, 255, 0.8)', borderRadius: '5px', width: '100%',
                            mt: '1vh', height: '62vh', overflow: 'auto'}} style={{background: "linear-gradient(#BCC8C4, #D1CCA9)"}}>
                        {cuList === "Sell" && selList != null && selList.map((sellItems) => {
                            async function getImage(post){
                                if(post.photos.length > 0){
                                    var url = await getDownloadURL(ref(storage, post.photos[0]));
                                }

                                preview[post.id] = url;
                                setPreview({...preview});
                            }
                            
                            if(preview[sellItems.id] === ""){
                                getImage(sellItems);
                            }
                            
                            return (
                                <Box sx={{display: 'flex', position: 'relative', 
                                    mt: '0.5vh', borderRadius: '5px', height: '200px', bgcolor: '#D3DFC8'}}>
                                <Box sx={{position: 'relative', ml: '0.5vw', Height: '200px', 
                                    width: '200px'}}>
                                    <Avatar src={preview[sellItems.id]} sx={{height: '100%', width: 'auto'}}/>
                                </Box>
                                <Box sx={{width: '70%'}}>
                                    <Box sx={{position: 'relative', ml: '1vw', mt: '1vh'}}>
                                        {sellItems.title}
                                    </Box>
                                    <Box sx={{position: 'relative', ml: '0.5vw', mt: '1vh', 
                                            overflow: 'hidden'}}>
                                        {sellItems.description}
                                    </Box>
                                </Box>
                                <Box sx={{position: 'relative', ml: '0.5vw', 
                                    overflow: 'auto'}}>
                                    Price:
                                    <Box>${sellItems.price}</Box>
                                    <Box sx={{position: 'relative', mt: '2vh'}}>
                                    <FormControl>
                                        <FormLabel id="state-radio-buttons-group-label" sx={{fontSize: '0.9vw'}}>
                                            Current State:
                                        </FormLabel>
                                        <RadioGroup
                                            aria-labelledby="state-radio-buttons-group-label"
                                            defaultValue={sellItems.isComplete ? "Completed": "Selling"}
                                            name="radio-buttons-group"
                                            sx={{width: '1vw'}}
                                            onChange={async (event) => {
                                                var newData = sellItems;
                                                newData.isComplete = (event.target.value === "Completed" ? true: false);
                                                await setDoc(doc(db, "sell", sellItems.id), newData);
                                            }}
                                        >
                                            <FormControlLabel value="Completed"
                                            control={<Radio size='small'/>} 
                                            label={<Typography sx={{fontSize: '0.7em'}}>Completed</Typography>}/>
                                            <FormControlLabel value="Selling" 
                                            control={<Radio size='small'/>} 
                                            label={<Typography sx={{fontSize: '0.7em'}}>Selling</Typography>} />
                                        </RadioGroup>
                                        </FormControl>
                                    </Box>
                                    <Box sx={{position: 'relative', ml: '2vw'}}>
                                        <Button
                                            onClick={async (event) =>{
                                                await deleteDoc(doc(db, "sell", sellItems.id));

                                                const res = await listAll(ref(storage, "posts/" + sellItems.id));
                                                for(var i = 0; i < res.items.length; i++){
                                                    await deleteObject(res.items[i]);
                                                }

                                                alert("Item deleted");
                                                setRefresh(!refresh);
                                            }}>
                                            <RemoveCircleIcon />
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                            )
                        })
                            
                        }
                        {cuList === "Request" && reqList != null && reqList.map((requestItems) => {
                            async function getImage(post){
                                if(post.photos.length > 0){
                                    var url = await getDownloadURL(ref(storage, post.photos[0]));
                                }

                                preview[post.id] = url;
                                setPreview({...preview});
                            }
                            
                            if(preview[requestItems.id] === ""){
                                getImage(requestItems);
                            }
                            
                            return (
                                    <Box sx={{display: 'flex', position: 'relative', 
                                            mt: '0.5vh', borderRadius: '5px', height: '200px', 
                                            bgcolor: '#D3DFC8'}}>
                                        <Box sx={{position: 'relative', ml: '0.5vw', Height: '200px', 
                                            width: '200px'}}>
                                            <Avatar src={preview[requestItems.id]} sx={{height: '100%', width: 'auto'}}/>
                                        </Box>
                                        <Box sx={{width: '70%'}}>
                                            <Box sx={{position: 'relative', ml: '1vw', mt: '1vh'}}>
                                                {requestItems.title}
                                            </Box>
                                            <Box sx={{position: 'relative', ml: '0.5vw', mt: '1vh', 
                                                    overflow: 'hidden'}}>
                                                {requestItems.description}
                                            </Box>
                                        </Box>
                                        <Box sx={{position: 'relative', ml: '0.5vw', 
                                            overflow: 'auto'}}>
                                            Budget:
                                            <Box>${requestItems.price}</Box>
                                            <Box sx={{position: 'relative', mt: '2vh'}}>
                                            <FormControl>
                                                <FormLabel id="state-radio-buttons-group-label" sx={{fontSize: '0.9vw'}}>
                                                    Current State:
                                                </FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="state-radio-buttons-group-label"
                                                    defaultValue={requestItems.isComplete ? "Completed": "Requesting"}
                                                    name="radio-buttons-group"
                                                    sx={{width: '1vw'}}
                                                    onChange={async (event) => {
                                                        var newData = requestItems;
                                                        newData.isComplete = (event.target.value === "Completed" ? true: false);
                                                        await setDoc(doc(db, "buy", requestItems.id), newData);
                                                    }}
                                                >
                                                    <FormControlLabel value="Completed"
                                                    control={<Radio size='small'/>} 
                                                    label={<Typography sx={{fontSize: '0.7em'}}>Completed</Typography>}/>
                                                    <FormControlLabel value="Requesting" 
                                                    control={<Radio size='small'/>} 
                                                    label={<Typography sx={{fontSize: '0.7em'}}>Requesting</Typography>} />
                                                </RadioGroup>
                                                </FormControl>
                                            </Box>
                                            <Box sx={{position: 'relative', ml: '2vw'}}>
                                                <Button onClick={async (event) =>{
                                                await deleteDoc(doc(db, "buy", requestItems.id));

                                                const res = await listAll(ref(storage, "posts/" + requestItems.id));
                                                for(var i = 0; i < res.items.length; i++){
                                                    await deleteObject(res.items[i]);
                                                }

                                                alert("Item deleted");
                                                setRefresh(!refresh);
                                            }}><RemoveCircleIcon /></Button>
                                            </Box>
                                        </Box>
                                    </Box>
                            )
                        })                
                        }
                    </Box>
            </Box>
        </div>
    );
}