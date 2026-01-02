import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import UserMenu from "./user-menu";
import { PenBox } from "lucide-react";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";
import UserLoading from "./user-loading";

async function Header() {
    await checkUser();

    return (
        <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur border-b border-white/10">
            <nav className="container mx-auto flex items-center justify-between py-1 px-1">
                <div className="flex items-center">
                    <Link href="/">
                        <span className="flex items-center gap-2">
                            <Image
                                src="/DashFlow_logo.png"
                                alt="DashFlow Logo"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="h-12 w-32 md:h-16 md:w-56 object-contain"
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
                                className="bg-black/40 text-[#E0E0E0] hover:bg-[#E0E0E0]/10 hover:text-[#E0E0E0] px-5 py-2 rounded-full transition-colors"
                            >
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserMenu />
                    </SignedIn>

                    <Link href="/project/create">
                        <Button className="bg-[#E0E0E0] text-black font-semibold px-5 py-2 rounded-full hover:bg-[#00e693]">
                            <span className="hidden md:inline">
                                Create Project
                            </span>
                            <PenBox className="ml-0 md:ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </nav>
            <UserLoading />
        </header>
    );
}

export default Header;
