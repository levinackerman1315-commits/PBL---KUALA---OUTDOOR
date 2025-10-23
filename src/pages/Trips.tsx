import React, { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import TripCard from '@/components/trips/TripCard'

export interface TripMock {
  id: string
  title: string
  location: string
  mapUrl?: string
  meetingPoint: {
    name: string
    address: string
    mapUrl?: string
  }
  startDate: string
  startTime?: string
  durationDays: number
  remainingQuota: number
  totalQuota: number
  difficulty: 'Mudah' | 'Sedang' | 'Berat'
  // Kategori paket untuk pengelompokan di UI
  category: 'Mendaki' | 'Pantai' | 'Wisata' | 'Petualangan'
  shortDescription: string
  itinerary: string[]
  images?: string[]
  coverImage?: string
  requiredGear: string[]
  rules: string[]
  contact: {
    name: string
    whatsapp: string
    role: string
  }
}

export const MOCK_TRIPS: TripMock[] = [
  {
    id: 'gb-001',
    title: 'Pendakian Gunung Bawang',
    location: 'Bengkayang, Kalimantan Barat',
    mapUrl: 'https://maps.google.com/?q=Gunung+Bawang+Bengkayang',
    startDate: '2025-11-08',
    startTime: '06:00',
    durationDays: 2,
    remainingQuota: 10,
    totalQuota: 15,
    difficulty: 'Sedang',
  category: 'Mendaki',
    shortDescription: 'Pendakian gunung tertinggi di Bengkayang dengan pemandangan spektakuler Kalimantan Barat',
    itinerary: [
      'Hari 1: Berkumpul di basecamp, briefing, start pendakian, camping',
      'Hari 2: Summit attack subuh, turun gunung, penutupan'
    ],
    coverImage: 'https://picsum.photos/id/1018/800/600',
    images: [
      'https://picsum.photos/id/1043/800/600',
      'https://picsum.photos/id/1044/800/600',
      'https://picsum.photos/id/1045/800/600',
      'https://picsum.photos/id/1047/800/600'
    ],
    meetingPoint: {
      name: 'Terminal Bengkayang',
      address: 'Jl. Raya Bengkayang, Kab. Bengkayang',
      mapUrl: 'https://maps.google.com/?q=Terminal+Bengkayang'
    },
    requiredGear: [
      'Carrier 40-60L',
      'Sleeping bag',
      'Matras',
      'Tenda (1 tenda untuk 2-3 orang)',
      'Headlamp/Senter',
      'Raincoat/Jas hujan',
      'Pakaian hangat/Jaket',
      'Sepatu gunung',
      'Bekal makanan dan minuman',
      'Obat-obatan pribadi'
    ],
    rules: [
      'Wajib mengikuti briefing sebelum pendakian',
      'Dilarang membawa minuman beralkohol',
      'Dilarang membuang sampah sembarangan',
      'Wajib mengikuti arahan guide',
      'Wajib membawa perlengkapan wajib yang ditentukan'
    ],
    contact: {
      name: 'Pak Rahman',
      whatsapp: '085234567890',
      role: 'Guide Lokal Gunung Bawang'
    }
  },
  {
    id: 'dr-002',
    title: 'Eksplorasi Danau Riam',
    location: 'Singkawang, Kalimantan Barat',
    mapUrl: 'https://maps.google.com/?q=Danau+Riam+Singkawang',
    startDate: '2025-12-05',
    startTime: '08:00',
    durationDays: 1,
    remainingQuota: 15,
    totalQuota: 20,
    difficulty: 'Mudah',
  category: 'Wisata',
    shortDescription: 'Wisata alam danau dengan aktivitas camping dan memancing di tengah hutan',
    itinerary: [
      'Pagi: Berkumpul, perjalanan ke lokasi',
      'Siang: Aktivitas memancing dan eksplorasi danau',
      'Sore: BBQ dan api unggun',
      'Malam: Kembali ke kota'
    ],
    coverImage: 'https://picsum.photos/id/1019/800/600',
    images: [
      'https://picsum.photos/id/1039/800/600',
      'https://picsum.photos/id/1040/800/600',
      'https://picsum.photos/id/1041/800/600',
      'https://picsum.photos/id/1042/800/600'
    ],
    meetingPoint: {
      name: 'Alun-alun Singkawang',
      address: 'Jl. Alianyang, Singkawang Utara',
      mapUrl: 'https://maps.google.com/?q=Alun+Alun+Singkawang'
    },
    requiredGear: [
      'Tenda camping',
      'Alat pancing (disediakan)',
      'Pakaian ganti',
      'Alat mandi',
      'Obat-obatan pribadi',
      'Senter/Headlamp',
      'Matras',
      'Peralatan BBQ (disediakan)'
    ],
    rules: [
      'Wajib mengikuti briefing keselamatan',
      'Dilarang membuang sampah sembarangan',
      'Menjaga ketertiban dan ketenangan',
      'Mengikuti arahan guide',
      'Tidak membuat api unggun sembarangan'
    ],
    contact: {
      name: 'Pak Hendra',
      whatsapp: '081345678901',
      role: 'Pemandu Wisata Danau Riam'
    }
  },
  {
    id: 'rb-003',
    title: 'Riam Merasap Adventure',
    location: 'Bengkayang, Kalimantan Barat',
    mapUrl: 'https://maps.google.com/?q=Riam+Merasap+Bengkayang',
    startDate: '2025-11-21',
    startTime: '07:30',
    durationDays: 2,
    remainingQuota: 8,
    totalQuota: 12,
    difficulty: 'Berat',
  category: 'Petualangan',
    shortDescription: 'Petualangan air terjun dan arung jeram di Riam Merasap yang menantang',
    itinerary: [
      'Hari 1: Meeting point, perjalanan ke lokasi, camping dan eksplorasi air terjun',
      'Hari 2: Arung jeram, makan siang, kembali ke kota'
    ],
    coverImage: 'https://picsum.photos/id/1015/800/600',
    images: [
      'https://picsum.photos/id/1035/800/600',
      'https://picsum.photos/id/1036/800/600',
      'https://picsum.photos/id/1037/800/600',
      'https://picsum.photos/id/1038/800/600'
    ],
    meetingPoint: {
      name: 'Rest Area Riam Merasap',
      address: 'Jl. Riam Merasap, Kec. Tujuh Belas, Bengkayang',
      mapUrl: 'https://maps.google.com/?q=Riam+Merasap+Bengkayang'
    },
    requiredGear: [
      'Pakaian renang/olahraga air',
      'Pakaian ganti (min. 2 set)',
      'Tenda camping',
      'Sleeping bag',
      'Matras',
      'Peralatan pelampung (disediakan)',
      'Helm rafting (disediakan)',
      'Sepatu anti slip',
      'Obat-obatan pribadi'
    ],
    rules: [
      'Wajib mengikuti safety briefing',
      'Wajib menggunakan pelampung saat aktivitas air',
      'Dilarang berenang sendiri tanpa pengawasan',
      'Mengikuti instruksi pemandu',
      'Tidak membawa barang elektronik saat aktivitas air',
      'Wajib memberitahu kondisi kesehatan sebelumnya'
    ],
    contact: {
      name: 'Bang Rudi',
      whatsapp: '082345678902',
      role: 'Instruktur Arung Jeram Bersertifikat'
    }
  },
  {
    id: 'pn-004',
    title: 'Camping Pantai Kura-Kura',
    location: 'Bengkayang, Kalimantan Barat',
    mapUrl: 'https://maps.google.com/?q=Pantai+Kura+Kura+Bengkayang',
    startDate: '2025-12-15',
    startTime: '14:00',
    durationDays: 2,
    remainingQuota: 12,
    totalQuota: 15,
    difficulty: 'Mudah',
  category: 'Pantai',
    shortDescription: 'Beach camping dan snorkeling di pantai tersembunyi Kalimantan Barat',
    itinerary: [
      'Hari 1: Kumpul siang, perjalanan ke pantai, setup camp, sunset watching',
      'Hari 2: Snorkeling, eksplorasi pantai, pulang sore'
    ],
    coverImage: 'https://picsum.photos/id/1016/800/600',
    images: [
      'https://picsum.photos/id/1027/800/600',
      'https://picsum.photos/id/1028/800/600',
      'https://picsum.photos/id/1029/800/600',
      'https://picsum.photos/id/1030/800/600'
    ],
    meetingPoint: {
      name: 'Pantai Kura-Kura Parking Area',
      address: 'Pantai Kura-Kura, Kec. Sungai Raya, Bengkayang',
      mapUrl: 'https://maps.google.com/?q=Pantai+Kura+Kura+Bengkayang'
    },
    requiredGear: [
      'Tenda camping',
      'Sleeping bag',
      'Matras',
      'Pakaian renang',
      'Pakaian ganti (min. 2 set)',
      'Peralatan snorkeling (bisa disewa)',
      'Sunscreen/Tabir surya',
      'Topi/Pelindung kepala',
      'Peralatan mandi',
      'Obat-obatan pribadi'
    ],
    rules: [
      'Wajib mengikuti briefing keselamatan',
      'Dilarang snorkeling sendiri tanpa guide',
      'Menjaga kebersihan pantai',
      'Tidak membuat api unggun sembarangan',
      'Wajib memberitahu kondisi kesehatan',
      'Mengikuti protokol keselamatan air'
    ],
    contact: {
      name: 'Kak Lisa',
      whatsapp: '083456789013',
      role: 'Pemandu Wisata Pantai'
    }
  }
]

export default function Trips() {
  const [query, setQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<'All'|'Mudah'|'Sedang'|'Berat'>('All')
  const [categoryFilter, setCategoryFilter] = useState<'All'|'Mendaki'|'Pantai'|'Wisata'|'Petualangan'>('All')
  const [searchParams, setSearchParams] = useSearchParams()

  const trips = useMemo(()=>{
    return MOCK_TRIPS
    .filter(t => categoryFilter === 'All' ? true : t.category === categoryFilter)
    .filter(t => difficultyFilter === 'All' ? true : t.difficulty === difficultyFilter)
      .filter(t=> t.title.toLowerCase().includes(query.toLowerCase()) || t.location.toLowerCase().includes(query.toLowerCase()))
  },[query,difficultyFilter,categoryFilter])

  // Initialize filters from URL params on mount
  useEffect(() => {
    const q = searchParams.get('q') || ''
    const lvl = searchParams.get('lvl') as 'Mudah'|'Sedang'|'Berat'|null
    const cat = searchParams.get('cat') as 'Mendaki'|'Pantai'|'Wisata'|'Petualangan'|null
    if (q) setQuery(q)
    if (lvl && ['Mudah','Sedang','Berat'].includes(lvl)) setDifficultyFilter(lvl)
    if (cat && ['Mendaki','Pantai','Wisata','Petualangan'].includes(cat)) setCategoryFilter(cat)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync filters to URL params
  useEffect(() => {
    const params: Record<string,string> = {}
    if (query) params.q = query
    if (difficultyFilter !== 'All') params.lvl = difficultyFilter
    if (categoryFilter !== 'All') params.cat = categoryFilter
    setSearchParams(params, { replace: true })
  }, [query, difficultyFilter, categoryFilter, setSearchParams])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Home
            </Button>
          </Link>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Hero Content */}
            <div className="relative h-[400px] bg-gradient-to-r from-emerald-800 to-green-700">
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">🏔️ Informasi Open Trip</h1>
                <p className="text-xl text-gray-100 mb-8 max-w-2xl">
                  Temukan trip yang cocok untuk skill dan jadwal Anda — dari pemula sampai yang berpengalaman
                </p>
              </div>
            </div>
            
            {/* Search & Filter Section */}
            <div className="p-6 bg-white">
              <div className="max-w-4xl mx-auto">

              <div className="flex flex-col gap-6">
                {/* Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    aria-label="Cari trip"
                    placeholder="Cari trip, lokasi, atau kata kunci..."
                    value={query}
                    onChange={(e)=>setQuery(e.target.value)}
                    className="w-full border rounded-lg pl-12 pr-4 py-3 shadow-sm bg-white"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-col items-center gap-3">
                  <div className="text-sm text-gray-500">Kategori Tempat</div>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => setCategoryFilter('All')}
                      className={`px-5 py-2 rounded-full font-medium transition-all ${
                        categoryFilter === 'All'
                          ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Semua
                    </button>
                    <button
                      onClick={() => setCategoryFilter('Mendaki')}
                      className={`px-5 py-2 rounded-full font-medium transition-all ${
                        categoryFilter === 'Mendaki'
                          ? 'bg-emerald-600 text-white shadow-md hover:bg-emerald-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Gunung
                    </button>
                    <button
                      onClick={() => setCategoryFilter('Pantai')}
                      className={`px-5 py-2 rounded-full font-medium transition-all ${
                        categoryFilter === 'Pantai'
                          ? 'bg-sky-600 text-white shadow-md hover:bg-sky-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Pantai
                    </button>
                    <button
                      onClick={() => setCategoryFilter('Petualangan')}
                      className={`px-5 py-2 rounded-full font-medium transition-all ${
                        categoryFilter === 'Petualangan'
                          ? 'bg-rose-600 text-white shadow-md hover:bg-rose-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Riam/Air Terjun
                    </button>
                    <button
                      onClick={() => setCategoryFilter('Wisata')}
                      className={`px-5 py-2 rounded-full font-medium transition-all ${
                        categoryFilter === 'Wisata'
                          ? 'bg-amber-600 text-white shadow-md hover:bg-amber-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Wisata
                    </button>
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setDifficultyFilter('All')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      difficultyFilter === 'All'
                        ? 'bg-green-600 text-white shadow-md hover:bg-green-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Semua
                  </button>
                  <button
                    onClick={() => setDifficultyFilter('Mudah')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      difficultyFilter === 'Mudah'
                        ? 'bg-green-600 text-white shadow-md hover:bg-green-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Pemula
                  </button>
                  <button
                    onClick={() => setDifficultyFilter('Sedang')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      difficultyFilter === 'Sedang'
                        ? 'bg-yellow-500 text-white shadow-md hover:bg-yellow-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Sedang
                  </button>
                  <button
                    onClick={() => setDifficultyFilter('Berat')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      difficultyFilter === 'Berat'
                        ? 'bg-red-600 text-white shadow-md hover:bg-red-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Berpengalaman
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section - Kategori Trip */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-8">Kategori Trip</h2>

          {/* Group trips by category */}
          {[
            { key: 'Mendaki', label: 'Mendaki Gunung', color: 'text-emerald-700' },
            { key: 'Pantai', label: 'Pantai & Snorkeling', color: 'text-sky-700' },
            { key: 'Wisata', label: 'Wisata Alam', color: 'text-amber-700' },
            { key: 'Petualangan', label: 'Petualangan (Arung Jeram, Air Terjun)', color: 'text-rose-700' },
          ].map(cat => {
            const categoryTrips = trips.filter(t => t.category === (cat.key as any));
            if (categoryTrips.length === 0) return null;

            return (
              <div key={cat.key} className="mb-12">
                <h3 className={`text-xl font-semibold mb-4 ${cat.color}`}>{cat.label}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {categoryTrips.map(trip => (
                    <div key={trip.id} className="h-full">
                      <TripCard trip={trip} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          </div>
        </div>

        {/* Merchandise Promo Banner */}
        <div className="mt-12 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl overflow-hidden shadow-lg">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8">
              <div className="flex-1 mb-6 md:mb-0 md:mr-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Dukung petualanganmu dengan Baju Resmi Kuala Outdoor 
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Tampil keren dengan desain eksklusif, nyaman dipakai untuk segala aktivitas outdoor. Mulai dari Rp55.000
                </p>
                <Link to="/merchandise">
                  <Button size="lg" variant="default">
                    Lihat Merchandise
                  </Button>
                </Link>
              </div>
              <div className="flex-shrink-0 w-full md:w-1/3">
                <img
                  src="https://i.imgur.com/1Q9Z1ZB.png"
                  alt="Baju Kuala Outdoor"
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">💡 Tidak menemukan trip yang dicari? Hubungi kami via WhatsApp.</p>
        </div>
      </div>
    </div>
  )}
