import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from './utils/UserContext';


export const Header = ({title}) => {
    const [token,setToken]=useContext(UserContext)

    const handleLogout=()=>{
        setToken(null);
    };

    return (
        <div className='App-header'>
            <h1>ここはヘッダー</h1>
            <h1 className="title">{title}</h1>
            {token && (
                <button className="button" onClick={handleLogout}>Logout</button>
            )}
            <ul>
                <li><Link to="/">ホーム</Link></li>
                <li><Link to="/page1">ページ1</Link></li>
                <li><Link to="/page2">ページ2</Link></li>
            </ul>
        </div>
    )
}