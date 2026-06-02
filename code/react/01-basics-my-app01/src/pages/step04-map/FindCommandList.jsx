import Comment from "../step02-component/Comment";

export default function FindCommandList(params) {
    const comments = [
    {
        idx : "01" ,
        name : "홍길동",
        comment : "방가 방가",
        isAdmin : true
    },
    {
        idx : "02" ,
        name : "둘리",
        comment : "호이~ 호이~",
         isAdmin : true
    },
    {
        idx : "03" ,
        name : "도우너",
        comment : "칸따피야",
         isAdmin : false
    },
    {
        idx : "04" ,
        name : "희동이",
        comment : "응~애",
         isAdmin : true
    }
];
   // find : 조건에 맞는 첫번째 항목만 추출 : 배열이 아닌 값으로 나온다.
   const result = comments.find(k=>k.isAdmin)
   // console.log(result);
    return(
        <div>
            {
            // find : 조건에 맞는 첫번째 항목만 추출 : 배열이 아닌 값으로 나온다.
            // 삼항연산자 사용(if문)        
            // comments.find(k=>k.isAdmin)          // 조건
            // ? <Comment name={ comments.find(k=>k.isAdmin).name}  
            //            comment={ comments.find(k=>k.isAdmin).comment} />    // 참일때 실행          
            // : <p>조건을 만족하는 항목이 없네요 </p>  // 거짓일때 실행               

             result
             ? <Comment name={result.name} comment={result.comment} />  
             : <p>조건을 만족하는 항목이 없네요 </p>
            }

        </div>
    );
}