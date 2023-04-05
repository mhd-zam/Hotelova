import Axios from "../config/Axiosinstance";

export function loginDetails(data) {
  return Axios.post("/login", data);
}

export function getAlluser(limit, page) {
  return Axios.get(`/getAllUsers?limit=${limit}&page=${page}`);
}

export function blockOrUnblock(data) {
  return Axios.patch(`/blockOrUnblock/${data}`);
}

export function getAllhostrequest() {
  return Axios.get("/getAllHostRequest");
}

export function changeHostStatus(id) {
  return Axios.patch(`/approveHost/${id}`);
}

export function getallproduct() {
  return Axios.get("/getAllproperty");
}

export function removeProperty(id) {
  return Axios.delete(`/removeProperty/${id}`);
}

export function addNewRoomType(data) {
    const formdata = new FormData()
    formdata.append('RoomType', data['RoomType'])
    let file = data.images
    formdata.append('images',file[0])
  return Axios.post("/addRoomType",formdata,{headers:{"Content-Type":'multipart/form-data'}});
}

export function getAllRoomType() {
  return Axios.get('/getRoomType')
}

export function removeRoomType(id) {
  return Axios.delete(`/removeRoomType/${id}`)
}


export function editRoomType(data, id) {
  console.log(data);
  
  const formdata = new FormData()
  formdata.append('RoomType', data['RoomType'])
  formdata.append('_id',id)
  let file = data.images
  formdata.append('images',file[0])
  return Axios.put('/editRoomType',formdata,{headers:{"Content-Type":'multipart/form-data'}})
}

export function addAmenities(data) {
  const formdata = new FormData()
  formdata.append('ProductName', data['ProductName'])
  let file = data.images
  formdata.append('images',file[0])
  return Axios.post('/addAmenities',formdata,{headers:{"Content-Type":'multipart/form-data'}})
}


export function getAllAmenities() {
  return Axios.get('/getAllAmenities')
}

export function deleteAmenities(id) {
  return Axios.delete(`/removeAmenities/${id}`)
}

export function editAminities(data,id) {
  const formdata = new FormData()
  formdata.append('ProductName', data['ProductName'])
  formdata.append('_id',id)
  let file = data.images
  formdata.append('images', file[0])
  return Axios.put('/editAminities',formdata,{headers:{'Content-Type':'multipart/form-data'}})
}