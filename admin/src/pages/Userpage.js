import React, { useEffect, useState,useContext, useRef } from "react";
import { blockOrUnblock, getAlluser } from "../Api/RestApi";
import BasicPagination from "../component/BasicPagination";
import BasicTable from "../component/BasicTable";
import { Globalcontext } from "../context/Externalcontext";

function Userpage() {
  let [useList, setUserlist] = useState([]);
  let count=useRef(0)
  const {pageNum,setPageNum}=useContext(Globalcontext)
  useEffect(() => {
    getAlluser(5, pageNum - 1).then((response) => {
      setUserlist(response.data.list);
      count.current=Math.ceil(parseInt(response.data.count)/5)
    });
  }, [pageNum]);

  function onChange(data) {
    blockOrUnblock(data).then(() => {
      let result = useList.map((value) => {
        if (value._id === data) {
          value.blocked = !value.blocked;
        }
        return value;
      });
      setUserlist(result);
    }).catch(() => {
      alert('server error')
    })
  }
  /*type 1-string
  type 2-boolean
  type 3 normal btn
  type 4 switch */

  const heading = [
    { field: "username", type: 1 },
    { field: "email", type: 1 },
    { field: "phonenumber", type: 1 },
    { field: "ishosted", type: 2 },
    { field: "blocked", type: 4,callback:onChange },
  ];

  function getNumber(e, p) {
    setPageNum(p)
  }

  


  return (
    <div>
      <BasicTable heading={heading} data={useList} title={'user List'} callback={onChange} />
      <BasicPagination count={count.current} callback={getNumber} />
    </div>
  );
}

export default Userpage;
