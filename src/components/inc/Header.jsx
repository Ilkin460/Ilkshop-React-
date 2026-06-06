import React, { useState } from 'react'
import { Link } from "react-router"; 
import logoImg from '../../assets/img/gallery/logo.svg' 

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-orange-100 transition-all duration-300">
      <div className="max-w-360 mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        
        <div className="flex items-center gap-2 shrink-0">
          <img src={logoImg} alt="Foodwagon Logo" className="h-8 w-auto object-contain" />
          <span className="text-2xl font-black tracking-tight select-none">
            <span className="text-orange-500">food</span>
            <span className="text-amber-500">waGon</span>
          </span>
        </div>

        <div className="hidden min-[1200px]:flex items-center justify-center gap-2 text-sm whitespace-nowrap px-16 flex-1 mr-26">
          <span className="font-bold text-slate-800">Deliver to:</span>
          <svg className="w-4 h-4 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span className="text-slate-500">Current Location</span>
          <span className="font-bold text-slate-700">Mirpur 1 Bus Stand, Dhaka</span>
        </div>

        <div className="hidden min-[993px]:flex items-center justify-end gap-4">
          
          <div className="relative w-full max-w-70 xl:max-w-xs shrink-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search Food" 
              className="w-full bg-slate-50 border-none rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition"
            />
          </div>

          <button className="flex items-center gap-2 text-amber-500 hover:text-amber-600 bg-amber-50 hover:bg-amber-100 font-bold px-5 py-2.5 rounded-xl transition shadow-sm shrink-0">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            Login
          </button>
        </div>

        <div className="min-[993px]:hidden flex items-center shrink-0">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-slate-800 focus:outline-none p-2 hover:bg-slate-50 rounded-lg transition"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={`absolute top-full left-0 right-0 bg-white border-b border-orange-100 shadow-lg transition-all duration-300 ease-in-out min-[993px]:hidden ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
        <div className="flex flex-col p-5 gap-4">
          
          <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl text-sm">
            <svg className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div>
              <div className="font-bold text-slate-800">Deliver to: <span className="text-slate-500 font-normal">Current Location</span></div>
              <div className="font-medium text-slate-600 mt-0.5">Mirpur 1 Bus Stand, Dhaka</div>
            </div>
          </div>

          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search Food" 
              className="w-full bg-slate-50 border-none rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
            />
          </div>
          
          <button 
            onClick={() => setIsOpen(false)} 
            className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition shadow-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            Login
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header