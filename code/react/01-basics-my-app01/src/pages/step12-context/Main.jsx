export default function Main({isDark}) {
    return(
          // css에서 class호출할때 사용하는 속성 : className
        <main className="content" 
                style={{
                    backgroundColor: isDark ? 'black' : 'lightgray',
                    color: isDark ? 'white' : 'black'
                }} >
            <h2>Porps를 사용한 예제 (No Context)</h2>
            <h3>모두 부자 되세요</h3>
            
        </main>
    );
}