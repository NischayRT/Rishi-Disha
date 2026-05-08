import BookClient from './BookClient';

export const metadata = {
  title: 'Book a Consultation | RishiDisha',
  description: 'Securely book your astrology and Vaastu consultation online. Generate your payment QR and submit your details.',
  alternates: {
    canonical: 'https://yourdomain.com/book',
  },
};

export default function BookPage() {
  return <BookClient />;
}