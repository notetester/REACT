import Item from "./Item";

export default function ItemList(params) {
    return(
        <div>
            <h3>강의 목록</h3>
            <Item title="HTML" content="웹 페이지를 만드는 지식을 배운다." />
            <Item title="CSS" content="웹 페이지를 꾸미는 지식을 배운다." />
            <Item title="REACT" content="REACT 언어를 배운다." />
        </div>
    );
}