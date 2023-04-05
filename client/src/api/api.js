import Axios from '../config/axiosconfig'

export function sendOtopData(data) {
    return Axios.post('/otplogin',data)
}

export function senduserdetails(data) {
    return Axios.post('/userdetails',data)
}

export function sendGmaildata(data) {
    return Axios.post('/gmaillogin', { data })
}

export function LogoutApi() {
    return Axios.post('/logout')
}

export function checkblocked(data) {
    return Axios.post('/check',data)
}

export function Addproperty(data,id) {
    const formData = new FormData()
    formData.append('userid',id)
    formData.append('PropertyName', data['PropertyName'])
    formData.append('Description', data['Description'])
    formData.append('RoomType', data['RoomType'])
    formData.append('Address', data['Address'])
    formData.append('Price', data['Price'])
    
    // Append facility object
    formData.append('coordinates[lat]', data['coordinates']['lat'])
    formData.append('coordinates[log]',data['coordinates']['log'])
    formData.append('Facility[Bedrooms]', data['Facility']['Bedrooms'])
    formData.append('Facility[Bathrooms]', data['Facility']['Bathrooms'])
    formData.append('Facility[Kitchen]', data['Facility']['Kitchen'])
    formData.append('Facility[Balcony]', data['Facility']['Balcony'])
  
    // Append amenties object
    formData.append('Amenties[Tv]', data['Amenties']['Tv'])
    formData.append('Amenties[Swimmmingpool]', data['Amenties']['Swimmmingpool'])
    formData.append('Amenties[Aircondition]', data['Amenties']['Aircondition'])
    formData.append('Amenties[Gym]', data['Amenties']['Gym'])
    formData.append('Amenties[Restaurants]', data['Amenties']['Restaurants'])
  
    // Append images array
    
    let file=data.images

    for (let i = 0; i < file.length; i++){
        formData.append('images', file[i])
    }

    return Axios.post('/addproperty',formData)
}

export function editProperty(data) {
    console.log(data)
    const formData = new FormData()
    formData.append('Proid', data._id)
    formData.append('userid',data.userid)
    formData.append('PropertyName', data['PropertyName'])
    formData.append('Description', data['Description'])
    formData.append('RoomType', data['RoomType'])
    formData.append('Address', data['Address'])
    formData.append('Price', data['Price'])
    
    // Append facility object
    formData.append('Facility[Bedrooms]', data['Facility']['Bedrooms'])
    formData.append('Facility[Bathrooms]', data['Facility']['Bathrooms'])
    formData.append('Facility[Kitchen]', data['Facility']['Kitchen'])
    formData.append('Facility[Balcony]', data['Facility']['Balcony'])
  
    // Append amenties object
    formData.append('Amenties[Tv]', data['Amenties']['Tv'])
    formData.append('Amenties[Swimmmingpool]', data['Amenties']['Swimmmingpool'])
    formData.append('Amenties[Aircondition]', data['Amenties']['Aircondition'])
    formData.append('Amenties[Gym]', data['Amenties']['Gym'])
    formData.append('Amenties[Restaurants]', data['Amenties']['Restaurants'])

    let file=data.images

    for (let i = 0; i < file.length; i++){
        formData.append('images', file[i])
    }

    return Axios.put('/editProperty',formData)
}

export function hostRoute(data) {
    return Axios.post('/become-a-host',data)
}

export function checkHostOrNot(data) {
    return Axios.post('/is-a-host',data)
}

export function viewAllProduct() {
    return Axios.get('/viewAllProperty')
}
export function deleteProperty(id) {
    return Axios.delete(`/removeProperty/${id}`)
}

export function sendHostDetails(data, id) {
    data.userid=id
    return Axios.post('/hostdetails',data)
}



export function getAmenities() {
    return Axios.get('/getAllAmenities')
}

export function getRoomType() {
    return Axios.get('/getRoomType')
}