import { useState } from "react";

export default function CounterEx05(params) {
    const [liked, setLiked] = useState(true)
    
    //function handleChange(e) {
        // 현재 체크박스이 체크상태를 가져옴
        // setLiked(e.target.checked)
    // }

    const handleChange = (e)=>{
        setLiked(e.target.checked)
    }

    return(
        <>
          <label>
            <input type="checkbox"
              checked={liked}
              onChange={handleChange} />

              I liked this
          </label>
          <hr />
          <h3>You {liked ? 'liked' : 'did not like'}</h3>
        </>
    );
}