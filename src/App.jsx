import { useEffect, useState } from 'react'
import User from './User';
import './App.css'
import  {getalldata,getByUserId} from './utils.js'
import { render } from 'react-dom';

function App() {
  
 
const [SearchedValue,SetSearchedValue] = useState(false)

const [Users,SetUsers] = useState([])
const [LastTodoIndex,SetLastTodoIndex] = useState()
const [LastPostIndex,SetLastPostIndex]  =useState()
const [AddNewUserClicked,SetAddNewUserClicked] = useState()
const [NewUser,SetNewUser] = useState()
const [NewUserName,SetNewUserName] = useState()
const [NewUserEmail,SetNewUserEmail] = useState()
const [LockSidePanel,SetLockSidePanel] = useState(false)
const [SidePanelLockUserId,SetSidePanelLockUserId] = useState()

const Users_Url = "https://jsonplaceholder.typicode.com/users"
const Todos_Url = "https://jsonplaceholder.typicode.com/todos"
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
      
      SetLastTodoIndex(todos.slice(-1)[0].id)
      SetLastPostIndex(posts.slice(-1)[0].id)

      UserData.Todos = todos
      UserData.Posts = posts
      

      AllUserData.push(UserData)
    })
    SetUsers(AllUserData)
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

useEffect(()=>{
  const temp = [...Users,NewUser]
  SetUsers(temp)
  SetAddNewUserClicked(false)
},[NewUser])


const handleAddUserClick = () =>{
  SetNewUser({...NewUser,name:NewUserName,email:NewUserEmail,id:Users.length + 1,Todos:[],Posts:[],address:{city:"",street:"",zipcode:""}})
  SetLockSidePanel(false)
}

  return (
    <>
      <div style={{border:"1px solid black",borderRadius:"60px",padding:"20px",float: "left"}}>
    Search  <input type="text" onChange={(e)=>SetSearchedValue(e.target.value) }></input> &nbsp;&nbsp;&nbsp; 
    <button className='Button' onClick={()=>{SetAddNewUserClicked(true);SetLockSidePanel(true)}}>Add</button> <br />
    {SearchedValue &&  Users.sort((a, b) => a.id > b.id ? 1 : -1).filter(function(x) { return x.name.includes(SearchedValue) || x.email.includes(SearchedValue)}).map((user,index)=>{ return <User userData={user} DeleteUser = {DeleteUser} updateUser = {updateUser} key={index}  LastTodoIndex={LastTodoIndex} SetLastTodoIndex={SetLastTodoIndex} LastPostIndex={LastPostIndex} SetLasPostIndex={SetLastPostIndex} LockSidePanel={LockSidePanel} SetLockSidePanel={SetLockSidePanel} SidePanelLockUserId={SidePanelLockUserId} SetSidePanelLockUserId={SetSidePanelLockUserId}/>})}
    {!SearchedValue && Users.sort((a, b) => a.id > b.id ? 1 : -1).map((user,index)=>{ return <User userData={user} DeleteUser = {DeleteUser} updateUser = {updateUser} key={index} LastTodoIndex={LastTodoIndex} SetLastTodoIndex={SetLastTodoIndex} LastPostIndex={LastPostIndex} SetLasPostIndex={SetLastPostIndex} LockSidePanel={LockSidePanel} SetLockSidePanel={SetLockSidePanel} SidePanelLockUserId={SidePanelLockUserId} SetSidePanelLockUserId={SetSidePanelLockUserId}/>})}
    </div>
    <div style={{float:"left",margin:"20px",width:"350px"}}>
    {AddNewUserClicked && <div >
      <b>Add New User </b><br /><br />
      <div style={{border:"1px solid black",padding:"15px",textAlign:"left"}}>
      Name : <input onChange={(e)=>SetNewUserName(e.target.value)}  ></input> <br />
      Email : <input onChange={(e)=>SetNewUserEmail(e.target.value)}></input><br /><br /><br /><br />
      <div style={{textAlign:"right"}}>
      <button className='Button' onClick={(e)=>{SetAddNewUserClicked(false);SetLockSidePanel(false)}}>Cancel</button>{' '}
      <button className='Button' onClick={(e)=>handleAddUserClick()} >Add </button>
      </div>
      </div>
      </div>}
      </div>
    </>
  )
}

export default App
