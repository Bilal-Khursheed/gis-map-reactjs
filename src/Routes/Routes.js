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

    ];
};

export default getRoutes;