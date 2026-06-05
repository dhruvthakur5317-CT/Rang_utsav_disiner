import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featuredProducts = [
    {
      id: "p1",
      title: "Jaipur Crimson Gota Anarkali Suit",
      category: "Suit",
      price: 4800,
      originalPrice: 6000,
      image: "/images/suit_product.png",
      rating: 4.8,
      isNew: true,
      isTrending: true
    },
    {
      id: "p2",
      title: "Royal Golden Kanjeevaram Silk Sari",
      category: "Saree",
      price: 12500,
      originalPrice: 16000,
      image: "/images/sari_product.png",
      rating: 5.0,
      isTrending: true
    },
    {
      id: "p3",
      title: "Heritage Crimson Embroidered Lehenga",
      category: "Lehenga",
      price: 38000,
      originalPrice: 48000,
      image: "/images/lehenga_product.png",
      rating: 4.9,
      isTrending: true
    },
    {
      id: "p4",
      title: "Modern Indigo Printed Silk Co-ord Set",
      category: "Coord Set",
      price: 2800,
      originalPrice: 3500,
      image: "/images/coord_product.png",
      rating: 4.6,
      isNew: true
    }
  ];

  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      <HeroBanner />

      {/* Featured Collection Section */}
      <section className="py-20 md:py-32 container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Featured Collections</h2>
           <div className="w-16 h-1 bg-amber-600 mb-6"></div>
           <p className="text-gray-500 max-w-2xl text-sm md:text-base">
              Explore our curated selection of premium handcrafted ethnic wear, designed to make you stand out at every occasion.
           </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map(product => (
             <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
           <button className="px-8 py-3 border border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white transition-colors uppercase tracking-widest text-sm font-medium">
             View All Products
           </button>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-12 border-t border-b border-gray-100">
         <div className="container mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center gap-3">
               <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
               </div>
               <h4 className="font-serif font-semibold text-sm">Secure Payments</h4>
               <p className="text-xs text-gray-500">100% secure checkout</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
               <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
               </div>
               <h4 className="font-serif font-semibold text-sm">Fast Delivery</h4>
               <p className="text-xs text-gray-500">Free shipping on orders above ₹1999</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
               <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/></svg>
               </div>
               <h4 className="font-serif font-semibold text-sm">Easy Returns</h4>
               <p className="text-xs text-gray-500">7 days return policy</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
               <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
               </div>
               <h4 className="font-serif font-semibold text-sm">Quality Guarantee</h4>
               <p className="text-xs text-gray-500">Premium fabric & craftsmanship</p>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-16">
         <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
               <div className="flex flex-col mb-6">
                  <span className="text-2xl font-serif font-bold text-white tracking-wider">Rang Utsav</span>
                  <span className="text-xs tracking-[0.2em] text-amber-500 font-medium">DESIGNER</span>
               </div>
               <p className="text-sm text-stone-400 mb-6">
                  Premium Indian boutique presenting designer women&apos;s suits, royal saris, heavy bridal lehengas, and chic modern co-ord sets. Handcrafted elegance in every weave.
               </p>
            </div>

            <div>
               <h4 className="text-white font-serif text-lg font-semibold mb-6">Shop</h4>
               <ul className="flex flex-col gap-3 text-sm">
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Sarees</a></li>
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Suits</a></li>
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Lehengas</a></li>
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Co-ord Sets</a></li>
                  <li><a href="#" className="hover:text-amber-500 transition-colors">New Arrivals</a></li>
               </ul>
            </div>

            <div>
               <h4 className="text-white font-serif text-lg font-semibold mb-6">Help</h4>
               <ul className="flex flex-col gap-3 text-sm">
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Track Order</a></li>
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Returns & Exchanges</a></li>
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Shipping Information</a></li>
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Customer Support</a></li>
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Size Guide</a></li>
               </ul>
            </div>

            <div>
               <h4 className="text-white font-serif text-lg font-semibold mb-6">Newsletter</h4>
               <p className="text-sm text-stone-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
               <div className="flex">
                  <input type="email" placeholder="Enter your email" className="bg-stone-800 border-none px-4 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-amber-500" />
                  <button className="bg-amber-600 text-white px-4 py-2 text-sm uppercase font-medium hover:bg-amber-700 transition-colors">Subscribe</button>
               </div>
            </div>
         </div>
         <div className="container mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-stone-800 text-center text-xs text-stone-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Rang Utsav Designer. All rights reserved.</p>
            <div className="flex items-center gap-4">
               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
         </div>
      </footer>
    </main>
  );
}
