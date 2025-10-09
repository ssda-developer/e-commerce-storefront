import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;
