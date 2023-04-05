import { Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React,{useState,useContext} from "react";
import { loginDetails } from "../Api/RestApi";
import Buttons from "../component/Button";
import Textfield from "../component/Textfield";
import { useNavigate } from "react-router-dom";
import { Globalcontext } from "../context/Externalcontext";

export default function Login() {

  const [formDetail, setFormDetail] = useState({ username: '', password: '' })
  const [error, seterror] = useState(false)
  let {setadminLogged}=useContext(Globalcontext)
  let navigate=useNavigate()
  
  function handleForm(e) {
    setFormDetail({ ...formDetail, [e.target.name]: e.target.value })
  }

  function handlesubmit() {
    loginDetails(formDetail).then(() => {
      navigate('/users')
      setadminLogged(true)
    }).catch(() => {
      seterror(true)
    })
  }


  return (
    <Box component="body" bgcolor="darkolivegreen" height={"100vh"}>
      <Stack alignItems="center" justifyContent="center">
       
          <Paper
            sx={{ width: 300, height: 300, marginTop: "25vh", borderRadius: 5 }}
            elevation={3}
          >
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{ width: 300, height: 300 }}
            >
            <Typography variant="h6">ADMIN LOGIN</Typography>
            {error&&<Typography variant="body1" color={'red'} >invalid details</Typography>}
            <Textfield name={'username'} value={formDetail.username} callback={handleForm} type={'text'} />
            <Textfield name={'password'} value={formDetail.password} callback={handleForm} type={'password'}  />
            <Buttons text={'submit'} callback={handlesubmit} />
            </Stack>
          </Paper>
      </Stack>
    </Box>
  );
}
