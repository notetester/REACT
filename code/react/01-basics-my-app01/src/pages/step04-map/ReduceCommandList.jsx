export default function ReduceCommandList(params) {
    const comments = [
        {idx : "01" , name : "홍길동", comment : "방가 방가", isAdmin : true },
        {idx : "02" , name : "둘리",  comment : "호이~ 호이~",  isAdmin : true  },
        {idx : "03" , name : "도우너", comment : "칸따피야", isAdmin : false },
        {idx : "04" , name : "희동이", comment : "응~애", isAdmin : true  }
    ];
   // reduce()는 배열의 각 요소를 순회하며, 누적값을 계산하는 메서드
   // acc : 누적값 저장변수, k : 순회할때 현재 객체를 말한다
   const admin = comments.reduce((acc, k)=>{
    acc.total = acc.total + 1 ;
    if(k.isAdmin){
        acc.adminCount = acc.adminCount + 1 ;
    }
    return acc ;
    // {total:0, adminCount:0 } 는 안에서 사용할 변수의 초기값들
   },{total:0, adminCount:0});
    return(
        <>
          <h2>관리자 댓글 통계</h2>
          <p>전체 댓글 수 : {admin.total}</p>
          <p>관리자 댓글 수 : {admin.adminCount}</p>
          <hr />
          <p>전체 댓글 수 : {comments.map(k=>k.idx).length}</p>
          <p>관리자 댓글 수 : {comments.filter(k=>k.isAdmin).length}</p>
        </>
    );
}