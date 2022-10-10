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
    const [totalCount, setTotalCount] = useState(0)
    useEffect(() => {
        fetchMaps(limit, offset)
    }, []);




    const fetchMaps = async (limit, offset) => {
        try {
            let url = FETCH_MAP_DATA + `?limit=${limit}&offset=${offset}`;
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
                setPolygonData((recent) => [...response?.polygonData?.polygons, ...recent]);
                setTotalCount(response?.polygonData?.totalCount);
                if (offset < response?.polygonData?.totalCount) {
                    setTimeout(() => {
                        fetchMaps(limit, (offset + limit))
                    }, 5000);

                }
            }

        } catch (error) {
            console.log("ERROR while fetching maps===>", error);
        }
    }
    console.log("here is data===>>>", polygonData)

    return (<>
        {mapData && mapMakers && centerPoints ? <MapComponent mapData={mapData} mapMakers={mapMakers} centerPoints={centerPoints} polygonData={polygonData} /> : null}
    </>
    )
}

export default HomePage