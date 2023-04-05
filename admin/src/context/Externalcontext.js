import React, { createContext,useState,useEffect} from "react";

export const Globalcontext = createContext()

function authadmin() {
    let result = localStorage.getItem('adminlogged')
    return result==='true'?result:false
}

export default function Externalcontext({children}){

    const [pageNum, setPageNum] = useState(1)
    const [adminLogged, setadminLogged] = useState(authadmin)
    const [search, setsearch] = useState('')
    useEffect(() => {
        localStorage.setItem('adminlogged',adminLogged)
    },[adminLogged])

    return (
        <Globalcontext.Provider value={{pageNum,setPageNum,setadminLogged,adminLogged,search, setsearch}} >
        {children}
        </Globalcontext.Provider>
    )
}