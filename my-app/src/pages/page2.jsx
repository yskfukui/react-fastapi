import React from 'react'
import { SignUp } from '../utils/SignUp'
import { Link } from 'react-router-dom'
//参考:https://reffect.co.jp/react/react-firebase-auth#i
export const Page2 = () => {
    return (
        <div>
            <h1>ここはpage2</h1>
            <ul>
                <li><Link to="/">ホーム</Link></li>
                <li><Link to="/page1">ページ1</Link></li>
                <li><Link to="/page2">ページ2</Link></li>
            </ul>
            <SignUp />
        </div>
    )
}