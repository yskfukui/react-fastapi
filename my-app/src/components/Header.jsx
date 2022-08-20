// Headerを生成するcomponents
import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from './UserContext'

export const Header = ({ title }) => {
  const [token, setToken] = useContext(UserContext)
  const [username, setUsername] = useState('')

  const handleLogout = () => {
    setToken(null)
  }

  const URL = 'http://127.0.0.1:8000/api/users/me'
  const getUser = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
    const response = await fetch(URL, requestOptions)
    const data = await response.json()
    setUsername(data.username)
  }
  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <nav
      class="navbar has-background-light has-text-white"
      role="navigation"
      aria-label="top navigation"
    >
        <div className='my-6 has-text-white'>
            <h1 className="title">Sample Page</h1>
        </div>
        <div class="ml-6"></div>
        <div className='navbar-start is-size-5'>
            <li class="navbar-item"><Link className="has-text-gray has-text-weight-semibold" to="/">ホーム</Link></li>
            <li class="navbar-item"><Link className="has-text-gray has-text-weight-semibold" to="/page1">ページ1</Link></li>
            <li class="navbar-item"><Link className="has-text-gray has-text-weight-semibold" to="/page2">ページ2</Link></li>
        </div>
        
        <div className="navbar-end my-5">
            <div className='navbar-item'>
                <div className="columns">
                    <div className="column mt-2">
                        {token && (<strong>{username}</strong>)}        
                    </div>
                    <div className="column">
                          {token && (<button className="button is-light is-gray" onClick={handleLogout}>Logout</button>)}
                    </div>
                </div>
            </div>
        </div>
    </nav>
    // <div className='App-header'>
    //     <h1>ここはヘッダー</h1>
    //     <h1 className="title">{title}</h1>
    //     {token && (
    //         <p>{username}</p>
    //     )}
    //     {token && (
    //         <button className="button" onClick={handleLogout}>Logout</button>
    //     )}
    //     <ul>
    //         <li><Link to="/">ホーム</Link></li>
    //         <li><Link to="/page1">ページ1</Link></li>
    //         <li><Link to="/page2">ページ2</Link></li>
    //     </ul>
    // </div>
  )
}
