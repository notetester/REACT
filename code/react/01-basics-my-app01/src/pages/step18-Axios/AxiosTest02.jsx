import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AxiosTest02(params) {
    const [list,setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () =>{
        try{
           const response = await axios.get('https://api.tvmaze.com/search/shows?q=avengers');
           
           // 10개만 추출해서 list에 담자 
           setList(response.data.slice(0,10));
        }catch(err){
            setError(err.message);
        }finally{
           setLoading(false);
        }
    }

    // 의존성 배열이 비어있으면 맨 처음 한번 만 
    useEffect(()=>{
      getData();
    },[]);

    // 로딩 중
    if(loading) return <p>불러오는 중 ... </p>
    // 에러 처리
    if(error) return <p>오류 : {error}</p>
    return(
        <div>
            <h2>영화 리스트(Top 10)</h2>
            {
                list.map((k)=>(
                    <div key={k.show.id} style={{marginBottomL: "20px"}}>
                       <Link to={`/axios02/${k.show.id}`}>
                          {k.show.image && (
                            <img src={k.show.image.medium}  alt={k.show.name} style={{width: "100px"}} />
                          )}
                       </Link>
                       {/*  "genres": ["Comedy","Action", "Crime"], => "Comedy","Action", "Crime" */}
                       <p>장르 : {k.show.genres.join(",") }</p>
                    </div>
                ))
            }
        </div>
    );
}