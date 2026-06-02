import { Button } from "@mui/material";

export default function CounterEx01(params) {
    // 리엑트에서는 값이 변경되었다고 화면이 변경되지 않는다.
    // 상태값이 변경되었다고 리엑트에게 알려줘야 화면이 변경된다.(상태관리 => useState)
    let cnt = 5 ;
    function add() {
        cnt = cnt + 1 ;
        // cnt 는 변경되지만 화면은 변경되지 않는다.
        console.log("cnt:",cnt);
    }
    function sub() {
        cnt = cnt - 1 ;
        // cnt 는 변경되지만 화면은 변경되지 않는다.
        console.log("cnt:",cnt);
    }
    return(
        <>
            <h2>Count : {cnt}</h2>
            <Button variant="outlined" onClick={add}> + </Button>
            <Button variant="outlined" onClick={sub}> - </Button>
        </>
    );
}