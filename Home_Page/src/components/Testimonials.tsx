import { AnimatedTestimonials, type Testimonial } from '@/components/ui/animated-testimonials';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Daily Active User',
    company: 'HealthTrack Premium',
    content:
      'HealthTrack completely changed how I manage my health. The continuous vital monitoring caught an anomaly early, and the immediate video consultation allowed me to address it before it became serious. The platform is intuitive and reliable.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=80',
  },
  {
    id: 2,
    name: 'Rahul Desai',
    role: 'Premium Member',
    company: 'Frequent Traveler',
    content:
      'As a frequent traveler, having my entire medical history and lab results in one secure place is invaluable. Booking tests in new cities is seamless and reliable. The personalized health insights have been game-changing for my wellness routine.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&h=160&q=80',
  },
  {
    id: 3,
    name: 'Ananya Patel',
    role: 'Fitness Enthusiast',
    company: 'HealthTrack User',
    content:
      'The personalized trackers keep me accountable. The UI is gorgeous, and the insights are genuinely helpful rather than just raw data. The integration with my fitness devices works flawlessly. Highly recommended for anyone serious about health.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=160&h=160&q=80',
  },
  {
    id: 4,
    name: 'Dr. Vikram Mehta',
    role: 'Medical Professional',
    company: 'Apollo Hospitals',
    content:
      'As a doctor, I appreciate how HealthTrack empowers patients to take control of their health. The platform makes remote consultations efficient, and the health data sharing feature helps me provide better care. A must-have for modern healthcare.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350946848?auto=format&fit=crop&w=160&h=160&q=80',
  },
  {
    id: 5,
    name: 'Sneha Reddy',
    role: 'Working Professional',
    company: 'Tech Industry',
    content:
      'The convenience of booking lab tests at home and getting results digitally is incredible. The health trend analysis helped me identify patterns in my sleep and stress levels. The video consultation feature saved me multiple trips to the clinic.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=160&h=160&q=80',
  },
  {
    id: 6,
    name: 'Arjun Kapoor',
    role: 'Chronic Condition Manager',
    company: 'Long-term User',
    content:
      'Managing my diabetes has become so much easier with HealthTrack. The medication reminders, glucose tracking, and regular consultations with specialists all in one platform. The AI-powered insights have helped me make better lifestyle choices.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
  },
];

export function Testimonials() {
  return (
    <AnimatedTestimonials
      title="What our users have to say"
      subtitle="Don't just take our word for it. See what healthcare professionals and patients have to say about HealthTrack."
      badgeText="Trusted by thousands"
      testimonials={testimonials}
      autoRotateInterval={6000}
      trustedCompanies={["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "AIIMS", "Medanta"]}
      trustedCompaniesTitle="Trusted by leading healthcare institutions"
      className="bg-coffee-deep"
    />
  );
}
