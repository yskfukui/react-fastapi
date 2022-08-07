import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { Header } from './Header';
import { Footer } from './Footer';
import { ProfileList } from './utils/ProfileList';
export const Home = () => {
    const [data, setData] = React.useState();
    const url = "http://127.0.0.1:8000/users/";

    const GetData = () => {
        axios.get(url).then((res) => {
            setData(res.data);
        })
            .catch((error) => {
                console.log(error);
            })

    };

    return (
        <div>
            <Header></Header>
            <h1>ホーム</h1>
            <ul>
                <li><Link to="/">ホーム</Link></li>
                <li><Link to="/page1">ページ1</Link></li>
                <li><Link to="/page2">ページ2</Link></li>
            </ul>
            <div>ここ</div>
            {!data && <button onClick={GetData}>データを取得</button>}
            {data && <ProfileList data={data}></ProfileList>}
            {/* {data && <div>{data[0].email}</div>} */}
            <Footer></Footer>
        </div>
    )
}