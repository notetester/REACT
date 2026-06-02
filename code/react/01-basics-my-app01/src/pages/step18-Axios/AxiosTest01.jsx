// Axios는 브라우저와 Node.js를 위한 Promise 기반의 HTTP 비동기 통신 라이브러리입니다.
// 서버와 프론트엔드 간의 데이터를 주고받는 작업을 편리하게 만들어주며, 웹 개발에서 백엔드와 소통하는 데 널리 사용됩니다. 
// 비동기 통신(async, await), 자동 JSON 변환, 
// 인터셉터: 요청을 보내거나 응답을 받기 전에 공통된 로직을 처리할 수 있는 인터셉터를 제공
// 인증 토큰 추가: OAuth 토큰과 같은 인증 토큰을 쉽게 추가할 수 있습니다. 
// CSRF 토큰 설정: 보안을 위한 CSRF 토큰 설정이 가능합니다. 

import axios from "axios";
import { useEffect, useState } from "react";

// 설치 : 터미널에서 npm install axios 

// GET — 데이터 조회
// axios.get('/api/users')

// POST — 데이터 생성
// axios.post('/api/users', { name: "홍길동", age: 20 })

// PUT — 데이터 전체 수정
// axios.put('/api/users/1', { name: "홍길동", age: 21 })

// PATCH — 데이터 일부 수정
// axios.patch('/api/users/1', { age: 21 })

// DELETE — 데이터 삭제
// axios.delete('/api/users/1')

export default function AxiosTest01(params) {
    const [temp,setTemp] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () =>{
        try{
           const response = await axios.get('http://api.openweathermap.org/data/2.5/weather?q=Seoul,KR&appid=1db47184ebbc18af53fd996be840d270');
           // axios가 자동으로 처리해 줌 (fetch 직접 체크해야 됨)
           // 알아서 catch 로 넘어감
           //    if(!response.ok){
           //         throw new Error(`서버 오류 : ${response.status}`);
           //     }

           //  axios가 자동으로 JSON으로 변환
           //   const data = await  response.json()
            setTemp((response.data.main.temp - 273.15).toFixed(2) + "C");     

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
            <h2>Axios 예제</h2>
            <p>온도 : {temp}</p>
        </div>
    );
}