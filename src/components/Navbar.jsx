import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 container mx-auto px-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          HealthTrack
        </Link>
        
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-gray-700 hover:text-primary transition">Home</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-primary transition">Dashboard</Link>
          <Link to="/ecg" className="text-gray-700 hover:text-primary transition">ECG</Link>
          <Link to="/team" className="text-gray-700 hover:text-primary transition">Team</Link>
          <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryDark transition">
            Sign In
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button className="md:hidden text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;