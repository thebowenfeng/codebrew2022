import {Grow, Slide, Zoom} from "@mui/material";


export default function About(){
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Slide direction={"down"} in={true} timeout={800}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "15vh"
                }}>
                    <h1 style={{fontSize: "10vh"}}>Bring new life to old goods!</h1>
                </div>
            </Slide>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10vh"
            }}>
                <Slide direction={"right"} in={true} timeout={800}>
                    <div className={"About-description"}>
                        <h1 style={{fontSize: "5vh"}}>Why we do</h1>
                        <p style={{marginTop: "5vh", width: "25vw", fontSize: "3vh"}}>Inorder to reduce how much goods and materials go to waste and landfill, 
                        we wanted to develop a solution and website with the purpose of reusing, remaking and renewing materials. Our aim was to reduce wasted 
                        goods and ReMake is our solution to this problem.</p>
                    </div>
                </Slide>
                <Slide direction={"left"} in={true} timeout={800}>
                    <div className={"About-description"}>
                        <h1 style={{fontSize: "5vh"}}>What we do</h1>
                        <p style={{marginTop: "5vh", width: "25vw", fontSize: "3vh"}}>ReMake is a waste and 
                        sustainability initiative website that lets users buy and sell old goods that would have otherwise gone to waste and landfill. 
                        Whether its for art, design sustainability or another other project. ReMake will have what you need!</p>
                    </div>
                </Slide>
            </div>
        </div>
    )
}
