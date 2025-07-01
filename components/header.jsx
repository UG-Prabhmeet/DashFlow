import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import UserMenu from "./user-menu";
import { PenBox } from "lucide-react";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";
import UserLoading from "./user-loading";
import ThemeToggle from "./theme-toggle";

async function Header() {
    await checkUser();

    return (
        <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur border-b border-white/10">
            <nav className="container mx-auto flex items-center justify-between py-1 px-1">
                <div className="flex items-center">
                    <Link href="/">
                        <span className="flex items-center gap-2">
                            <Image
                                src={"/DashFlow_logo.png"}
                                alt="DashFlow Logo"
                                width={220}
                                height={66}
                                className="h-16 w-auto object-contain"
                                priority
                            />
                        </span>
                    </Link>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton forceRedirectUrl="/onboarding">
                            <Button
                                variant="outline"
                                className="border border-[#00FFA3] text-white hover:bg-[#00FFA3]/10 hover:text-[#00FFA3] px-5 py-2 rounded-full"
                            >
                                Sign In
                            </Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserMenu />
                    </SignedIn>

                    <ThemeToggle />

                    <Link href="/project/create">
                        <Button className="bg-[#00FFA3] text-black font-semibold px-5 py-2 rounded-full hover:bg-[#00e693]">
                            Create Project
                            <PenBox className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </nav>
            <UserLoading />
        </header>
    );
}

export default Header;
