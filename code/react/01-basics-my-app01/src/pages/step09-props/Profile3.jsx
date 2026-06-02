export default function Profile3({name, status, onChangeStatus}) {
    return(
        <div>
            <h2>자식 컴포넌트</h2>
            <p>name : {name}</p>
            <p>status : {status}</p>
            <button onClick={()=>{onChangeStatus('Away')}}>Set Away</button>
            <button onClick={()=>{onChangeStatus('Avaliable')}}>Set Avaliable</button>
        </div>
    );
}