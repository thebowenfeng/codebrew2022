import {styled} from "@mui/material";
import Button from "@mui/material/Button";

export default function RoundedButton(props){
    const ColorButton = styled(Button)(({ theme }) => ({
        color: "rgba(0,0,0,1)",
        backgroundColor: "rgba(225,221,221,0.6)",
        borderRadius: 50,
        '&:hover': {
            backgroundColor: "rgba(225,221,221,0.4)"
        }
    }));

    return (
        <ColorButton sx={props.style} onClick={props.onClick} component={props.component}>
            <h1>{props.children}</h1>
        </ColorButton>
    )
}
