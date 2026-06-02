import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import './ContextTest.css';

export default function Main() {
    const {isDark} = useContext(ThemeContext);
    return(
          // css에서 class호출할때 사용하는 속성 : className
        <main className="content" 
                style={{
                    backgroundColor: isDark ? 'black' : 'lightgray',
                    color: isDark ? 'white' : 'black'
                }} >
            <h2>Context를 사용한 예제</h2>
            <h3>모두 부자 되세요</h3>
            
        </main>
    );
}