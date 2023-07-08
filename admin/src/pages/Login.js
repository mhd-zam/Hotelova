import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState, useContext } from "react";
import { loginDetails } from "../Api/RestApi";
import Buttons from "../component/Button";
import Textfield from "../component/Textfield";
import { useNavigate } from "react-router-dom";
import { Globalcontext } from "../context/Externalcontext";

export default function Login() {
  const [formDetail, setFormDetail] = useState({ username: "", password: "" });
  const [error, seterror] = useState(false);
  let { setadminLogged } = useContext(Globalcontext);
  let navigate = useNavigate();

  function handleForm(e) {
    setFormDetail({ ...formDetail, [e.target.name]: e.target.value });
  }

  function handlesubmit() {
    loginDetails(formDetail)
      .then(({ data }) => {
        navigate("/Dashboard");
        localStorage.setItem("authToken", data.token);
        setadminLogged(true);
      })
      .catch(() => {
        seterror(true);
      });
  }

  return (
    <Box component="body" bgcolor="whitesmoke" height={"100vh"}>
      <Stack alignItems="center" justifyContent="center"  >
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          marginTop={20}
          boxShadow={4}
          borderRadius={4}
          sx={{ width: 400, height: 400 }}
        >
          <Typography variant="h6">ADMIN LOGIN</Typography>
          {error && (
            <Typography variant="body1" color={"red"}>
              invalid details
            </Typography>
          )}
          <Textfield
            name={"username"}
            value={formDetail.username}
            callback={handleForm}
            type={"text"}
          />
          <Textfield
            name={"password"}
            value={formDetail.password}
            callback={handleForm}
            type={"password"}
          />
          <Buttons text={"submit"} callback={handlesubmit} />
        </Stack>
      </Stack>
    </Box>
  );
}
