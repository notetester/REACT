import { useState } from "react";
import Page from "./Page";

export default function NoContext() {
    const [isDark, setIsDark] = useState(false);
    return(
        <div>
            <Page isDark={isDark} setIsDark={setIsDark} />
        </div>
    );
}