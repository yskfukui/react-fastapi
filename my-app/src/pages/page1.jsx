import React from 'react'
import { Link } from 'react-router-dom'
export const Page1 = () => {
    return (
        <div className="App-header">
            <h1>ここはpage1</h1>
            <ul>
                <li><Link to="/">ホーム</Link></li>
                <li><Link to="/page1">ページ1</Link></li>
                <li><Link to="/page2">ページ2</Link></li>
            </ul>
        </div>
    )
}