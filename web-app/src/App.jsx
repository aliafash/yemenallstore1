import React, { useState, useEffect } from 'react';

const products = [
  {
    id: "t1",
    nameAr: "باقة إنترنت يمن موبايل 4G",
    nameEn: "Yemen Mobile 4G Package",
    category: "Telecom",
    price: 4500,
    unit: "YR",
    icon: "fa-solid fa-mobile-screen-button",
    descAr: "باقة إنترنت فائقة السرعة 10 جيجابايت صالحة لمدة شهر كامل على شبكة يمن موبايل الرئيسية.",
    descEn: "High-speed 10GB internet package valid for one month on the main Yemen Mobile network."
  },
  {
    id: "t2",
    nameAr: "رصيد شحن سبأفون فوري",
    nameEn: "SabaFon Fast Recharge",
    category: "Telecom",
    price: 1000,
    unit: "YR",
    icon: "fa-solid fa-phone",
    descAr: "شحن رصيد فوري وسريع لشبكة سبأفون الهاتفية بشكل مباشر في ثوانٍ معدودة.",
    descEn: "Instant and fast mobile credit recharge for SabaFon network delivered directly in seconds."
  },
  {
    id: "g1",
    nameAr: "جنبية صيفاني يمنية فاخرة",
    nameEn: "Luxury Yemeni Jambiya",
    category: "Garments",
    price: 75000,
    unit: "YR",
    icon: "fa-solid fa-gem",
    descAr: "جنبية يمنية تراثية أصيلة مصنوعة بأجود خامات الصيفاني الفاخر وبحرفية هندسية ويدوية متقنة.",
    descEn: "Authentic heritage Yemeni Jambiya crafted with the finest luxury Saifani materials and master handcraft."
  },
  {
    id: "g2",
    nameAr: "شال كشميري يمني أصيل",
    nameEn: "Authentic Kashmiri Shawl",
    category: "Garments",
    price: 12000,
    unit: "YR",
    icon: "fa-solid fa-shirt",
    descAr: "شال يمني تقليدي بنقوش فريدة مصنوع من الصوف الناعم والأنيق لجميع المناسبات الرسمية والخاصة.",
    descEn: "Yemeni traditional shawl with unique patterns made of soft, elegant wool for all official occasions."
  },
  {
    id: "c1",
    nameAr: "بخور عدني ملكي فاخر",
    nameEn: "Luxury Adeni Bakhoor",
    category: "Cosmetics",
    price: 8500,
    unit: "YR",
    icon: "fa-solid fa-spa",
    descAr: "بخور عدني أصلي ذو رائحة زكية وبخور ملكي معطر للمنازل والمجالس والمناسبات الهامة.",
    descEn: "Original royal Adeni Bakhoor with a sweet luxury fragrance for homes, salons and special events."
  },
  {
    id: "c2",
    nameAr: "كحل إثمد عربي أصلي",
    nameEn: "Original Arab Ithmid Kohl",
    category: "Cosmetics",
    price: 3500,
    unit: "YR",
    icon: "fa-solid fa-eye",
    descAr: "كحل إثمد طبيعي نقي وخالٍ من الرصاص للعناية الفائقة بالعين وتقويتها بنقاوة تامة.",
    descEn: "Pure natural lead-free Ithmid Kohl for dynamic eye care and healthy magnification with full purity."
  },
  {
    id: "gd1",
    nameAr: "هاتف ذكي حديث 4G/5G",
    nameEn: "Modern 4G/5G Smartphone",
    category: "Gadgets",
    price: 180000,
    unit: "YR",
    icon: "fa-solid fa-mobile-button",
    descAr: "أحدث الهواتف الذكية الداعمة لشبكات الجيل الرابع والخامس الفائقة في ربوع اليمن الحبيب.",
    descEn: "Latest smartphone supporting premium 4G/5G mobile networks within our beloved regions of Yemen."
  },
  {
    id: "e1",
    nameAr: "شاحن متنقل بمخرج سريع وشاشة ذكية",
    nameEn: "Fast Power Bank with Digital Display",
    category: "Electronics",
    price: 15000,
    unit: "YR",
    icon: "fa-solid fa-battery-three-quarters",
    descAr: "باور بانك ذكي ذو سعة ضخمة لشحن هاتفك في أي مكان وحل مثالي لمشكلة انقطاع الكهرباء في اليمن.",
    descEn: "Smart large capacity power bank to charge your phone anywhere, a perfect solution for power cuts in Yemen."
  },
  {
    id: "re1",
    nameAr: "شقة سكنية فاخرة - حدة، صنعاء",
    nameEn: "Luxury Apartment - Haddah, Sana'a",
    category: "Real Estate",
    price: 45000000,
    unit: "YR",
    icon: "fa-solid fa-building",
    descAr: "شقة راقية ومؤثثة بأبهى نظام في أرقى أحياء العاصمة صنعاء - حي حدة الهادئ مع كافة الخدمات المتكاملة والمواقف.",
    descEn: "High-end furnished apartment in Sana'a's finest neighborhood - peaceful Haddah district of Sana'a with premium facilities."
  },
  {
    id: "l1",
    nameAr: "شحن وتوصيل طرود سريع بين المحافظات",
    nameEn: "Fast Parcel Delivery Between Provinces",
    category: "Logistics",
    price: 3000,
    unit: "YR",
    icon: "fa-solid fa-truck-fast",
    descAr: "خدمة توصيل آمنة ومدروسة بأعلى سرعة لنقل الطرود والمستندات بأسعار مناسبة لجميع الأطراف والشركات.",
    descEn: "Safe, fast, and optimized shipping service for parcels and documents with cheap rates for all parties."
  }
];

