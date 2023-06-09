import React, { useEffect, useState } from "react";
import { getallproduct, removeProperty } from "../Api/RestApi";
import BasicTable from "../component/BasicTable";
import PermissionAlert from "../component/PermissionAlert";
import BasicPagination from "../component/BasicPagination";

function Propertylist() {
  const [property, setProperty] = useState([]);
  const [open, setopen] = useState(false);
  const [id, setid] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    try {
      getallproduct(5, page)
        .then(({ data }) => {
          setProperty(data);
        })
        .catch((err) => {
          alert(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, [page]);

  function alertPop(ID) {
    setid(ID);
    setopen(true);
  }
  function cancel() {
    setopen(false);
  }

  function remove() {
    setopen(false);
    removeProperty(id)
      .then(() => {
        let result = property.filter((elmt) => {
          return elmt._id !== id;
        });
        setProperty(result);
      })
      .catch((err) => {
        alert(err);
      });
  }

  const header = [
    { field: "PropertyName", type: 1 },
    { field: "Address", type: 1 },
    { field: "Price", type: 1 },
    { field: "RoomType", type: 1 },
    { field: "images", type: 5 },
    {
      field: "Action",
      type: 3,
      text: "Remove",
      color: "red",
      textcolor: "white",
      callback: alertPop,
    },
  ];

    function getNumber(e, p) {
    setPage(p-1)
  }
  return (
    <div>
      <BasicTable heading={header} title={"Property list"} data={property} />
      <PermissionAlert
        open={open}
        Agreecallback={remove}
        title={"Do you want to remove property"}
        Cancelcallback={cancel}
      />
      <BasicPagination count={2} callback={getNumber} />
    </div>
  );
}

export default Propertylist;
