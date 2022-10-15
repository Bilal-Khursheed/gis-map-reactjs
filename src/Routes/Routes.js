import MVTMap from "../Components/MVTMap";
import ReactGoogleMap from "../Pages/ReactGoogleMap";
import ReactMapGl from '../Pages/ReaxctMapGl'

const getRoutes = () => {
    return [
        {
            element: <ReactGoogleMap />,
            path: '',
            exact:true
        },
        {
            element: <ReactMapGl />,
            path: '/map2'
        },
        {
            element: <MVTMap />,
            path: '/map3'
        },

    ];
};

export default getRoutes;