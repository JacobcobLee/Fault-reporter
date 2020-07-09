import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import faultimg from "assets/img/celling_aircon.jpg";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Button from "components/CustomButtons/Button.js";    


const useStyles = makeStyles(styles);

export default function Solve() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
      });
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    
    return (
        <div>
            <h3><b>Solve Case</b></h3>
            <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                    <Card>
                        <CardHeader>
                            <h4><b>Reported on:</b></h4>
                        </CardHeader>
                        <CardBody>
                        <h5>02/07/2020 2.30PM</h5>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card>
                        <CardHeader>
                            <h4><b>Store Location:</b></h4>
                        </CardHeader>
                        <CardBody>
                        <h5>Hillion Mall</h5>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card>
                        <CardHeader>
                            <h4><b>Staff Reported:</b></h4>
                        </CardHeader>
                        <CardBody>
                        <h5>Hock Soon</h5>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card>
                        <CardHeader>
                            <h4><b>Fault Type:</b></h4>
                        </CardHeader>
                        <CardBody>
                        <h5>Aircon</h5>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            <h3><b>Incident Details</b></h3>
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                    <Card>
                        <CardHeader>
                            <h4>Fault Image:</h4>
                        </CardHeader>
                        <CardBody>
                            <img height="150px" width="250px" src={faultimg} alt="..." />
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                    <Card>
                        <CardHeader>
                            <h4>Description:</h4>
                        </CardHeader>
                        <CardBody>
                           The aircon is leaking and i need it fixed asap.
                        </CardBody>
                        <CardHeader>
                            <h4>Issue Status:</h4>
                        </CardHeader>
                        <CardBody>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Unsolved</Grid>
                            <Grid item>
                            <Switch
                                checked={state.checkedA}
                                onChange={handleChange}
                                name="checkedA"
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                            </Grid>
                            <Grid item>Solved</Grid>
                        </Grid>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Button onClick={event =>  window.location.href='/admin/dashboard'} fullWidth color="success">Save</Button> 
                </GridItem>
            </GridContainer>
        </div>
    );
  }
