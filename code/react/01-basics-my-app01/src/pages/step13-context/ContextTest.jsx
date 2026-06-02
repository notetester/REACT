import { useState } from "react";
import Page from "./Page";
import { ThemeContext } from "./ThemeContext";
import { UserContext } from "./UserConetext";


export default function ContextTest() {
    const [isDark, setIsDark] = useState(false);
    const [user, setUser] = useState(null);
    return(
        <div>
            {/* contextAPI를 이용하면 props를 이용해서 데이터 전달을 하지 않는다. */}
            {/* <Page isDark={isDark} setIsDark={setIsDark} /> */}

            {/* Provider : 값을 공급하는 역할을 한다. */}
            <ThemeContext.Provider value={{isDark, setIsDark}}>
                <UserContext.Provider value={{user, setUser}}>
                    <Page />
                </UserContext.Provider>
            </ThemeContext.Provider>
        </div>
    );
}