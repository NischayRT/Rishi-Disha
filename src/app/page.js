import HomeClient from './HomeClient';

export const metadata = {
  title: 'Best Jyotish in Hyderabad & Telangana',
  description: 'Consult the best AstroVaastu Consultant in Hyderabad. Discover accurate Kundali readings, expert Vaastu consultations, and authentic Vedic remedies at RishiDisha.',
  alternates: {
    canonical: 'https://yourdomain.com', // REMEMBER: Replace this with your actual domain later!
  },
};

export default function Home() {
  return <HomeClient />;
}