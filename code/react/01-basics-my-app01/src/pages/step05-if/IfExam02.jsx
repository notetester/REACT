// export default function IfExam02(props) {
//    let name = props.name ;
//    let result ;
   
//    if(props.isPacked){
//       result = <li>{name} + 체크 O</li>
//    }else{
//       result = <li>{name} + 체크 X</li>
//    }
//     return(
//         <>
//           {result}
//         </>
//     );
// }

// export default function IfExam02({name, isPacked}) {
//    let result ;
   
//    if(isPacked){
//       result = <li>{name}  체크 O</li>
//    }else{
//       result = <li>{name}  체크 X</li>
//    }
//     return(
//         <>
//           {result}
//         </>
//     );
// }

// export default function IfExam02({name, isPacked}) {
//    let result ;
   
//    if(isPacked){
//       result = <li>{name}  체크 O</li>
//    }else{
//       // return null 이면 아무것도 반환하지 않는다.
//       result = null
//    }
//     return(
//         <>
//           {result}
//         </>
//     );
// }


// export default function IfExam02({name, isPacked}) {
//    let result ;
   
//    if(isPacked){
//       result = <li>{name}  체크 @</li>
//    }

//     return(
//         <>
//           {result}
//         </>
//     );
// }


// export default function IfExam02({name, isPacked}) {
//    if(isPacked){
//       return  <li>{name}  체크 @@</li>
//    }
    
// }

// && 연산(AND 연산)
// 왼쪽이 true 이면 오른쪽 반환
// 왼쪽에 숫자를 두지 말자 (왼쪽이 0 이면 전체 결과 0)
// export default function IfExam02({name, isPacked}) {
//    return <li> {name} {isPacked && "체크 0"} </li>    
// }

// || 연산 (OR 연산)
// 왼쪽이 false 이면 오른쪽이 반환된다.
// export default function IfExam02({name, isPacked}) {
//    return <li>{name} {isPacked || "체크 X"}</li>
// }

// 왼쪽 문자열이 빈 문자열이 아니면 왼쪽 반환
// 왼쪽 문자열이 빈 문자열이면 오른쪽 반환
export default function IfExam02({name, isPacked}) {
    // const chk = 'a';
    const chk = '';
    return <li>{name} {chk || "체크 X"}</li>
}