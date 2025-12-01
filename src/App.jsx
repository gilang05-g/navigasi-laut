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

  const toggleDetail = (id) => {
    setActiveLocation(prev => (prev === id ? null : id));
  };



  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("map").setView([-5.5, 107], 6);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Custom SVG icon
    const locationIcon = L.divIcon({
      html: `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                fill="#ec2626ff" 
                stroke="#991B1B" 
                stroke-width="0.5"/>
        </svg>
      `,
      className: 'custom-location-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const titikLokasi = [
      { coord: [-6.00221793, 106.71675361] },
      { coord: [-8.731305, 115.163889] },
      { coord: [-2.0973, 106.2104] },
      { coord: [-6.388072, 105.821341] }
    ];

    titikLokasi.forEach((item) => {
      L.marker(item.coord, { icon: locationIcon })
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
    <div id="beranda" className="font-sans bg-gray-50 min-h-screen">
      {/* NAVBAR */}
      <nav className="bg-white/95 backdrop-blur-md px-8 md:px-12 py-5 flex justify-between items-center shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-14 h-12 py-2 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center rounded-xl text-white text-2xl font-bold shadow-lg">
            BTM
          </div>
          <div>
            <span className="text-blue-900 font-bold text-xl block leading-none">Blue Tide Marine</span>
            <span className="text-xs text-gray-500 font-medium">Tide Trend System</span>
          </div>
        </div>

        <ul className="flex gap-8 items-center">
          <li onClick={() => document.getElementById("beranda").scrollIntoView({ behavior: "smooth" })}
            className="text-gray-600 hover:text-blue-700 transition-colors cursor-pointer">
            Beranda
          </li>

          <li onClick={() => document.getElementById("peta").scrollIntoView({ behavior: "smooth" })}
            className="text-gray-600 hover:text-blue-900 transition-colors cursor-pointer">
            Peta Interaktif
          </li>

          <li onClick={() => document.getElementById("detaillokasi").scrollIntoView({ behavior: "smooth" })}
            className="text-gray-600 hover:text-blue-900 transition-colors cursor-pointer">
            Detail Lokasi
          </li>

          <li onClick={() => document.getElementById("tentang").scrollIntoView({ behavior: "smooth" })}
            className="text-gray-100 hover:text-white bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-4 rounded-lg transition-colors cursor-pointer">
            About Us
          </li>
        </ul>

      </nav>

      {/* HERO SECTION */}
      <section
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
              Indonesia
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Akses data trend pasang surut
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

      {/* P E N D A H U L U A N  */}
      <section id="pendahuluan" className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Image */}
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200">
            <img
              src="/laut.jpg"
              alt="Laut"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div className="space-y-5">
            <h2 className="text-4xl font-bold text-blue-900 leading-tight">
              Apa Itu Pasang Surut ?
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed text-justify">
              Pasang surut adalah kondisi fluktuasi pergerakan naik (pasang) dan
              turun (surut) permukaan air laut secara berkala yang disebabkan oleh
              gaya gravitasi bulan dan matahari terhadap massa air laut di bumi.
              Gaya pasang surut merupakan hasil dari gaya sentrifugal yang terjadi
              dalam kurun waktu dua kali setiap hari, sehingga terdapat dua periode.
              Sehingga terdapat dua periode.
            </p>
          </div>

        </div>
      </section>


      {/* PETA INTERAKTIF */}
      <section id="peta" className="py-24 px-8 bg-gradient-to-b from-white to-gray-50 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
              📍 Peta Interaktif
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Lokasi Pasang Surut
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Jelajahi Lokasi Stasiun Pasang Surut Di Indonesia
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 z-10">
            <div id="map" className="w-full h-[550px]"></div>
          </div>
        </div>
      </section>

      {/* Detail Lokasi */}
      <section id='detaillokasi' className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-4">
              ⭐ Detail Lokasi
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Titik Lokasi Pasang Surut Di Indonesia
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Data Trend Pasang Surut Dari Berbagai Wilayah Pesisir
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 z-0">
            {[
              {
                name: "Baturusa, Bangka Belitung", Lat: "-2.0973",
                Long: "106.2104", id: "grafik"
              },
              {
                name: "Kuta, Bali", Lat: "-8.731305",
                Long: "115.163889", id: "grafik"
              },
              {
                name: "Muara, Kab.Tangerang", Lat: "-6.00221793",
                Long: "106.71675361", id: "grafik"
              },
              {
                name: "Sukamaju, Pandeglang", Lat: "-6.388072",
                Long: "105.821341", id: "grafik"
              }
            ].map((location, index) => (
              <div
                key={index}
                onClick={() =>
                  document.getElementById(location.id)?.scrollIntoView({ behavior: "smooth" })
                }
                className="group bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:-translate-y-2 cursor-pointer"
              >
                <div className="flex items-start justify-center gap-4">
                  <div className="flex justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-blue-900 text-lg font-bold mb-2 line-clamp-1 leading-snug">
                      {location.name}
                    </h3>
                    <div className="flex items-center gap-2">

                      <p className="text-sm text-gray-600 font-medium">Lat : {location.Lat}</p>
                    </div>
                    <div className="flex items-center gap-2">

                      <p className="text-sm text-gray-600 font-medium">Long : {location.Long}</p>
                    </div>
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
                Grafik Pasang Surut di Baturusa, Bangka Belitung tahun 2024
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
                Grafik Pasang Surut di Kuta, Bali tahun 2023
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
                Grafik Pasang Surut di Muara, Kab.Tangerang, Banten tahun 2020
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