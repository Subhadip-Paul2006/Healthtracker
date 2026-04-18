import ScrollFAQAccordion from './ui/scroll-faqaccordion';

const faqData = [
  {
    id: 1,
    question: "What is HealthTracker?",
    answer:
      "HealthTracker is a digital healthcare platform that connects patients, doctors, diagnostic labs, and pharmacies in one place. It allows users to store medical records, book appointments, track health metrics, and receive AI-powered health suggestions.",
  },
  {
    id: 2,
    question: "How does HealthTracker store my medical records?",
    answer:
      "HealthTracker securely stores your medical records in the cloud, allowing you to access them anytime and share them with doctors when needed. Your data is encrypted to ensure privacy and safety.",
  },
  {
    id: 3,
    question: "Can I book doctor appointments through HealthTracker?",
    answer:
      "Yes, you can search for verified doctors based on your location, availability, and specialization, and book appointments directly through the platform.",
  },
  {
    id: 4,
    question: "Does HealthTracker provide AI-based health suggestions?",
    answer:
      "Yes, HealthTracker uses AI to analyze your symptoms and health data to suggest possible conditions, recommended tests, and nearby doctors for consultation.",
  },
  {
    id: 5,
    question: "Can I upload lab reports and test results?",
    answer:
      "Absolutely. You can upload diagnostic reports, prescriptions, and test results, which will be stored in your profile for easy access and future reference.",
  },
  {
    id: 6,
    question: "Is my personal health data safe?",
    answer:
      "Yes, your data privacy is our top priority. HealthTracker uses secure encryption and follows strict data protection practices to keep your information confidential.",
  },
  {
    id: 7,
    question: "Can I track my daily health metrics?",
    answer:
      "Yes, you can track metrics like weight, blood pressure, sugar levels, and more, helping you monitor your health over time.",
  },
  {
    id: 8,
    question: "Is HealthTracker free to use?",
    answer:
      "HealthTracker offers basic features for free, while some advanced services (like premium AI insights or priority bookings) may be available under a paid plan.",
  },
];

export function FAQ() {
  return (
    <section className="relative z-10 overflow-hidden border-t border-sand/5 bg-transparent">
      <div className="container mx-auto px-6">
        <ScrollFAQAccordion data={faqData} />
      </div>
    </section>
  );
}
