import React from "react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      {/* NAVBAR */}
      <nav className="bg-white px-12 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-900 flex items-center justify-center rounded text-white text-2xl font-bold">
            PS
          </div>
          <span className="text-blue-900 font-bold text-xl leading-tight">
            PASUT
          </span>
        </div>
        
        <ul className="flex gap-8 items-center list-none m-0 p-0">
          <li><a href="#" className="text-blue-900 no-underline font-medium hover:text-blue-700">Beranda</a></li>
          <li><a href="#" className="text-gray-600 no-underline hover:text-blue-900">Peta Interaktif</a></li>
          <li><a href="#" className="text-gray-600 no-underline hover:text-blue-900">Tentang Kami</a></li>
          <li><a href="#" className="text-gray-600 no-underline hover:text-blue-900">Masuk</a></li>
          <li><a href="#" className="text-sky-500 no-underline font-medium hover:text-sky-600">Lokasi Maya</a></li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section 
        className="py-36 px-8 flex flex-col items-center justify-center gap-6 bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1600&q=80')"
        }}
      >
        <div className="flex bg-white rounded-full overflow-hidden w-11/12 max-w-2xl shadow-xl">
          <div className="flex items-center px-6 text-gray-400 border-r">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Cari Kota, Pelabuhan, atau Station..."
            className="flex-1 py-4 px-2 border-none bg-white outline-none text-base text-gray-700"
          />
          <button className="px-10 py-4 rounded-none border-none bg-orange-500 text-white font-bold cursor-pointer text-base hover:bg-orange-600 transition-colors">
            CARI
          </button>
        </div>
        
        <p className="text-white text-xl font-light m-0" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
          Prediksi Pasang Surut Akurat di Ujung Jari Anda
        </p>
      </section>

      {/* CONTENT */}
      <section className="py-16 px-8 flex-1 bg-white">
        <h2 className="text-3xl mb-10 text-gray-800 font-normal text-center">
          Ringsaman Hari Ini
        </h2>

        <div className="flex justify-center gap-8 flex-wrap max-w-4xl mx-auto">
          <div className="bg-gray-50 p-8 w-80 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
              <h3 className="m-0 text-blue-900 text-lg font-semibold">
                Tanjung Priok, Jakarta
              </h3>
            </div>
            <p className="my-2 text-gray-600 text-sm">
              Pasang Maksimum: 04:30 AM
            </p>
            <p className="my-2 text-gray-600 text-sm">
              Surut Minimum: 0.3 m
            </p>
          </div>

          <div className="bg-gray-50 p-8 w-80 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
              <h3 className="m-0 text-blue-900 text-lg font-semibold">
                Surabaya, Jawa Timur
              </h3>
            </div>
            <p className="my-2 text-gray-600 text-sm">
              Pasang Maksimum: 04:30 AM (2.1 m)
            </p>
            <p className="my-2 text-gray-600 text-sm">
              Surut Minimum: 0.3 m
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-500 border-t border-gray-200 bg-white text-sm">
        <p className="mb-4">
          © 2024 Navigasi Laut. Powered by Teknologi & Transformasi Digital.
        </p>
        <div className="flex justify-center gap-6 text-xs text-gray-400">
          <span>Kebijakan Privasi</span>
          <span>Syarat & Ketentuan</span>
        </div>
      </footer>
    </div>
  );
}