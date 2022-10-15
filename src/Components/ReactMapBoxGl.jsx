import React, { createRef, useCallback } from "react";
import _debounce from 'lodash/debounce';
import Map, { Layer, Source } from "react-map-gl";

const layerStyle = {
  id: "zoneomics",
  type: "fill",
  paint: {
    // "fill-color": ["match", ["get", "z"], ["literal", COUNTRY_PALETTE]],
    // "fill-color": ["at", ["get", "layerName"], 'zones','red'],
    "fill-color":'pink',
    "fill-outline-color": "red",
    "fill-opacity": 0.2,
  },
};

const MapChart = ({ polygonData, setLatNorth, setLatSouth, setLngEast, setLngWest }) => {
  const MAPBOX_TOKEN = 'pk.eyJ1IjoiaGFzbmF0dWxoYXEiLCJhIjoiY2wwdzBjb3JrMTc3ajNkbjUyaDljbG8zcyJ9.zR9o-L0WGPt1JKTHd0oUFg';
  let mapRef = createRef(null);
  const handleDebounceFn = (mapRef) => {
    console.log("Map box working", mapRef?.getBounds()._ne)
    setLatNorth(mapRef?.getBounds()?._ne.lat);
    setLatSouth(mapRef?.getBounds()?._sw.lat);
    setLngEast(mapRef?.getBounds()?._ne.lng);
    setLngWest(mapRef?.getBounds()?._sw.lng)
  };
  // eslint-disable-next-line
  const handleBoundsChange = useCallback(_debounce(handleDebounceFn, 200), []);
  return (

    <Map
      style={{ height: '100vh' }}
      initialViewState={{
        // 40.63795919654427 lng===>>> -73.97848926007936
        longitude: -73.97848926007936,
        latitude: 40.63795919654427,
        zoom: 17
      }}
      ref={ref => mapRef = ref}
      onMove={() => {
        if (mapRef && mapRef.current !== null && typeof mapRef?.getBounds !== "undefined") handleBoundsChange(mapRef)
      }}
      onClick={(e) => {
        console.log("google map e data===>>>", e.lngLat.lat, 'lng===>>>', e.lngLat.lng);
      }}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"

    >
      <Source id="my-data" type="geojson" data={polygonData}>
        <Layer {...layerStyle} />
      </Source>
    </Map>
  );
};
export default MapChart;
