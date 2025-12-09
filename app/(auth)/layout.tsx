import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import Logo from "@/public/lms-logo.png"

export default function AuthLayout(
    { children }: { children: ReactNode }
) {
    return (
        <div className="flex relative min-h-svh flex-col items-center justify-center">

            <Link href="/" className={buttonVariants({
                variant: "outline",
                className: "absolute top-4 left-4 md:top-8 md:left-8"
            })}>
                <ArrowLeft className="size-4" />Back
            </Link>

            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link href="/" className="flex self-center text-2xl font-bold text-center gap-2">
                    <Image src={Logo} alt="logo" height={32} width={32} />
                    LearnMate.
                </Link>
                {children}

                <div className="text-balance text-center text-muted-foreground text-sm">
                    By clicking continue, you agree to our <span className="hover:text-primary hover:underline hover:font-medium"><Link href="/terms-of-service">Terms of Service</Link></span>
                    {" "}
                    and <span className="hover:text-primary hover:underline hover:font-medium"><Link href="/privacy-policy">Privacy Policy</Link></span>
                </div>
            </div>
        </div>
    );
}