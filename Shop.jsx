import { useState, useEffect, useRef, useCallback } from "react"

const API_BASE = 'https://69c575978a5b6e2dec2c85a6.mockapi.io/product'

function slugCreate(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// ─── CART CONTEXT ─────────────────────────────────────────────────────────────
function useCart() {
  const [sebet, setSebet] = useState([])

  const sebetAdd = useCallback((item) => {
    setSebet(prev => {
      const existing = prev.find(x => x.id === item.id)
      if (existing) return prev.map(x => x.id === item.id ? { ...x, sayi: x.sayi + 1 } : x)
      return [...prev, { ...item, sayi: 1 }]
    })
  }, [])

  const azalt = useCallback((id) => {
    setSebet(prev => {
      const updated = prev.map(x => x.id === id ? { ...x, sayi: x.sayi - 1 } : x)
      return updated.filter(x => x.sayi > 0)
    })
  }, [])

  const artir = useCallback((id) => {
    setSebet(prev => prev.map(x => x.id === id ? { ...x, sayi: x.sayi + 1 } : x))
  }, [])

  const totalCount = sebet.reduce((s, x) => s + x.sayi, 0)
  const totalPrice = sebet.reduce((s, x) => s + x.price * x.sayi, 0)

  return { sebet, sebetAdd, azalt, artir, totalCount, totalPrice }
}

// ─── CART MODAL ───────────────────────────────────────────────────────────────
function CartModal({ sebet, azalt, artir, totalPrice, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex justify-center items-center"
      style={{ background: 'rgba(50,40,30,0.55)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="bg-white border border-[#e0d9cc] w-full max-w-[460px] mx-4 rounded-2xl overflow-hidden"
        style={{ animation: 'slideUp 0.3s ease' }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e0d9cc]">
          <h2 style={{ fontFamily: '"Playfair Display", serif' }} className="text-xl font-bold">Sizin Səbətiniz</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#e0d9cc] text-[#888] flex items-center justify-center text-base transition-all hover:border-red-400 hover:text-red-400"
          >✕</button>
        </div>

        <div className="px-6 py-4 max-h-[360px] overflow-y-auto">
          {sebet.length === 0 ? (
            <div className="text-center py-10 text-[#888]">
              <svg viewBox="0 0 24 24" className="w-14 h-14 mx-auto mb-3" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
              </svg>
              <p className="text-base font-medium text-[#aaa]">Səbət boşdur</p>
              <p className="text-xs mt-1.5">Məhsul əlavə etmək üçün mağazaya qayıdın</p>
            </div>
          ) : sebet.map(item => (
            <div key={item.id} className="flex items-center justify-between py-3.5 border-b border-[#e0d9cc] gap-4 last:border-b-0">
              <div className="w-[52px] h-[52px] bg-white rounded-xl flex items-center justify-center p-1.5 shrink-0 border border-[#e0d9cc]">
                <img src={item.image} className="w-full h-full object-contain" alt={item.title} />
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
          ))}
        </div>

        <div className="px-6 py-5 border-t border-[#e0d9cc] bg-[#f9f7f3]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-[#888] uppercase tracking-widest font-medium">Cəmi</span>
            <span style={{ fontFamily: '"Playfair Display", serif' }} className="text-2xl font-bold text-[#2d6a4f]">
              {totalPrice.toFixed(2)} <span className="text-base">AZN</span>
            </span>
          </div>
          <button className="w-full bg-[#2d6a4f] text-white py-3.5 rounded-xl text-sm font-semibold tracking-wide hover:bg-[#52b788] transition-all duration-200">
            Sifarişi Tamamla
          </button>
          <button onClick={onClose} className="w-full mt-2 border border-[#e0d9cc] text-[#888] py-2.5 rounded-xl text-xs font-medium hover:border-[#2d6a4f] hover:text-[#2d6a4f] transition-all duration-200">
            Alış-verişə davam et
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── HEADER ───────────────────────────────────────────────────────────────────
function Header({ totalCount, onCartOpen, onLogoClick, showBack, onBack }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-[1000] w-full border-b border-[#e0d9cc]"
      style={{ background: 'rgba(244,241,235,0.92)', backdropFilter: 'blur(16px)' }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-8 h-[68px]">
        <button onClick={onLogoClick} className="text-left">
          <div
            className="font-black text-2xl tracking-tight"
            style={{
              fontFamily: '"Playfair Display", serif',
              background: 'linear-gradient(135deg,#2d6a4f,#52b788)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >Ilk Shop</div>
          <div className="text-[11px] font-light tracking-widest uppercase text-[#888] -mt-1">Premium Collection</div>
        </button>

        {showBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-[#2d6a4f] border border-[#2d6a4f] px-4 py-2 rounded-full hover:bg-[#2d6a4f] hover:text-white transition-all duration-200"
          >← Geri</button>
        ) : (
          <button
            onClick={onCartOpen}
            className="flex items-center gap-2.5 bg-[#f0ece3] border border-[#e0d9cc] text-gray-900 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:border-[#2d6a4f] hover:text-[#2d6a4f]"
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
            </svg>
            Səbət
            <span
              className="bg-[#2d6a4f] text-white rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-bold transition-transform duration-200"
              style={{ transform: totalCount > 0 ? 'scale(1)' : 'scale(1)' }}
            >{totalCount}</span>
          </button>
        )}
      </div>
    </header>
  )
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ item, index, onAddToCart, onDetail }) {
  return (
    <div
      className="bg-white border border-[#e0d9cc] rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#c5bfb2]"
      style={{ animation: `fadeUp 0.5s ease both`, animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative bg-white h-[220px] flex items-center justify-center p-6 overflow-hidden">
        <span className="absolute top-3 left-3 bg-white/90 text-[#777] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-[#e0d9cc]">
          {item.category}
        </span>
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-[160px] w-full object-contain transition-transform duration-300 group-hover:scale-[1.08]"
        />
      </div>
      <div className="p-5 flex flex-col flex-1 gap-2">
        <p className="text-sm font-medium leading-snug line-clamp-2">{item.title}</p>
        <div className="mt-auto pt-1">
          <div style={{ fontFamily: '"Playfair Display", serif' }} className="text-xl font-bold text-[#2d6a4f] mb-3">
            {item.price} AZN
          </div>
          <button
            onClick={() => onAddToCart(item)}
            className="w-full border border-[#e0d9cc] text-gray-800 py-2.5 rounded-xl text-xs font-medium uppercase tracking-widest transition-all hover:bg-[#2d6a4f] hover:border-[#2d6a4f] hover:text-white mb-2"
          >Səbətə at</button>
          <button
            onClick={() => onDetail(item)}
            className="w-full block text-center border border-[#2d6a4f] text-[#2d6a4f] py-2.5 rounded-xl text-xs font-medium uppercase tracking-widest transition-all hover:bg-[#2d6a4f] hover:text-white"
          >Daha ətraflı →</button>
        </div>
      </div>
    </div>
  )
}

// ─── SKELETON CARD ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white border border-[#e0d9cc] rounded-2xl overflow-hidden" style={{ animation: 'pulse2 1.5s infinite' }}>
      <div className="h-[220px] bg-[#e8e2d8]"></div>
      <div className="p-5 space-y-3">
        <div className="h-3 bg-[#e8e2d8] rounded-full"></div>
        <div className="h-3 bg-[#e8e2d8] rounded-full w-3/5"></div>
        <div className="h-5 bg-[#e8e2d8] rounded-full w-2/5"></div>
      </div>
    </div>
  )
}

// ─── SHOP PAGE ────────────────────────────────────────────────────────────────
function ShopPage({ sebetAdd, onDetail }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(true)
  const searchRef = useRef(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch(`${API_BASE}/product`).then(r => r.json()),
      fetch(`${API_BASE}/category`).then(r => r.json()),
    ]).then(([prods, cats]) => {
      setProducts(prods)
      setCategories(cats)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && e.target !== searchRef.current) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const handleSearch = (val) => {
    setSearchValue(val)
    const kw = val.toLowerCase().trim()
    if (!kw) { setShowDropdown(false); return }
    const filtered = products.filter(p => p.title.toLowerCase().startsWith(kw))
    setSearchResults(filtered)
    setShowDropdown(true)
  }

  const handleCategory = (name) => {
    setActiveCategory(name)
    setSearchValue('')
    setShowDropdown(false)
  }

  const displayedProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="bg-[#f4f1eb] min-h-screen font-sans text-gray-900" style={{ paddingTop: 68 }}>
      {/* HERO */}
      <section className="relative text-center px-4 sm:px-8 pt-20 pb-8">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] pointer-events-none overflow-hidden"
          style={{ background: 'radial-gradient(ellipse at center,rgba(45,106,79,0.12) 0%,transparent 70%)' }}
        />
        <h2
          className="font-black leading-tight tracking-tight mb-4"
          style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem,6vw,4.5rem)' }}
        >
          New Season,<br/>
          <em
            className="italic"
            style={{
              fontFamily: '"Playfair Display", serif',
              background: 'linear-gradient(135deg,#2d6a4f,#52b788)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >New Cart.</em>
        </h2>
        <p className="text-[#888] text-sm tracking-[0.05em] uppercase">Seçilmiş premium məhsul kolleksiyası</p>
      </section>

      {/* SEARCH */}
      <div className="px-4 sm:px-8 pb-6 max-w-[1400px] mx-auto">
        <div className="relative w-full max-w-lg mx-auto">
          <input
            ref={searchRef}
            type="text"
            value={searchValue}
            placeholder="Məhsul adı ilə axtar..."
            autoComplete="off"
            className="w-full px-5 py-3 bg-white border border-[#e0d9cc] rounded-full focus:outline-none focus:border-[#2d6a4f] focus:ring-1 focus:ring-[#2d6a4f] transition-all text-gray-800 text-sm font-medium shadow-sm"
            onChange={e => handleSearch(e.target.value)}
          />
          <div className="absolute right-4 top-3.5 text-[#888] pointer-events-none">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          {/* DROPDOWN */}
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 w-full max-w-[512px] bg-white border border-[#e0d9cc] rounded-2xl shadow-xl z-[500] max-h-[360px] overflow-y-auto py-2"
            >
              {searchResults.length === 0 ? (
                <div className="px-4 py-4 text-center text-[#888] text-sm">Nəticə tapılmadı.</div>
              ) : searchResults.map(s => (
                <div
                  key={s.id}
                  className="flex items-center gap-3.5 px-4 py-2.5 cursor-pointer hover:bg-[#f0ece3] transition-colors"
                  onClick={() => { setShowDropdown(false); onDetail(s) }}
                >
                  <img src={s.image} alt={s.title} className="w-12 h-12 object-contain rounded-xl bg-[#f4f1eb] p-1 shrink-0" />
                  <div>
                    <div className="text-[13px] font-medium text-gray-900 leading-snug">{s.title}</div>
                    <div className="text-xs text-[#2d6a4f] font-semibold mt-0.5">{s.price} AZN</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="px-4 sm:px-8 pb-6 max-w-[1400px] mx-auto">
        <ul className="flex flex-wrap gap-2">
          <li>
            <button
              onClick={() => handleCategory('all')}
              className={`border px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest transition-all ${activeCategory === 'all' ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]' : 'border-[#e0d9cc] bg-[#f0ece3] text-gray-800 hover:border-[#2d6a4f] hover:text-[#2d6a4f]'}`}
            >Hamısı</button>
          </li>
          {categories.map(cat => (
            <li key={cat.id}>
              <button
                onClick={() => handleCategory(cat.name)}
                className={`border px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest transition-all ${activeCategory === cat.name ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]' : 'border-[#e0d9cc] bg-[#f0ece3] text-gray-800 hover:border-[#2d6a4f] hover:text-[#2d6a4f]'}`}
              >{cat.name}</button>
            </li>
          ))}
        </ul>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-8 pb-16 max-w-[1400px] mx-auto">
        {loading
          ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : displayedProducts.length === 0
            ? <div className="col-span-full text-center py-12 text-[#888] text-sm">Məhsul tapılmadı.</div>
            : displayedProducts.map((item, i) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  index={i}
                  onAddToCart={sebetAdd}
                  onDetail={onDetail}
                />
              ))
        }
      </div>
    </div>
  )
}

// ─── DETAIL PAGE ──────────────────────────────────────────────────────────────
function DetailPage({ product, sebetAdd }) {
  if (!product) {
    return (
      <div className="bg-[#f4f1eb] min-h-screen flex items-center justify-center" style={{ paddingTop: 68 }}>
        <div className="text-center py-16 text-[#888]">
          <p style={{ fontFamily: '"Playfair Display", serif' }} className="text-2xl font-bold mb-2 text-gray-800">Məhsul tapılmadı</p>
          <p className="text-sm mb-6">Axtardığınız məhsul mövcud deyil.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#f4f1eb] min-h-screen" style={{ paddingTop: 68 }}>
      <div className="min-h-[calc(100vh-68px)] flex items-center justify-center px-4 sm:px-8 py-12">
        <div className="w-full max-w-4xl bg-white border border-[#e0d9cc] rounded-2xl overflow-hidden md:flex shadow-xl" style={{ animation: 'fadeUp 0.5s ease both' }}>
          <div className="md:w-1/2 bg-white flex items-center justify-center p-8 min-h-[300px]">
            <img src={product.image} alt={product.title} className="w-full max-h-[360px] object-contain" />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <nav className="text-xs text-[#888] mb-4 font-medium uppercase tracking-widest">
                <span>Ana Səhifə</span>
                <span className="mx-2">/</span>
                <span className="text-[#2d6a4f]">{product.category}</span>
              </nav>
              <h1 style={{ fontFamily: '"Playfair Display", serif' }} className="text-3xl font-bold mb-3 text-gray-900">{product.title}</h1>
              <span className="inline-block bg-[#2d6a4f]/10 text-[#2d6a4f] text-xs px-3 py-1 rounded-full mb-4 font-semibold uppercase tracking-wider border border-[#2d6a4f]/20">
                {product.category}
              </span>
              <p className="text-[#888] leading-relaxed mb-6 text-sm">
                {product.description || 'Bu məhsul üçün ətraflı təsvir qeyd olunmayıb.'}
              </p>
            </div>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#e0d9cc]">
              <div>
                <div className="text-[11px] text-[#888] uppercase tracking-widest mb-1">Qiymət</div>
                <div style={{ fontFamily: '"Playfair Display", serif' }} className="text-4xl font-bold text-[#2d6a4f]">
                  {product.price} <span className="text-2xl">AZN</span>
                </div>
              </div>
              <button
                onClick={() => sebetAdd(product)}
                className="bg-[#2d6a4f] text-white px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all hover:bg-[#52b788] hover:scale-[1.03] active:scale-95"
              >Səbətə at</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function Shop() {
  const [page, setPage] = useState('shop') // 'shop' | 'detail'
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const { sebet, sebetAdd, azalt, artir, totalCount, totalPrice } = useCart()

  const handleDetail = (item) => {
    setSelectedProduct(item)
    setPage('detail')
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setPage('shop')
    setSelectedProduct(null)
  }

  const handleAddToCart = (item) => {
    sebetAdd(item)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');
        * { font-family: "DM Sans", sans-serif; box-sizing: border-box; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse2 {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <Header
        totalCount={totalCount}
        onCartOpen={() => setCartOpen(true)}
        onLogoClick={handleBack}
        showBack={page === 'detail'}
        onBack={handleBack}
      />

      {page === 'shop' && (
        <ShopPage sebetAdd={handleAddToCart} onDetail={handleDetail} />
      )}
      {page === 'detail' && (
        <DetailPage product={selectedProduct} sebetAdd={handleAddToCart} />
      )}

      {cartOpen && (
        <CartModal
          sebet={sebet}
          azalt={azalt}
          artir={artir}
          totalPrice={totalPrice}
          onClose={() => setCartOpen(false)}
        />
      )}
    </>
  )
}
