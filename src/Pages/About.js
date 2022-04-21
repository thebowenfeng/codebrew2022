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
                    <h1 style={{fontSize: "10vh"}}>Ready to Recycle?</h1>
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
                        <p style={{marginTop: "5vh", width: "25vw", fontSize: "3vh"}}>website description:  why we do, what we do,
                            Focus on the creator
                            Design ideas on the waste can do
                            Request materials based on the project</p>
                    </div>
                </Slide>
                <Slide direction={"left"} in={true} timeout={800}>
                    <div className={"About-description"}>
                        <h1 style={{fontSize: "5vh"}}>What we do</h1>
                        <p style={{marginTop: "5vh", width: "25vw", fontSize: "3vh"}}>website description:  why we do, what we do,
                            Focus on the creator
                            Design ideas on the waste can do
                            Request materials based on the project</p>
                    </div>
                </Slide>
            </div>
        </div>
    )
}
