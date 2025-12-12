"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ArrowUpRight, GithubIcon, Loader, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");

  async function signInWithGitHub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with GitHub, you will be redirected...");
          },
          onError: () => {
            toast.error("Internal Server Error");
          },
        },
      });
    });
  }

  function signInWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              "Verification OTP sent to your email. Please check your inbox."
            );
            router.push(`/verify-request?email=${encodeURIComponent(email)}`);
          },
          onError: () => {
            toast.error("Failed to send OTP. Please try again.");
          },
        },
      });
    });
  }

  return (
    <>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back!!</CardTitle>
          <CardDescription className="font-medium">
            Continue your study with LearnMate.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <Button
            disabled={githubPending}
            onClick={signInWithGitHub}
            className="w-full cursor-pointer"
            variant="outline"
          >
            {githubPending ? (
              <>
                <Loader className="size-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <GithubIcon className="size-4" />
                Sign In with GitHub
              </>
            )}
          </Button>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-card px-2 text-muted-foreground">
              or continue with
            </span>
          </div>

          <div className="grid gap-3">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <Button
              className="w-full mt-4 cursor-pointer"
              onClick={signInWithEmail}
              disabled={emailPending}
            >
              {emailPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Continue with Email</span>
                  <ArrowUpRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
