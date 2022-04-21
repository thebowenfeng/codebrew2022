import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function GlobalMenubar(){
    return (
        <div>
            <Box fullWidth sx={{display: "flex", justifyContent: "space-between"}}>
                <Box sx={{width: "fit-content", display: "flex"}}>
                    <Box>
                        <Avatar src="https://pbs.twimg.com/profile_images/1455185376876826625/s1AjSxph_400x400.jpg" 
                        sx={{height: "12vh", width: "12vh"}}/>
                    </Box>
                    <Button sx={{fontSize: "25px", position: 'relative', ml: "3.5vw"}}>
                        Market
                    </Button>
                    <Button sx={{fontSize: "25px", position: 'relative', ml: "3.5vw"}}>
                        Buy Requests
                    </Button>
                    <Button sx={{fontSize: "25px", position: 'relative', ml: "3.5vw"}}>
                        About us
                    </Button>
                </Box>
                <Box sx={{width: "fit-content", display: "flex"}}>
                    <Button sx={{fontSize: "25px", position: "relative", mr: "3vw"}}>
                        Create listing
                        <AddBoxIcon sx={{fontSize: "27px"}}/>
                    </Button>
                    <IconButton sx={{position: "relative", mr: "3vw"}}>
                        <Avatar alt="Remy Sharp" sx={{height: "80px", width: "80px"}}/>
                    </IconButton>
                </Box>
            </Box>  
        </div>
    );
}