import React, { useEffect, useState } from 'react'
import OtherData from './OtherData'
import SidePanel from './SidePanel'

const User = ({userData,DeleteUser,updateUser}) => {

  const [AllTodosCompleted,SetAllTodosCompleted] = useState(false)
  const [onHoverContent,SetonHoverContent] = useState(false)
  const [user,SetUser] = useState()
  const [ShowSidepanel,SetShowSidepanel] = useState(false)
  
  useEffect(()=>{
      SetUser(userData)
  },[userData])

  useEffect(()=>{
    if(user)
    {
      const res = user.Todos.find((todo) => !todo.completed)
      SetAllTodosCompleted(!res)  
    } 
  })

  const MarkTodoAsCompleted = (Completedid) =>{
    const TodoIndex = user.Todos.findIndex((x)=>x.id == Completedid)
    user.Todos[TodoIndex].completed=  true
    SetUser(user)
    handleUpdate()
  } 

  const handleUpdate = () => {
    updateUser(user)
  }

  const handleDelete = () =>{
    DeleteUser(user)
  }

  const SetStreet = (_street) =>{
    SetUser({...user,address: {...user.address, street: _street }}) 
  }

  const SetCity = (_city) =>{
    SetUser({...user,address: {...user.address, city: _city }}) 
  }

  const SetZipCode = (_zipcode) =>{
    SetUser({...user,address: {...user.address, zipcode: _zipcode }}) 
  }

  return (
    <div style={{
      border:AllTodosCompleted?"2px solid green":"2px solid red",
      textAlign:"left",
      margin:"10px",
      padding:"10px",
      backgroundColor:ShowSidepanel?"lightsalmon":""
      }}>
      <span onClick={()=>SetShowSidepanel(!ShowSidepanel)} >ID : {user?.id} </span> <br />
      Name : <input type="text" value={user?.name} onChange={(e)=>SetUser({...user,name : e.target.value })}></input> <br />
      Email : <input type="text" value={user?.email} onChange={(e)=>SetUser({...user,email : e.target.value })}></input> <br /><br />
      <button style={{backgroundColor:"gray"}} onMouseOver={()=>{SetonHoverContent(true)}}>Other Data</button> &nbsp;&nbsp;&nbsp;<br />   
      {onHoverContent === true && <OtherData userData={user} CloseOtherData={SetonHoverContent} SetStreet={SetStreet} SetCity={SetCity} SetZipCode={SetZipCode}/>} <br />
      <button style={{backgroundColor:"rgb(255, 255, 128)",border:"solid black 1px",borderRadius:"1px",marginLeft:"110px"}} onClick={handleUpdate} >Update </button> &nbsp;
      <button style={{backgroundColor:"rgb(255, 255, 128)",border:"solid black 1px",borderRadius:"1px"}} onClick={handleDelete} >Delete </button><br />
       {ShowSidepanel === true && <SidePanel userData={user} MarkTodoAsCompleted = {MarkTodoAsCompleted}/>}
    </div>
  )
}

export default User
