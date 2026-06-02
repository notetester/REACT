import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import './ContextTest.css';

export default function Header() {
    const {isDark} = useContext(ThemeContext);
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