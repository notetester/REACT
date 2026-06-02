
import { Link } from 'react-router-dom';
import './RouterTest02.css';

export default function RouterTest02(params) {
    return(
        <nav className="nav">
            <ul>
                <li className='lineStyle'>
                    <Link to="/">홈</Link>
                </li>
                <li className='lineStyle'>
                    <Link to="/first">첫번째</Link>
                </li>
                <li className='lineStyle'>
                   <Link to="/second">두번째</Link>
                </li>
                <li className='lineStyle'>
                   <Link to="/fetch01">fetch01</Link>
                </li>
                <li className='lineStyle'>
                   <Link to="/fetch02">fetch02</Link>
                </li>
                 <li className='lineStyle'>
                   <Link to="/axios01">Axios01</Link>
                </li>
                <li className='lineStyle'>
                   <Link to="/axios02">Axios02</Link>
                </li>
                <li className='lineStyle'>
                   <Link to="/lab">단계별 결과</Link>
                </li>
            </ul>
        </nav>
    );
}
