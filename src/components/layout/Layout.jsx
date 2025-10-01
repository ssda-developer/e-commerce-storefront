import { Outlet } from "react-router";

function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <header>Header</header>

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
                <Outlet/>
            </main>

            <footer>Footer</footer>
        </div>
    );
}

export default Layout;
