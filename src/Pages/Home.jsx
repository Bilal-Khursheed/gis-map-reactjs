import React, { useEffect, useState } from 'react'
import MapComponent from '../Components/Map'
import { FETCH_MAP_DATA } from '../Settings/Constant';
import { sendRequest } from '../Utils/apiService';

const HomePage = () => {
    const [centerPoints, setCenterPoints] = useState();
    const [mapMakers, setMapMakers] = useState();
    const [polygonData, setPolygonData] = useState([]);
    // -73.98442970695503 40.633985690721445 -73.97144781532295 40.64141074027972
    const [lngWest, setLngWest] = useState(-73.98442970695503);
    const [latSouth, setLatSouth] = useState(40.633985690721445);
    const [lngEast, setLngEast] = useState(-73.97144781532295);
    const [latNorth, setLatNorth] = useState(40.64141074027972);
    useEffect(() => {
        fetchMaps(lngWest, latSouth, lngEast, latNorth)
    }, [lngWest, latSouth, lngEast, latNorth]);
    const fetchMaps = async (lngWest, latSouth, lngEast, latNorth) => {
        try {
            let url = FETCH_MAP_DATA + `?lngWest=${lngWest}&latSouth=${latSouth}&lngEast=${lngEast}&latNorth=${latNorth}`;
            let init = {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            };
            let response = await sendRequest(url, init);
            if (response && response.success) {
                response = response.data
                setCenterPoints(response?.pointData?.centerPoints);
                setMapMakers(response?.pointData?.mapPoints);
                setPolygonData(response?.polygonData?.polygons);
            }

        } catch (error) {
            console.log("ERROR while fetching maps===>", error);
        }
    }
    return (<>
        {mapMakers && centerPoints && polygonData ? <MapComponent setLatNorth={setLatNorth} setLatSouth={setLatSouth} setLngEast={setLngEast} setLngWest={setLngWest} mapMakers={mapMakers} centerPoints={centerPoints} polygonData={polygonData} /> : null}
    </>
    )
}

export default HomePage