const categories = ["All", "Telecom", "Garments", "Cosmetics", "Gadgets", "Electronics", "Real Estate", "Logistics"];

const categoryNames = {
  "All": { ar: "الكل", en: "All" },
  "Telecom": { ar: "الاتصالات", en: "Telecom" },
  "Garments": { ar: "الملابس والملبوسات", en: "Garments" },
  "Cosmetics": { ar: "مستحضرات وجمال", en: "Cosmetics" },
  "Gadgets": { ar: "أجهزة ذكية", en: "Gadgets" },
  "Electronics": { ar: "إلكترونيات", en: "Electronics" },
  "Real Estate": { ar: "العقارات", en: "Real Estate" },
  "Logistics": { ar: "اللوجستية والشحن", en: "Logistics" }
};

export default function App() {
  const [isArabic, setIsArabic] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Set document direction based on language
  useEffect(() => {
    document.dir = isArabic ? 'rtl' : 'ltr';
    document.lang = isArabic ? 'ar' : 'en';
  }, [isArabic]);

  const filteredProducts = products.filter(p => {
    const term = searchQuery.toLowerCase();
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.nameAr.toLowerCase().includes(term) ||
                          p.nameEn.toLowerCase().includes(term) ||
                          p.descAr.toLowerCase().includes(term) ||
                          p.descEn.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  return (
    <div className="min-h-screen pb-12 transition-colors duration-200">
      {/* Navbar */}
      <header className="border-b border-gray-800 bg-slate-900 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <i className="fa-solid fa-store text-amber-500"></i>
              {isArabic ? "متجر اليمن الشامل" : "Yemen All Store"}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {isArabic ? "البوابة الرقمية الأولى للتسوق والخدمات الشاملة في اليمن" : "Yemen's #1 Digital Portal for Goods & Universal Services"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switch */}
            <button 
              onClick={() => setIsArabic(!isArabic)} 
              className="bg-slate-800 hover:bg-slate-700 text-amber-400 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 border border-slate-700 shadow-md"
            >
              <i className="fa-solid fa-earth-americas"></i>
              {isArabic ? "English" : "العربية"}
            </button>

            {/* Cart Widget */}
            <button 
              onClick={() => setShowCart(true)}
              className="relative bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition shadow-lg"
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span>{isArabic ? "سلة المشتريات" : "Cart"}</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold border border-white">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Body Grid */}
      <main className="max-w-6xl mx-auto px-4 mt-6">
        
        {/* DIRECT DOWNLOAD PANEL FOR THE ANDROID USER */}
        <section className="bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 border-2 border-amber-500/40 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="bg-amber-500 text-black text-xs font-bold uppercase px-2.5 py-1 rounded-full">
                {isArabic ? "مخصص لمستخدمي الهاتف" : "Smartphone Optimized"}
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2">
                <i className="fa-brands fa-android text-emerald-400 text-2xl animate-bounce"></i>
                {isArabic ? "روابط التحميل المباشرة والكاملة" : "Direct Download Hub"}
              </h2>
              <p className="text-sm text-slate-300 max-w-xl">
                {isArabic 
                  ? "قم بتحميل التطبيق بصيغة APK مباشرة على هاتفك الأندرويد، أو احصل على الكود البرمجي للمشروع كاملاً لتعديله." 
                  : "Download the application as an APK installer directly to your phone, or get the complete master zip file of the source code."}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* APK DOWNLOAD */}
              <a 
                href="/app-debug.apk"
                download="YemenAllStore.apk"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <i className="fa-solid fa-download text-lg"></i>
                <div className="text-right">
                  <div className="text-xs opacity-80">{isArabic ? "تحميل فوري" : "Download Now"}</div>
                  <div className="text-sm">{isArabic ? "ملف التطبيق Android APK" : "Android App APK"}</div>
                </div>
              </a>

              {/* PROJECT ZIP DOWNLOAD */}
              <a 
                href="/project.zip"
                download="Yemen_All_Store_Project.zip"
                className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <i className="fa-solid fa-file-zipper text-lg"></i>
                <div className="text-right">
                  <div className="text-xs opacity-80">{isArabic ? "كود المشروع" : "Source Code"}</div>
                  <div className="text-sm">{isArabic ? "ملف المشروع project.zip" : "Project ZIP Source"}</div>
                </div>
              </a>

              {/* WEB DIST ZIP DOWNLOAD */}
              <a 
                href="/dist.zip"
                download="Yemen_All_Store_Web_Build.zip"
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <i className="fa-solid fa-globe text-lg"></i>
                <div className="text-right">
                  <div className="text-xs opacity-80">{isArabic ? "ملفات الويب" : "Web Compiled"}</div>
                  <div className="text-sm">{isArabic ? "ملف ويب مجمع dist.zip" : "Web build dist.zip"}</div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-amber-600 to-red-600 rounded-3xl p-8 mb-8 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 bottom-0 opacity-10 text-9xl">
            <i className="fa-solid fa-bag-shopping"></i>
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {isArabic ? "تسوّق، اشحن رصيدك، استكشف عروض العقار واللوجستيات" : "Shop, Recharge, Explore Real Estate & Delivery Logistics"}
            </h2>
            <p className="text-amber-100 mt-3 text-base">
              {isArabic 
                ? "نوفر لجميع المستخدمين في عموم محافظات اليمن أفضل خدمات شحن باقات الموبايل والإنترنت، بيع الملبوسات والتحف التقليدية، حجز العقارات والطرود اللوجستية محلياً." 
                : "We provide high-quality retail products, traditional Yemeni crafts, mobile recharge, estate browsing, and cargo logistics delivery routes."}
            </p>
          </div>
        </section>

        {/* Search & Filtering Control */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isArabic ? "ابحث عن منتج، باقة، عقار، أو خدمة لوجستية..." : "Search for goods, packages, apartments, or fast shipping..."}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pr-10 pl-4 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            {/* Categories scrollable in mobile / grid in desktop */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto scrollbar-none py-1">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                const localizedName = categoryNames[cat] ? (isArabic ? categoryNames[cat].ar : categoryNames[cat].en) : cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-amber-600 text-white shadow-md' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {localizedName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div 
              key={p.id} 
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition duration-200 group shadow-md"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-800 rounded-xl text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition duration-200">
                    <i className={`${p.icon} text-2xl`}></i>
                  </div>
                  <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-full font-semibold">
                    {categoryNames[p.category] ? (isArabic ? categoryNames[p.category].ar : categoryNames[p.category].en) : p.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2 text-white">
                  {isArabic ? p.nameAr : p.nameEn}
                </h3>
                
                <p className="text-slate-400 text-xs line-clamp-3 mb-4 leading-relaxed">
                  {isArabic ? p.descAr : p.descEn}
                </p>
              </div>

              <div>
                <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-amber-500 mr-1">
                      {p.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400">
                      {isArabic ? "ريال يمني" : "YR"}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(p)}
                    className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-plus"></i>
                    {isArabic ? "أضف للسلة" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center max-w-md mx-auto mt-6">
            <i className="fa-solid fa-box-open text-slate-600 text-5xl mb-4"></i>
            <h3 className="text-lg font-bold mb-1">
              {isArabic ? "لا توجد نتائج مطابقة" : "No results found"}
            </h3>
            <p className="text-slate-400 text-xs">
              {isArabic 
                ? "جرب إدخال مصطلح دلالي آخر أو غير الفرز النشط حالياً." 
                : "Try looking for another term or change your active category filter."}
            </p>
          </div>
        )}
      </main>

      {/* Cart Modal Slide-Over */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            {/* Overlay */}
            <div onClick={() => setShowCart(false)} className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-slate-900 shadow-2xl border-r border-slate-850">
                  <div className="p-6 overflow-y-auto flex-1">
                    <div className="flex items-start justify-between">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <i className="fa-solid fa-basket-shopping text-amber-500"></i>
                        {isArabic ? "سلة المشتريات" : "Shopping Cart"}
                      </h2>
                      <button onClick={() => setShowCart(false)} className="text-slate-400 hover:text-white text-xl">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>

                    <div className="mt-8">
                      {cart.length === 0 ? (
                        <div className="text-center py-20">
                          <i className="fa-solid fa-cart-arrow-down text-slate-600 text-5xl mb-4"></i>
                          <p className="text-slate-400 text-sm">
                            {isArabic ? "سلتك فارغة تماماً. ابدأ بإضافة المنتجات والخدمات الآن!" : "Your cart is empty. Start filling it with goodies!"}
                          </p>
                        </div>
                      ) : (
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-slate-800">
                            {cart.map((item, idx) => (
                              <li key={idx} className="py-6 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="p-2.5 bg-slate-800 rounded-lg text-amber-500">
                                    <i className={item.icon}></i>
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-sm text-white">
                                      {isArabic ? item.nameAr : item.nameEn}
                                    </h4>
                                    <span className="text-xs text-slate-400">
                                      {item.category}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="font-extrabold text-amber-500 text-sm">
                                    {item.price.toLocaleString()} {isArabic ? "ريـال" : "YR"}
                                  </span>
                                  <button onClick={() => removeFromCart(idx)} className="text-red-500 hover:text-red-400 text-xs bg-red-500/10 p-1.5 rounded-lg">
                                    <i className="fa-solid fa-trash-can"></i>
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {cart.length > 0 && (
                    <div className="border-t border-slate-800 p-6 bg-slate-950">
                      <div className="flex justify-between text-base font-medium text-white mb-6">
                        <p>{isArabic ? "إجمالي الحساب" : "Total Order Value"}</p>
                        <p className="text-xl font-black text-amber-500">
                          {calculateTotal().toLocaleString()} {isArabic ? "ريال يمني" : "YR"}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const msg = encodeURIComponent(
                            isArabic 
                              ? `مرحباً متجر اليمن الشامل، أود شراء:\n${cart.map(c => `- ${c.nameAr} (${c.price} ريال)`).join('\n')}\n\nالإجمالي: ${calculateTotal()} ريال يمني.`
                              : `Hello Yemen All Store, I want to order:\n${cart.map(c => `- ${c.nameEn} (${c.price} YR)`).join('\n')}\n\nTotal: ${calculateTotal()} YR.`
                          );
                          window.open(`https://wa.me/967777777777?text=${msg}`, '_blank');
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-xl font-bold transition flex items-center justify-center gap-2"
                      >
                        <i className="fa-brands fa-whatsapp text-lg"></i>
                        {isArabic ? "تأكيد الطلب وإرساله عبر واتساب" : "Confirm & Send via WhatsApp"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
