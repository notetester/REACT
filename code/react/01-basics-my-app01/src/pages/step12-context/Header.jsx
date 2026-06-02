export default function Header({isDark}) {
    return(
        // css에서 class호출할때 사용하는 속성 : className
        <header className="header" 
                style={{
                    backgroundColor: isDark ? 'black' : 'lightgray',
                    color: isDark ? 'white' : 'black'
                }} >
            <h2>한국 ICT 인재 개발원</h2>                    
        </header>
    );
}