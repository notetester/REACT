export default function IfExam01(params) {
    // Boolean(false)  : false
    // Boolean(0)      : false
    // Boolean(-0)     : false
    // Boolean("")     : false
    // Boolean(null)   : false
    // Boolean(undefined)  : false
    // Boolean(NaN)     : false

    const isLoggedIn = false;
    let result;
    if(isLoggedIn){
       result = <h2>XXX님 환영합니다</h2>
    }else{
       result = <h2>로그인해주세요</h2>
    }

    return(
        <>
          <h2> 조건 렌더링(if문)</h2>
          {/* 자바스크립트의 변수 호출 시 반드시 {} 사용 */}
          {result}
        </>
    );
}