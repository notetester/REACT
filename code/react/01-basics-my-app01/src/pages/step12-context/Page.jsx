import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

export default function Page({isDark,setIsDark}) {
    return(
        <div className="page">
            <Header isDark={isDark} />
            <Main isDark={isDark} />
            <Footer isDark={isDark} setIsDark={setIsDark} />
        </div>
    );
}