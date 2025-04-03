import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-green-50 to-blue-50 py-16 md:py-24 mx-auto px-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Take Control of Your <span className="text-primary">Health</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Monitor your vital signs, track your progress, and get personalized 
            health insights with our comprehensive health monitoring system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/dashboard" 
              className="border-2 border-primary text-primary hover:bg-green-800 hover:text-white font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              View Your Dashboard
            </Link>
            <button className="border-2 border-primary text-primary hover:bg-green-800 hover:text-white font-medium py-3 px-6 rounded-lg transition duration-300">
              Learn More
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img 
            src="test.jpg" 
            alt="Health Dashboard" 
            className="rounded-xl shadow-xl w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;