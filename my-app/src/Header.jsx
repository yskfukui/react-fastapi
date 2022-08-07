import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'
export const Header = () => {
    return (
        <div className='App-header'>
            <h1>ここはヘッダー</h1>
            <ul>
                <li><Link to="/">ホーム</Link></li>
                <li><Link to="/page1">ページ1</Link></li>
                <li><Link to="/page2">ページ2</Link></li>
            </ul>
        </div>
    )
}