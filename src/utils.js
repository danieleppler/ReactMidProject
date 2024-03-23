import axios from 'axios';

const getalldata = (url) => axios.get(`${url}`)
const getByUserId = (url,id) => axios.get(`${url}/?userId=${id}`)


export {getalldata,getByUserId}