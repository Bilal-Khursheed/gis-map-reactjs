import React, { createRef, useCallback, useState } from "react";
import _debounce from 'lodash/debounce';

import { withGoogleMap, GoogleMap, Marker, Polygon, InfoWindow } from "react-google-maps";

// eslint-disable-next-line
const MapWithAMarker = withGoogleMap(({ centerPoints, mapMakers, polygonData, setLatNorth, setLatSouth, setLngEast, setLngWest }) => {

  const [selectedElement, setSelectedElement] = useState(null);
  const [activeMarker, setActiveMarker] = useState();
  let mapRef = createRef(null);



  const handleDebounceFn = (mapRef) => {
    setLatNorth(mapRef?.getBounds()?.getNorthEast().lat());
    setLatSouth(mapRef?.getBounds()?.getSouthWest().lat());
    setLngEast(mapRef?.getBounds()?.getNorthEast().lng());
    setLngWest(mapRef?.getBounds()?.getSouthWest().lng())
  };

  // eslint-disable-next-line
  const handleBoundsChange = useCallback(_debounce(handleDebounceFn, 1000), []);


  return <GoogleMap
    defaultZoom={17}
    ref={ref => mapRef = ref}
    onClick={(e) => {
      console.log("google map e data===>>>", e.latLng.lat(), 'lng===>>>', e.latLng.lng());
    }}
    onBoundsChanged={() => {
      if (mapRef && mapRef.current !== null && typeof mapRef?.getBounds !== "undefined") handleBoundsChange(mapRef)
    }}
    defaultCenter={centerPoints}
  >
    {false && mapMakers?.map((item, ind) => {
      return (
        <Marker

          key={ind}
          position={item?.cordinates}
          onClick={() => {
            setSelectedElement(item);
            setActiveMarker(ind);
          }
          }
        >
          {activeMarker === ind ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)} key={ind + 1}>
              <div><h3>{selectedElement?.region}</h3>first
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

    ))

    }
  </GoogleMap>
}
);
const MapChart = ({ centerPoints, mapMakers, polygonData, setLatNorth, setLatSouth, setLngEast, setLngWest }) => {
  return (
    <MapWithAMarker
      setLatNorth={setLatNorth}
      setLatSouth={setLatSouth}
      setLngEast={setLngEast}
      setLngWest={setLngWest}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      centerPoints={centerPoints}
      mapMakers={mapMakers}
      polygonData={polygonData}
    />
  );
};
export default MapChart;
