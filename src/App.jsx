
import React, { useEffect, useRef } from 'react';
import * as Chart from 'chart.js/auto';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function NavigasiLaut() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const mapRef = useRef(null);
  const [showDetail, setShowDetail] = React.useState(false);
  const [activeLocation, setActiveLocation] = React.useState(null);
  const [showPopup, setShowPopup] = React.useState(false);
  const [formData, setFormData] = React.useState({
    nama: '',
    email: '',
    pesan: ''
  });

  const toggleDetail = (id) => {
    setActiveLocation(prev => (prev === id ? null : id));
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setFormData({ nama: '', email: '', pesan: '' });
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("map").setView([-5.5, 107], 6);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    const locationIcon = L.divIcon({
      html: `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                fill="#1e40af" 
                stroke="#1e3a8a" 
                stroke-width="0.5"/>
        </svg>
      `,
      className: 'custom-location-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const titikLokasi = [
      { coord: [-6.00221793, 106.71675361], name: "Muara, Kab.Tangerang" },
      { coord: [-8.731305, 115.163889], name: "Kuta, Bali" },
      { coord: [-2.0973, 106.2104], name: "Baturusa, Bangka Belitung" },
      { coord: [-6.388072, 105.821341], name: "Sukamaju, Pandeglang" }
    ];

    titikLokasi.forEach((item) => {
      L.marker(item.coord, { icon: locationIcon })
        .addTo(map)
        .bindPopup(`<div class="font-sans"><strong class="text-blue-900">${item.name}</strong><br>Lat: ${item.coord[0]}<br>Lng: ${item.coord[1]}</div>`);
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
    <div id="beranda" className="font-sans bg-gradient-to-b from-slate-50 to-blue-50 min-h-screen">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="bg-white/95 backdrop-blur-lg px-8 md:px-16 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50 border-b-2 border-blue-100">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
              <span className="text-white text-2xl font-bold">BTM</span>
            </div>
          </div>
          <div>
            <h1 className="text-blue-900 font-bold text-xl tracking-tight">Blue Tide Marine</h1>
            <p className="text-xs text-blue-600 font-medium">Tide Trend System</p>
          </div>
        </div>

        <ul className="flex gap-10 items-center">
          <li onClick={() => document.getElementById("beranda").scrollIntoView({ behavior: "smooth" })}
            className="text-gray-700 hover:text-blue-700 font-medium transition-all cursor-pointer hover:scale-105">
            Beranda
          </li>
          <li onClick={() => document.getElementById("peta").scrollIntoView({ behavior: "smooth" })}
            className="text-gray-700 hover:text-blue-700 font-medium transition-all cursor-pointer hover:scale-105">
            Peta Interaktif
          </li>
          <li onClick={() => document.getElementById("detaillokasi").scrollIntoView({ behavior: "smooth" })}
            className="text-gray-700 hover:text-blue-700 font-medium transition-all cursor-pointer hover:scale-105">
            Detail Lokasi
          </li>
          <li onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
            className="text-gray-700 hover:text-blue-700 font-medium transition-all cursor-pointer hover:scale-105">
            Contact
          </li>
          <li onClick={() => document.getElementById("tentang").scrollIntoView({ behavior: "smooth" })}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
            About Us
          </li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section
        className="relative py-32 px-8 flex flex-col items-center justify-center gap-10 bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-800 overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.92), rgba(6, 78, 133, 0.88)), url('https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1600&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}>

        {/* Animated waves */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute w-96 h-96 bg-blue-400 rounded-full blur-3xl top-10 -left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-cyan-400 rounded-full blur-3xl bottom-10 -right-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 opacity-20">
          <svg viewBox="0 0 1440 120" className="w-full">
            <path fill="white" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>

        {/* Content */}
        <div className="text-center z-10 max-w-5xl space-y-6">
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Trend Pasang Surut<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-blue-200">
              Indonesia
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
            Akses data trend pasang surut
          </p>
        </div>

        {/* Button navigasi */}
        <div className="flex flex-wrap gap-3">
          {/* Button ke grafik */}
          <button
            onClick={() =>
              document.getElementById("grafik")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            className="
      w-40 h-12 px-5 py-2.5
      text-sm font-medium text-white
      bg-blue-600
      rounded-lg
      shadow-md

      transform
      transition-all duration-300 ease-out
      hover:-translate-y-1
      hover:scale-105
      hover:bg-blue-700
      hover:shadow-xl

      active:scale-95
      focus:outline-none
      focus:ring-2 focus:ring-blue-400
    "
          >
            Jelajahi Data
          </button>

          {/* Button ke map interaktif */}
          <button
            onClick={() =>
              document.getElementById("peta")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            className="
      w-40 h-12 px-5 py-2.5
      text-sm font-medium text-blue-700
      bg-blue-100
      rounded-lg
      shadow-md

      transform
      transition-all duration-300 ease-out
      hover:-translate-y-1
      hover:scale-105
      hover:bg-blue-200
      hover:shadow-xl

      active:scale-95
      focus:outline-none
      focus:ring-2 focus:ring-blue-300
    "
          >
            Map Interaktif
          </button>
        </div>

        {/* Search Bar */}
        {/* <div className="flex bg-white rounded-2xl overflow-hidden w-11/12 max-w-3xl shadow-2xl z-10 hover:shadow-blue-400/30 transition-all duration-300 border border-blue-100">
          <div className="flex items-center px-6 text-gray-400 bg-gray-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari lokasi atau kota..."
            className="flex-1 py-6 px-4 bg-white outline-none text-base text-gray-700 placeholder-gray-400"
          />
          <button className="px-14 py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl">
            CARI
          </button>
        </div> */}
      </section>

      {/* PENDAHULUAN */}
      <section id="pendahuluan" className="py-28 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-all"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/laut.jpg"
                  alt="Laut"
                  className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                📖 Informasi Dasar
              </div>
              <h2 className="text-5xl font-bold text-blue-950 leading-tight">
                Apa Itu<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  Pasang Surut?
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"></div>
              <p className="text-gray-700 text-lg leading-relaxed text-justify">
                Pasang surut adalah kondisi fluktuasi pergerakan naik (pasang) dan
                turun (surut) permukaan air laut secara berkala yang disebabkan oleh
                gaya gravitasi bulan dan matahari terhadap massa air laut di bumi.
                Gaya pasang surut merupakan hasil dari gaya sentrifugal yang terjadi
                dalam kurun waktu dua kali setiap hari, sehingga terdapat dua periode.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PETA INTERAKTIF */}
      <section id="peta" className="py-28 px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-bold mb-6 shadow-sm">
              📍 Peta Interaktif
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-blue-950 mb-6 leading-tight">
              Lokasi<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Pasang Surut
              </span>
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
              Jelajahi lokasi stasiun pemantauan pasang surut di berbagai wilayah Indonesia
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl opacity-10 blur-2xl"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-blue-50">
              <div id="map" className="w-full h-[600px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAIL LOKASI */}
      <section id='detaillokasi' className="py-28 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-bold mb-6 shadow-sm">
              ⭐ Detail Lokasi
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-blue-950 mb-6 leading-tight">
              Titik Lokasi<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Pasang Surut
              </span>
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
              Data trend pasang surut dari berbagai wilayah pesisir Indonesia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Baturusa, Bangka Belitung", Lat: "-2.0973", Long: "106.2104", id: "grafik", color: "blue" },
              { name: "Kuta, Bali", Lat: "-8.731305", Long: "115.163889", id: "grafik", color: "cyan" },
              { name: "Muara, Kab.Tangerang", Lat: "-6.00221793", Long: "106.71675361", id: "grafik", color: "indigo" },
              { name: "Sukamaju, Pandeglang", Lat: "-6.388072", Long: "105.821341", id: "grafik", color: "sky" }
            ].map((location, index) => (
              <div
                key={index}
                onClick={() => document.getElementById(location.id)?.scrollIntoView({ behavior: "smooth" })}
                className="group relative bg-white p-7 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>

                  <h3 className="text-blue-900 text-xl font-bold mb-4 leading-snug min-h-[56px]">
                    {location.name}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-sm font-semibold">Latitude:</span>
                      <span className="text-sm">{location.Lat}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-sm font-semibold">Longitude:</span>
                      <span className="text-sm">{location.Long}</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-blue-100">
                    <span className="text-blue-600 text-sm font-semibold group-hover:text-blue-800 transition-colors">
                      Lihat Detail Grafik →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* grafik */}
      <section id='grafik' className="py-24 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-semibold mb-4">
              📊 Data Grafik Pasang Surut
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Visualisasi Grafik Per Bulan
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Grafik pasang surut berdasarkan data setiap bulan.
            </p>
          </div>

          {/* GRID GRAPHIC CARDS */}

          {/* grafik baturasa */}
          <div className="border rounded-md p-3 shadow-md shadow-blue-100 mb-2">
            <div id='baturusa' className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 p-4">
                Grafik Pasang Surut di Baturusa, Bangka Belitung tahun 2024
              </h2>

              <button
                className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                onClick={() => toggleDetail("baturusa")}
              >
                {activeLocation === "baturusa" ? "Tutup Detail" : "Detail Grafik"}
              </button>
            </div>

            {/* Dropdown Toggle */}
            {activeLocation === "baturusa" && (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500 mt-5"
              >
                {[
                  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                ].map((bulan, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl p-5 shadow-md border border-gray-200 hover:shadow-xl transition-all cursor-pointer group"
                  >
                    <div className="h-40 rounded-xl overflow-hidden bg-gray-100 mb-4 flex justify-center items-center">
                      <img
                        src={`/${[
                          "calJan.png", "calFeb.png", "calMar.png", "calApr.png", "calMei.png", "calJun.png",
                          "calJul.png", "calAgus.png", "calSep.png", "calOkt.png", "calNov.png", "calDes.png"
                        ][index]}`}
                        alt={`Grafik Bulan ${bulan}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <h3 className="text-blue-900 font-bold text-lg leading-snug mb-1">
                      Grafik Bulan {bulan}
                    </h3>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* grafik kuta */}
          <div className="border rounded-md p-3 shadow-md shadow-blue-100 mb-2">
            <div id='kuta' className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 p-4">
                Grafik Pasang Surut di Kuta, Bali tahun 2023
              </h2>

              <button
                className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                onClick={() => toggleDetail("kuta")}
              >
                {activeLocation === "kuta" ? "Tutup Detail" : "Detail Grafik"}
              </button>
            </div>

            {/* Dropdown Toggle */}
            {activeLocation === "kuta" && (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500 mt-5"
              >
                {[
                  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                ].map((bulan, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl p-5 shadow-md border border-gray-200 hover:shadow-xl transition-all cursor-pointer group"
                  >
                    <div className="h-40 rounded-xl overflow-hidden bg-gray-100 mb-4 flex justify-center items-center">
                      <img
                        src={`/${[
                          "uraJan.png", "uraFeb.png", "uraMar.png", "uraApr.png", "uraMei.png", "uraJun.png",
                          "uraJul.png", "uraAgus.png", "uraSep.png", "uraOkt.png", "uraNov.png", "uraDes.png"
                        ][index]}`}
                        alt={`Grafik Bulan ${bulan}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <h3 className="text-blue-900 font-bold text-lg leading-snug mb-1">
                      Grafik Bulan {bulan}
                    </h3>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* grafik muara */}
          <div className="border rounded-md p-3 shadow-md shadow-blue-100 mb-2">
            <div id='muara' className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 p-4">
                Grafik Pasang Surut di Muara, Kab.Tangerang, Banten tahun 2020
              </h2>

              <button
                className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                onClick={() => toggleDetail("muara")}
              >
                {activeLocation === "muara" ? "Tutup Detail" : "Detail Grafik"}
              </button>
            </div>

            {/* Dropdown Toggle */}
            {activeLocation === "muara" && (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500 mt-5"
              >
                {[
                  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                ].map((bulan, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl p-5 shadow-md border border-gray-200 hover:shadow-xl transition-all cursor-pointer group"
                  >
                    <div className="h-40 rounded-xl overflow-hidden bg-gray-100 mb-4 flex justify-center items-center">
                      <img
                        src={`/${[
                          "julJan.png", "julFeb.png", "julMar.png", "julApr.png", "julMei.png", "julJun.png",
                          "julJul.png", "julAgus.png", "julSep.png", "julOkt.png", "julNov.png", "julDes.png"
                        ][index]}`}
                        alt={`Grafik Bulan ${bulan}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <h3 className="text-blue-900 font-bold text-lg leading-snug mb-1">
                      Grafik Bulan {bulan}
                    </h3>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* grafik sukamaju */}
          <div className="border rounded-md p-3 shadow-md shadow-blue-100 mb-2">
            <div id='sukamaju' className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 p-4">
                Grafik Pasang Surut di Sukamaju, Kab.Pandeglang, Banten tahun 2023
              </h2>

              <button
                className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                onClick={() => toggleDetail("sukamaju")}
              >
                {activeLocation === "sukamaju" ? "Tutup Detail" : "Detail Grafik"}
              </button>
            </div>

            {/* Dropdown Toggle */}
            {activeLocation === "sukamaju" && (
              <div
                id="sukamaju"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500 mt-5"
              >
                {[
                  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                ].map((bulan, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl p-5 shadow-md border border-gray-200 hover:shadow-xl transition-all cursor-pointer group"
                  >
                    <div className="h-40 rounded-xl overflow-hidden bg-gray-100 mb-4 flex justify-center items-center">
                      <img
                        src={`/${[
                          "yunJanuari.png", "yunFebruari.png", "yunMaret.png", "yunApril.png", "yunMei.png", "yunJuni.png",
                          "yunJuli.png", "yunAgustus.png", "yunSeptember.png", "yunOktober.png", "yunNovember.png", "yunDesember.png"
                        ][index]}`}
                        alt={`Grafik Bulan ${bulan}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <h3 className="text-blue-900 font-bold text-lg leading-snug mb-1">
                      Grafik Bulan {bulan}
                    </h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-28 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-5 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-bold mb-6 shadow-sm">
              📧 Hubungi Kami
            </div>
            <h2 className="text-5xl font-bold text-blue-950 mb-6 leading-tight">
              Contact Person
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Kirimkan pesan atau pertanyaan Anda kepada kami
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-xl border-2 border-blue-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-blue-900 font-semibold mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 bg-white text-black focus:outline-none transition-colors"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div>
                <label className="block text-blue-900 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 bg-white text-black focus:outline-none transition-colors"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-blue-900 font-semibold mb-2">Pesan</label>
                <textarea
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:outline-none bg-white text-black transition-colors resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id='tentang' className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-12 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 flex items-center justify-center rounded-xl text-2xl font-bold">
              BTM
            </div>
            <div className="text-left">
              <div className="text-xl font-bold">Blue Tide Marine</div>
              <div className="text-xs text-blue-200">Tide Trend System</div>
            </div>
          </div>
          <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
            Sistem trend pasang surut terpercaya untuk navigasi maritim yang aman dan efisien
          </p>
          <div className="text-sm text-blue-300">
            © 2025 BlueTideMarine. All rights reserved.
            <div className="text-sm text-blue-300">Naia Fitri Hidayat 4445220020</div>
            <div className="text-sm text-blue-300">Yunita Sri Rahmawati 4445220014</div>
            <div className="text-xs text-blue-=300">Juliana Patrisia 4445220001</div>
            <div className="text-xs text-blue-=300">Aura Azmi Mutia 4445220032</div>
            <div className="text-xs text-blue-=300">Muhammad Faizal 4445220028</div>
          </div>
        </div>
      </footer>
    </div>
  );
}