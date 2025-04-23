import { Shelf } from '@/components/Shelf';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/books')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Shelf />;
}
