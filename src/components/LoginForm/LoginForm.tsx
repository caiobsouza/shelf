import React from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from './schema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignIn } from '@/hooks/mutations/Auth.mutation';
import { useRouter } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/Auth.store';
import { Button } from '@/components/ui/button';
import { ShieldX } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

interface Props {
  redirectTo?: string;
}

export const LoginForm: React.FC<Props> = ({ redirectTo }) => {
  const { register, handleSubmit, reset } = useForm<LoginSchema>({
    mode: 'onBlur',
    resolver: loginSchema,
  });

  const router = useRouter();
  const { setUser, setAuthError, getAuthError } = useAuthStore();
  const signIn = useSignIn();

  const onSubmit = (data: LoginSchema) => {
    signIn.mutate(data, {
      onSuccess({ user }) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });

        setAuthError(null);

        router.navigate({
          to: redirectTo || '/books',
        });
      },
      onError(error) {
        setAuthError(error);
        console.error(error);
      },
    });
    reset();
  };

  const error = getAuthError();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Email</Label>
        <Input id="email" type="text" {...register('email')} />
        <Label htmlFor="name">Senha</Label>
        <Input id="password" type="password" {...register('password')} />
        <Button type="submit" isLoading={signIn.isPending} loadingText="Signing in...">
          Sign in
        </Button>
        {error && (
          <Alert variant="destructive">
            <ShieldX className="h-4 w-4" />
            <AlertTitle>Ops!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </form>
  );
};
