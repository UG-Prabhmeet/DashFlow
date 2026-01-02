import React from "react";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 container mx-auto mt-5 px-4 pt-20">
                {children}
            </main>
        </div>
    );
};

export default Layout;
