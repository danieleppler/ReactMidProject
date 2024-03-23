import { useEffect, useState } from 'react'
import User from './User';
import './App.css'
import  {getalldata,getByUserId} from './utils.js'

function App() {
  
 
const [SearchedValue,SetSearchedValue] = useState(false)

const [Users,SetUsers] = useState([])

const Users_Url="https://jsonplaceholder.typicode.com/users"
const Todos_Url  ="https://jsonplaceholder.typicode.com/todos"
const Posts_Url = "https://jsonplaceholder.typicode.com/posts"


//Get initial data
useEffect(()=>{

  const fetchaData = async () => {
    let AllUserData = [];
    const {data : users} = await getalldata(Users_Url)
    users.forEach(async element => {
      let UserData = {}
      UserData = JSON.parse(JSON.stringify(element));

      const {data : posts} = await getByUserId(Posts_Url,element.id)
      const {data : todos} = await getByUserId(Todos_Url,element.id)

      UserData.Todos = todos
      UserData.Posts = posts

      AllUserData.push(UserData)
    })
    setTimeout(()=>{SetUsers(AllUserData)},8000)
  }
  fetchaData()
},[])


const DeleteUser = (user) =>{
  let temp = [...Users]
  temp = temp.filter( (x) => { return x.id != user.id})
  SetUsers(temp)
}

const updateUser = (user) =>{
  let objIndex = Users.findIndex(obj => obj.id == user.id)
  const temp = [...Users]
  temp[objIndex] = JSON.parse(JSON.stringify(user)); 
  SetUsers(temp)
}


  return (
    <>
      <div style={{border:"1px solid black",borderRadius:"10px",marginRight:"500px"}}>
    Search  <input type="text" onChange={(e)=>SetSearchedValue(e.target.value) }></input> &nbsp;&nbsp;&nbsp; 
    <button style={{backgroundColor:"rgb(255, 255, 128)"}}>Add</button> <br />
    {SearchedValue &&  Users.sort((a, b) => a.id > b.id ? 1 : -1).filter(function(x) { return x.name.includes(SearchedValue) || x.email.includes(SearchedValue)}).map((user,index)=>{ return <User userData={user} DeleteUser = {DeleteUser} updateUser = {updateUser} key={index} />})}
    {!SearchedValue && Users.sort((a, b) => a.id > b.id ? 1 : -1).map((user,index)=>{ return <User userData={user} DeleteUser = {DeleteUser} updateUser = {updateUser} key={index} />})}
      </div>
    </>
  )
}

export default App
