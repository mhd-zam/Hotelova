import React, { useState,useEffect } from "react";
import BasicTable from "../component/BasicTable";
import PermissionAlert from "../component/PermissionAlert";
import PropertyTypeForm from "../layout/PropertyTypeForm";
import Modal from "../component/Modal";
import Buttons from "../component/Button";
import { addAmenities, deleteAmenities, editAminities, getAllAmenities } from "../Api/RestApi";
import { Box } from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
import { addPropertyAmenities, removePropertyAmenities } from "../Redux/PropertyAmenities/propertyAmenitiAction";
function PropertyAminities() {
  const [Open, setOpen] = useState(false);
  const [open, setopen] = useState(false);
  const dispatch=useDispatch()
  const Amenities=useSelector(state=> state.propertyAmenitiState.PropertyAmenities)
  const [id, setid] = useState()
    const [isEdit, setIsEdit] = useState(false);
  const [fileInput, setFileInput] = useState({ ProductName: "", images: [] })
  const [refresh,setrefresh]=useState(true)
  const [Err, setErr] = useState({
    ProductName: false,
    images: false,
  });
  function alertPop(ID) {
    setid(ID);
    setopen(true);
  }

  useEffect(() => {
    getAllAmenities().then(({data}) => {
      dispatch(addPropertyAmenities(data))
    }).catch((err) => {
      alert(err.message)
    })
  },[dispatch,refresh])
  
  function EditAminities(id) {
    setid(id)
    let editDocument = Amenities.find(item => item._id === id)
    let { ProductName, image } = editDocument
    setFileInput({ ProductName: ProductName, images: [image[0]] })
    setIsEdit(true)
    setOpen(true)
  }
  
  function editApiCall() {
    if (fileInput.ProductName.trim().length === 0) {
      setErr({ ...Err, ProductName: true });
      return;
    }
    if (fileInput.images.length !== 1) {
      setErr({ ...Err, images: true });
      return;
    }
    return new Promise((resolve, reject) => {
      editAminities(fileInput, id).then(() => {
        setIsEdit(false)
        setrefresh(prevState => !prevState)
        resolve()
      }).catch((err) => {
        alert(err)
        reject()
      })
   })
  }

  function AddAminities() {
    if (fileInput.ProductName.trim().length === 0) {
      setErr({ ...Err, ProductName: true });
      return;
    }
    if (fileInput.images.length !== 1) {
      setErr({ ...Err, images: true });
      return;
    }

    return new Promise((resolve, reject) => {
      addAmenities(fileInput)
        .then(() => {
          setrefresh(prevState => !prevState)
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }

  function DeleteRoomType() {
    setopen(false);
    deleteAmenities(id).then(() => {
      dispatch(removePropertyAmenities(id))
    })
  }
  const handleClickOpen = () => {
    setFileInput({ ProductName: "", images: [] });
    setOpen(true);
  };

  function cancel() {
    setopen(false);
  }

  let header = [
    { field: "ProductName", type: 1 },
    { field: "image", type: 5 },
    {
      field: "Action",
      type: 3,
      text: "Edit",
      color: "blue",
      textcolor: "white",
      callback: EditAminities,
    },
    {
      field: "",
      type: 3,
      text: "Remove",
      color: "red",
      textcolor: "white",
      callback: alertPop,
    },
  ];
  return (
    <>
      <Box sx={{ float: "right" }}>
        <Buttons text={'Add Aminities'} callback={handleClickOpen} />
      </Box>
      <Box p={2} >
      <BasicTable  heading={header} title={'Amenities'} data={Amenities} />
      </Box>
      <PermissionAlert
        open={open}
        Agreecallback={DeleteRoomType}
        title={"Do you want to remove this roomtype"}
        Cancelcallback={cancel}
      />
      <Modal
        open={Open}
        setOpen={setOpen}
        title={isEdit?"edit Amenities":'Add Aminities'}
        ApiCall={isEdit?editApiCall:AddAminities}
      >
        <PropertyTypeForm
          err={Err}
          seterr={setErr}
          file={fileInput}
          setFile={setFileInput}
          field={"ProductName"}
        />
      </Modal>
      
    </>
  );
}

export default PropertyAminities;
