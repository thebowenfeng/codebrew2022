import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {useContext} from "react";
import {UserContext} from "../Contexts/UserContext";
import {CurrentPageContext} from "../Contexts/CurrentPageContext";

import a from "../Photos/a.png";
import b from "../Photos/b.png";
import c from "../Photos/c.png";
import d from "../Photos/d.png";
import e from "../Photos/e.png";
import f from "../Photos/f.png";
import g from "../Photos/g.png";
import h from "../Photos/h.png";
import i from "../Photos/i.png";
import j from "../Photos/j.png";
import k from "../Photos/k.png";
import l from "../Photos/l.png";
import m from "../Photos/m.png";
import n from "../Photos/n.png";
import o from "../Photos/o.png";
import p from "../Photos/p.png";
import q from "../Photos/q.png";
import r from "../Photos/r.png";
import s from "../Photos/s.png";
import t from "../Photos/t.png";
import u from "../Photos/u.png";
import v from "../Photos/v.png";
import w from "../Photos/w.png";
import x from "../Photos/x.png";
import y from "../Photos/y.png";
import z from "../Photos/z.png";

export default function GlobalMenubar(){
    const loginDropBox = ['Personal Profile', "My Listing"];
    const [user, setUser] = useContext(UserContext);
    const [currentPage, setCurrentPage] = useContext(CurrentPageContext);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const profilePic = {
        a:a,
        b:b,
        c:c,
        d:d,
        e:e,
        f:f,
        g:g,
        h:h,
        i:i,
        j:j,
        k:k,
        l:l,
        m:m,
        n:n,
        o:o,
        p:p,
        q:q,
        r:r,
        s:s,
        t:t,
        u:u,
        v:v,
        w:w,
        x:x,
        y:y,
        z:z
    }

    return (
        <div>
            <Box fullWidth sx={{display: "flex", justifyContent: "space-between"}}>
                <Box sx={{width: "fit-content", display: "flex"}}>
                    <Box>
                        <Avatar src="https://pbs.twimg.com/profile_images/1455185376876826625/s1AjSxph_400x400.jpg"
                        sx={{height: "12vh", width: "12vh"}}/>
                    </Box>
                    <Button sx={{fontSize: "25px",
                            position: 'relative',
                            ml: "3.5vw",
                            mt: "3.1vh",
                            color: "#000000",
                            fontFamily: "Comfortaa",
                            fontWeight: "bold",
                            height: "50%"}}>
                        Market
                    </Button>
                    <Button sx={{fontSize: "25px",
                            position: 'relative',
                            ml: "3.5vw",
                            mt: "3.1vh",
                            color: "#000000",
                            fontFamily: "Comfortaa",
                            fontWeight: "bold",
                            height: "50%"}}>
                        Buy Requests
                    </Button>
                    <Button sx={{fontSize: "25px",
                            position: 'relative',
                            ml: "3.5vw",
                            mt: "3.1vh",
                            color: "#000000",
                            fontFamily: "Comfortaa",
                            fontWeight: "bold",
                            height: "50%"}} onClick={() => setCurrentPage("About")}>
                        About us
                    </Button>
                </Box>
                <Box sx={{width: "fit-content", display: "flex"}}>
                    <Button sx={{fontSize: "25px",
                            position: "relative",
                            mr: "3vw",
                            mt: "3.1vh",
                            color: "#000000",
                            fontFamily: "Comfortaa",
                            fontWeight: "bold",
                            height: "50%"}}>
                        Create listing
                        <AddBoxIcon sx={{fontSize: "27px",
                                    color: "#000000",
                                    mt: "-0.4vh"}}/>
                    </Button>
                    {user != null && <Box>
                        <Tooltip title="My account">
                            <IconButton sx={{position: "relative", mr: "3vw"}}
                                        onClick={handleOpenUserMenu}>
                                <Avatar alt="Remy Sharp" sx={{height: "80px",
                                                            width: "80px"}}
                                        src={profilePic[user.username[0].toLowerCase()]}
                            />
                            </IconButton>
                        </Tooltip>
                        <Menu anchorEl={anchorElUser}
                            keepMounted
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                                {loginDropBox.map((loginDropBoxs) => (
                                    <MenuItem key={loginDropBoxs}
                                        onClick={() => {
                                            handleCloseUserMenu();
                                            setCurrentPage(loginDropBoxs);
                                            //alert(loginDropBoxs);
                                        }}>
                                            <Typography textAlign="center">
                                                {loginDropBoxs}
                                            </Typography>
                                    </MenuItem>
                                ))}
                        </Menu>
                    </Box>}
                    {user == null && <Button sx={{fontSize: "25px",
                        position: 'relative',
                        ml: "1vw",
                        marginRight: "3vw",
                        mt: "3.1vh",
                        color: "#000000",
                        fontFamily: "Comfortaa",
                        fontWeight: "bold",
                        height: "50%"}} onClick={() => setCurrentPage("Login")}>
                        Login
                    </Button>}
                </Box>
            </Box>
        </div>
    );
}
