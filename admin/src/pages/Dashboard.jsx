import React, { useEffect, useState } from "react";
import { Box, Grid, Card, Typography } from "@mui/material";
import BarChart from "../component/BarChart";
import { getDashboardData } from "../Api/RestApi";
import GraphChart from "../component/GraphChart";

function Dashboard() {
  const [dashBoard, setDashBoard] = useState([]);
  async function fetchDashboard() {
    try {
      const { data } = await getDashboardData();
      setDashBoard(data);
    } catch (err) {
      alert(err);
    }
  }
  useEffect(() => {
    fetchDashboard();
  }, []);

  const {
    newUserPerDay,
    totalBookingPerDay,
    totalNumberOfProperty,
    totalNumberOfHost,
    moneyGeneratedPerWeek,
  } = dashBoard;
  const userperweek = {
    labels: newUserPerDay?.map((item) => item._id),
    datasets: [
      {
        label: "Userperweek",
        data: newUserPerDay?.map((item) => item.total),
        backgroundColor: ['#B4EEB4',"#DAA520"],
      },
    ],
  };
  const totalBooking = {
    labels: totalBookingPerDay?.map((item) => item._id),
    datasets: [
      {
        label: "BookingsPerDay",
        data: totalBookingPerDay?.map((item) => item.total),
        backgroundColor: ["#000080"],
      },
    ],
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item sm={12} xs={12} lg={4}>
          <Card
            sx={{
              width: "auto",
              height: 150,
              padding: 4,
              textAlign: "center",
              boxShadow: 4,
              bgcolor: "#794044",
              color: "white",
            }}
          >
            <Typography variant="h5">Total Number Of Host</Typography>
            <Typography mt={1} variant="h5">
              {totalNumberOfHost}
            </Typography>
          </Card>
        </Grid>
        <Grid item sm={12} xs={12} lg={4}>
          <Card
            sx={{
              width: "auto",
              height: 150,
              padding: 4,
              textAlign: "center",
              boxShadow: 4,
              bgcolor: "#003366",
              color: "white",
            }}
          >
            <Typography variant="h5">Total Number Of Property Listed</Typography>
            <Typography mt={1} variant="h5">
              {totalNumberOfProperty}
            </Typography>
          </Card>
        </Grid>
        <Grid item sm={12} xs={12} lg={4}>
          <Card
            sx={{
              width: "auto",
              height: 150,
              padding: 4,
              textAlign: "center",
              boxShadow: 4,
              bgcolor: "#FF7373",
              color: "white",
            }}
          >
            <Typography variant="h5">Total Revenue Per Week</Typography>
            <Typography mt={1} variant="h5">
              ₹{moneyGeneratedPerWeek}
            </Typography>
          </Card>
              </Grid>
              <Box width={'auto'} height={250} />
        <Grid item lg={6}>
          <Box width={700} p={1}>
            <BarChart chartData={userperweek} />
          </Box>
        </Grid>
        <Grid item lg={6}>
          <Box width={700} p={1}>
            <GraphChart chartData={totalBooking} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
