import React from 'react'
// import { SignUp } from '../components/SignUp'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import Heart from '../components/Heart'
//参考:https://reffect.co.jp/react/react-firebase-auth#i
export const Page2 = () => {
  return (
    <div>
        <Header title="title"></Header>
        <div className='App-center'>
            <Heart />
        </div>
        <Footer></Footer>
    </div>
    
  )
}
