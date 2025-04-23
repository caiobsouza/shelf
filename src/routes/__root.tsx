import { Navbar } from '@/components/Navbar';
import { AuthStore } from '@/stores/Auth.store';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

interface RouteContext {
  auth: AuthStore;
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => {
    return (
      <>
        <Navbar />
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});
