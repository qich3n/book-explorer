import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Book Explorer',
  description: 'Learn about Book Explorer - your gateway to discovering millions of books from around the world. Built with modern technology and powered by Open Library.',
  keywords: 'about book explorer, open library, book search, literary discovery, reading platform',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}