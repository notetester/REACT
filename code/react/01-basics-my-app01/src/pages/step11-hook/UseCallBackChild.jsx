import React from "react";

function UseCallBackChild({onClick}) {
    console.log("자식~~~ 클릭")
    return(
        <div>
            <button onClick={onClick}>자식버튼</button>
        </div>
    );
}

// export default UseCallBackChild ;

// React.memo 는 React 에서 컴포넌트의 불필요한 리 랜더링을 막아주는 도구
export default React.memo(UseCallBackChild);