import { Button } from "@mui/material";

export default function Btn({name, children}) {
    return(
        <Button variant="outlined"
          onClick={()=>{console.log(name)}}>{children}</Button>
    );
}