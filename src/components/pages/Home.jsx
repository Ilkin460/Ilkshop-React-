import React, { useState } from 'react'

// 1. Hero 
import heroImg from '../../assets/img/gallery/hero-header.png' 

// 2. Flash Deals 
import discountImg1 from '../../assets/img/gallery/discount-item-1.png'
import discountImg2 from '../../assets/img/gallery/discount-item-2.png'
import discountImg3 from '../../assets/img/gallery/discount-item-3.png'
import discountImg4 from '../../assets/img/gallery/discount-item-4.png'

// 3. How It Works
import locationIcon from '../../assets/img/gallery/location.png'
import orderIcon from '../../assets/img/gallery/order.png'
import payIcon from '../../assets/img/gallery/pay.png'
import mealsIcon from '../../assets/img/gallery/meals.png'

// 4. Search by Food 
import searchPizza from '../../assets/img/gallery/search-pizza.png'
import burger from '../../assets/img/gallery/burger.png'
import noodles from '../../assets/img/gallery/noodles.png'
import subSandwich from '../../assets/img/gallery/sub-sandwich.png'
import chowmein from '../../assets/img/gallery/chowmein.png'
import steak from '../../assets/img/gallery/steak.png'

// 5. Popular Items
import cheeseBurger from '../../assets/img/gallery/cheese-burger.png'
import toffesCake from '../../assets/img/gallery/toffes-cake.png'
import dancake from '../../assets/img/gallery/dancake.png'
import crispySandwitch from '../../assets/img/gallery/crispy-sandwitch.png'
import thaiSoup from '../../assets/img/gallery/thai-soup.png'

// 6. Featured Restaurants
import foodWorldLogo from '../../assets/img/gallery/food-world-logo.png'
import pizzahubLogo from '../../assets/img/gallery/pizzahub-logo.png'
import donutsHutLogo from '../../assets/img/gallery/donuts-hut-logo.png'
import donutHutLogo from '../../assets/img/gallery/donut-hut-logo.png'
import rubyTuesdayLogo from '../../assets/img/gallery/ruby-tuesday-logo.png'
import kuakata from '../../assets/img/gallery/kuakata.png'
import redSquareLogo from '../../assets/img/gallery/red-square-logo.png'
import tacoBellLogo from '../../assets/img/gallery/taco-bell-logo.png'

// 7. Promo CTA 
import subSandwich2 from '../../assets/img/gallery/crispy-sandwiches.png'
import friedChicken from '../../assets/img/gallery/fried-chicken.png'
import pizzaPng from '../../assets/img/gallery/pizza.png'

// 8. Best deals CTA 
import ctaTwoBg from '../../assets/img/gallery/cta-two-bg.png'

