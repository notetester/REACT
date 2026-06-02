
// React에서 Fetch API는 서버로부터 데이터를 주고받기 위한 브라우저 내장 도구입니다.

import { useEffect, useState } from "react"

// 별도의 설치 없이 fetch() 함수를 사용하여 비동기 네트워크 요청을 보낼 수 있습니다.
export default function FetchTest01(params) {
    const [temp, setTemp] = useState();

    // 서버에서 온도 가져오기 (맨 처음 한번 만)
    useEffect(()=>{
        fetch('http://api.openweathermap.org/data/2.5/weather?q=Seoul,KR&appid=1db47184ebbc18af53fd996be840d270')
        .then(response => response.json()) // 응답을 JSON으로 변환
        .then(data => {
            // 절대 여도를 가져와서 섭씨로 변환
            setTemp((data.main.temp - 273.15).toFixed(2) + "C");
        })
        .catch(error => console.error(error))
    },[])
    return(
        <div>
           <p>온도 : {temp}</p>
        </div>
    )
}