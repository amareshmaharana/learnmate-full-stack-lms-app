"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyRequest() {
  const [otp, setOtp] = useState("");
  const [emailPending, startTransition] = useTransition();
  const params = useSearchParams();
  const email = params.get("email") as string;
  const isOtpCompleted = otp.length === 6;

  function verifyOtp() {
    startTransition(async () => {
      const normalizedEmail = email?.trim().toLowerCase();

      if (!normalizedEmail) {
        toast.error("Missing email address. Please start login again.");
        window.location.assign("/login");
        return;
      }

      try {
        const response = await authClient.signIn.emailOtp({
          email: normalizedEmail,
          otp,
        });

        if (response.error) {
          toast.error("Invalid OTP. Please try again.");
          return;
        }

        toast.success("Email verified successfully!!");
        window.location.assign("/");
      } catch {
        toast.error("Invalid OTP. Please try again.");
      }
    });
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please verify your email</CardTitle>
        <CardDescription>
          A verification code has been sent to your email address. Please check
          your inbox and enter the code to verify your email.
        </CardDescription>
      </CardHeader>

      <p className="text-sm text-center font-semibold text-muted-foreground">
        Enter the 6-digit code sent to your email
      </p>

      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP
            value={otp}
            onChange={(value) => setOtp(value)}
            maxLength={6}
            className="gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>

            <InputOTPSeparator />

            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          type="button"
          className="w-full cursor-pointer"
          disabled={emailPending || !isOtpCompleted}
          onClick={verifyOtp}
        >
          {emailPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            "Verify Email"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