function Home() {
  const [activeTab, setActiveTab] = useState('delivery')

  // Flash Deals
  const discountItems = [
    { id: 1, title: 'Flat Hill Slingback', discount: '15', daysRemaining: 6, image: discountImg1 },
    { id: 2, title: 'Ocean Blue Ring', discount: '10', daysRemaining: 6, image: discountImg2 },
    { id: 3, title: 'Brown Leathered Wallet', discount: '25', daysRemaining: 6, image: discountImg3 },
    { id: 4, title: 'Silverside Wristwatch', discount: '20', daysRemaining: 6, image: discountImg4 },
  ]

  // How It Works
  const steps = [
    { id: 1, image: locationIcon, title: 'Select location', description: 'Choose the location where your food will be delivered.' },
    { id: 2, image: orderIcon, title: 'Choose order', description: 'Check over hundreds of menus to pick your favorite food' },
    { id: 3, image: payIcon, title: 'Pay advanced', description: "It's quick, safe, and simple. Select several methods of payment" },
    { id: 4, image: mealsIcon, title: 'Enjoy meals', description: 'Food is made and delivered directly to your home.' },
  ]

  // Popular Items
  const popularItems = [
    { id: 1, title: 'Cheese Burger', restaurant: 'Burger Arena', price: '3.88', image: cheeseBurger },
    { id: 2, title: 'Toffe\'s Cake', restaurant: 'Top Sticks', price: '4.00', image: toffesCake },
    { id: 3, title: 'Dancake', restaurant: 'Cake World', price: '1.99', image: dancake },
    { id: 4, title: 'Crispy Sandwitch', restaurant: 'Fastfood Dine', price: '3.00', image: crispySandwitch },
    { id: 5, title: 'Thai Soup', restaurant: 'Foody Man', price: '2.79', image: thaiSoup },
  ]

  // Featured Restaurants
  const featuredRestaurants = [
    { id: 1, name: 'Food world', rating: '46', discount: '20', status: 'Opens Tomorrow', isOpen: false, logo: foodWorldLogo, image: steak },
    { id: 2, name: 'Pizza hub', rating: '40', discount: '10', status: 'Opens Tomorrow', isOpen: false, logo: pizzahubLogo, image: searchPizza },
    { id: 3, name: 'Donuts hut', rating: '20', discount: '15', status: 'Open Now', isOpen: true, logo: donutsHutLogo, image: subSandwich },
    { id: 4, name: 'Donuts hut', rating: '50', discount: '15', status: 'Open Now', isOpen: true, logo: donutHutLogo, image: burger },
    { id: 5, name: 'Ruby tuesday', rating: '50', discount: '10', status: 'Open Now', isOpen: true, logo: rubyTuesdayLogo, image: chowmein },
    { id: 6, name: 'Kuakata Fried Chicken', rating: '50', discount: '10', status: 'Open Now', isOpen: true, logo: noodles, image: kuakata},
    { id: 7, name: 'Kuakata Fried Chicken', rating: '50', discount: '10', status: 'Open Now', isOpen: true, logo: redSquareLogo, image: subSandwich },
    { id: 8, name: 'Taco bell', rating: '50', discount: '10', status: 'Open Now', isOpen: true, logo: tacoBellLogo, image: burger }
  ]

  // Search by Food
  const foodCategories = [
    { id: 1, name: 'pizza', image: searchPizza },
    { id: 2, name: 'Burger', image: burger },
    { id: 3, name: 'Noodles', image: noodles },
    { id: 4, name: 'Sub-sandwiches', image: subSandwich },
    { id: 5, name: 'Chowmein', image: chowmein },
    { id: 6, name: 'Steak', image: steak },
  ]

  return (
    <div className="w-full min-h-screen bg-white">
      
      {/* 1. HERO */}
      <section className="w-full bg-[#FFB30E] pt-8 pb-16 lg:py-0 lg:h-[600px] flex items-center relative overflow-hidden group">
        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-12 flex flex-col-reverse lg:grid lg:grid-cols-12 items-center gap-8 h-full">
          <div className="w-full lg:col-span-6 flex flex-col items-center lg:items-start justify-center text-center lg:text-left z-10">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 drop-shadow-sm">Are you starving?</h1>
            <p className="text-[#616161] text-base sm:text-lg lg:text-3xl font-bold max-w-xl mb-8 leading-relaxed tracking-tight">Within a few clicks, find meals that are accessible near you</p>
            <div className="w-full max-w-xl bg-white rounded-2xl p-4 sm:p-5 shadow-xl text-left">
              <div className="flex gap-2 mb-4">
                <button onClick={() => setActiveTab('delivery')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === 'delivery' ? 'bg-[#FF7A50]/10 text-[#FF7A50]' : 'text-[#757575] hover:bg-slate-50'}`}>Delivery</button>
                <button onClick={() => setActiveTab('pickup')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === 'pickup' ? 'bg-[#FF7A50]/10 text-[#FF7A50]' : 'text-[#757575] hover:bg-slate-50'}`}>Pickup</button>
              </div>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg className="w-5 h-5 text-[#FF7A50]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  </span>
                  <input type="text" placeholder="Enter Your Address" className="w-full bg-[#F5F5F5] text-slate-800 placeholder-[#BDBDBD] border-none rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A50]/20 transition" />
                </div>
                <button type="submit" className="w-full sm:w-auto bg-[#F15A24] hover:bg-[#d94f1e] text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-200 shadow-md whitespace-nowrap">Find Food</button>
              </form>
            </div>
          </div>
          <div className="w-full lg:col-span-6 flex justify-center lg:justify-end lg:h-full relative">
            <img src={heroImg} alt="Bowl" className="w-full max-w-[280px] sm:max-w-[340px] lg:max-w-none object-contain drop-shadow-2xl relative transform translate-y-0 lg:absolute lg:right-0 lg:bottom-0 lg:w-[480px] xl:w-[540px] lg:translate-y-[10%] lg:group-hover:translate-y-0 lg:hover:translate-y-0 transition-transform duration-500 ease-out cursor-pointer" />
          </div>
        </div>
      </section>

      {/* 2. FLASH DEALS */}
      <section className="w-full bg-white pt-16 pb-8 sm:pt-20 sm:pb-12">
        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discountItems.map((item) => (
              <div key={item.id} className="flex flex-col group/card cursor-pointer">
                <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden mb-4">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-500 ease-out" />
                  <div className="absolute left-0 bottom-0 bg-[#FFB30E] text-white flex items-center pl-6 pr-7 py-3 rounded-tr-3xl font-black shadow-lg">
                    <span className="text-5xl sm:text-6xl font-extrabold tracking-tighter leading-none">{item.discount}</span>
                    <div className="flex flex-col items-start ml-1.5 justify-center">
                      <span className="text-xl sm:text-2xl font-bold leading-none mb-0.5">%</span>
                      <span className="text-sm sm:text-base font-bold leading-none text-white/95">Off</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-[#424242] font-bold text-lg sm:text-xl mb-2 group-hover/card:text-[#F15A24] transition-colors duration-200 truncate">{item.title}</h3>
                <div className="flex"><span className="bg-[#F15A24]/10 text-[#F15A24] text-xs font-bold px-3 py-1.5 rounded-lg">{item.daysRemaining} days Remaining</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW DOES IT WORK */}
      <section className="w-full bg-[#FFF8EF] py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-12 text-center">
          <h2 className="text-[#F15A24] font-black text-3xl sm:text-4xl md:text-5xl tracking-tight mb-16 sm:mb-20">How does it work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center group cursor-pointer max-w-[280px] mx-auto lg:max-w-none">
                <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 ease-out">
                  <img src={step.image} alt={step.title} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-[#424242] font-bold text-xl sm:text-2xl mb-3 tracking-wide group-hover:text-[#F15A24] transition-colors duration-200">{step.title}</h3>
                <p className="text-[#757575] font-medium text-sm sm:text-base leading-relaxed px-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. POPULAR ITEMS */}
      <section className="w-full bg-white py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-between mb-12 gap-4">
            <div className="hidden lg:block"></div>
            <div className="text-center">
              <h2 className="text-[#212121] font-black text-3xl sm:text-4xl md:text-5xl tracking-tight">
                Popular items
              </h2>
            </div>
            <div className="flex items-center justify-center lg:justify-end gap-3 lg:transform lg:translate-y-10">
              <button className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FFB30E] hover:bg-[#e6a10d] flex items-center justify-center text-white shadow-md transition duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FFB30E] hover:bg-[#e6a10d] flex items-center justify-center text-white shadow-md transition duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {popularItems.map((item) => (
              <div key={item.id} className="flex flex-col bg-white rounded-2xl overflow-hidden group/item cursor-pointer">
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-4">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover/item:scale-105 transition-transform duration-500 ease-out" />
                </div>
                <h3 className="text-[#424242] font-bold text-lg sm:text-xl mb-1 truncate">{item.title}</h3>
                <div className="flex items-center gap-1 text-[#FFB30E] text-sm font-semibold mb-4">
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="truncate">{item.restaurant}</span>
                </div>
                <div className="mt-auto">
                  <span className="text-[#212121] font-black text-xl block mb-3">${item.price}</span>
                  <button className="w-full bg-[#F15A24] hover:bg-[#d94f1e] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 shadow-md">Order now</button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. FEATURED RESTAURANTS */}
      <section className="w-full bg-white py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-12">
          
          <h2 className="text-[#212121] font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-center mb-16">
            Featured Restaurants
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {featuredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="flex flex-col group cursor-pointer">
                
                <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden mb-4 shadow-sm bg-slate-50">
                  <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-[#FF3A44] text-white text-sm font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
                      </svg>
                      {restaurant.discount}% off
                    </span>
                    <span className="bg-[#FFB30E] text-white text-sm font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.3 14.3L14 15.1V9h1.5v4.6l2.1 1.2-.3.5z"/>
                      </svg>
                      Fast
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-3">
                  <img src={restaurant.logo} alt={`${restaurant.name} logo`} className="w-14 h-14 object-contain rounded-xl shadow-sm bg-white shrink-0" />
                  <div className="flex flex-col min-w-0 justify-center">
                    <h3 className="text-[#424242] font-bold text-xl leading-snug group-hover:text-[#F15A24] transition-colors duration-200 truncate">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <svg className="w-4 h-4 text-[#FFB30E]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                      <span className="text-[#FFB30E] text-sm font-bold">{restaurant.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex mt-1">
                  <span className={`text-sm font-bold px-4 py-2 rounded-xl ${restaurant.isOpen ? 'bg-[#79B93C]/10 text-[#79B93C]' : 'bg-[#F15A24]/10 text-[#FF7A50]'}`}>
                    {restaurant.status}
                  </span>
                </div>

              </div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <button className="bg-[#FFB30E] hover:bg-[#e6a10d] text-white font-bold py-3.5 px-8 rounded-xl text-sm transition-all duration-200 shadow-md flex items-center gap-2 group/btn">
              View All
              <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>
      </section>

      {/* 6. SEARCH BY FOOD */}
      <section className="w-full bg-[#FFF8EF] lg:bg-white pb-20 pt-8 sm:pb-16">
        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-12">
          
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <h2 className="text-[#212121] font-black text-3xl sm:text-4xl md:text-4xl tracking-tight text-center sm:text-left">
              Search by Food
            </h2>
            <div className="flex items-center gap-6">
              <a href="#view-all" className="text-[#A0A0A0] hover:text-[#212121] font-bold text-xs tracking-wider flex items-center gap-2 transition-colors uppercase">
                View All
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <div className="flex items-center gap-2.5">
                <button className="w-9 h-9 rounded-full bg-[#FFB30E] hover:bg-[#e6a10d] flex items-center justify-center text-white shadow-md transition duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="w-9 h-9 rounded-full bg-[#FFB30E] hover:bg-[#e6a10d] flex items-center justify-center text-white shadow-md transition duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 justify-center">
            {foodCategories.map((cat) => (
              <div key={cat.id} className="flex flex-col items-center group cursor-pointer text-center">
                <div className="w-full aspect-square rounded-full overflow-hidden shadow-sm bg-white mb-5 border border-transparent group-hover:border-[#FFB30E] transition-all duration-300">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out" />
                </div>
                <span className="text-[#212121] font-bold text-base sm:text-lg tracking-tight group-hover:text-[#F15A24] transition-colors duration-200">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. PROMO CTA CARDS */}
      <section className="w-full bg-white pb-16 pt-8">
        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-12 flex flex-col gap-12">
          
          {/* Best deals Crispy Sandwiches */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col md:flex-row items-stretch min-h-[340px] group/promo">
            <div className="w-full md:w-[42%] p-8 sm:p-12 flex flex-col justify-center text-left">
              <h3 className="text-3xl sm:text-4xl font-black text-[#212121] leading-tight mb-4">
                Best deals <span className="text-[#FFB30E]">Crispy Sandwiches</span>
              </h3>
              <p className="text-[#616161] font-medium text-sm sm:text-base mb-8 max-w-[320px] leading-relaxed">
                Enjoy the large size of sandwiches. Complete your meal with the perfect slice of sandwiches.
              </p>
              <div>
                <button className="bg-[#FFB30E] hover:bg-[#e6a10d] text-white font-bold py-3.5 px-8 rounded-xl text-xs sm:text-sm tracking-wide uppercase shadow-md flex items-center gap-2 transition-all duration-200">
                  Proceed to order
                  <svg className="w-4 h-4 transform group-hover/promo:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full md:w-[58%] relative min-h-[240px] md:min-h-full overflow-hidden bg-slate-50">
              <img src={subSandwich2} alt="image_d70721.jpg" className="w-full h-full object-cover transform group-hover/promo:scale-102 transition-transform duration-500" />
            </div>
          </div>

          {/* Celebrate parties with Fried Chicken */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col-reverse md:flex-row items-stretch min-h-[340px] group/promo2">
            <div className="w-full md:w-[58%] relative min-h-[240px] md:min-h-full overflow-hidden bg-slate-50">
              <img src={friedChicken} alt="image_d706a6.jpg" className="w-full h-full object-cover transform group-hover/promo2:scale-102 transition-transform duration-500" />
            </div>
            <div className="w-full md:w-[42%] p-8 sm:p-12 flex flex-col justify-center text-left">
              <h3 className="text-3xl sm:text-4xl font-black text-[#212121] leading-tight mb-4">
                Celebrate parties with <span className="text-[#FFB30E]">Fried Chicken</span>
              </h3>
              <p className="text-[#616161] font-medium text-sm sm:text-base mb-8 max-w-[320px] leading-relaxed">
                Get the best fried chicken smeared with a lip smacking lemon chili flavor. Check out best deals for fried chicken.
              </p>
              <div>
                <button className="bg-[#FFB30E] hover:bg-[#e6a10d] text-white font-bold py-3.5 px-8 rounded-xl text-xs sm:text-sm tracking-wide uppercase shadow-md flex items-center gap-2 transition-all duration-200">
                  Proceed to order
                  <svg className="w-4 h-4 transform group-hover/promo2:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Wanna eat hot & spicy Pizza? */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col md:flex-row items-stretch min-h-[340px] group/promo3">
            <div className="w-full md:w-[42%] p-8 sm:p-12 flex flex-col justify-center text-left">
              <h3 className="text-3xl sm:text-4xl font-black text-[#212121] leading-tight mb-4">
                Wanna eat hot & spicy <span className="text-[#FFB30E]">Pizza?</span>
              </h3>
              <p className="text-[#616161] font-medium text-sm sm:text-base mb-8 max-w-[320px] leading-relaxed">
                Pair up with a friend and enjoy the hot and crispy pizza pops. Try it with the best deals.
              </p>
              <div>
                <button className="bg-[#FFB30E] hover:bg-[#e6a10d] text-white font-bold py-3.5 px-8 rounded-xl text-xs sm:text-sm tracking-wide uppercase shadow-md flex items-center gap-2 transition-all duration-200">
                  Proceed to order
                  <svg className="w-4 h-4 transform group-hover/promo3:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full md:w-[58%] relative min-h-[240px] md:min-h-full overflow-hidden bg-slate-50">
              <img src={pizzaPng} alt="image_d703e1.jpg" className="w-full h-full object-cover transform group-hover/promo3:scale-102 transition-transform duration-500" />
            </div>
          </div>

        </div>
      </section>

      {/* 8. Best deals CTA */}
      <section 
        className="w-full bg-cover bg-center bg-no-repeat relative py-16"
        style={{ backgroundImage: `url(${ctaTwoBg})` }}
      >
        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-12 flex flex-col items-center justify-center text-center relative z-10">
          <h2 className="text-white font-bold text-4xl sm:text-5xl tracking-tight max-w-3xl leading-[1.15] mb-10">
            Are you ready to order <br></br> with the best deals?
          </h2>
          <div>
            <button className="bg-[#F15A24] hover:bg-[#d94f1e] text-white font-bold py-4 px-9 rounded-xl text-sm sm:text-base tracking-wide uppercase transition-colors duration-200 flex items-center gap-2">
              Proceed to order
              <span className="font-black text-lg leading-none select-none">&gt;</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home