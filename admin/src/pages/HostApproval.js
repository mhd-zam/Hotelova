import React,{useEffect, useState} from 'react'
import { changeHostStatus, getAllhostrequest } from '../Api/RestApi'
import BasicTable from '../component/BasicTable'

export default function HostApproval() {
    const [hostDetails,sethostDetails]=useState([])
    useEffect(() => {
        getAllhostrequest().then((response) => {
          sethostDetails(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    
    // _id: new ObjectId("64207271ff8fe0f1eaaeba8d"),
    // phonenumber: '+911234567890',
    // email: 'zamzyn@gmail.com',
    // DateOfBirth: '2023-03-23',
    // AadharNumber: 'ACD123547',
    // RentalLicensePermitid: 'HIR124578OF',
    // PanCard: 'HU1232JHGD'
     /*type 1-string
  type 2-boolean
  type 3 normal btn
  type 4 switch */
    
    function approvehost(id) {
       changeHostStatus(id).then(() => {
        let result= hostDetails.filter((element) => {
                return element._id!==id
            })
          sethostDetails(result)
        })
    }

  const heading = [
    { field: "FullName", type: 1 ,text:'',color:''},
    { field: "email", type: 1 ,text:'',color:''},
    { field: "phonenumber", type: 1, text: '', color: '' },
    { field: "DateOfBirth", type: 1 ,text:'',color:''},
    { field: "AadharNumber", type: 1 ,text:'',color:''},
    { field: "RentalLicensePermitid", type: 1, text: '', color: '' },
    { field: "PanCard", type: 1 ,text:'',color:''},
    { field: "Action", type: 3, text: 'Approve', color: 'lightgreen', textcolor: 'white',callback:approvehost}
  ];
    return (
        <div><BasicTable heading={heading} data={hostDetails} title={'Host Request'} /></div>
    )
}