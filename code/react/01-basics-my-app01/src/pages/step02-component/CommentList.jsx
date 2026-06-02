import Comment from "./Comment";

// 원래는 spring에서 정보를 가져와야 된다.
 const comments = [
    {
        name : "홍길동",
        comment : "방가 방가"
    },
    {
        name : "둘리",
        comment : "호이~ 호이~"
    },
    {
        name : "도우너",
        comment : "칸따피야"
    },
    {
        name : "희동이",
        comment : "응~애"
    },

];


export default function CommentList(params) {
    // 자바스크립트 영역

    return(
        // html 영역
        // 리턴 () 안에 {}를 사용하는 조건
        // 자바스크립트 코드를 작성할때 사용
        // {} 안에서 if문과, for문 사용 불가
        // for문 => map 사용
        <div>
            {/* 
            <Comment name="홍길동" comment="방가방가" />
            <Comment name="둘리" comment="호이호이" />
            <Comment name="도우너" comment="칸따피야" /> 
            */}
            {
                // 반복문 사용할때 map 사용
                // map를 사용할때는 각 항목을 구분하는 key가 필요하다
                // 만약에 k에 유일한 값이 없으면 자체 index 사용
               comments.map((k,idx)=>{
                return(
                    <Comment key={idx} name={k.name} comment={k.comment} />
                )
               }) 
            }
        </div>
    );
}