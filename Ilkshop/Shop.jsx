import React, { useState, useEffect } from 'react';
import apiService from './Api'; 

function Shop() {
    // API States
    const [mehsullarArray, setMehsullarArray] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // UI & Filter States
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    
    // Navigation/Routing State ('list' veya 'detail')
    const [view, setView] = useState('list'); 
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Basket (Sebət) States
    const [sebet, setSebet] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [badgeScale, setBadgeScale] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const pData = await apiService.getProduct();
                const cData = await apiService.getCategory();
                
                setMehsullarArray(pData);
                setFilteredProducts(pData);
                setCategories(cData);
            } catch (error) {
                console.error("Məlumat gətirilərkən xəta baş verdi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (value) => {
        setSearchKeyword(value);
        if (!value.trim()) {
            setShowSearchDropdown(false);
            return;
        }
        setShowSearchDropdown(true);
    };

    const dropdownFilter = mehsullarArray.filter(item => 
        item.title?.toLowerCase().startsWith(searchKeyword.toLowerCase().trim())
    );

    const handleCategoryFilter = (catName) => {
        setSelectedCategory(catName);
        setSearchKeyword('');
        setShowSearchDropdown(false);

        if (catName === 'all') {
            setFilteredProducts(mehsullarArray);
        } else {
            setFilteredProducts(mehsullarArray.filter(f => f.category === catName));
        }
    };

    const openDetail = (product) => {
        setSelectedProduct(product);
        setView('detail');
        setShowSearchDropdown(false);
        setSearchKeyword('');
        window.scrollTo(0, 0);
    };

    // Sebet
    const sebetAdd = (product) => {
        const mov = sebet.find(x => x.id === product.id);
        if (mov) {
            setSebet(sebet.map(x => x.id === product.id ? { ...x, sayi: x.sayi + 1 } : x));
        } else {
            setSebet([...sebet, { ...product, sayi: 1 }]);
        }
        setBadgeScale(true);
        setTimeout(() => setBadgeScale(false), 200);
    };

    const azalt = (id) => {
        const target = sebet.find(x => x.id === id);
        if (target.sayi === 1) {
            const yeniSebet = sebet.filter(x => x.id !== id);
            setSebet(yeniSebet);
            if (yeniSebet.length === 0) setIsCartOpen(false);
        } else {
            setSebet(sebet.map(x => x.id === id ? { ...x, sayi: x.sayi - 1 } : x));
        }
    };

    const artir = (id) => {
        setSebet(sebet.map(x => x.id === id ? { ...x, sayi: x.sayi + 1 } : x));
    };

    const toplamSay = sebet.reduce((acc, item) => acc + item.sayi, 0);
    const toplamMebleg = sebet.reduce((acc, item) => acc + (item.price * item.sayi), 0);

    useEffect(() => {
        const handleOutsideClick = () => setShowSearchDropdown(false);
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);

    return (
        <div className="bg-[#f4f1eb] text-gray-900 min-h-screen pt-[68px]" style={{ fontFamily: '"DM Sans", sans-serif' }}>
            
            {/* HEADER */}
            <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(244,241,235,0.92)', backdropFilter: 'blur(16px)' }} className="w-full border-b border-[#e0d9cc]">
                <div className="container mx-auto flex items-center justify-between px-4 sm:px-8 h-[68px]">
                    <div className="cursor-pointer" onClick={() => setView('list')}>
                        <div className="text-2xl font-black tracking-tight bg-gradient-to-r from-[#2d6a4f] to-[#52b788] bg-clip-text text-transparent" style={{ fontFamily: '"Playfair Display", serif' }}>
                            Ilk Shop
                        </div>
                        <div className="text-[11px] font-light tracking-widest uppercase text-[#888888] -mt-1">Premium Collection</div>
                    </div>
                    
                    {view === 'list' ? (
                        <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2.5 bg-[#f0ece3] border border-[#e0d9cc] text-gray-900 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:border-[#2d6a4f] hover:text-[#2d6a4f]">
                            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
                            </svg>
                            Səbət
                            <span className={`bg-[#2d6a4f] text-white rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-bold transition-transform duration-200 ${badgeScale ? 'scale-120' : ''}`}>
                                {toplamSay}
                            </span>
                        </button>
                    ) : (
                        <button onClick={() => setView('list')} className="flex items-center gap-2 text-sm font-medium text-[#2d6a4f] border border-[#2d6a4f] px-4 py-2 rounded-full hover:bg-[#2d6a4f] hover:text-white transition-all duration-200">
                            ← Geri
                        </button>
                    )}
                </div>
            </header>

            {/* VIEW 1: List */}
            {view === 'list' && (
                <>
                    {/* HERO */}
                    <section className="relative text-center px-4 sm:px-8 pt-20 pb-8">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] pointer-events-none overflow-hidden"
                            style={{ background: 'radial-gradient(ellipse at center,rgba(45,106,79,0.12) 0%,transparent 70%)' }}></div>
                        <h2 className="font-black leading-tight tracking-tight mb-4 text-[clamp(2.5rem,6vw,4.5rem)] text-gray-900" style={{ fontFamily: '"Playfair Display", serif' }}>
                            New Season,<br />
                            <em className="italic bg-gradient-to-r from-[#2d6a4f] to-[#52b788] bg-clip-text text-transparent">New Cart.</em>
                        </h2>
                        <p className="text-[#888888] text-sm tracking-[0.05em] uppercase">Seçilmiş premium məhsul kolleksiyası</p>
                    </section>

                    {/* SEARCH BOX */}
                    <div className="px-4 sm:px-8 pb-6 max-w-[1400px] mx-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="relative w-full max-w-lg mx-auto">
                            <input 
                                type="text" 
                                placeholder="Məhsul adı ilə axtar..."
                                autoComplete="off"
                                value={searchKeyword}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full px-5 py-3 bg-white border border-[#e0d9cc] rounded-full focus:outline-none focus:border-[#2d6a4f] focus:ring-1 focus:ring-[#2d6a4f] transition-all text-gray-800 text-sm font-medium shadow-sm"
                            />
                            <div className="absolute right-4 top-3.5 text-[#888888] pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </div>
                            
                            {/* SEARCH DROPDOWN */}
                            {showSearchDropdown && (
                                <div className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 w-full max-w-[512px] bg-white border border-[#e0d9cc] rounded-2xl shadow-xl z-[500] max-h-[360px] overflow-y-auto py-2">
                                    {dropdownFilter.length === 0 ? (
                                        <div className="p-[18px] text-center text-[#888888] text-sm">Nəticə tapılmadı.</div>
                                    ) : (
                                        dropdownFilter.map(s => (
                                            <div key={s.id} className="flex items-center gap-[14px] px-[18px] py-2.5 cursor-pointer transition-colors hover:bg-[#f0ece3]" onClick={() => openDetail(s)}>
                                                <img src={s.image} alt={s.title} className="w-12 h-12 object-contain rounded-xl bg-[#f4f1eb] p-1 shrink-0" />
                                                <div>
                                                    <div className="text-xs font-medium text-[#1a1a1a] line-clamp-1">{s.title}</div>
                                                    <div className="text-xs text-[#2d6a4f] font-semibold mt-0.5">{s.price} AZN</div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CATEGORY FILTER */}
                    <div className="px-4 sm:px-8 pb-6 max-w-[1400px] mx-auto">
                        <ul className="flex flex-wrap gap-2">
                            <li>
                                <button 
                                    onClick={() => handleCategoryFilter('all')} 
                                    className={`border px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-200 ${selectedCategory === 'all' ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]' : 'bg-[#f0ece3] text-gray-800 border-[#e0d9cc] hover:border-[#2d6a4f] hover:text-[#2d6a4f]'}`}
                                >
                                    Hamısı
                                </button>
                            </li>
                            {categories.map((cat, index) => (
                                <li key={index}>
                                    <button 
                                        onClick={() => handleCategoryFilter(cat.name)} 
                                        className={`border px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-200 ${selectedCategory === cat.name ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]' : 'bg-[#f0ece3] text-gray-800 border-[#e0d9cc] hover:border-[#2d6a4f] hover:text-[#2d6a4f]'}`}
                                    >
                                        {cat.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* PRODUCTS GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-8 pb-16 max-w-[1400px] mx-auto">
                        {loading ? (
                            Array(8).fill(0).map((_, i) => (
                                <div key={i} className="bg-white border border-[#e0d9cc] rounded-2xl overflow-hidden animate-pulse">
                                    <div className="h-[220px] bg-[#e8e2d8]"></div>
                                    <div className="p-5 space-y-3">
                                        <div className="h-3 bg-[#e8e2d8] rounded-full"></div>
                                        <div className="h-3 bg-[#e8e2d8] rounded-full w-3/5"></div>
                                        <div className="h-5 bg-[#e8e2d8] rounded-full w-2/5"></div>
                                    </div>
                                </div>
                            ))
                        ) : filteredProducts.length === 0 ? (
                            <div className="col-span-full text-center py-12 text-[#888888] text-sm">Məhsul tapılmadı.</div>
                        ) : (
                            filteredProducts.map((item) => (
                                <div key={item.id} className="bg-white border border-[#e0d9cc] rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#c5bfb2]">
                                    <div className="relative bg-white h-[220px] flex items-center justify-center p-6 overflow-hidden">
                                        <span className="absolute top-3 left-3 bg-white/90 text-[#777] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-[#e0d9cc] backdrop-blur">{item.category}</span>
                                        <img src={item.image} alt={item.title} loading="lazy" className="h-[160px] w-full object-contain transition-transform duration-300 group-hover:scale-[1.08]"/>
                                    </div>
                                    <div className="p-5 flex flex-col flex-1 gap-2">
                                        <p className="text-sm font-medium leading-snug line-clamp-2">{item.title}</p>
                                        <div className="mt-auto pt-1">
                                            <div className="text-xl font-bold text-[#2d6a4f] mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>{item.price} AZN</div>
                                            <button onClick={() => sebetAdd(item)} className="w-full border border-[#e0d9cc] text-gray-800 py-2.5 rounded-xl text-xs font-medium uppercase tracking-widest transition-all duration-200 hover:bg-[#2d6a4f] hover:border-[#2d6a4f] hover:text-white mb-2">
                                                Səbətə at
                                            </button>
                                            <button onClick={() => openDetail(item)} className="w-full block text-center border border-[#2d6a4f] text-[#2d6a4f] py-2.5 rounded-xl text-xs font-medium uppercase tracking-widest transition-all duration-200 hover:bg-[#2d6a4f] hover:text-white">
                                                Daha ətraflı →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}

            {/* VIEW 2: DETAIL */}
            {view === 'detail' && (
                <div className="min-h-[calc(100vh-68px)] flex items-center justify-center px-4 sm:px-8 py-12">
                    <div className="w-full max-w-4xl">
                        {!selectedProduct ? (
                            <div className="text-center py-16 text-[#888888]">
                                <p className="text-2xl font-bold mb-2 text-gray-800" style={{ fontFamily: '"Playfair Display", serif' }}>Məhsul tapılmadı</p>
                                <button onClick={() => setView('list')} className="bg-[#2d6a4f] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#52b788] transition-all">
                                    Ana Səhifəyə Qayıt
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white border border-[#e0d9cc] rounded-2xl overflow-hidden md:flex shadow-xl">
                                <div className="md:w-1/2 bg-white flex items-center justify-center p-8 min-h-[300px]">
                                    <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full max-h-[360px] object-contain"/>
                                </div>
                                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                                    <div>
                                        <nav className="text-xs text-[#888888] mb-4 font-medium uppercase tracking-widest">
                                            <span onClick={() => setView('list')} className="hover:text-[#2d6a4f] transition cursor-pointer">Ana Səhifə</span>
                                            <span className="mx-2">/</span>
                                            <span className="text-[#2d6a4f]">{selectedProduct.category}</span>
                                        </nav>
                                        <h1 className="text-3xl font-bold mb-3 text-gray-900" style={{ fontFamily: '"Playfair Display", serif' }}>{selectedProduct.title}</h1>
                                        <span className="inline-block bg-[#2d6a4f]/10 text-[#2d6a4f] text-xs px-3 py-1 rounded-full mb-4 font-semibold uppercase tracking-wider border border-[#2d6a4f]/20">
                                            {selectedProduct.category}
                                        </span>
                                        <p className="text-[#888888] leading-relaxed mb-6 text-sm">
                                            {selectedProduct.description || 'Bu məhsul üçün ətraflı təsvir qeyd olunmayıb.'}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#e0d9cc]">
                                        <div>
                                            <div className="text-[11px] text-[#888888] uppercase tracking-widest mb-1">Qiymət</div>
                                            <div className="font-bold text-[#2d6a4f] text-4xl" style={{ fontFamily: '"Playfair Display", serif' }}>{selectedProduct.price} <span className="text-2xl">AZN</span></div>
                                        </div>
                                        <button onClick={() => sebetAdd(selectedProduct)} className="bg-[#2d6a4f] text-white px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 hover:bg-[#52b788] hover:scale-[1.03] active:scale-95">
                                            Səbətə at
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* MODAL (SEBET) */}
            {isCartOpen && (
                <div className="fixed inset-0 z-[200] flex justify-center items-center" style={{ background: 'rgba(50,40,30,0.55)', backdropFilter: 'blur(8px)' }} onClick={() => setIsCartOpen(false)}>
                    <div className="bg-white border border-[#e0d9cc] w-full max-w-[460px] mx-4 rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e0d9cc]">
                            <h2 className="text-xl font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>Sizin Səbətiniz</h2>
                            <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 rounded-full border border-[#e0d9cc] text-[#888888] flex items-center justify-center text-base transition-all duration-200 hover:border-red-400 hover:text-red-400">✕</button>
                        </div>
                        
                        <div className="max-h-[360px] overflow-y-auto px-6 py-2">
                            {sebet.length === 0 ? (
                                <div className="text-center py-10 text-[#888888]">
                                    <svg viewBox="0 0 24 24" className="w-14 h-14 mx-auto mb-3" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
                                    </svg>
                                    <p className="text-base font-medium text-[#aaa]">Səbət boşdur</p>
                                    <p className="text-xs mt-1.5">Məhsul əlavə etmək üçün mağazaya qayıdın</p>
                                </div>
                            ) : (
                                sebet.map(item => (
                                    <div key={item.id} className="flex items-center justify-between py-3.5 border-b border-[#e0d9cc] gap-4 last:border-b-0">
                                        <div className="w-[52px] h-[52px] bg-white rounded-xl flex items-center justify-center p-1.5 shrink-0 border border-[#e0d9cc]">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-contain"/>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium truncate">{item.title}</p>
                                            <p className="text-sm font-semibold text-[#2d6a4f] mt-0.5">{(item.price * item.sayi).toFixed(2)} AZN</p>
                                        </div>
                                        <div className="flex items-center border border-[#e0d9cc] rounded-lg overflow-hidden shrink-0">
                                            <button onClick={() => azalt(item.id)} className="w-8 h-8 bg-[#f0ece3] text-gray-700 hover:bg-[#e0d9cc] transition-colors text-base">−</button>
                                            <span className="w-8 text-center text-sm font-bold">{item.sayi}</span>
                                            <button onClick={() => artir(item.id)} className="w-8 h-8 bg-[#f0ece3] text-gray-700 hover:bg-[#e0d9cc] transition-colors text-base">+</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="flex items-center justify-between px-6 py-5 border-t border-[#e0d9cc]">
                            <div>
                                <div className="text-[11px] text-[#888888] uppercase tracking-widest">Ümumi məbləğ</div>
                                <div className="text-2xl font-bold text-[#2d6a4f]" style={{ fontFamily: '"Playfair Display", serif' }}>{toplamMebleg.toFixed(2)} AZN</div>
                            </div>
                            <button className="bg-[#2d6a4f] text-white px-6 py-2.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 hover:bg-[#52b788] hover:scale-[1.03]" disabled={sebet.length === 0}>
                                Sifariş et →
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Shop;