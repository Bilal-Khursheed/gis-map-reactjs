import React, { useEffect, useState } from 'react'
import MapComponent from '../Components/Map'
import { FETCH_MAP_DATA } from '../Settings/Constant';
import { sendRequest } from '../Utils/apiService';

const HomePage = () => {
    const [mapData, setMapData] = useState();
    const [centerPoints, setCenterPoints] = useState();
    const [mapMakers, setMapMakers] = useState()
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
                    setCenterPoints(response && response && response.length && JSON.parse(response[0].cordinates).coordinates);
                    const mapPoints = response.map(item => {
                        const parsedData = JSON.parse(item.cordinates);
                        return { lng: parsedData?.coordinates[0], lat: parsedData?.coordinates[1] }
                    })

                    setMapMakers(mapPoints)
                    setMapData(response)
                }

            } catch (error) {
                console.log("ERROR while fetching maps===>", error);
            }
        }
        fetchMaps()
    }, [])

    return (<>
        {mapData && mapMakers && centerPoints ? <MapComponent mapData={mapData} mapMakers={mapMakers} centerPoints={centerPoints} /> : null}
    </>
    )
}

export default HomePage