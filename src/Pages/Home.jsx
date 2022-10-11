import React, { useEffect, useState } from 'react'
import MapComponent from '../Components/Map'
import { FETCH_MAP_DATA } from '../Settings/Constant';
import { sendRequest } from '../Utils/apiService';

const HomePage = () => {
    const [mapData, setMapData] = useState();
    const [centerPoints, setCenterPoints] = useState();
    const [mapMakers, setMapMakers] = useState();
    const [polygonData, setPolygonData] = useState([]);
    const [limit, setLimit] = useState(1000);
    const [offset, setOffset] = useState(0);
    // -73.97395491223583,40.650719856408784,-74.02588247876415,40.62101884532627,
    const [lngWest, setLngWest] = useState(-73.97395491223583);
    const [latSouth, setLatSouth] = useState(40.650719856408784);
    const [lngEast, setLngEast] = useState(-74.02588247876415);
    const [latNorth, setLatNorth] = useState(40.62101884532627);
    const [totalCount, setTotalCount] = useState(0)
    useEffect(() => {
        fetchMaps(lngWest, latSouth, lngEast, latNorth)
    }, [lngWest, latSouth, lngEast, latNorth]);

    console.log("Lat lng=====>>>", lngWest, latSouth, lngEast, latNorth, totalCount)


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
                setMapData(response);
                setPolygonData(response?.polygonData?.polygons);
                setTotalCount(response?.polygonData?.totalCount);
                // if (offset < response?.polygonData?.totalCount) {
                //     setTimeout(() => {
                //         fetchMaps(limit, (offset + limit))
                //     }, 5000);

                // }
            }

        } catch (error) {
            console.log("ERROR while fetching maps===>", error);
        }
    }
    console.log("here is data===>>>", polygonData)

    return (<>
        {mapData && mapMakers && centerPoints ? <MapComponent setLatNorth={setLatNorth} setLatSouth={setLatSouth} setLngEast={setLngEast} setLngWest={setLngWest} mapData={mapData} mapMakers={mapMakers} centerPoints={centerPoints} polygonData={polygonData} /> : null}
    </>
    )
}

export default HomePage