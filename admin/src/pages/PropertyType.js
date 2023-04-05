import Box from "@mui/material/Box/Box";
import React, { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewRoomType,
  editRoomType,
  getAllRoomType,
  removeRoomType,
} from "../Api/RestApi";
import BasicTable from "../component/BasicTable";
import Buttons from "../component/Button";
import Modal from "../component/Modal";
import PermissionAlert from "../component/PermissionAlert";
import PropertyTypeForm from "../layout/PropertyTypeForm";
import { addPropertyType, removePropertyType } from "../Redux/PropertyType/propertyTypeAction";


function PropertyType() {
  const [Open, setOpen] = useState(false);
  const [open, setopen] = useState(false);
  const [id, setid] = useState()
  const [isEdit, setIsEdit] = useState(false);
  const AllRoomType = useSelector(state=>state.propertyTypeState.PropertyType)
  const dispatch=useDispatch()
  const [fileInput, setFileInput] = useState({
    RoomType: "",
    images: [],
  })
  const [refresh,setrefresh]=useState(true)
  const [Err, setErr] = useState({
    RoomType: false,
    images: false,
  })
  
  const handleClickOpen = () => {
    setFileInput({RoomType: "",images: []})
    setOpen(true);
  }
 
  const dispatchAction = useCallback((data) => {
    dispatch(addPropertyType(data));
  }, [dispatch]);

  useEffect(() => {
    getAllRoomType()
    .then(({ data }) => {
      dispatchAction(data)
    })
    .catch((err) => {
      console.log(err);
    });
  }, [refresh,dispatchAction])
  

  
  function addRoomType() {
    if (fileInput.RoomType.trim().length === 0) {
      setErr({ ...Err, RoomType: true })
      return;
    }
    if (fileInput.images.length !== 1) {
      setErr({ ...Err, images: true });
      return;
    }
    return new Promise(async (resolve, reject) => {
      addNewRoomType(fileInput)
        .then(() => {
          setrefresh(prevState => !prevState)
          resolve();
        })
        .catch((err) => {
          alert(err);
          reject();
        });
    });
  }

  function editRoomtype(id) {
    alert(id)
    setid(id)
    let editDocument = AllRoomType.find((elemt) => elemt._id === id)
    let { RoomType, image } = editDocument
    setFileInput({ RoomType: RoomType, images: [image[0]] });
    setIsEdit(true);
    setOpen(true);
  }

  function editRoomApi() {
    if (fileInput.RoomType.trim().length === 0) {
      setErr({ ...Err, RoomType: true });
      return
    }
    if (fileInput.images.length !== 1) {
      setErr({ ...Err, images: true });
      return;
    }
    return new Promise((resolve, reject) => {
      editRoomType(fileInput, id)
        .then(() => {
          setIsEdit(false)
          setrefresh(prevState => !prevState)
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }

  function alertPop(ID) {
    setid(ID);
    setopen(true);
  }

  function cancel() {
    setopen(false);
  }

  function DeleteRoomType() {
    setopen(false);
    removeRoomType(id).then((res) => {
     dispatch(removePropertyType(id))
    });
  }

  let header = [
    { field: "RoomType", type: 1 },
    { field: "image", type: 5 },
    {
      field: "Action",
      type: 3,
      text: "Edit",
      color: "blue",
      textcolor: "white",
      callback: editRoomtype,
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
    <Box>
      <Box sx={{ float: "right" }}>
        <Buttons text={"Add Room Type"} callback={handleClickOpen} />
        <Modal
          open={Open}
          setOpen={setOpen}
          title={isEdit?"Edit RoomType":"Add RoomType"}
          ApiCall={isEdit ? editRoomApi : addRoomType}
        >
          <PropertyTypeForm
            err={Err}
            seterr={setErr}
            file={fileInput}
            setFile={setFileInput}
            field={'RoomType'}
          />
        </Modal>
      </Box>
      <Box mt={4}>
        <BasicTable title={"Room type"} data={AllRoomType} heading={header} />
        <PermissionAlert
          open={open}
          Agreecallback={DeleteRoomType}
          title={"Do you want to remove this roomtype"}
          Cancelcallback={cancel}
        />
      </Box>
    </Box>
  );
}

export default PropertyType;
