import React from 'react'
import axios from "axios";
import { Header } from './Header';
import { Footer } from './Footer';
import { ProfileList } from './utils/ProfileList';
import { useContext } from 'react';
import { UserContext } from './utils/UserContext';
import { Register } from './utils/Register';
import {Login} from './utils/Login'
import {Table} from './utils/Table'
export const Home = () => {
    const [data, setData] = React.useState();
    const [token,]=useContext(UserContext)
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
            <Header title="title"></Header>
            <div className='columns'>
                <div className='column m-6'>
                    {
                        !token ?(
                            <div className='columns'>
                                <Register/><Login/>
                            </div>
                        ):
                        <p><Table /></p>
                    }
                </div>
            </div>
            {!data && <button onClick={GetData}>データを取得</button>}
            {data && <ProfileList data={data}></ProfileList>}
            {/* {data && <div>{data[0].email}</div>} */}
            <Footer></Footer>
        </div>
    )
}