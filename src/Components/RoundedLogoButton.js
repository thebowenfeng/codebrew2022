import RoundedButton from "./RoundedButton";
import Avatar from "@mui/material/Avatar";

export default function RoundedLogoButton(props){
    return(
        <RoundedButton style={{
            ...props.style,
            justifyContent: "flex-start"
        }}
        onClick={props.onClick}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                textAlign: "left"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "1vw"
                }}>
                    <Avatar alt="Remy Sharp" src={props.src} />
                </div>
                <div style={{
                    marginRight: "1vw"
                }}>
                    {props.children}
                </div>

            </div>
        </RoundedButton>
    )
}
