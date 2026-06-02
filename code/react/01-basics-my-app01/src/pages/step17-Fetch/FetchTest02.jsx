
// React에서 Fetch API는 서버로부터 데이터를 주고받기 위한 브라우저 내장 도구입니다.

import { useEffect, useState } from "react"

// 별도의 설치 없이 fetch() 함수를 사용하여 비동기 네트워크 요청을 보낼 수 있습니다.
export default function FetchTest02(params) {
    const [temp, setTemp] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    // 비동기 통신에서 더 많이 사용하는 (async, await) 사용하자(현재 표준)
    const getData = async()=>{
        try{
            const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Seoul,KR&appid=1db47184ebbc18af53fd996be840d270');
            if(!response.ok){
                throw new Error(`서버 오류 : ${response.status}`);
            }
            const data = await  response.json()
            setTemp((data.main.temp - 273.15).toFixed(2) + "C");
        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    };
    
    // 서버에서 온도 가져오기 (맨 처음 한번 만)
    useEffect(()=>{
        getData();
    },[]);

    // 로딩 중
    if(loading) return <p>불러오는 중....</p>

    // 에러 처리
    if(error) return <p>오류 : {error}</p>
    return(
        <div>
           <p>온도 : {temp}</p>
        </div>
    )
}