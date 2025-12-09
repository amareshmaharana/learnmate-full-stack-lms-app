import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GithubIcon } from 'lucide-react';
import React from 'react'

const LoginPage = () => {
  return (
    <>
      <Card>
        <CardHeader className='text-center'>
            <CardTitle className='text-2xl font-bold'>Welcome Back!!</CardTitle>
            <CardDescription className='font-medium'>Continue your study with LearnMate.</CardDescription>
        </CardHeader>

        <CardContent className='flex flex-col gap-4'>
            <Button className='w-full cursor-pointer' variant='outline'>
                <GithubIcon className='size-4' />
                Sign In with GitHub
            </Button>

            <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                <span className="relative z-10 bg-card px-2 text-muted-foreground">or continue with</span>
            </div>

            <div className='grid gap-3'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input type='email' placeholder='you@example.com' />
              </div>

              <Button className='w-full mt-4 cursor-pointer'>Continue with Email</Button>
            </div>
        </CardContent>
      </Card>
    </>
  )
}

export default LoginPage;