import React from 'react';
import { useBooks } from '@/hooks/queries/useBooks.query';
import { Bug, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';

export const Shelf: React.FC = () => {
  const { data: books, isPending, isError, error } = useBooks({ filter: {} });

  if (isPending) return <Loader2 size={24} />;

  if (isError)
    return (
      <Alert variant="destructive">
        <Bug size={16} className="h-4 w-4" />
        <AlertTitle>Ops!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );

  return (
    <div className="grid grid-cols-4">
      {Array.isArray(books.data) &&
        books.data.map((book) => (
          <Card>
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
              <CardDescription>{book.authorNames}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={book.coverUrl} />
            </CardContent>
            <CardFooter>{book.publisher.name}</CardFooter>
          </Card>
        ))}
    </div>
  );
};
