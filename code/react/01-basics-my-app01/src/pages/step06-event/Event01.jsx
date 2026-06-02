export default function Event01(params) {
    // **렌더링 될때 마다 함수가 새로 생성
    // state, props에 직접 접근 가능
    // 해당 컴포넌트 전용

    // 자바스크립트 함수 : 파라미터가 없음
   function handleClick() {
      alert("클릭1")
   }

   // 자바스크립트 함수 : 파라미터가 있음
   function handleClick2(msg) {
      alert(msg)
   }

    return(
        <>
            {/* 이벤트 핸들러 호출 => 자바스크립트 함수 호출 */}
            <button onClick={handleClick}>눌러주세요-1</button><br />

            {/* 클릭하지 않아도 실행 된다. (잘못된 코드)*/}
            {/* <button onClick={handleClick2("클릭")}>눌러주세요-2</button><br /> */}
            <button onClick={()=>handleClick2("클릭2")}>눌러주세요-2</button><br />

            <button onClick={()=>{
                alert("클릭3");
            }}>눌러주세요-3</button><br />
        </>
    );
}