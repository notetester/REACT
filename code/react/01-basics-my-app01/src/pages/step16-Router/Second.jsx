import { Link } from "react-router-dom";

export default function Second(props) {
    return(
        <div>
            <h3>영화리스트</h3>            
            {
                props.data.map((k,i)=>{
                    return(
                       <div key={i}>
                            <h4>제목 : {k.title}</h4>
                            {/* 이미지는 public 폴더 안에 imgs 폴더 생성 */}
                            <Link to={`/third/${i}/${k.title}`}>
                               <img src={`/imgs/${k.img}`} alt={k.title} />
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    );
}