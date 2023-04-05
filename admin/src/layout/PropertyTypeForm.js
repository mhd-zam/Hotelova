import React,{useState} from "react";
import ReusableTextField from "../component/ReuseableTextField";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";
function PropertyTypeForm({ edit,err,file,setFile,seterr,field}) {
 
 const [Img,setImg]=useState(file.images[0])
  function handlefile(e) {
    seterr({...err,images:false})
    const img = Array.from(e.target.files);
    setFile({ ...file, images: img })
   let url= URL.createObjectURL(img[0])
    setImg(url)
  }
  
  function handleField(e) {
    console.log(err)
    seterr({...err,[field]:false})
    setFile({ ...file, [field]: e.target.value }) 
   
  }

  return (
    <Box component={"div"} m={2}>
      <Box m={2}>
        <ReusableTextField
          value={file[field]}
          label={field}
          variant="outlined"
          error={err[field]}
          type="text"
          onChange={handleField}
          helperText={err[field]? `${field} is required` : ""}
        />
      </Box>
      <Box m={2}>
        {edit ? <img width={100} src={edit.image} alt="" /> : null}
        <Box display={'flex'} flexDirection={'row'}  p={.5} width={'100%'} height={55} sx={{ borderStyle: 'solid', borderWidth: .5 }} >
          <label htmlFor="file-input">
            <Box sx={{bgcolor:'lightskyblue',width:100,height:45,boxShadow:5,borderRadius:4}} textAlign='center' p={1} >Upload</Box>
          </label>
        <input id="file-input" type="file" style={{opacity:0}} accept="image/*" onChange={handlefile} />
        </Box>
        {err.images &&<Typography m={1} sx={{color:'#FF0000'}} >*image is required</Typography> }
        <Box  > 
        <img width={100} height={100} style={{marginTop:10}}  src={Img} alt=""/>
        </Box>
      </Box>
    </Box>
  );
}

export default PropertyTypeForm;
