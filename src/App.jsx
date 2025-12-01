import React, { useEffect, useRef } from 'react';
import * as Chart from 'chart.js/auto';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function NavigasiLaut() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const mapRef = useRef(null);


  useEffect(() => {
    if (mapRef.current) return; // Prevent duplicate map initialization

    const map = L.map("map").setView([-5.5, 107], 6);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    const titikLokasi = [
      { coord: [-6.00221793, 106.71675361] },
      { coord: [-8.731305, 115.163889] },
      { coord: [-2.0973, 106.2104] },
      { coord: [-6.388072, 105.821341] }
    ];

    titikLokasi.forEach((item) => {
      L.marker(item.coord)
        .addTo(map)
        .bindPopup(`<br>Lat: ${item.coord[0]}<br>Lng: ${item.coord[1]}`);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const labels = ['00:00', '04:00', '06:00', '10:00', '16:00', '18:00', '20:00'];
      const dataPasangMaks = [1.0, 2.0, 1.8, 1.2, 1.5, 0.8, 1.5];
      const dataSurutMin = [0.5, 1.5, 1.3, 0.7, 1.0, 0.3, 1.0];

      chartInstanceRef.current = new Chart.Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Pasang Maksimum',
              data: dataPasangMaks,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true,
              borderWidth: 3,
              pointRadius: 4,
              pointHoverRadius: 6
            },
            {
              label: 'Surut Minimum',
              data: dataSurutMin,
              borderColor: '#64748b',
              tension: 0.4,
              fill: false,
              borderWidth: 3,
              pointRadius: 4,
              pointHoverRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 15,
                font: {
                  size: 12,
                  weight: '600'
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Ketinggian (meter)',
                font: {
                  weight: '600'
                }
              }
            },
            x: {
              title: {
                display: true,
                text: 'Waktu',
                font: {
                  weight: '600'
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* NAVBAR */}
      <nav className="bg-white/95 backdrop-blur-md px-8 md:px-12 py-5 flex justify-between items-center shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center rounded-xl text-white text-2xl font-bold shadow-lg">
            PS
          </div>
          <div>
            <span className="text-blue-900 font-bold text-xl block leading-none">PASUT</span>
            <span className="text-xs text-gray-500 font-medium">Tide Prediction System</span>
          </div>
        </div>

        <ul className="flex gap-8 items-center">
          <li><a href="#beranda" className="text-blue-900 font-semibold hover:text-blue-700 transition-colors">Beranda</a></li>
          <li><a href="#peta" className="text-gray-600 hover:text-blue-900 transition-colors">Peta Interaktif</a></li>
          <li><a href="#detail" className="text-gray-600 hover:text-blue-900 transition-colors">Detail Lokasi</a></li>
          <li><a href="#tentang" className="text-gray-100 hover:text-white bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-4 rounded-lg transition-colors">Tentang Kami</a></li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section
        id="beranda"
        className="relative py-20 px-8 flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.88)), url('https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1600&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>

        {/* Animated waves decoration */}
        <div className="absolute bottom-0 left-0 right-0 opacity-10">
          <svg viewBox="0 0 1440 120" className="w-full">
            <path fill="white" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>

        {/* Content */}
        <div className="text-center mb-6 z-10 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-tight">
            Trend Pasang Surut<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">
              Kelompok 2
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Akses data trend pasang surut dari Kelompok 2
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex bg-white rounded-2xl overflow-hidden w-11/12 max-w-3xl shadow-2xl z-10 border border-gray-100 hover:shadow-blue-500/20 transition-all duration-300">
          <div className="flex items-center px-6 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="kota..."
            className="flex-1 py-5 px-2 bg-white outline-none text-base text-gray-700 placeholder-gray-400"
          />
          <button className="px-12 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md">
            CARI
          </button>
        </div>
      </section>

      {/* PETA INTERAKTIF */}
      <section id="peta" className="py-24 px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
              📍 Peta Interaktif
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Lokasi Pasang Surut
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Jelajahi lokasi-lokasi pasang surut dari Kelompok 2
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div id="map" className="w-full h-[550px]"></div>
          </div>
        </div>
      </section>

      {/* LOKASI POPULER */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-4">
              ⭐ Pilihan
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Lokasi Pemilihan data Pasang Surut</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Data trend pasang surut dari berbagai wilayah pesisir yang diakses oleh Kelompok 2
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Baturusa, Bangka Belitung", status: "Aktif" },
              { name: "Kuta, Bali", status: "Aktif" },
              { name: "Muara, Kab.Tangerang", status: "Aktif" },
              { name: "Sukamaju, Pandeglang", status: "Aktif" }
            ].map((location, index) => (
              <div key={index} className="group bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:-translate-y-2 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-blue-900 text-lg font-bold mb-2 line-clamp-2 leading-snug">{location.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600 font-medium">{location.status} Terpantau</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HALAMAN DETAIL */}
      <section id="detail" className="py-24 px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-800 font-semibold">Live Data</span>
              </div>
              <span className="text-sm text-gray-500">Diperbarui setiap 5 menit</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-3">Tanjung Priok, Jakarta</h1>
            <p className="text-gray-600 text-lg">Data Prediksi Bulanan | 21 November 2025</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart */}
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Grafik Pasang Surut</h3>
                  <p className="text-sm text-gray-500">Visualisasi data ketinggian air laut</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-semibold">Hari Ini</span>
                </div>
              </div>
              <canvas ref={chartRef}></canvas>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Ringkasan November</h3>
                    <p className="text-sm text-blue-200">Data Statistik Bulanan</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors">
                    <div className="text-sm text-blue-200 mb-2 font-medium">Pasang Tertinggi</div>
                    <div className="text-4xl font-bold">1.9 m</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors">
                    <div className="text-sm text-blue-200 mb-2 font-medium">Pasang Terendah</div>
                    <div className="text-4xl font-bold">0.4 m</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors">
                    <div className="text-sm text-blue-200 mb-2 font-medium">Pasang Ekstrem</div>
                    <div className="text-4xl font-bold">3 kali</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors">
                    <div className="text-sm text-blue-200 mb-2 font-medium">Bulan Penuh</div>
                    <div className="text-2xl font-bold">18 November</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-12 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 flex items-center justify-center rounded-xl text-2xl font-bold">
              PS
            </div>
            <div className="text-left">
              <div className="text-xl font-bold">PASUT</div>
              <div className="text-xs text-blue-200">Tide Prediction System</div>
            </div>
          </div>
          <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
            Sistem prediksi pasang surut terpercaya untuk navigasi maritim yang aman dan efisien
          </p>
          <div className="text-sm text-blue-300">
            © 2025 PASUT. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}