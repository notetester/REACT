import Book from "./Book";

export default function Library(params) {
    
    return(
        <>
          {/* 컴포넌트가 다른 컴포넌틀 호출 할 수 있다. */}
          {/* Book  컴포넌트 호출 */}
           <h1>안녕하세요</h1>
           {/* 무조건 닫는 태그가 있어야 한다. */}
           {/* 속성을 이용해서 정보를 전달 */}
           <Book name="홍길동 전" numOfPage="105" />
           <hr />
           <Book name="구운몽 전" numOfPage="1024" />
           <hr />
           <Book name="춘향전" numOfPage="75"/>
        </>
    );
}