import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import './ContextTest.css';

export default function Footer() {
    const {isDark, setIsDark} = useContext(ThemeContext);

    const handleToggleTheme=()=>{
        setIsDark(!isDark)
    }
    return(
         // css에서 class호출할때 사용하는 속성 : className
        <footer className="footer" 
                style={{
                    backgroundColor: isDark ? 'black' : 'lightgray',
                    color: isDark ? 'white' : 'black'
                }} >
            <p>신촌센터 | 서울특별시 마포구 백범로 23, 3층 (신수동, 케이터틀)</p>
            <p>강남센터 | 서울특별시 서초구 서초대로77길 41, 4층 (서초동, 대동Ⅱ)</p>                    
            <button className="button" onClick={handleToggleTheme}>Mode</button>
        </footer>
    );
}