import React from "react";

import {
    withGoogleMap,
    GoogleMap,
    Marker,
    Polygon
} from "react-google-maps";
// const coords = [
//     { lng: -73.94718884609291, lat: 40.73716326270996, },
//     { lng: -73.94785154644617, lat: 40.73594880162498, },
//     { lng: -73.94875595832566, lat: 40.73623377103011, },
//     { lng: -73.9487061704137, lat: 40.73632501517496, },
//     { lng: -73.9480840578246, lat: 40.737465122606544, },
//     { lng: -73.94754222902405, lat: 40.737278565877524, },
//     { lng: -73.9472009458731, lat: 40.73716651702501, },
//     { lng: -73.94718884609291, lat: 40.73716326270996 },
// ];

const MapWithAMarker = withGoogleMap(props =>
    <GoogleMap
        defaultZoom={8}

        // defaultCenter={{ lng: props?.centerPoints && parseInt(props?.centerPoints[0]), lat: props?.centerPoints && parseInt(props?.centerPoints[1]) }}
        // defaultCenter={{ lng: -73.93279080176559, lat: 40.727263865864586 }}
        defaultCenter={props.centerPoints}
    >
        {
            props && props.mapMakers?.map((item, ind) => {
                return (
                    <Marker
                        key={ind}
                        // position={{ lng: mapPoints?.coordinates[0], lat: mapPoints?.coordinates[1] }}
                        position={item}
                    />
                )
            })
        }

        {props?.polygonData?.map((item, ind) => (
            <>
                {/* <Marker
                    key={ind}
                    // position={{ lng: mapPoints?.coordinates[0], lat: mapPoints?.coordinates[1] }}
                    position={item?.coordinates[0]}
                /> */}
                <Polygon
                    path={item?.coordinates}
                    key={ind + 1}
                    options={{
                        fillColor: "red",
                        fillOpacity: 0.4,
                        strokeColor: "#000",
                        strokeOpacity: 1,
                        strokeWeight: 1
                    }} />
            </>

        ))

        }
    </GoogleMap>
);
const MapChart = ({ mapData, centerPoints, mapMakers, polygonData }) => {
    return (
        <MapWithAMarker
            containerElement={<div style={{ height: `100vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            mapData={mapData}
            centerPoints={centerPoints}
            mapMakers={mapMakers}
            polygonData={polygonData}
        />
    );
};
export default MapChart;
