import { Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import NavbarLayout from './layouts/NavbarLayout'
import Home from '../pages/Home/Home'
import Auth from '../pages/Auth/Auth'
import NotFound from '../pages/NotFound/NotFound'
import Confeitaria from '../pages/Confeitaria/Confeitaria'

const routes = [
    {
        layout: PublicLayout,
        paths: [
            { path: "/", element: <Home /> },
            { path: "/user/auth", element: <Auth /> },
            { path: "*", element: <NotFound /> }
        ]
    },
    {
        layout: NavbarLayout,
        paths: [
            { path: "/confeitaria", element: <Confeitaria /> }
        ]
    }
];

function AppRoutes() {
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} element={<route.layout />}>
                    {route.paths.map((path, idx) => (
                        <Route
                            key={idx}
                            path={path.path}
                            index={path.path === "/" ? true : undefined}
                            element={path.element}
                        />
                    ))}
                </Route>
            ))}
        </Routes>
    );
}

export default AppRoutes
