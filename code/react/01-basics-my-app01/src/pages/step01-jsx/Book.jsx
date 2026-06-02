// 파일이름과 function이름을 같게 하자 
// function 이름는 대문자로 시작하자 
export default function Book(props) {
    return(
        //  단일 루트 요소 반환 
        <>
            {/* 태그  표현식 */}
            <h1>책이름은 {props.name} 입니다.</h1>

            {/* `{문자열 ${객체.변수이름} 문자열}` */}
            <h1>{`책은 총 ${props.numOfPage} 페이지로 만들어졌음`}</h1>
            
        </>
    );
}

// export default function Book(params) {
//     return(
//         // 단일 루트 요소 반환 
//         <div>
//             <h1>Hello, Java</h1>
//             <h1>Hello, Java</h1>
//         </div>
//     );
// }