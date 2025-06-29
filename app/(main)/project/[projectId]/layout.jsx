import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export default async function ProjectLayout({ children }) {
    return (
        <div className="mx-auto">
            <Suspense fallback={<BarLoader width={"100%"} color="#36d7b7" />}>
                {/* <Header /> */}
                <main className="min-h-screen">{children}</main>
            </Suspense>
        </div>
    );
}
