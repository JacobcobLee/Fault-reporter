import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import {Component} from 'react';
// @material-ui/icons
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import NewCaseModal from "components/Modal/newcaseModal.js";
import ResolvedCaseModal from "components/Modal/resolvedcaseModal.js";
import PendingCaseModal from "components/Modal/pendingcaseModal.js";
import "bootstrap/dist/css/bootstrap.min.css";


import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { card } from "assets/jss/material-dashboard-react";
import { CardActions } from "@material-ui/core";

const useStyles = makeStyles(styles);


export default function Dashboard() {
  const classes = useStyles();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [modalShow3, setModalShow3] = React.useState(false);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Faults reported in a week</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 25%
                </span>{" "}
                increase in today's reports
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Faults reported in this year</h4>
              <p className={classes.cardCategory}>Faults in Year Span</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 3 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Faults reported today</h4>
              <p className={classes.cardCategory}>Faults in today's timing</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 1 minute ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      
      <br></br>
      
      <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
        <Button onClick={() => setModalShow(true)} fullWidth color="danger">New Cases Reported</Button>
        <NewCaseModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />  
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Button  onClick={() => setModalShow2(true)} fullWidth color="warning">Pending Cases</Button>
        <PendingCaseModal
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Button onClick={() => setModalShow3(true)} fullWidth color="success">Resolved Cases</Button> 
        <ResolvedCaseModal
        show={modalShow3}
        onHide={() => setModalShow3(false)}
      />
      </GridItem>
      </GridContainer>
    </div>
  );
}
