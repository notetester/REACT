export default function Clock(params) {
    return(
        <div>
            <p>시간표시 : {new Date().toLocaleTimeString()}</p>
        </div>
    );
    
}