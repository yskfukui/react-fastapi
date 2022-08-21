import React from 'react'
import { useState } from 'react'
import 'bulma/css/bulma.min.css'
import { ErrorMessage } from './ErrorMessage'

export const SubmitImage = () => {
  const [image, setImage] = useState()
  const [errorMessage, setErrorMessage] = useState('')
  const URL = 'http://127.0.0.1:8000/images/'

  const getImage = (e) => {
    if (!e.target.files) return
    const img = e.target.files[0]
    setImage(img)
  }
  const Submit = async () => {
    const formdata = new FormData()
    formdata.append('upload_file', image)
    const requestOptions = {
      method: 'POST',
      body: formdata
    }
    const response = await fetch(URL, requestOptions)
    const data = await response.json()
    if (!response.ok) {
      setErrorMessage(data.detail)
    } else {
      setErrorMessage('Success!')
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    Submit()
  }

  return (
    <div>
      <form className="box" onSubmit={handleSubmit}>
        <label className="label" htmlFor="img">
          画像
        </label>
        <div>
          <input
            id="img"
            type="file"
            accept="image/*,.png,.jpg,.jpeg,.gif"
            onChange={getImage}
          />
        </div>
        <br />
        <button className="button is-primary" type="submit">
          Submit
        </button>
      </form>
      <ErrorMessage message={errorMessage}></ErrorMessage>
    </div>
  )
}
