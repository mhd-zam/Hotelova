import Axios from '../config/axiosconfig'

export function sendOtopData(data) {
    return Axios.post('/otplogin', data)
}

export function senduserdetails(data) {
    return Axios.post('/userdetails', data)
}

export function sendGmaildata(data) {
    return Axios.post('/gmaillogin', { data })
}

export function LogoutApi() {
    return Axios.post('/logout')
}

export function checkblocked(data) {
    return Axios.post('/check', data)
}

export function Addproperty(data, id) {
    const formData = new FormData()
    formData.append('hostid', id)
    formData.append('PropertyName', data['PropertyName'])
    formData.append('Description', data['Description'])
    formData.append('RoomType', data['RoomType'])
    formData.append('Address', data['Address'])
    formData.append('Price', data['Price'])
    formData.append('Maxguest', data['Maxguest'])

    // Append facility object
    formData.append('coordinates[lat]', data['coordinates']['lat'])
    formData.append('coordinates[log]', data['coordinates']['log'])
    formData.append('Facility[Bedrooms]', data['Facility']['Bedrooms'])
    formData.append('Facility[Bathrooms]', data['Facility']['Bathrooms'])
    formData.append('Facility[Kitchen]', data['Facility']['Kitchen'])
    formData.append('Facility[Balcony]', data['Facility']['Balcony'])

    // Append amenties object

    for (let key in data.Amenties) {
        formData.append(`Amenties[${key}]`, data['Amenties'][key])
    }

    // Append images array

    let file = data.images

    for (let i = 0; i < file.length; i++) {
        formData.append('images', file[i])
    }

    return Axios.post('/addproperty', formData)
}

export function editProperty(data, userid) {
    console.log(data)
    const formData = new FormData()
    formData.append('Proid', data._id)
    formData.append('hostid', userid)
    formData.append('PropertyName', data['PropertyName'])
    formData.append('Description', data['Description'])
    formData.append('RoomType', data['RoomType'])
    formData.append('Address', data['Address'])
    formData.append('Price', data['Price'])
    formData.append('Maxguest', data['Maxguest'])
    // Append facility object
    formData.append('Facility[Bedrooms]', data['Facility']['Bedrooms'])
    formData.append('Facility[Bathrooms]', data['Facility']['Bathrooms'])
    formData.append('Facility[Kitchen]', data['Facility']['Kitchen'])
    formData.append('Facility[Balcony]', data['Facility']['Balcony'])

    // Append amenties object
    for (let key in data.Amenties) {
        formData.append(`Amenties[${key}]`, data['Amenties'][key])
    }

    let file = data.images

    for (let i = 0; i < file.length; i++) {
        formData.append('images', file[i])
    }

    return Axios.put('/editProperty', formData)
}

export function hostRoute(data) {
    return Axios.post('/become-a-host', data)
}

export function checkHostOrNot(data) {
    return Axios.post('/is-a-host', data)
}

export function viewAllProduct(limit, page) {
    return Axios.get(`/viewAllProperty?limit=${limit}&page=${page}`)
}
export function deleteProperty(id) {
    return Axios.delete(`/removeProperty/${id}`)
}

export function sendHostDetails(data, id) {
    data.userid = id
    return Axios.post('/hostdetails', data)
}

export function getAmenities() {
    return Axios.get('/getAllAmenities')
}

export function getRoomType() {
    return Axios.get('/getRoomType')
}

export function checkout(
    property,
    checkin,
    checkOut,
    userid,
    adult,
    children,
    Room,
    bookedRoom,
    totalAmount
) {
    property.checkin = checkin
    property.checkOut = checkOut
    property.userid = userid
    property.adult = adult
    property.children = children
    property.Room = Room
    property.bookedRoom = bookedRoom
    property.totalAmount = totalAmount
    return Axios.post('/create-checkout-session', { property })
}

export function verifyOrder() {
    return Axios.post('/placeorder')
}

export function getUserOrders(userid) {
    return Axios.get(`/viewOrders/${userid}`)
}

export function Cancelorder(orderid) {
    return Axios.patch(`/Cancelbooking/${orderid}`)
}

export function getReservation(hostid) {
    return Axios.get(`/viewReservation/${hostid}`)
}

export function ApproveReservation(orderid) {
    return Axios.post(`/ApproveReservation/${orderid}`)
}

export function RejectReservation(orderid) {
    return Axios.post(`/RejectReservation/${orderid}`)
}

export function searchProperty(
    destination,
    checkin,
    checkout,
    categoryFiter,
    min,
    max
) {
    return Axios.get(
        `/searchProperty?destination=${destination}&checkin=${checkin}&checkout=${checkout}&propertyType=${categoryFiter}&minPrice=${min}&maxPrice=${max}`
    )
}

export function addconverstaion(data) {
    return Axios.post('/addconversation', data)
}

export function getconversation(userid) {
    return Axios.get('/getConversation/' + userid)
}

export function postMessage(data) {
    return Axios.post('/addmessages', data)
}

export function getMessages(conversationid) {
    return Axios.get('/getMessages/' + conversationid)
}

export function postwishlist(userid, item) {
    const data = {
        userid,
        item,
    }
    return Axios.post('/addtowishlist', data)
}

export function deleteWishlist(userid, wishlistid) {
    return Axios.post(`/removeWishlist/${userid}/${wishlistid}`)
}

export function getWishlist(userid) {
    return Axios.get('/getWishlist/' + userid)
}

export function getWalletAmt(userid) {
    return Axios.get('/getWallet/' + userid)
}

export function getPropertyType() {
    return Axios.get('/getPropertyType')
}

export function checkRoomAvailability(data) {
    return Axios.post('/checkRoomAvailability', data)
}

export function ValidateTheUser() {
    return Axios.post('/ValidateUser')
}

export function submitComment(data, id) {
    return Axios.post('/addComment', { id, data })
}

export function getAllHostProperty(userid) {
    return Axios.get(`/getHostProperty?userid=${userid}`)
}
