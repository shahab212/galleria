'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

import { Product } from './types';
import { PRODUCTS, HERO_SLIDES, INSTA_POSTS } from './data';

// Component Imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collections from './components/Collections';
import Visualizer from './components/Visualizer';
import Shop from './components/Shop';
import About from './components/About';
import Advisory from './components/Advisory';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import SearchOverlay from './components/SearchOverlay';
import ProductDetailModal from './components/ProductDetailModal';
import CursorTrailer from './components/CursorTrailer';
import AmbientBackground from './components/AmbientBackground';
import MobileQuickBar from './components/MobileQuickBar';
import Patrons, { Patron } from './components/Patrons';



export default function GalleriaLandingPage() {
  // Full page preloader state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Theme State (Default to Dark Luxe Mode)
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setIsDarkMode(saved === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // Interactive State
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderReference, setOrderReference] = useState<string | null>(null);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Lahore',
    paymentMethod: 'cod'
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  // Dynamic products list initialized with static database array
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  // Dynamic slideshow list initialized with static database fallback
  const [heroSlidesList, setHeroSlidesList] = useState<any[]>(HERO_SLIDES);
  // Dynamic team curators list
  const [teamMembersList, setTeamMembersList] = useState<any[]>([]);
  // Dynamic global discount setting loaded via API
  const [globalDiscount, setGlobalDiscount] = useState<number>(0);
  // Dynamic Instagram showcase posts loaded via API
  const [instaPostsList, setInstaPostsList] = useState<any[]>(INSTA_POSTS);
  // Dynamic patrons list
  const [patronsList, setPatronsList] = useState<Patron[]>([]);


  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProductsList(data);
          setVisualizerArt(data[0]);
        }
      })
      .catch((err) => console.error('Error fetching live products:', err));

    fetch('/api/hero')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setHeroSlidesList(data);
        }
      })
      .catch((err) => console.error('Error fetching live hero slides:', err));

    fetch('/api/team')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTeamMembersList(data);
        }
      })
      .catch((err) => console.error('Error fetching live team curators:', err));

    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.globalDiscountPercent === 'number') {
          setGlobalDiscount(data.globalDiscountPercent);
        }
      })
      .catch((err) => console.error('Error fetching live settings:', err));

    fetch('/api/instagram')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setInstaPostsList(data);
        }
      })
      .catch((err) => console.error('Error fetching live Instagram posts:', err));

    fetch('/api/patrons')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPatronsList(data);
        }
      })
      .catch((err) => console.error('Error fetching live patrons:', err));
  }, []);


  // Selected product modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState('gold');
  const [addedModalId, setAddedModalId] = useState<string | null>(null);
  const [modalQty, setModalQty] = useState(1);
  const [selectedThumbIndex, setSelectedThumbIndex] = useState(0);
  const [purchaseOption, setPurchaseOption] = useState<'standard' | 'framed'>('standard');
  const [hasAddedToCart, setHasAddedToCart] = useState(false);
  const [wallTransformation, setWallTransformation] = useState<'before' | 'after'>('after');

  // Interactive Room Art Visualizer States
  const [visualizerArt, setVisualizerArt] = useState<Product>(PRODUCTS[0]);
  const [visualizerRoom, setVisualizerRoom] = useState<'minimalist' | 'obsidian' | 'warm'>('minimalist');
  const [visualizerFrame, setVisualizerFrame] = useState<'walnut' | 'gold' | 'black'>('walnut');
  const [visualizerScale, setVisualizerScale] = useState<'medium' | 'gallery' | 'oversized'>('gallery');

  useEffect(() => {
    if (selectedProduct) {
      setModalQty(1);
      setSelectedThumbIndex(0);
      setPurchaseOption('standard');
      setHasAddedToCart(false);
    }
  }, [selectedProduct]);

  // Active Scroll Spy state for Floating Navbar
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'collections', 'visualizer', 'shop', 'about', 'contact'];

    const handleScrollSpy = () => {
      // Check if user is scrolled near the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Infinite Scroll / Load remaining products state
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Auto-scroll listener to load remaining products when approaching bottom
  useEffect(() => {
    const handleScroll = () => {
      if (isLoadingMore) return;
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 900;

      const filteredProducts = activeTab === 'all' 
        ? productsList 
        : productsList.filter((p) => p.category === activeTab);

      if (scrollPosition >= threshold && visibleCount < filteredProducts.length) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + 3, filteredProducts.length));
          setIsLoadingMore(false);
        }, 500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount, isLoadingMore, activeTab]);

  // Toast notification banner
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add to cart handler
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    triggerToast(`Added "${product.name}" to your cart`);
  };

  // Update quantity
  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: Product; quantity: number }[]
    );
  };

  // Toggle wishlist
  const toggleWishlist = (productId: string, name: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        triggerToast(`Removed "${name}" from Wishlist`);
        return prev.filter((id) => id !== productId);
      } else {
        triggerToast(`Added "${name}" to Wishlist`);
        return [...prev, productId];
      }
    });
  };

  // Total calculation
  const getEffectivePrice = (product: Product) => {
    const specific = product.discountPercent || 0;
    const activeDiscount = specific > 0 ? specific : globalDiscount;
    if (activeDiscount <= 0) return product.pricePKR;
    return Math.round(product.pricePKR * (1 - activeDiscount / 100));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + getEffectivePrice(item.product) * item.quantity, 0);

  return (
    <div className={`relative min-h-screen flex flex-col font-sans overflow-x-hidden transition-colors duration-500 ${
      isDarkMode ? 'bg-[#070D14] text-slate-200' : 'bg-[#FAF7F2] text-[#0C1623]'
    }`}>
      {/* 0B. CUSTOM CURSOR TRAILER */}
      <CursorTrailer />
      {/* 0C. DRIFTING AMBIENT BACKGROUND */}
      <AmbientBackground isDarkMode={isDarkMode} />
      {/* 0. FULL PAGE ROTATING MONOGRAM PRELOADER SCREEN */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
          isDarkMode ? 'bg-[#070D14]' : 'bg-[#FAF7F2]'
        } ${isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none -translate-y-6 scale-95'}`}
      >
        <div className="relative flex flex-col items-center justify-center">
          {/* Rotating Monogram Image with Golden Glow */}
          <div className="relative w-32 h-32 sm:w-44 sm:h-44 flex items-center justify-center">
            {/* Ambient gold glow behind monogram */}
            <div className="absolute inset-0 rounded-full bg-[#C5A059]/15 blur-2xl animate-pulse"></div>

            {/* Continuous Smooth Rotating Monogram */}
            <Image
              src="/images/monogram.png"
              alt="Galleria Monogram"
              width={180}
              height={180}
              className="w-full h-full object-contain animate-[spin_6s_linear_infinite]"
              priority
            />
          </div>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0B131F] text-white px-5 py-3.5 shadow-2xl rounded-none border-l-4 border-[#C5A059] animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
          <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* 2. FLOATING PILL NAVIGATION HEADER */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        totalCartCount={totalCartCount}
        wishlist={wishlist}
        setIsCartOpen={setIsCartOpen}
        setIsSearchOpen={setIsSearchOpen}
        triggerToast={triggerToast}
      />

      {/* 3. HERO SECTION */}
      <Hero setActiveTab={setActiveTab} heroSlides={heroSlidesList} />

      {/* 4. CURVED LOOKBOOK SLIDER */}
      <Collections isDarkMode={isDarkMode} setSelectedProduct={setSelectedProduct} />

      {/* 4B. INTERACTIVE ROOM ART VISUALIZER */}
      <Visualizer
        isDarkMode={isDarkMode}
        visualizerArt={visualizerArt}
        setVisualizerArt={setVisualizerArt}
        visualizerRoom={visualizerRoom}
        setVisualizerRoom={setVisualizerRoom}
        visualizerFrame={visualizerFrame}
        setVisualizerFrame={setVisualizerFrame}
        visualizerScale={visualizerScale}
        setVisualizerScale={setVisualizerScale}
        addToCart={addToCart}
        triggerToast={triggerToast}
        products={productsList}
        globalDiscount={globalDiscount}
      />

      {/* 5. FEATURED SHOP SECTION */}
      <Shop
        isDarkMode={isDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
        isLoadingMore={isLoadingMore}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        setSelectedProduct={setSelectedProduct}
        addToCart={addToCart}
        products={productsList}
        globalDiscount={globalDiscount}
      />

      {/* 6. BRAND STORY / ABOUT US SECTION */}
      <About isDarkMode={isDarkMode} teamMembers={teamMembersList} />

      {/* 6B. DISTINGUISHED PATRONS SECTION */}
      <Patrons isDarkMode={isDarkMode} patrons={patronsList} />

      {/* 7-9. Bespoke Advisory & Propositions & Social feed */}
      <Advisory isDarkMode={isDarkMode} triggerToast={triggerToast} instaPosts={instaPostsList} />

      {/* 9B. CONTACT US SECTION */}
      <Contact isDarkMode={isDarkMode} triggerToast={triggerToast} />

      {/* 10. BRAND FOOTER */}
      <Footer isDarkMode={isDarkMode} triggerToast={triggerToast} />

      {/* SLIDE-OUT CART DRAWER */}
      <CartDrawer
        isDarkMode={isDarkMode}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        setIsCheckoutOpen={setIsCheckoutOpen}
        setOrderReference={setOrderReference}
        cart={cart}
        totalCartCount={totalCartCount}
        cartSubtotal={cartSubtotal}
        updateQuantity={updateQuantity}
        triggerToast={triggerToast}
        globalDiscount={globalDiscount}
      />

      {/* INTERACTIVE CHECKOUT MODAL OVERLAY */}
      <CheckoutModal
        isDarkMode={isDarkMode}
        isCheckoutOpen={isCheckoutOpen}
        setIsCheckoutOpen={setIsCheckoutOpen}
        orderReference={orderReference}
        setOrderReference={setOrderReference}
        checkoutForm={checkoutForm}
        setCheckoutForm={setCheckoutForm}
        cart={cart}
        setCart={setCart}
        cartSubtotal={cartSubtotal}
        globalDiscount={globalDiscount}
      />

      {/* SEARCH OVERLAY */}
      <SearchOverlay
        isDarkMode={isDarkMode}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        addToCart={addToCart}
        products={productsList}
        globalDiscount={globalDiscount}
      />

      {/* PRODUCT DETAILS MODAL */}
      <ProductDetailModal
        isDarkMode={isDarkMode}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        setIsCartOpen={setIsCartOpen}
        addToCart={addToCart}
        selectedThumbIndex={selectedThumbIndex}
        setSelectedThumbIndex={setSelectedThumbIndex}
        purchaseOption={purchaseOption}
        setPurchaseOption={setPurchaseOption}
        hasAddedToCart={hasAddedToCart}
        setHasAddedToCart={setHasAddedToCart}
        modalQty={modalQty}
        setModalQty={setModalQty}
        globalDiscount={globalDiscount}
      />

      {/* MOBILE QUICK BAR */}
      <MobileQuickBar
        isDarkMode={isDarkMode}
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* FLOATING CART BUTTON (DESKTOP ONLY) */}
      {cart.length > 0 && !isCartOpen && !isCheckoutOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className={`fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full hidden md:flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 animate-fadeIn ${
            isDarkMode
              ? 'bg-[#C5A059] text-[#0C1623] hover:bg-white'
              : 'bg-[#0C1623] text-white hover:bg-[#C5A059] hover:text-[#0C1623]'
          }`}
          aria-label="Open Cart"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white/20">
            {totalCartCount}
          </span>
        </button>
      )}
    </div>
  );
}
