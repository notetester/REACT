import { useEffect, useState } from "react";

export default function EffectTest05(params) {
    const [data, setData] = useState([]);
    console.log("useEffect 전");
    
    useEffect(()=>{
      // API 호출
      fetch("https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
      .then((response)=>{
         if(!response){
            throw new Error("네트워크 오류");
         }
        // 리턴값은 아래 then의 인자로 넘어간다.
         return response.json();
      })
      .then((data)=>{
            //   console.log(data); (54개)
            return setData(data.slice(0,5)) // 0-4
      })
      .catch(error => console.log('Error:' , error))  
    },[]);


    console.log("useEffect 후");
    return(
        <div>
           {data.map((k)=>{
              return(
                <li key={k.id}>
                    <h4>Name : {k.name}</h4>
                    <h4>Price : {k.price}</h4>
                    <img src={k.image_link} width="100px" alt="" />
                </li>
              )
           })}
        </div>
    );
}