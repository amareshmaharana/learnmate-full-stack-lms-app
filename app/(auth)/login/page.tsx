import { auth } from '@/lib/auth';
import { LoginForm } from './_components/LoginForm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "LearnMate | Login",
  description: "Access your LearnMate account and continue your learning journey with LearnMate.",
};

async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (session) {
    return redirect("/");
  }

  return (
    <LoginForm />
  )
}

export default LoginPage;