

import React, { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import TripCard from '../components/trips/TripCard'

// ✅ API BASE URL untuk production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/PBL-KELANA-OUTDOOR/api';

export interface TripMock {
  id: string
  trip_id?: number
  title: string
  location: string
  mapUrl?: string
  map_url?: string
  meetingPoint: {
    name: string
    address: string
    mapUrl?: string
  }
  meeting_point_name?: string
  meeting_point_address?: string
  meeting_point_map_url?: string
  startDate: string
  start_date?: string
  startTime?: string
  start_time?: string
  durationDays: number
  duration_days?: number
  remainingQuota: number
  remaining_quota?: number
  totalQuota: number
  total_quota?: number
  difficulty: 'Mudah' | 'Sedang' | 'Berat'
  category: 'Mendaki' | 'Pantai' | 'Wisata' | 'Petualangan'
  shortDescription: string
  short_description?: string
  itinerary: string[]
  images?: string[]
  coverImage?: string
  cover_image?: string
  requiredGear: string[]
  required_gear?: string | string[]
  rules: string[]
  searchTags?: string[]
  search_tags?: string | string[]
  contact: {
    name: string
    whatsapp: string
    role: string
  }
  contact_name?: string
  contact_whatsapp?: string
  contact_role?: string
  status?: 'active' | 'inactive' | 'completed'
}

// Helper function to normalize trip data from API
function normalizeTrip(trip: any): TripMock {
  return {
    id: String(trip.trip_id || trip.id),
    trip_id: trip.trip_id,
    title: trip.title,
    location: trip.location,
    mapUrl: trip.map_url,
    map_url: trip.map_url,
    meetingPoint: {
      name: trip.meeting_point_name || '',
      address: trip.meeting_point_address || '',
      mapUrl: trip.meeting_point_map_url
    },
    meeting_point_name: trip.meeting_point_name,
    meeting_point_address: trip.meeting_point_address,
    meeting_point_map_url: trip.meeting_point_map_url,
    startDate: trip.start_date,
    start_date: trip.start_date,
    startTime: trip.start_time,
    start_time: trip.start_time,
    durationDays: parseInt(trip.duration_days) || 1,
    duration_days: trip.duration_days,
    remainingQuota: parseInt(trip.remaining_quota) || 0,
    remaining_quota: trip.remaining_quota,
    totalQuota: parseInt(trip.total_quota) || 0,
    total_quota: trip.total_quota,
    difficulty: trip.difficulty || 'Mudah',
    category: trip.category,
    shortDescription: trip.short_description || '',
    short_description: trip.short_description,
    itinerary: Array.isArray(trip.itinerary) ? trip.itinerary : 
              (typeof trip.itinerary === 'string' ? JSON.parse(trip.itinerary || '[]') : []),
    images: Array.isArray(trip.images) ? trip.images : 
           (typeof trip.images === 'string' ? JSON.parse(trip.images || '[]') : []),
    coverImage: trip.cover_image,
    cover_image: trip.cover_image,
    requiredGear: Array.isArray(trip.required_gear) ? trip.required_gear : 
                 (typeof trip.required_gear === 'string' ? JSON.parse(trip.required_gear || '[]') : []),
    required_gear: trip.required_gear,
    rules: Array.isArray(trip.rules) ? trip.rules : 
          (typeof trip.rules === 'string' ? JSON.parse(trip.rules || '[]') : []),
    searchTags: Array.isArray(trip.search_tags) ? trip.search_tags : 
               (typeof trip.search_tags === 'string' ? JSON.parse(trip.search_tags || '[]') : []),
    search_tags: trip.search_tags,
    contact: {
      name: trip.contact_name || '',
      whatsapp: trip.contact_whatsapp || '',
      role: trip.contact_role || ''
    },
    contact_name: trip.contact_name,
    contact_whatsapp: trip.contact_whatsapp,
    contact_role: trip.contact_role,
    status: trip.status || 'active'
  }
}

export default function Trips() {
  const [query, setQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<'All'|'Mudah'|'Sedang'|'Berat'>('All')
  const [categoryFilter, setCategoryFilter] = useState<'All'|'Mendaki'|'Pantai'|'Wisata'|'Petualangan'>('All')
  const [searchParams, setSearchParams] = useSearchParams()
  const [allTrips, setAllTrips] = useState<TripMock[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch trips from API on mount
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(`${API_BASE_URL}/public/trips.php`)
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        
        const data = await response.json()
        console.log('API Response:', data)
        
        if (data.records && Array.isArray(data.records)) {
          const apiTrips = data.records.map(normalizeTrip)
          setAllTrips(apiTrips)
          console.log('Loaded from API:', apiTrips.length, 'trips')
        } else {
          console.warn('No trips data from API')
          setAllTrips([])
        }
      } catch (error) {
        console.error('Error fetching trips:', error)
        setError('Gagal memuat data trip')
        setAllTrips([])
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [])

  const trips = useMemo(()=>{
    return allTrips
      .filter(t => categoryFilter === 'All' ? true : t.category === categoryFilter)
      .filter(t => difficultyFilter === 'All' ? true : t.difficulty === difficultyFilter)
      .filter(t=> {
        if (!query) return true;
        const searchQuery = query.toLowerCase();
        return (
          t.title.toLowerCase().includes(searchQuery) || 
          t.location.toLowerCase().includes(searchQuery) ||
          t.shortDescription.toLowerCase().includes(searchQuery) ||
          (t.searchTags && t.searchTags.some(tag => tag.toLowerCase().includes(searchQuery)))
        );
      })
  },[query, difficultyFilter, categoryFilter, allTrips])

  // Initialize filters from URL params on mount
  useEffect(() => {
    const q = searchParams.get('q') || ''
    const lvl = searchParams.get('lvl') as 'Mudah'|'Sedang'|'Berat'|null
    const cat = searchParams.get('cat') as 'Mendaki'|'Pantai'|'Wisata'|'Petualangan'|null
    if (q) setQuery(q)
    if (lvl && ['Mudah','Sedang','Berat'].includes(lvl)) setDifficultyFilter(lvl)
    if (cat && ['Mendaki','Pantai','Wisata','Petualangan'].includes(cat)) setCategoryFilter(cat)
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
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">🏔️ Informasi Trip Seru</h1>
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
                        onClick={() => setCategoryFilter('Wisata')}
                        className={`px-5 py-2 rounded-full font-medium transition-all ${
                          categoryFilter === 'Wisata'
                            ? 'bg-amber-600 text-white shadow-md hover:bg-amber-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Wisata
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
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="text-gray-600 ml-4">Memuat data trip...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Coba Lagi
            </Button>
          </div>
        )}

        {/* Trips Display */}
        {!loading && !error && (
          <>
            {trips.length === 0 ? (
              <div className="mt-12 text-center bg-white rounded-xl p-12 shadow-lg">
                <p className="text-gray-500 text-lg mb-4">
                  {allTrips.length === 0 
                    ? "Belum ada trip yang tersedia saat ini" 
                    : "Tidak ada trip yang sesuai dengan filter Anda"}
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  💡 Hubungi kami via WhatsApp untuk informasi lebih lanjut.
                </p>
                <a 
                  href="https://wa.me/6281258599058?text=Halo, saya ingin tahu tentang open trip yang tersedia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-green-600 hover:bg-green-700">
                    💬 Hubungi via WhatsApp
                  </Button>
                </a>
              </div>
            ) : (
              <>
                {/* Section - Kategori Trip */}
                <div className="mt-12">
                  <h2 className="text-3xl font-bold mb-8">Kategori Trip ({trips.length} tersedia)</h2>

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
                        <h3 className={`text-xl font-semibold mb-4 ${cat.color}`}>
                          {cat.label} ({categoryTrips.length})
                        </h3>
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
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}