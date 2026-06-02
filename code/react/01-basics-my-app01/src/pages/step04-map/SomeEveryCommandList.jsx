export default function SomeEveryCommandList(params) {
    const comments = [
        {idx : "01" , name : "홍길동", comment : "방가 방가", isAdmin : true },
        {idx : "02" , name : "둘리",  comment : "호이~ 호이~",  isAdmin : true  },
        {idx : "03" , name : "도우너", comment : "칸따피야", isAdmin : false },
        {idx : "04" , name : "희동이", comment : "응~애", isAdmin : true  }
    ];
    // some  : OR 과 같음 , 하나라도 true 이면 결과는 true
    // every : AND 와 같음, 모두 true 이면 결과는 true 
    const result1 = comments.some(k => k.isAdmin);
    const result2 = comments.every(k => k.isAdmin);
    return(
        <div>
            <p>관리자 댓글이 있나요?{result1?"있음":"없음"} </p>        
            <p>모두 관리자 댓글이 인가요?{result2?"관리자 댓글만 있음":"사용자 댓글도 있음"}</p>        
        </div>
    );
}