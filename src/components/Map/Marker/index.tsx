import React, { useState } from "react";
import useStyles from "./style";

import VehicleIcons from "assets/cargo-truck.png";
import { getDateDisplayFormat } from "utils/calenderUtils";

// class Marker extends React.PureComponent {
interface IMarkerprops {
  lat: number;
  lng: number;
  vehicleInfo?: any;
}

function Marker(props: IMarkerprops) {
  // eslint-disable-line react/prefer-stateless-function
  // static defaultProps = {
  //   inGroup: false,
  // };
  const { vehicleInfo, lat, lng } = props;

  const classes = useStyles();

  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  function viewHandler() {
    setOpenBottomSheet(true);
  }
  function closeHandler() {
    setOpenBottomSheet(false);
  }

  return (
    <div className={classes.vehicleBox}>
      <img src={VehicleIcons} width={60} alt="" onClick={viewHandler} />

      {openBottomSheet && (
        <div className={classes.vehicleModal}>
          <div className={classes.vehicleModalClose}>
            <span onClick={closeHandler}>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="#000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.9" filter="url(#filter0_d_2762_100820)">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#000"
                    stroke-linecap="square"
                  ></path>
                </g>
                <defs>
                  <filter
                    id="filter0_d_2762_100820"
                    x="-4"
                    y="-2"
                    width="32"
                    height="32"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood
                      flood-opacity="0"
                      result="BackgroundImageFix"
                    ></feFlood>
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    ></feColorMatrix>
                    <feOffset dy="2"></feOffset>
                    <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    ></feColorMatrix>
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_2762_100820"
                    ></feBlend>
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2762_100820"
                      result="shape"
                    ></feBlend>
                  </filter>
                </defs>
              </svg>
            </span>
          </div>
          <div className={classes.vehicleTrip}>
            <h2>Trip Details:</h2>
            <ul>
              <li>
                <span>IMEI: </span>
                <strong>{vehicleInfo.imei} </strong>
              </li>
              <li>
                <span>Trip Started: </span>
                <strong>{getDateDisplayFormat(vehicleInfo.created_at)}</strong>
              </li>
              <li>
                <span>Last Updated: </span>
                <strong>{getDateDisplayFormat(vehicleInfo.created_at)}</strong>
              </li>
              <li>
                <span>Speed: </span>
                <strong>{vehicleInfo.speed}</strong>
              </li>
              <li>
                <span>Lng: </span>
                <strong>{lng} </strong>
              </li>
              <li>
                <span>Lat: </span>
                <strong>{lat} </strong>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// Marker.propTypes = {
//   inGroup: PropTypes.bool,
// };

export default Marker;
