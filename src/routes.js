/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import PostAdd from "@material-ui/icons/PostAdd";
import Apps from "@material-ui/icons/Apps";
import FeedBack from "@material-ui/icons/Feedback"
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import Analytics from "views/Analytics/Analytics.js";
import Functions from "views/Functions/Functions.js";
import TableList from "views/TableList/TableList";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: PostAdd,
    component: Analytics,
    layout: "/admin"
  },
  {
    path: "/functions",
    name: "Functions",
    icon: Apps,
    component: Functions,
    layout: "/admin"
  },
  {
    path: "/tablelist",
    name: "Customer Feedbacks",
    icon: FeedBack,
    component: TableList,
    layout: "/admin"
  }
];


export default dashboardRoutes;
