import React from "react";

import {
    withGoogleMap,
    GoogleMap,
    Marker,
    Polygon
} from "react-google-maps";
const coords = [
    { lng: -73.94718884609291, lat: 40.73716326270996, },
    { lng: -73.94785154644617, lat: 40.73594880162498, },
    { lng: -73.94875595832566, lat: 40.73623377103011, },
    { lng: -73.9487061704137, lat: 40.73632501517496, },
    { lng: -73.9480840578246, lat: 40.737465122606544, },
    { lng: -73.94754222902405, lat: 40.737278565877524, },
    { lng: -73.9472009458731, lat: 40.73716651702501, },
    { lng: -73.94718884609291, lat: 40.73716326270996 },




    //(-73.93279080176559 40.727263865864586, -73.93265108706629 40.727090773221484, -73.93265346919485 40.72708960974111, -73.93297841464023 40.727492182326095, -73.9329762403183 40.72749360537534, -73.93279080176559 40.727263865864586)
    // { lng: 29.0449333, lat: 41.0167573 },
    // { lng: 29.0393543, lat: 41.0106695 },
    // { lng: 29.032917, lat: 41.0049697 },
    // { lng: 29.0226173, lat: 41.0061356 },
    // { lng: 29.0078545, lat: 41.0039334 },
    // { lng: 29.0201283, lat: 40.9765933 },
    // { lng: 29.0319729, lat: 40.9657708 },
    // { lng: 29.0784073, lat: 40.9536501 },
    // { lng: 29.0944576, lat: 40.9493068 },
    // { lng: 29.0975475, lat: 40.9514461 },
    // { lng: 29.1052294, lat: 40.9647986 },
    // { lng: 29.097338, lat: 40.978242 },
    // { lng: 29.0931273, lat: 40.9835914 },
    // { lng: 29.0858746, lat: 40.987738 },
    // { lng: 29.056509, lat: 40.998902 },
    // { lng: 29.061456, lat: 41.008443 },
    // { lng: 29.0617561, lat: 41.0104752 },
    // { lng: 29.0595245, lat: 41.0126772 },
    // { lng: 29.052014, lat: 41.018198 },
    // { lng: 29.047487, lat: 41.023164 }
];

const MapWithAMarker = withGoogleMap(props =>
    <GoogleMap
        defaultZoom={8}

        // defaultCenter={{ lng: props?.centerPoints && parseInt(props?.centerPoints[0]), lat: props?.centerPoints && parseInt(props?.centerPoints[1]) }}
        defaultCenter={{ lng: -73.93279080176559, lat: 40.727263865864586 }}
    >
        {
            false && props && props.mapMakers?.map((item, ind) => {
                return (
                    <Marker
                        key={ind}
                        // position={{ lng: mapPoints?.coordinates[0], lat: mapPoints?.coordinates[1] }}
                        position={item}
                    />
                )
            })
        }
        <Marker
            key={1}
            // position={{ lng: mapPoints?.coordinates[0], lat: mapPoints?.coordinates[1] }}
            position={{ lng: -73.93279080176559, lat: 40.727263865864586 }}
        />
        <Polygon
            path={coords}
            key={1}
            options={{
                fillColor: "red",
                fillOpacity: 0.4,
                strokeColor: "#000",
                strokeOpacity: 1,
                strokeWeight: 1
            }} />

    </GoogleMap>
);
const MapChart = ({ mapData, centerPoints, mapMakers }) => {
    return (
        <MapWithAMarker
            containerElement={<div style={{ height: `100vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            mapData={mapData}
            centerPoints={centerPoints}
            mapMakers={mapMakers}
        />
    );
};
export default MapChart;
