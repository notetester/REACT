import './Board.css'

// function Square({value}) {
//     return <button className='square'>{value}</button>
// }

function Square({value}) {
    function handleClick() {
        alert(value + " click");
    }
    return(
        <button onClick={handleClick} className='square'>{value}</button>
    );
}

export default function Board2(params) {
    return(
        <>
          {/* html : class => jsx : className */}
           <div className='board-row'>
             <Square value='1' />
             <Square value='2' />
             <Square value='3' />
           </div>
            <div className='board-row'>
              <Square value='4' />
              <Square value='5' />
              <Square value='6' />
           </div>
            <div className='board-row'>
             <Square value='7' />
             <Square value='8' />
             <Square value='9' />
           </div>
        </>
    );
}