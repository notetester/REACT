import Comment from "../step02-component/Comment";

export default function FilterCommandList(params) {
    const comments = [
    {
        idx : "01" ,
        name : "홍길동",
        comment : "방가 방가",
        isAdmin : false
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
    },

];
    return(
        <div>
            {
                // filter : 조건에 맞는 항목만 추출
                // 보통 filter 후에 map  넘기다.
                comments
                // .filter((k)=>{k.isAdmin})
                .filter(k=>k.isAdmin)
                // .map((k)=><Comment key={k.idx} name={k.name} comment={k.comment} />)
                .map((k)=>{
                   return(<Comment key={k.idx} name={k.name} comment={k.comment} />)
                })
            }
        </div>
    );
}