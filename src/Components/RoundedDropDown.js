import {Select} from "@mui/material";
import {forwardRef} from "react";

export const RoundedDropDown = forwardRef((props, ref) => (
    <Select sx={{
        backgroundColor: "rgba(225,221,221,0.6)",
        borderRadius: 70,
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: "transparent",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent"
        },
        textAlign: "center",
        ...props.style
    }} inputRef={ref}>
        {props.children}
    </Select>
));