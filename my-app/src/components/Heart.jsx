//ハートのcomponent

import Lottie from 'lottie-react'
import Animation from '../animation/439-love-explosion.json'

// 上記jsonはhttps://lottiefiles.com/featuredからダウンロード
const style = {
  height: 1000,
  width: 1000
}
const Heart = () => {
  return <Lottie animationData={Animation} style={style}></Lottie>
}

export default Heart
