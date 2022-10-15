import React, { useState } from "react";
import _debounce from 'lodash/debounce';
import Map, { Layer, Source } from "react-map-gl";
const COUNTRY_PALETTE = ["#f0d27e", "#789d23", "#c06e51", "#b3e467", "#84241a", "#d9c0c7", "#f0d27e", "#789d23", "#c06e51", "#b3e467", "#84241a", "#d9c0c7", "#f0d27e", "#789d23", "#c06e51", "#b3e467", "#84241a", "#d9c0c7", "#d9c0c7", "#f0d27e", "#789d23", "#c06e51", "#b3e467", "#84241a", "#d9c0c7"]

const layerStyle = {
  id: "zoneomics",
  type: "fill",
  source: "zoneomics",
  "source-layer": "zones",
  paint: {
    // "fill-color": ["match", ["get", "z"], ["literal", COUNTRY_PALETTE]],
    // "fill-color": ["at", ["get", "layerName"], 'zones','red'],
    // "fill-color": [
    //   "step",
    //   ["number", ["get", "z"]],
    //   "#000000",
    //   0,
    //   "#ff0000",
    //   20,
    //   "#ffff00",
    //   42549
    // ],

    "fill-outline-color": "blue",
    "fill-opacity": 0.5,
  },
};

const MVTMap = () => {

  const [zooming, setZooming] = useState(true)

  const MAPBOX_TOKEN = 'pk.eyJ1IjoiaGFzbmF0dWxoYXEiLCJhIjoiY2wwdzBjb3JrMTc3ajNkbjUyaDljbG8zcyJ9.zR9o-L0WGPt1JKTHd0oUFg';

  return (

    <Map
      style={{ height: '100vh' }}
      initialViewState={{
        // 40.63795919654427 lng===>>> -73.97848926007936
        longitude: -73.97848926007936,
        latitude: 40.63795919654427,
        // zoom: 17
        zoom: 16
      }}
      // onZoom={(e) => {
      //   console.log("event", e.viewState.zoom);
      //   if (e.viewState.zoom < 15) {
      //     setZooming(false)
      //   } else {
      //     setZooming(true)
      //   }
      // }}
      // onZoomStart={(e)=>console.log("zoom", e.)}
      maxzoom={22}
      minzoom={15}
      // doubleClickZoom={zooming}
      // scrollZoom={zooming}
      // touchZoom={zooming}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    // onLoad={(e)=>{console.log("here is e ", e.target.)}}
    // onSourceData={(e)=>console.log('events===>>>', e.tile)}

    >
      <Source
        id="zoneomics"
        type="vector"
        tiles={[
          "https://testing-api.zoneomics.com/tiles/zones?x={x}&y={y}&z={z}&city_id=265"
        ]}
        addsource="zoneomics"
        maxzoom={22}
        minzoom={15}

      >
        {/* <Layer {...layerlabel}></Layer> */}
        <Layer {...layerStyle}></Layer>
      </Source>
    </Map>
  );
};
export default MVTMap;
