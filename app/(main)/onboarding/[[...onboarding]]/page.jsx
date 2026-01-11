"use client";

import { OrganizationList } from "@clerk/nextjs";

export default function Onboarding() {
    return (
        <div className="flex justify-center items-center pt-32">
            <OrganizationList
                hidePersonal
                afterCreateOrganizationUrl="/organization/:slug"
                afterSelectOrganizationUrl="/organization/:slug"
            />
        </div>
    );
}
