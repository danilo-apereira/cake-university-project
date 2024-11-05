import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import NotFound from '../pages/NotFound/NotFound'

function AppRoutes() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes
