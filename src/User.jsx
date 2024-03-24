import React, { useEffect, useState } from 'react'
import OtherData from './OtherData'
import SidePanel from './SidePanel'

const User = ({userData,DeleteUser,updateUser,LastTodoIndex,SetLastTodoIndex,LasPostIndex,SetLasPostIndex,LockSidePanel,SetLockSidePanel,SidePanelLockUserId,SetSidePanelLockUserId}) => {

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
      const res = user.Todos?.find((todo) => !todo.completed)
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

  const AddNewTodo = (title)=>{ 
    const new_Todo = {userId:user.id,id:{LastTodoIndex},title : title,completed:false}
    user.Todos = [...user.Todos,new_Todo]
    SetLastTodoIndex(LastTodoIndex + 1)
    SetUser(user)
    handleUpdate()
  }

  const AddNewPost = (title,body)=>{ 
    const new_Post = {userId:user.id,id:{LasPostIndex},title : title,body:body}
    user.Posts = [...user.Posts,new_Post]
    SetLasPostIndex(LasPostIndex + 1)
    SetUser(user)
    handleUpdate()
  }

  const handleIdClick = ()=>{
    if(!LockSidePanel)
    {
      {SetSidePanelLockUserId(user.id)}
      SetShowSidepanel(!ShowSidepanel)
      {SetLockSidePanel(!LockSidePanel)}
    }
    else if(SidePanelLockUserId == user.id){
      SetShowSidepanel(!ShowSidepanel)
      {SetLockSidePanel(!LockSidePanel)}
    }
  }

  return (
    <div style={{
      border:AllTodosCompleted?"2px solid green":"2px solid red",
      textAlign:"left",
      margin:"10px",
      padding:"10px",
      backgroundColor:ShowSidepanel?"lightsalmon":"",
      }}>
      <span onClick={()=>{handleIdClick()}} >ID : {user?.id} </span> <br />
      Name : <input type="text" value={user?.name} onChange={(e)=>SetUser({...user,name : e.target.value })}></input> <br />
      Email : <input type="text" value={user?.email} onChange={(e)=>SetUser({...user,email : e.target.value })}></input> <br /><br />
      <button style={{backgroundColor:"gray"}} onMouseOver={()=>{SetonHoverContent(true)}}>Other Data</button> &nbsp;&nbsp;&nbsp;<br />   
      {onHoverContent === true && <OtherData userData={user} CloseOtherData={SetonHoverContent} SetStreet={SetStreet} SetCity={SetCity} SetZipCode={SetZipCode}/>} <br />
      <div style={{textAlign:"right"}}>
      <button className='Button' onClick={handleUpdate} >Update </button> &nbsp;
      <button  className='Button' onClick={handleDelete} >Delete </button><br />
      </div>
       {ShowSidepanel  && <SidePanel userData={user} MarkTodoAsCompleted = {MarkTodoAsCompleted} AddNewTodo = {AddNewTodo} AddNewPost = {AddNewPost} />}
    </div>
  )
}

export default User
