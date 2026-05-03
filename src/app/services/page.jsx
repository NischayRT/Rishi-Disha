import ServicesClient from './ServicesClient';

export const metadata = {
  title: 'Top Astrology & Vaastu Services',
  description: 'Explore premium services from the best Vaastu Consultant and Astrologer in Telangana. We offer expert Kundali Milan, Devata Prathista, Gemstone guidance, and career astrology.',
  alternates: {
    canonical: 'https://yourdomain.com/services',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}