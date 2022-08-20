//tableのcomponent

import React from 'react'
// import moment from "moment"

import { ErrorMessage } from './ErrorMessage'
import { UserContext } from './UserContext'
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import moment from 'moment'
import { ItemModal } from './ItemModal'

export const Table = () => {
  const [token] = useContext(UserContext)
  const [items, setItem] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [activeModal, setActiveModal] = useState(false)
  const URL = 'http://127.0.0.1:8000/items/'

  const [id, setId] = useState(null)
  const handleUpdate = async (id) => {
    setId(id)
    setActiveModal(true)
  }

  const handleDelete = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
    const response = await fetch(URL + `${id}`, requestOptions)
    if (!response.ok) {
      setErrorMessage('Failed to delete')
    } else {
      setErrorMessage('')
    }
    getItems()
  }
  const getItems = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
    const response = await fetch(URL, requestOptions)

    if (!response.ok) {
      setErrorMessage("Error: Couldn't load the items")
    } else {
      const data = await response.json()
      setItem(data)
      setLoaded(true)
    }
  }

  useEffect(() => {
    getItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleModal = () => {
    setActiveModal(!activeModal)
    getItems()
    setId(null)
  }

  return (
    <div>
      <ItemModal
        active={activeModal}
        handleModal={handleModal}
        token={token}
        id={id}
        setErrorMessage={setErrorMessage}
      />

      <button
        className="button is fullwidth mb-5 is-primary"
        onClick={() => setActiveModal(true)}
      >
        Create Item
      </button>
      <ErrorMessage message={errorMessage} />
      {loaded && items ? (
        <table className="table is-hoverable has-text-left">
          <thead>
            <tr>
              <th>title</th>
              <th>description</th>
              <th>Last Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{moment(item.data_last_updated).format('MMM Do YYYY')}</td>
                <td>
                  <button
                    className="button mr-2 is-info is-light"
                    onClick={() => {
                      handleUpdate(item.id)
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="button mr-2 is-danger is-light"
                    onClick={() => {
                      handleDelete(item.id)
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>loading</p>
      )}
    </div>
  )
}
