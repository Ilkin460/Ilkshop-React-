import React from 'react';
import { Link } from 'react-router';

function Footer() {
  const cityColumns = [
    ["San Francisco", "Miami", "San Diego", "East Bay", "Long Beach"],
    ["Los Angeles", "Washington DC", "Seattle", "Portland", "Nashville"],
    ["New York City", "Orange County", "Atlanta", "Charlotte", "Denver"],
    ["Chicago", "Phoenix", "Las Vegas", "Sacramento", "Oklahoma City"],
    ["Columbus", "New Mexico", "Albuquerque", "Sacramento", "New Orleans"]
  ];

  return (
    <footer className="w-full bg-[#212121] text-[#9E9E9E] pt-16 pb-12 font-sans">
      <div className="max-w-360 mx-auto px-4 sm:px-12">
        
        <div>
          <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-8">
            Our Top Cities
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-sm">
            {cityColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-3">
                {column.map((city, cityIndex) => (
                  <Link 
                    key={cityIndex} 
                    to="#" 
                    className="hover:text-amber-500 transition-colors duration-200"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <hr className="border-[#424242] my-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-sm">
          
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-white font-bold tracking-wider uppercase mb-2">Company</h4>
            <Link to="#" className="hover:text-amber-500 transition shadow-sm">About Us</Link>
            <Link to="#" className="hover:text-amber-500 transition shadow-sm">Team</Link>
            <Link to="#" className="hover:text-amber-500 transition shadow-sm">Careers</Link>
            <Link to="#" className="hover:text-amber-500 transition shadow-sm">blog</Link>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-white font-bold tracking-wider uppercase mb-2">Contact</h4>
            <Link to="#" className="hover:text-amber-500 transition shadow-sm">Help & Support</Link>
            <Link to="#" className="hover:text-amber-500 transition shadow-sm">Partner with us</Link>
            <Link to="#" className="hover:text-amber-500 transition shadow-sm">Ride with us</Link>
            <Link to="#" className="hover:text-amber-500 transition shadow-sm">Ride with us</Link>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-white font-bold tracking-wider uppercase mb-2">Legal</h4>
            <Link to="#" className="hover:text-amber-500 transition shadow-sm">Terms & Conditions</Link>
            <Link to="#" className="hover:text-amber-500 transition shadow-sm">Refund & Cancellation</Link>
            <Link to="#" className="hover:text-amber-500 transition shadow-sm">Privacy Policy</Link>
            <Link to="#" className="hover:text-amber-500 transition shadow-sm">Cookie Policy</Link>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-white font-bold tracking-wider uppercase mb-2">Legal</h4>
            <Link to="#" className="hover:text-amber-500 transition shadow-sm">Terms & Conditions</Link>
            <Link to="#" className="hover:text-amber-500 transition shadow-sm">Refund & Cancellation</Link>
            <Link to="#" className="hover:text-amber-500 transition shadow-sm">Privacy Policy</Link>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4 lg:pl-4">
            
            <div>
              <h4 className="text-white font-bold tracking-wider uppercase mb-3">Follow Us</h4>
              <div className="flex items-center gap-4 text-white">
                <Link to="#" className="hover:text-amber-500 transition" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </Link>
                <Link to="#" className="hover:text-amber-500 transition" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </Link>
                <Link to="#" className="hover:text-amber-500 transition" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Link>
              </div>
            </div>

            <div className="mt-2">
              <p className="text-white font-bold text-base leading-snug max-w-sm">
                Receive exclusive offers and discounts in your mailbox
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-center gap-3 mt-1 w-full max-w-md">
              <div className="relative w-full flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <svg className="w-4 h-4 text-[#9E9E9E]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <input 
                  type="email" 
                  placeholder="Enter Email" 
                  className="w-full bg-[#424242] text-white placeholder-[#757575] border-none rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
                />
              </div>
              <button 
                type="submit" 
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-lg text-sm transition shadow-md whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;