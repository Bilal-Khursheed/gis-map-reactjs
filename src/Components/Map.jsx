import React, { useEffect, useRef, useState } from "react";

import {
    withGoogleMap,
    GoogleMap,
    Marker,
    Polygon,
    InfoWindow
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

const MapWithAMarker = withGoogleMap(({ centerPoints, mapMakers, polygonData }) => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [activeMarker, setActiveMarker] = useState();

    const mapRef = useRef(null);
    console.log("here is reffff===>>>", mapRef.current)
    // Fit bounds function
    const fitBounds = () => {
        const bounds = new window.google.maps.LatLngBounds();
        mapMakers.map(item => {
            bounds.extend(item.cordinates);
            return item.id
        });
        mapRef.current.fitBounds(bounds);
    };

    // Fit bounds on mount, and when the markers change
    useEffect(() => {
        fitBounds();
    }, [mapMakers]);

    return <GoogleMap
        defaultZoom={4}
        ref={mapRef}
        // defaultCenter={{ lng: props?.centerPoints && parseInt(props?.centerPoints[0]), lat: props?.centerPoints && parseInt(props?.centerPoints[1]) }}
        // defaultCenter={{ lng: -73.93279080176559, lat: 40.727263865864586 }}
        defaultCenter={centerPoints}
    >
        {
            mapMakers?.map((item, ind) => {
                return (
                    <Marker

                        key={ind}
                        // position={{ lng: mapPoints?.coordinates[0], lat: mapPoints?.coordinates[1] }}
                        position={item?.cordinates}
                        onClick={() => {
                            setSelectedElement(item);
                            setActiveMarker(ind);
                        }
                        }
                    >
                        {activeMarker === ind ? (
                            <InfoWindow onCloseClick={() => setActiveMarker(null)} key={ind + 1}>
                                <div><h3>{selectedElement?.region}</h3>
                                    <label>Address: {selectedElement?.address}</label>
                                    <span>Postal Code: {selectedElement?.postcode}</span>
                                </div>

                            </InfoWindow>
                        ) : null}
                    </Marker>
                )
            })
        }
        {polygonData?.map((item, ind) => (
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
}
);
const MapChart = ({ mapData, centerPoints, mapMakers, polygonData }) => {

    return (
        <MapWithAMarker
            containerElement={<div style={{ height: `100vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            mapData={mapData}
            centerPoints={centerPoints}
            mapMakers={mapMakers}
            onMapIdle={() => { console.log('map is ready') }}
            polygonData={polygonData}
        />
    );
};
export default MapChart;
