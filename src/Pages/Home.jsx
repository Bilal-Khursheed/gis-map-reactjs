import React, { useEffect, useState } from 'react'
import MapComponent from '../Components/Map'
import { FETCH_MAP_DATA } from '../Settings/Constant';
import { sendRequest } from '../Utils/apiService';

const HomePage = () => {
    const [mapData, setMapData] = useState();
    const [centerPoints, setCenterPoints] = useState();
    const [mapMakers, setMapMakers] = useState();
    const [polygonData, setPolygonData] = useState();
    useEffect(() => {
        const fetchMaps = async () => {
            try {
                let url = FETCH_MAP_DATA;
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
                    setPolygonData(response?.polygonData)
                }

            } catch (error) {
                console.log("ERROR while fetching maps===>", error);
            }
        }
        fetchMaps()
    }, [])

    return (<>
        {mapData && mapMakers && centerPoints ? <MapComponent mapData={mapData} mapMakers={mapMakers} centerPoints={centerPoints} polygonData={polygonData} /> : null}
    </>
    )
}

export default HomePage