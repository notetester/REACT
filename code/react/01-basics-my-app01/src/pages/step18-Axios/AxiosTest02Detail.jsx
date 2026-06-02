import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AxiosTest02Detail(params) {
    const {id} = useParams(); // URL 의 파라미터 id를 가져온다.
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = useCallback(async () =>{
        try{
           const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
           setMovie(response.data)
        }catch(err){
            setError(err.message);
        }finally{
           setLoading(false);
        }
    }, [id])

    // id가 바뀌면 해당 상세 정보를 다시 불러온다.
    useEffect(()=>{
      getData();
    },[getData]);

    // 로딩 중
    if(loading) return <p>불러오는 중 ... </p>
    // 에러 처리
    if(error) return <p>오류 : {error}</p>
    return(
        <div>
           {movie.image && (
            <img src={movie.image.original}  alt={movie.name} style={{width: "300px"}} />
            )}  
            <p>장르 : {movie.genres.join(",") }</p>
            <p>언어 : {movie.language }</p>
            {/* ?. 연산자 => rating이 null 이나 undefined 이면 에러 없이 undefined 반환 */}
            <p>평점 : {movie.rating?.average}</p>
        </div>
    );
}
