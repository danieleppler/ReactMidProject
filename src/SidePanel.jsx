import React, { useEffect, useState } from 'react'
import './General.css'

const SidePanel = ({userData,MarkTodoAsCompleted,AddNewTodo,AddNewPost}) => {

const [AddTodoClicked,SetAddTodoClicked] = useState(false)
const [AddPostClicked,SetAddPostClicked] = useState(false)

const [NewPostBody,SetNewPostBody] = useState('')
const [NewTodoTitle,SetTodoNewTitle] = useState('')
const [NewPostTitle,SetNewPostTitle] = useState('')


const handleAddNewTodo = ()=>{
  {AddNewTodo(NewTodoTitle)}
  SetAddTodoClicked(false)
}

const handleAddNewPost = ()=>{
  {AddNewPost(NewPostTitle,NewPostBody)}
  SetAddPostClicked(false)
}

  return (
    <div style={{width:"70%",position:"absolute",right:"0px",top:"0px",width:"30%",marginRight:"350px",marginTop:"50px",marginLeft:"50px"}}>
    <b>Todos - User </b>{userData.userId} 
    {!AddTodoClicked && <div>
      <button onClick={(e)=>{SetAddTodoClicked(!AddTodoClicked)}}>Add</button><br />  
    <div style={{border:"2px solid black"}}>
        <ul>
        {
            userData.Todos.map((todo,index) =>{
            return <div key={index} style={{border:"2px solid purple",margin:"20px",padding:"10px"}}>
                <b>Title : </b>{todo.title} <br />
                <b>Completed : </b>{todo.completed?"True":"False"}
                {todo.completed?<></>:<button style={{fontSize:"12px",marginLeft:"100px"}} className='Button' onClick={()=>{MarkTodoAsCompleted(todo.id)}}> Mark As Completed</button>} 
            </div>       
            })
        }
        </ul>
    </div>
      </div>}

   {AddTodoClicked && <div style={{border:"2px solid black"}}>
    Title :    <input onChange={(e)=>{SetTodoNewTitle(e.target.value)}}></input> <br />
    <button className='Button' onClick={()=>{SetAddTodoClicked(false)}}>Cancel</button>
    <button className='Button' onClick={()=>handleAddNewTodo()}>Add</button>
    </div>}


    <b>Posts - User </b>{userData.userId}  
        {!AddPostClicked && <div>
          <button onClick={()=>{SetAddPostClicked(!AddPostClicked)}}>Add</button><br />
      <div style={{border:"2px solid black",padding:"10px"}}>
        <ul>
        {
            userData.Posts.map((post,index) =>{
            return <div key={index} style={{border:"2px solid purple",margin:"20px"}}>
                <b>Title : </b>{post.title} <br />
                <b>Body : </b>{post.body}
            </div>       
            })
        }
        </ul>
    </div>
    </div>}

    {AddPostClicked && <div style={{border:"2px solid black"}}>
    Title :    <input onChange={(e)=>{SetNewPostTitle(e.target.value)}}></input> <br />
    Body :  <input onChange={(e)=>{SetNewPostBody(e.target.value)}}></input>
    <button className='Button' onClick={()=>{SetAddPostClicked(false)}}>Cancel</button>
    <button className='Button' onClick={()=>handleAddNewPost()}>Add</button>
    </div>}
    
    </div>
  )
}

export default SidePanel
