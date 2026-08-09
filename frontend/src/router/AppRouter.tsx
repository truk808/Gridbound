import {Routes, Route, Navigate} from 'react-router-dom'
import {routes} from "./routes.tsx";
import {ROUTES} from "./const.ts";

const AppRouter = () => {
    return (
        <Routes>
            {
                routes.map(({path, element}) => {
                    return <Route key={path} element={element} path={path} />
                })
            }
            <Route path="*" element={<Navigate to={ROUTES.MAIN} replace />} />
        </Routes>
    );
};

export default AppRouter;