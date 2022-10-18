import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () =>{
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState({})
  const [alert, setAlert] = useState({ show: false, masg: '', type: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      //dispaly alert
      // setAlert({ show: false, masg: '', type: '' })

      showAlert (true, 'danger', 'please enter a value')


    }
    else if (name && isEditing) {
      //deal with edit
      setList(
        list.map((item)=>{
          if (item.id === editID){
            return {...item, title:name}
          }
          return item
        })
      )
      setName('');
      setEditID(null)
      setIsEditing(false);
      showAlert(true)

    }
    else {
      // show alert
      showAlert(true, 'success', 'item addedtl the list')
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem]);
      setName('')

    }
  }

  const showAlert = (show = false, type = "", msg = "") => {
               setAlert({show, type, msg})
  }

  const clearList = () =>{
    showAlert(true, "danger", 'empty list')
    setList([]);
  }

  const removeItem=(id)=>{
    showAlert(true, "danger", "item removes")
    // if the item id does not match with the id it will be added to the list 
    setList(list.filter((item)=> item.id !== id));
  }

  const editItem = (id) => {
    const specificItem = list.find((item)=> item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem)
  }

  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list))
  })
  return <section className='section-center'>
    <form className='grocery-form' onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}></Alert>}
      <h3>grocery bud</h3>
      <div className="form-control">
        <input type="text" className='grocery' value={name} onChange={(e) => setName(e.target.value)} placeholder='e.g eggs' />
        <button type='submit' className='submit-btn'>
          {isEditing ? 'edit' : 'submit'}
        </button>
      </div>
    </form>

    {
      list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem ={editItem }></List>
          <button onClick={clearList} className='clear-btn'>
            clear items
          </button>
        </div>
      )

    }



  </section>
}

export default App
