import { useParams } from "react-router-dom";

export default function Third(props) {
    // 파라미터 받기 
    // useParams()는 URL에 있는 :파라미터 값을 꺼내주는 hook
    // useParams()는 항상 문자열이다.
    const {idx, name} = useParams();
    return(
        <div>
            <h3>영화 리스트 상세보기</h3>            
            <div> {idx} : {name}</div> 
            <img src={`/imgs/${props.data[idx].img}`} alt={name} />
        </div>
    );
}