import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Book Explorer',
  description: 'Get in touch with the Book Explorer team. We\'d love to hear your feedback, questions, or suggestions for improving our book discovery platform.',
  keywords: 'contact book explorer, support, feedback, help, book discovery support',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}