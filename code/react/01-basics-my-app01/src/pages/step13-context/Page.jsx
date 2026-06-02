import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import './ContextTest.css';

export default function Page() {
    return(
        <div className="page">
            <Header  />
            <Main />
            <Footer  />
        </div>
    );
}