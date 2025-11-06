import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, Users, Calendar, Phone, ChevronLeft, ChevronRight, Clock } from 'lucide-react'

// ✅ HANYA IMPORT API, HAPUS MOCK_TRIPS
import { tripPublicApi, type TripData } from '@/lib/triApi'

export default function TripDetailPage() {
  const { id } = useParams()
  const [trip, setTrip] = useState<TripData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [joiningCount, setJoiningCount] = useState(1)

  // ✅ FETCH DATA DARI API
  useEffect(() => {
    const fetchTrip = async () => {
      if (!id) {
        setError('Trip ID tidak ditemukan')
        setLoading(false)
        return
      }
      
      try {
        setLoading(true)
        setError(null)
        const data = await tripPublicApi.getById(id)
        
        if (data) {
          setTrip(data)
        } else {
          setError('Trip tidak ditemukan')
        }
      } catch (err: any) {
        console.error('Error fetching trip:', err)
        setError(err.message || 'Gagal memuat data trip')
      } finally {
        setLoading(false)
      }
    }
    
    fetchTrip()
    window.scrollTo(0, 0)
  }, [id])

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-lg font-semibold">Memuat detail trip...</p>
        </div>
      </div>
    )
  }

  // ✅ ERROR STATE
  if (error || !trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {error || 'Trip tidak ditemukan'}
          </h1>
          <p className="text-gray-600 mb-6">
            Trip yang Anda cari mungkin sudah tidak tersedia atau ID-nya salah.
          </p>
          <Link to="/trips">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Daftar Trip
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // ✅ PREPARE IMAGES
  const allImages = [
    trip.cover_image,
    ...(Array.isArray(trip.images) ? trip.images : [])
  ].filter(Boolean) as string[]

  const nextImage = () => {
    if (allImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
    }
  }

  const previousImage = () => {
    if (allImages.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
    }
  }

  // ✅ FORMAT DATE
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // ✅ DIFFICULTY BADGE
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'mudah':
        return 'bg-green-100 text-green-800'
      case 'sedang':
        return 'bg-yellow-100 text-yellow-800'
      case 'berat':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ HEADER */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link to="/trips">
            <Button variant="ghost" size="lg">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Kembali ke Daftar Trip
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ✅ MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* ✅ IMAGE GALLERY */}
            {allImages.length > 0 ? (
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={allImages[currentImageIndex]}
                  alt={trip.title}
                  className="w-full h-[500px] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/800x500?text=No+Image'
                  }}
                />
                
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>
                  </>
                )}

                {/* ✅ CATEGORY & DIFFICULTY BADGES */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {trip.category}
                  </span>
                  <span className={`${getDifficultyColor(trip.difficulty)} px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                    {trip.difficulty}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-gray-200 rounded-2xl h-[500px] flex items-center justify-center">
                <p className="text-gray-500 text-lg">Tidak ada gambar</p>
              </div>
            )}

            {/* ✅ TRIP DETAILS */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-4xl font-bold mb-4 text-gray-800">{trip.title}</h1>
              
              <div className="flex flex-wrap gap-6 mb-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span className="font-medium">{trip.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>{formatDate(trip.start_date)}</span>
                </div>
                {trip.start_time && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span>{trip.start_time}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold">
                    {trip.remaining_quota}/{trip.total_quota} slot tersisa
                  </span>
                </div>
              </div>

              {trip.short_description && (
                <div className="mb-8">
                  <p className="text-gray-700 text-lg leading-relaxed">{trip.short_description}</p>
                </div>
              )}

              {/* ✅ ITINERARY */}
              {trip.itinerary && trip.itinerary.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    📋 Itinerary
                  </h2>
                  <ol className="space-y-3">
                    {trip.itinerary.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 pt-1">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* ✅ REQUIRED GEAR */}
              {trip.required_gear && trip.required_gear.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    🎒 Perlengkapan yang Dibutuhkan
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {trip.required_gear.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="text-green-500">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ✅ RULES */}
              {trip.rules && trip.rules.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    ⚠️ Peraturan Trip
                  </h2>
                  <ul className="space-y-2">
                    {trip.rules.map((item, index) => (
                      <li key={index} className="flex gap-2 text-gray-700">
                        <span className="text-red-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* ✅ SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Kontak PIC</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nama</p>
                    <p className="font-semibold text-gray-800 text-lg">{trip.contact_name}</p>
                    {trip.contact_role && (
                      <p className="text-sm text-gray-600">{trip.contact_role}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-2">WhatsApp</p>
                    <a
                      href={`https://wa.me/${trip.contact_whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 font-semibold px-4 py-3 rounded-lg transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      <span>{trip.contact_whatsapp}</span>
                    </a>
                  </div>

                  {trip.meeting_point_name && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Meeting Point</p>
                      <p className="font-semibold text-gray-800">{trip.meeting_point_name}</p>
                      {trip.meeting_point_address && (
                        <p className="text-sm text-gray-600 mt-1">{trip.meeting_point_address}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-semibold text-gray-700">Jumlah Peserta</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setJoiningCount(Math.max(1, joiningCount - 1))}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold">{joiningCount}</span>
                    <button
                      onClick={() => setJoiningCount(Math.min(trip.remaining_quota, joiningCount + 1))}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg"
                  size="lg"
                  disabled={trip.remaining_quota === 0}
                >
                  {trip.remaining_quota === 0 ? '🔒 Kuota Penuh' : '✅ Daftar Sekarang'}
                </Button>
                
                {trip.remaining_quota > 0 && trip.remaining_quota <= 5 && (
                  <p className="text-center text-sm text-orange-600 font-semibold mt-2">
                    ⚡ Hanya {trip.remaining_quota} slot tersisa!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}