import React from 'react'
import Example from '../components/walkman'
import { Paperplane } from '../components/paperplane'
import { Register } from '../components/Register'
import { Header } from '../components/Header'
// import {UserProvider } from '../components/UserContext'
export const Page1 = () => {
  return (
    <div>
      <Header title="title"></Header>
      <div className="App-header">
        <br />
        <Register></Register>
        <Example></Example>
        <Paperplane></Paperplane>
      </div>
    </div>
  )
}
