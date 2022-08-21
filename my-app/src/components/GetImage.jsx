import React from 'react'
import { useState } from 'react'
import 'bulma/css/bulma.min.css'
import { ErrorMessage } from './ErrorMessage'

export const GetImage = () => {
//   const [image, setImage] = useState()
  const [imageName, setImageName] = useState("")
  const [errorMessage, setErrorMessage] = useState('')
  const [url,setUrl] =useState()
  const URL = 'http://127.0.0.1:8000/images/'
  console.log(imageName)


  const Get = async () => {
    const requestOptions = {
      method: 'GET',
    }
    console.log(typeof(imageName))
    const response = await fetch(URL+`${imageName}`, requestOptions)
    if (!response.ok) {
      setErrorMessage("Something wrong")
    } else {
        setErrorMessage()
        setUrl(response.url)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    Get()
  }

  return (
    <div>
      <form className="box" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Image Name</label>
          <div className="control">
            <input
              type="text"
              placeholder="Enter Image Name"
              onChange={(e) => setImageName(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <br />
        <button className="button is-primary" type="submit">
          GetImage
        </button>
      </form>
      {imageName && (
        <img crossOrigin="anonymous" src={url} alt=""></img>
      )}
      <ErrorMessage message={errorMessage}></ErrorMessage>
    </div>
  )
}
