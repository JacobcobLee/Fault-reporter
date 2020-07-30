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
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { card } from "assets/jss/material-dashboard-react";
import { CardActions } from "@material-ui/core";
import axios from 'axios';

// const displayFeedback=[];
// const array=[];
// const temp=[];
// const temp2=[];
// var Chartist = require("chartist");
// var delays = 80,
//   durations = 500;
// var delays2 = 80,
//   durations2 = 500;

//   // response.data.forEach(store => {
//   //   var object = {value: store, label: store}
//   //   faultOptions.push(object)
//   // });
// function getCustomerFeedbacks(){
//   axios
//   .get("http://localhost:8080/api/v1/feedback/chart")
//   .then((response) => {
//     displayFeedback.push(response.data)
//     array.push(Object.values(displayFeedback[0]))
//     array[0].forEach(item=>{
//       var object = item.datetime
//       var object2 = item.rating
//       temp.push(object)
//       temp2.push(object2)
//     })
//     console.log(temp);
//   })
//   const feedbackChart = {
//     data: {
//       labels: temp

      
//       ,
//       series: temp2
        
      
//     },
//     options: {
//       axisX: {
//         showGrid: false
//       },
//       low: 0,
//       high: 5,
//       chartPadding: {
//         top: 0,
//         right: 5,
//         bottom: 0,
//         left: 0
//       }
//     },
//     responsiveOptions: [
//       [
//         "screen and (max-width: 640px)",
//         {
//           seriesBarDistance: 5,
//           axisX: {
//             labelInterpolationFnc: function(value) {
//               return value[0];
//             }
//           }
//         }
//       ]
//     ],
//     animation: {
//       draw: function(data) {
//         if (data.type === "bar") {
//           data.element.animate({
//             opacity: {
//               begin: (data.index + 1) * delays2,
//               dur: durations2,
//               from: 0,
//               to: 1,
//               easing: "ease"
//             }
//           });
//         }
//       }
//     }
//   };
//   console.log("HE");
//   console.log(feedbackChart.data)
//   return feedbackChart;
//   }
// //getCustomerFeedbacks();


import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";


const useStyles = makeStyles(styles);




export default function Dashboard() {
  const classes = useStyles();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [modalShow3, setModalShow3] = React.useState(false);
  return (
    <div>
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="info">
              <ChartistGraph
                className="ct-chart"
                data={getCustomerFeedbacks().data}
                type="Bar"
                options={getCustomerFeedbacks().options}
                responsiveOptions={getCustomerFeedbacks().responsiveOptions}
                listener={getCustomerFeedbacks().animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Recent Ratings</h4>
              <p className={classes.cardCategory}>Ratings through Customer Feedbacks</p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer> */}
       <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="info">
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
              <h4 className={classes.cardTitle}>Recent Ratings</h4>
              <p className={classes.cardCategory}>Ratings through Customer Feedbacks</p>
            </CardBody>
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
