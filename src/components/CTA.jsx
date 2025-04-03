import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-16 bg-primary mx-auto px-10 ">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control of Your Health?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already improving their health with our system.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/dashboard" 
            className="bg-black text-white font-medium py-3 px-8 rounded-lg transition duration-300"
          >
            Get Started
          </Link>
          <button className="border-2 border-white bg-black text-white font-medium py-3 px-8 rounded-lg  transition duration-300">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;