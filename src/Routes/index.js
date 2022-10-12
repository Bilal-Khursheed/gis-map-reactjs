import { useRoutes } from 'react-router-dom';
import getRoutes from './Routes';

const RouterConfig = () => {
    return useRoutes(getRoutes());
};

export default RouterConfig;