import React from 'react'

const OtherData = ({userData,CloseOtherData,SetCity,SetStreet,SetZipCode}) => {
  return (
    <div style={{border:"1px solid black",borderRadius:"10px",padding:"10px",margin:"10px",backgroundColor:"lightgray"}} onClick={()=> CloseOtherData(false)}>
      Street : <input type='text'  defaultValue={userData.address.street} onChange={(e)=>SetStreet(e.target.value)} onClick={(e) => e.stopPropagation()}></input> <br />
      City : <input type='text' defaultValue={userData.address.city} onChange={(e)=>SetCity(e.target.value)} onClick={(e) => e.stopPropagation()}></input><br />
      Zip Code : <input type='text' defaultValue={userData.address.zipcode} onChange={(e)=>SetZipCode(e.target.value )} onClick={(e) => e.stopPropagation()}></input> <br />
    </div>
  )
}

export default OtherData
