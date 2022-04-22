import {styled, TextField} from "@mui/material";
import {forwardRef} from "react";

const CssTextField = styled(TextField)({
    backgroundColor: "rgba(225,221,221,0.6)",
    borderRadius: 50,
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'transparent',
        },
        '&:hover fieldset': {
            borderColor: 'transparent',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent',
        },
    },
});

export const RoundedTextBox = forwardRef((props, ref) => (
    <CssTextField
        inputProps={{style: props.style}} type={props.type} inputRef={ref} disabled={props.disabled} multiline={props.multiline}
        rows={props.rows} onChange={props.onChange}
    />
));
