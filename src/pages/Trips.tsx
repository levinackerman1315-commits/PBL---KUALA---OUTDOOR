import React, { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import TripCard from '../components/trips/TripCard'

// ✅ FIX 1: IMPORT API CLIENT
import { tripPublicApi, type TripData } from '@/lib/triApi'

// ✅ Interface untuk Trip (sesuaikan dengan TripCard props)
export interface TripMock {
  trip_id: number
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
  category: 'Mendaki' | 'Pantai' | 'Wisata' | 'Petualangan'
  shortDescription: string
  itinerary: string[]
  images?: string[]
  coverImage?: string
  requiredGear: string[]
  rules: string[]
  searchTags?: string[]
  contact: {
    name: string
    whatsapp: string
    role: string
  }
}

export default function Trips() {
  // ✅ State management
  const [trips, setTrips] = useState<TripMock[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<'All'|'Mudah'|'Sedang'|'Berat'>('All')
  const [categoryFilter, setCategoryFilter] = useState<'All'|'Mendaki'|'Pantai'|'Wisata'|'Petualangan'>('All')
  const [searchParams, setSearchParams] = useSearchParams()

  // ✅ FIX 2: FETCH DATA DARI API
  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true)
      try {
        const data = await tripPublicApi.getAll()
        
        // ✅ Transform API data ke format TripMock
        const transformedTrips: TripMock[] = data.map((trip: TripData) => ({
          trip_id: trip.trip_id,
          title: trip.title,
          location: trip.location,
          mapUrl: trip.map_url,
          meetingPoint: {
            name: trip.meeting_point_name || '',
            address: trip.meeting_point_address || '',
            mapUrl: trip.meeting_point_map_url || ''
          },
          startDate: trip.start_date,
          startTime: trip.start_time,
          durationDays: trip.duration_days,
          remainingQuota: trip.remaining_quota,
          totalQuota: trip.total_quota,
          difficulty: trip.difficulty as 'Mudah' | 'Sedang' | 'Berat',
          category: trip.category as 'Mendaki' | 'Pantai' | 'Wisata' | 'Petualangan',
          shortDescription: trip.short_description || '',
          itinerary: Array.isArray(trip.itinerary) ? trip.itinerary : [],
          images: Array.isArray(trip.images) ? trip.images : [],
          coverImage: trip.cover_image,
          requiredGear: Array.isArray(trip.required_gear) ? trip.required_gear : [],
          rules: Array.isArray(trip.rules) ? trip.rules : [],
          searchTags: Array.isArray(trip.search_tags) ? trip.search_tags : [],
          contact: {
            name: trip.contact_name || '',
            whatsapp: trip.contact_whatsapp || '',
            role: trip.contact_role || 'PIC Trip'
          }
        }))
        
        setTrips(transformedTrips)
      } catch (error) {
        console.error('Error fetching trips:', error)
        setTrips([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchTrips()
  }, [])

  // ✅ Initialize filters from URL
  useEffect(() => {
    const q = searchParams.get('q') || ''
    const lvl = searchParams.get('lvl') as 'Mudah'|'Sedang'|'Berat'|null
    const cat = searchParams.get('cat') as 'Mendaki'|'Pantai'|'Wisata'|'Petualangan'|null
    
    if (q) setQuery(q)
    if (lvl && ['Mudah','Sedang','Berat'].includes(lvl)) setDifficultyFilter(lvl)
    if (cat && ['Mendaki','Pantai','Wisata','Petualangan'].includes(cat)) setCategoryFilter(cat)
  }, [searchParams])

  // ✅ Sync filters to URL
  useEffect(() => {
    const params: Record<string,string> = {}
    if (query) params.q = query
    if (difficultyFilter !== 'All') params.lvl = difficultyFilter
    if (categoryFilter !== 'All') params.cat = categoryFilter
    setSearchParams(params, { replace: true })
  }, [query, difficultyFilter, categoryFilter, setSearchParams])

  // ✅ FIX 3: FILTER TRIPS (HAPUS MOCK_TRIPS)
  const filteredTrips = useMemo(() => {
    return trips
      .filter(t => categoryFilter === 'All' ? true : t.category === categoryFilter)
      .filter(t => difficultyFilter === 'All' ? true : t.difficulty === difficultyFilter)
      .filter(t => {
        if (!query) return true
        const searchQuery = query.toLowerCase()
        return (
          t.title.toLowerCase().includes(searchQuery) || 
          t.location.toLowerCase().includes(searchQuery) ||
          t.shortDescription.toLowerCase().includes(searchQuery) ||
          (t.searchTags && t.searchTags.some(tag => tag.toLowerCase().includes(searchQuery)))
        )
      })
  }, [trips, query, difficultyFilter, categoryFilter])

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-lg font-semibold">Memuat data trip...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* ✅ Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Home
            </Button>
          </Link>

          {/* ✅ Hero Section */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 mb-8 text-white">
            <h1 className="text-4xl font-bold mb-3">Open Trip Tersedia</h1>
            <p className="text-lg opacity-90">
              Jelajahi destinasi petualangan terbaik bersama Kelana Outdoor
            </p>
          </div>

          {/* ✅ Filter Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Filter & Pencarian</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cari Trip
                </label>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Nama trip, lokasi..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="All">Semua Kategori</option>
                  <option value="Mendaki">Mendaki Gunung</option>
                  <option value="Pantai">Pantai & Snorkeling</option>
                  <option value="Wisata">Wisata Alam</option>
                  <option value="Petualangan">Petualangan</option>
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tingkat Kesulitan
                </label>
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="All">Semua Level</option>
                  <option value="Mudah">Mudah</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Berat">Berat</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(query || categoryFilter !== 'All' || difficultyFilter !== 'All') && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Filter aktif:</span>
                {query && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    Pencarian: "{query}"
                    <button onClick={() => setQuery('')} className="hover:text-blue-900">✕</button>
                  </span>
                )}
                {categoryFilter !== 'All' && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {categoryFilter}
                    <button onClick={() => setCategoryFilter('All')} className="hover:text-green-900">✕</button>
                  </span>
                )}
                {difficultyFilter !== 'All' && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {difficultyFilter}
                    <button onClick={() => setDifficultyFilter('All')} className="hover:text-purple-900">✕</button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ✅ Trip Categories */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Kategori Trip</h2>
            <p className="text-gray-600">
              Ditemukan <span className="font-bold text-green-600">{filteredTrips.length}</span> trip
            </p>
          </div>

          {filteredTrips.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Tidak ada trip ditemukan</h3>
              <p className="text-gray-500 mb-6">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
              <Button 
                onClick={() => {
                  setQuery('')
                  setCategoryFilter('All')
                  setDifficultyFilter('All')
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                Reset Filter
              </Button>
            </div>
          ) : (
            <>
              {[
                { key: 'Mendaki', label: 'Mendaki Gunung', color: 'text-emerald-700', icon: '⛰️' },
                { key: 'Pantai', label: 'Pantai & Snorkeling', color: 'text-sky-700', icon: '🏖️' },
                { key: 'Wisata', label: 'Wisata Alam', color: 'text-amber-700', icon: '🌳' },
                { key: 'Petualangan', label: 'Petualangan', color: 'text-rose-700', icon: '🎒' },
              ].map(cat => {
                const categoryTrips = filteredTrips.filter(t => t.category === (cat.key as any))
                if (categoryTrips.length === 0) return null

                return (
                  <div key={cat.key} className="mb-12">
                    <h3 className={`text-2xl font-semibold mb-6 ${cat.color} flex items-center gap-2`}>
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                      <span className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                        {categoryTrips.length} trip
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {categoryTrips.map(trip => (
                        <TripCard key={trip.trip_id} trip={trip} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>
      </div>
    </div>
  )
}