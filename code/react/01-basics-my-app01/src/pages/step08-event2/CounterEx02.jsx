import { Button } from "@mui/material";
import { useState } from "react";

export default function CounterEx02(params) {
    console.log("hi");
    // React useState
    // const [state, setState] = useState(initialState)
    // const [변수이름, set변수이름(함수)] = useState(초기값)

    // let cnt = 5 ;
    const [cnt,setCnt] = useState(5);
    
    // function add() {
    //     cnt = cnt + 1 ;
    //     // cnt 는 변경되지만 화면은 변경되지 않는다.
    //     console.log("cnt:",cnt);
    // }
    // function sub() {
    //     cnt = cnt - 1 ;
    //     // cnt 는 변경되지만 화면은 변경되지 않는다.
    //     console.log("cnt:",cnt);
    // }



    //    function add(params) {
    //     setCnt(cnt+1)
    //    }
    //    function sub(params) {
    //     setCnt(cnt-1)
    //    }

        const add = () => {setCnt(cnt+1)}
        const sub = () => {setCnt(cnt-1)}

    return(
         <>
            <h2>Count : {cnt}</h2>
            <Button variant="outlined" onClick={add}> + </Button>
            <Button variant="outlined" onClick={sub}> - </Button>
        </>
    );
}