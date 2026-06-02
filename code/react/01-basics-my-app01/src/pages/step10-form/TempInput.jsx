export default function TempInput({value,unit,onChange}) {
    return(
        <div>
            <input 
              type="number"
              value={value}
              onChange={(e)=>onChange(e.target.value)}
              placeholder={`In ${unit}`}
            />
        </div>
    );
}