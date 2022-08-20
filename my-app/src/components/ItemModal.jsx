// テーブルの更新や追加に関するcomponent

import React, { useEffect, useState } from 'react'

export const ItemModal = ({
  active,
  handleModal,
  token,
  id,
  setErrorMessage
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const URL = 'http://127.0.0.1:8000/items/'

  useEffect(() => {
    const getItem = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      }
      const response = await fetch(URL + `${id}`, requestOptions)
      if (!response.ok) {
        setErrorMessage('Could not get the item')
      } else {
        const data = await response.json()
        setTitle(data.title)
        setDescription(data.description)
      }
    }
    if (id) {
      getItem()
    }
  }, [id, token, setErrorMessage])

  const cleanFormData = () => {
    setTitle('')
    setDescription('')
  }
  const handleCreateItem = async (e) => {
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ title: title, description: description })
    }
    const response = await fetch(URL, requestOptions)
    if (!response.ok) {
      setErrorMessage('失敗しました')
    } else {
      setErrorMessage('')
      cleanFormData()
      handleModal()
    }
  }
  const handleUpdateItem = async (e) => {
    e.preventDefault()
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        title: title,
        description: description
      })
    }
    const response = await fetch(URL + `${id}`, requestOptions)

    if (!response.ok) {
      setErrorMessage('失敗しました')
    } else {
      setErrorMessage('')
      cleanFormData()
      handleModal()
    }
  }

  return (
    <div className={`modal ${active && 'is-active'}`}>
      <div className="modal-background" onClick={handleModal}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-primary-light">
          <h1 className="modal-card-title">
            {id ? 'Update Item' : 'Create Item'}
          </h1>
        </header>
        <section className="modal-card-body">
          <form>
            <div className="field">
              <label className="label">title</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">description</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot has-background-primary-light">
          {id ? (
            <button className="button is-info" onClick={handleUpdateItem}>
              Update
            </button>
          ) : (
            <button className="button is-primary" onClick={handleCreateItem}>
              Create
            </button>
          )}
          <button className="button" onClick={handleModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  )
}
