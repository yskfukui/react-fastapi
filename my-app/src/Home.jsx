import React from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
// import { ProfileList } from './components/ProfileList';
import { useContext } from 'react'
import { UserContext } from './components/UserContext'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { Table } from './components/Table'
export const Home = () => {
  const [token] = useContext(UserContext)

  return (
    <div>
      <Header title="title"></Header>
      <div className="columns">
        <div className="column m-6">
          {!token ? (
            <div className="columns is-variable is-centered is-8">
              <Register />
              <Login />
            </div>
          ) : (
            <div className="columns is-centered is-size-5">
              <Table />
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}
