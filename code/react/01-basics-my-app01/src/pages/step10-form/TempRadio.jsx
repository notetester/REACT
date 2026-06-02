export default function TempRadio({unit, onUnitChange}) {
    return(
        <div>
            <label>
                <input 
                 type="radio" 
                 value="섭씨"
                 checked={unit === '섭씨'}
                 onChange={(e)=>onUnitChange(e.target.value)}
                 /> 섭씨
            </label>
             <label>
                <input 
                 type="radio" 
                 value="화씨"
                 checked={unit === '화씨'}
                 onChange={(e)=>onUnitChange(e.target.value)}
                /> 화씨
            </label>
        </div>
    );
}