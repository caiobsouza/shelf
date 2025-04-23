import { useSignOut } from '@/hooks/mutations/Auth.mutation';
import { useAuthStore } from '@/stores/Auth.store';
import { Link, useRouter } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';
import React from 'react';

export const Navbar: React.FC = () => {
  const { user, clearUser } = useAuthStore();
  const router = useRouter();

  const signOut = useSignOut({
    onSuccess() {
      clearUser();
      router.navigate({ to: '/login' });
    },
  });

  const handleSignOut = () => {
    signOut.mutate();
  };

  return (
    <div className="p-2 flex gap-2 justify-between">
      <div className="flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/books" className="[&.active]:font-bold">
          Books
        </Link>
      </div>
      {user && (
        <div className="flex flex-row gap-2 items-center">
          {user.email} <LogOut size={16} className="cursor-pointer" onClick={handleSignOut} />
        </div>
      )}
    </div>
  );
};
