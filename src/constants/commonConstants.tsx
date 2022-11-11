import { HeadCell } from "components/commonComponent/Table";
import { AppPaths } from "../constants/commonEnums";
import VehicleIcon from "../assets/vehicles.png"
import UserIcon from "../assets/users.png";
import OrganizationIcon from "../assets/organization.png";
import FeatureIcon from "../assets/features.webp";

import React from "react";

export const TOKEN = "token";
export const USER_ID = "user_id";

export const SUPER_ADMIN = "SUPER_ADMIN";
export const HOST_ADMIN = "HOST_ADMIN";
export const HOST_SUB_ADMIN = "HOST_SUB_ADMIN";
export const FLEET_MANAGER = "FLEET_MANAGER";
export const CLIENT_ADMIN = "CLIENT_ADMIN";

export const SUPER_ADMIN_MENU = [
  AppPaths.DASHBOARD,
  AppPaths.USERS,
 
];

export const HOST_MENU = [
  AppPaths.DASHBOARD,
];

export const CLIENT_MENU = [
  AppPaths.DASHBOARD,
 
];

export const FLEET_MANAGER_MENU = [
  AppPaths.DASHBOARD,
 
];

export const SUB_HOST_MENU = [
  AppPaths.DASHBOARD,
 
];

export const SUPER_ADMIN_ROUTES = [
  AppPaths.DASHBOARD,
  AppPaths.USERS,
];

export const HOST_ROUTES = [
  AppPaths.DASHBOARD,
 
];

export const CLIENT_ROUTES = [
  AppPaths.DASHBOARD,
  
];

export const FLEET_MANAGER_ROUTES = [
  AppPaths.DASHBOARD,
];

export const SUB_HOST_ROUTES = [
  AppPaths.DASHBOARD,
  
];




type ROLE_BASED_FILTERED_SUMMARY = {
    dataIndex: string;
    label: string;
    icon: string;
    roles: string[];
    unit?: string;
    extraDataIndex?: string;
    value?:string;
};

export const getRoleBasedFilteredSummary = () => {

  const data : ROLE_BASED_FILTERED_SUMMARY[] = [
    {
      dataIndex: "total_organizations",
      label: "Total Organization",
      icon: OrganizationIcon ,
      value:"10",
      roles: [SUPER_ADMIN, HOST_ADMIN, HOST_SUB_ADMIN, CLIENT_ADMIN],
    },
    {
      dataIndex: "total_vehicles",
      label: "Total Vehicles",
      icon: VehicleIcon,
      value:"50",
      roles: [SUPER_ADMIN, FLEET_MANAGER],
    },
    {
      dataIndex: "total_features",
      label: "Total Features",
      icon: FeatureIcon,
      value:"15",
      roles: [SUPER_ADMIN, HOST_ADMIN, HOST_SUB_ADMIN, CLIENT_ADMIN],
    },

    {
      dataIndex: "total_users",
      label: "Total Users",
      icon: UserIcon,
      value:"70",
      roles: [SUPER_ADMIN, CLIENT_ADMIN],
    },
  ];

  return data;
}