import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Admin.css";
import { CardHeader } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const AdminDashboard = () => {
  return (
    <div>
      <Grid container spacing={2} id="dashboard">
        <Grid xs={4}>
          <Card variant="outlined" id="member">
            <CardContent>
              <Typography variant="h5" component="div">
                New Member
              </Typography>
              <h1>1</h1>
            </CardContent>
            <CardActions>
              <Button size="small">Detail</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card variant="outlined" id="book">
            <CardContent>
              <Typography variant="h5" component="div">
                New Book
              </Typography>
              <h1>2</h1>
            </CardContent>
            <CardActions>
              <Button size="small">Detail</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card variant="outlined" id="other">
            <CardContent>
              <Typography variant="h5" component="div">
                Other
              </Typography>
              <h1>3</h1>
            </CardContent>
            <CardActions>
              <Button size="small">Detail</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Box id="dashboard-box">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            <Card variant="outlined">
              <CardContent className="dashboard-box-card">
                <div style={{ width: "40%" }}>
                  <CampaignIcon />
                </div>
                <div style={{ width: "60%" }}>
                  <Typography variant="h6" component="div">
                    Issued
                  </Typography>
                  <h1>2</h1>
                </div>
              </CardContent>
              <CardActions>
                <Button size="small">Detail</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card variant="outlined">
              <CardContent className="dashboard-box-card">
                <div style={{ width: "40%" }}>
                  <CurrencyExchangeIcon />
                </div>
                <div style={{ width: "60%" }}>
                  <Typography variant="h6" component="div">
                    Returned
                  </Typography>
                  <h1>2</h1>
                </div>
              </CardContent>
              <CardActions>
                <Button size="small">Detail</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card variant="outlined">
              <CardContent className="dashboard-box-card">
                <div style={{ width: "40%" }}>
                  <SentimentVeryDissatisfiedIcon />
                </div>
                <div style={{ width: "60%" }}>
                  <Typography variant="h6" component="div">
                    Pending
                  </Typography>
                  <h1>2</h1>
                </div>
              </CardContent>
              <CardActions>
                <Button size="small">Detail</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card variant="outlined">
              <CardContent className="dashboard-box-card">
                <div style={{ width: "40%" }}>
                  <CampaignIcon />
                </div>
                <div style={{ width: "60%" }}>
                  <Typography variant="h6" component="div">
                    Issued
                  </Typography>
                  <h1>2</h1>
                </div>
              </CardContent>
              <CardActions>
                <Button size="small">Detail</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AdminDashboard;
