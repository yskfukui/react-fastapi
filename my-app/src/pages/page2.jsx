import React from 'react'
// import { SignUp } from '../components/SignUp'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import Heart from '../components/Heart'
import { WeatherApi } from '../components/WeatherApi'
import { SubmitImage } from '../components/SubmitImage'
import { GetImage } from '../components/GetImage'

//参考:https://reffect.co.jp/react/react-firebase-auth#i
export const Page2 = () => {
  return (
    <div>
      <Header title="title"></Header>
      <SubmitImage></SubmitImage>
      <GetImage></GetImage>
      <div className="App-center">
        <WeatherApi />
        <Heart />
      </div>
      <Footer></Footer>
    </div>
  )
}
