

export default function About(){
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20vh"
            }}>
                <h1 style={{fontSize: "10vh"}}>Ready to Recycle?</h1>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30vw"
                }}>
                    <h1 style={{fontSize: "5vh"}}>Why we do</h1>
                    <h1>website description:  why we do, what we do,
                        Focus on the creator
                        Design ideas on the waste can do
                        Request materials based on the project</h1>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30vw"
                }}>
                    <h1 style={{fontSize: "5vh"}}>What we do</h1>
                    <h1>website description:  why we do, what we do,
                        Focus on the creator
                        Design ideas on the waste can do
                        Request materials based on the project</h1>
                </div>
            </div>
        </div>
    )
}