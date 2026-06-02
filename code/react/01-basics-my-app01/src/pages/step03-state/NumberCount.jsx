export default function NumberCount(params) {
    // 자바스크립트 영역
    let cnt = 5 ;

    // 1추가 함수
   let increment = ()=>{
        cnt = cnt + 1 ;
        // 디버깅 : 값 확인하는 방법
        console.log('cnt : ' , cnt) ;
   }
    // 1감소 함수
    let decrement = ()=>{
        cnt = cnt - 1 ;
        console.log('cnt : ' , cnt) ;
    }
    return(
        <>
           {/* html 영역 */}
           {/* 자바스트립트 함수 호출 ; {} 사용 */}
          <button onClick={increment}> + </button>
          {/* 자바스크립트 변수 호출 : {} */}
          <span>{cnt}</span> 
          <button onClick={decrement}> - </button>
          {/* 
             버튼을 누르면 실제 cnt 값은 증가 또는 감소를 한다.
             그러나 브라우저에 있는 값은 변경 되지 않는다.
             React는 한번 화면이 렌더링 되면 다시 렌더링 될때 까지 화면 변화 없다.
             React에게 현재 화면 상태가 변화 되었다고 지시하면 다시 렌더링하고 
             그때 변경된 값으로 적용된다.
             React에게 현재상태가 변경되었다고 지시하는 것 -> 상태관리(state)
          */}
        </>
    );
}