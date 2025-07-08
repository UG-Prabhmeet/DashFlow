import React from "react";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 container mx-auto mt-5 px-4 pt-20">
                {children}
            </main>
            <footer className="w-full border-t text-sm text-muted-foreground py-3 px-4 text-center">
                © {2025} DashFlow. All rights reserved. • v1.0.0
            </footer>
        </div>
    );
};

export default Layout;
