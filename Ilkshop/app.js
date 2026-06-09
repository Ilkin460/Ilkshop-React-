let mehsullarArray = []
    let sebet = []

    // Dropdown-u bağla: xaricdə klik olduqda
    document.addEventListener('click', function(e) {
        const srclist = document.getElementById('srclist')
        const searchInput = document.getElementById('searchInput')
        if (!srclist.contains(e.target) && e.target !== searchInput) {
            srclist.style.display = 'none'
        }
    })

    // Skeleton loader
    function skeletonGoster() {
        document.getElementById('mehsullar').innerHTML = Array(8).fill(`
            <div class="bg-surface border border-border rounded-2xl overflow-hidden animate-pulse2">
                <div class="h-[220px] bg-[#e8e2d8]"></div>
                <div class="p-5 space-y-3">
                    <div class="h-3 bg-[#e8e2d8] rounded-full"></div>
                    <div class="h-3 bg-[#e8e2d8] rounded-full w-3/5"></div>
                    <div class="h-5 bg-[#e8e2d8] rounded-full w-2/5"></div>
                </div>
            </div>
        `).join('')
    }

    // Kateqoriyaları API-dan gətir
    function getCategory() {
        fetch('https://69c575978a5b6e2dec2c85a6.mockapi.io/product/category')
            .then(res => res.json())
            .then(cats => {
                const list = document.getElementById('categoryList')
                cats.forEach(cat => {
                    const li = document.createElement('li')
                    li.innerHTML = `
                        <button onclick="filtrData('${cat.name}', this)"
                            class="cat-btn border border-border bg-surface2 text-gray-800 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest hover:border-accent hover:text-accent">
                            ${cat.name}
                        </button>
                    `
                    list.appendChild(li)
                })
            })
    }

    // Məhsulları API-dan gətir
    function sayt() {
        skeletonGoster()
        fetch('https://69c575978a5b6e2dec2c85a6.mockapi.io/product/product')
            .then(res => res.json())
            .then(data => {
                mehsullarArray = data
                ekranaDuz(data)
            })
        getCategory()
    }

    function ekranaDuz(data) {
        const el = document.getElementById('mehsullar')
        if (!data.length) {
            el.innerHTML = `<div class="col-span-full text-center py-12 text-muted text-sm">Məhsul tapılmadı.</div>`
            return
        }
        el.innerHTML = data.map((item, i) => `
            <div class="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col animate-fadeUp group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#c5bfb2]"
                style="animation-delay:${i * 0.05}s">
                <div class="relative bg-white h-[220px] flex items-center justify-center p-6 overflow-hidden">
                    <span class="absolute top-3 left-3 bg-white/90 text-[#777] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-border backdrop-blur">${item.category}</span>
                    <img src="${item.image}" alt="${item.title}" loading="lazy"
                        class="h-[160px] w-full object-contain transition-transform duration-300 group-hover:scale-[1.08]"/>
                </div>
                <div class="p-5 flex flex-col flex-1 gap-2">
                    <p class="text-sm font-medium leading-snug line-clamp-2">${item.title}</p>
                    <div class="mt-auto pt-1">
                        <div class="font-display text-xl font-bold text-accent mb-3">${item.price} AZN</div>
                        <button onclick="sebetAdd(${item.id})"
                            class="w-full border border-border text-gray-800 py-2.5 rounded-xl text-xs font-medium uppercase tracking-widest transition-all duration-200 hover:bg-accent hover:border-accent hover:text-white mb-2">
                            Səbətə at
                        </button>
                        <a href="detail.htm?s=${slugCreate(item.title)}"
                            class="w-full block text-center border border-accent text-accent py-2.5 rounded-xl text-xs font-medium uppercase tracking-widest transition-all duration-200 hover:bg-accent hover:text-white">
                            Daha ətraflı →
                        </a>
                    </div>
                </div>
            </div>
        `).join('')
    }

    // Dropdown siyahısını render et (App.js-dən alındı, dizayna uyğunlaşdırıldı)
    function srclistData(data) {
        const srclist = document.getElementById('srclist')
        if (!data.length) {
            srclist.innerHTML = `<div class="src-empty">Nəticə tapılmadı.</div>`
            return
        }
        srclist.innerHTML = data.map(s => `
            <div class="src-item" onclick="getDetail('${slugCreate(s.title)}')">
                <img src="${s.image}" alt="${s.title}"/>
                <div>
                    <div class="src-title">${s.title}</div>
                    <div class="src-price">${s.price} AZN</div>
                </div>
            </div>
        `).join('')
    }

    function searchData(value) {
        const srclist = document.getElementById('srclist')
        const keyword = value.toLowerCase().trim()

        if (!keyword) {
            srclist.style.display = 'none'
            return
        }

        const dropdownFiltr = mehsullarArray.filter(item => item.title.toLowerCase().startsWith(keyword))
        srclistData(dropdownFiltr)
        srclist.style.display = 'block'
    }

    function filtrData(name, btn) {
        // Search input-u sıfırla
        const si = document.getElementById('searchInput')
        const srclist = document.getElementById('srclist')
        if (si) si.value = ''
        if (srclist) srclist.style.display = 'none'

        // Active class idarəsi
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'))
        if (btn) btn.classList.add('active')
        else document.querySelector('.cat-btn').classList.add('active')

        const netice = (name === 'all') ? mehsullarArray : mehsullarArray.filter(f => f.category === name)
        ekranaDuz(netice)
    }

    // Slug yaratma funksiyası (App.js-dən)
    function slugCreate(title) {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '')
    }

    // Məhsul detail səhifəsinə keç
    function getDetail(slug) {
        window.location.href = `detail.htm?s=${slug}`
    }

    function sebetAdd(id) {
        const tapilan = mehsullarArray.find(x => x.id == id)
        const mov = sebet.find(x => x.id == id)
        if (mov) { mov.sayi++ } else { sebet.push({...tapilan, sayi: 1}) }
        sebetiYenile()
        const badge = document.getElementById('say')
        badge.style.transform = 'scale(1.4)'
        setTimeout(() => badge.style.transform = '', 200)
    }

    function azalt(id) {
        const idx = sebet.findIndex(x => x.id == id)
        if (idx !== -1) {
            sebet[idx].sayi--
            if (sebet[idx].sayi < 1) sebet.splice(idx, 1)
        }
        sebetiYenile()
    }

    function artir(id) {
        const m = sebet.find(x => x.id == id)
        if (m) m.sayi++
        sebetiYenile()
    }

    function sebetiYenile() {
        const siyahi = document.getElementById('siyahi')
        const say    = document.getElementById('say')
        const umumi  = document.getElementById('umumi')

        if (sebet.length === 0) {
            bagla()
            say.innerText = 0
            siyahi.innerHTML = ''
            return
        }

        let cemi = 0, obsi = 0
        siyahi.innerHTML = sebet.map(item => {
            obsi += item.price * item.sayi
            cemi += item.sayi
            return `
                <div class="flex items-center justify-between py-3.5 border-b border-border gap-4 last:border-b-0">
                    <div class="w-[52px] h-[52px] bg-white rounded-xl flex items-center justify-center p-1.5 shrink-0">
                        <img src="${item.image}" class="w-full h-full object-contain"/>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-xs font-medium truncate">${item.title}</p>
                        <p class="text-sm font-semibold text-accent mt-0.5">${(item.price * item.sayi).toFixed(2)} AZN</p>
                    </div>
                    <div class="flex items-center border border-border rounded-lg overflow-hidden shrink-0">
                        <button onclick="azalt(${item.id})" class="w-8 h-8 bg-surface2 text-gray-700 hover:bg-border transition-colors text-base">−</button>
                        <span class="w-8 text-center text-sm font-bold">${item.sayi}</span>
                        <button onclick="artir(${item.id})" class="w-8 h-8 bg-surface2 text-gray-700 hover:bg-border transition-colors text-base">+</button>
                    </div>
                </div>
            `
        }).join('')
        say.innerText = cemi
        umumi.innerText = obsi.toFixed(2)
    }

    function sebetiAc() {
        if (sebet.length === 0) {
            document.getElementById('siyahi').innerHTML = `
                <div class="text-center py-10 text-muted">
                    <svg viewBox="0 0 24 24" class="w-14 h-14 mx-auto mb-3" fill="none" stroke="#ccc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
                    </svg>
                    <p class="text-base font-medium text-[#aaa]">Səbət boşdur</p>
                    <p class="text-xs mt-1.5">Məhsul əlavə etmək üçün mağazaya qayıdın</p>
                </div>
            `
            document.getElementById('umumi').innerText = '0.00'
        }
        modal.classList.replace('gizle', 'goster')
    }

    function bagla() { modal.classList.replace('goster', 'gizle') }
    function modalDis(e) { if (e.target === modal) bagla() }

    sayt()