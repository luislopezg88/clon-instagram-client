//Layaut
import LayoutBasic from "../layouts/LayoutBasic";

// Cargar las paginas del sistema de rutas
import Home from "../pages/Home";
import User from "../pages/User";
import Error404 from "../pages/Error404";

const routes = [
    {
        path: "/",
        layout: LayoutBasic,
        component: Home,
        exact: true,
    },
    {
        path: "/:username",
        layout: LayoutBasic,
        component: User,
        exact: true,
    },

    {
        layout: LayoutBasic,
        component: Error404,
    },
];

export default routes;