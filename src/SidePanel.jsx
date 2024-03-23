import React, { useEffect } from 'react'

const SidePanel = ({userData,MarkTodoAsCompleted}) => {


  return (
    <div style={{width:"70%",position:"absolute",right:"0px",top:"0px",width:"30%",marginRight:"350px",marginTop:"50px",marginLeft:"50px"}}>
      Todos - User {userData.userId} <br />
    <div style={{border:"2px solid black"}}>
        <ul>
        {
            userData.Todos.map((todo,index) =>{
            return <div key={index} style={{border:"2px solid purple",margin:"20px",padding:"10px"}}>
                <b>Title : </b>{todo.title} <br />
                <b>Completed : </b>{todo.completed?"True":"False"}
                {todo.completed?<></>:<button style={{position:"relative",right:"0px",bottom:"0px",left:"180px",border:"1px solid green",borderRadius:"1px",backgroundColor:"lightyellow",fontSize:"14px"}} onClick={()=>{MarkTodoAsCompleted(todo.id)}}> Mark As Completed</button>} 
            </div>       
            })
        }
        </ul>
    </div>  
      Posts - User {userData.userId}
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
    </div>
  )
}

export default SidePanel
