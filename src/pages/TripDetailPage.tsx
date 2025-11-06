import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, Users, Calendar, Phone, ChevronLeft, ChevronRight, Map, Clock } from 'lucide-react'
import { MOCK_TRIPS, TripMock } from './Trips'

export default function TripDetailPage() {
  const { id } = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [joiningCount, setJoiningCount] = useState(1)
  const [trip, setTrip] = useState<TripMock | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    window.scrollTo(0, 0)
    
    const fetchTrip = async () => {
      try {
        setLoading(true)
        
        // Try to fetch from API first
        const response = await fetch(`http://localhost/PBL-KELANA-OUTDOOR/api/trips.php?id=${id}`)
        
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            // Normalize API data
            const normalizedTrip: TripMock = {
              id: String(data.data.trip_id || data.data.id),
              trip_id: data.data.trip_id,
              title: data.data.title,
              location: data.data.location,
              mapUrl: data.data.map_url,
              map_url: data.data.map_url,
              meetingPoint: {
                name: data.data.meeting_point_name || '',
                address: data.data.meeting_point_address || '',
                mapUrl: data.data.meeting_point_map_url
              },
              meeting_point_name: data.data.meeting_point_name,
              meeting_point_address: data.data.meeting_point_address,
              meeting_point_map_url: data.data.meeting_point_map_url,
              startDate: data.data.start_date,
              start_date: data.data.start_date,
              startTime: data.data.start_time,
              start_time: data.data.start_time,
              durationDays: parseInt(data.data.duration_days) || 1,
              duration_days: data.data.duration_days,
              remainingQuota: parseInt(data.data.remaining_quota) || 0,
              remaining_quota: data.data.remaining_quota,
              totalQuota: parseInt(data.data.total_quota) || 0,
              total_quota: data.data.total_quota,
              difficulty: data.data.difficulty || 'Mudah',
              category: data.data.category,
              shortDescription: data.data.short_description || '',
              short_description: data.data.short_description,
              itinerary: Array.isArray(data.data.itinerary) ? data.data.itinerary : 
                        (typeof data.data.itinerary === 'string' ? JSON.parse(data.data.itinerary || '[]') : []),
              images: Array.isArray(data.data.images) ? data.data.images : 
                     (typeof data.data.images === 'string' ? JSON.parse(data.data.images || '[]') : []),
              coverImage: data.data.cover_image,
              cover_image: data.data.cover_image,
              requiredGear: Array.isArray(data.data.required_gear) ? data.data.required_gear : 
                           (typeof data.data.required_gear === 'string' ? JSON.parse(data.data.required_gear || '[]') : []),
              required_gear: data.data.required_gear,
              rules: Array.isArray(data.data.rules) ? data.data.rules : 
                    (typeof data.data.rules === 'string' ? JSON.parse(data.data.rules || '[]') : []),
              searchTags: Array.isArray(data.data.search_tags) ? data.data.search_tags : 
                         (typeof data.data.search_tags === 'string' ? JSON.parse(data.data.search_tags || '[]') : []),
              search_tags: data.data.search_tags,
              contact: {
                name: data.data.contact_name || '',
                whatsapp: data.data.contact_whatsapp || '',
                role: data.data.contact_role || ''
              },
              contact_name: data.data.contact_name,
              contact_whatsapp: data.data.contact_whatsapp,
              contact_role: data.data.contact_role,
              status: data.data.status || 'active'
            }
            setTrip(normalizedTrip)
            return
          }
        }
        
        // Fallback to mock data
        const mockTrip = MOCK_TRIPS.find(t => t.id === id)
        setTrip(mockTrip || null)
      } catch (error) {
        console.error('Error fetching trip:', error)
        const mockTrip = MOCK_TRIPS.find(t => t.id === id)
        setTrip(mockTrip || null)
      } finally {
        setLoading(false)
      }
    }
    
    fetchTrip()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Memuat detail trip...</p>
        </div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Trip tidak ditemukan</h1>
          <Link to="/trips">
            <Button>Kembali ke Daftar Trip</Button>
          </Link>
        </div>
      </div>
    )
  }

  const allImages = [trip.coverImage, ...(trip.images || [])].filter(Boolean) as string[]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/trips">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Daftar Trip
          </Button>
        </Link>

        {/* Image Gallery */}
        <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-8 group">
          <img 
            src={allImages[currentImageIndex]} 
            alt={`${trip.title} - gambar ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
          
          {allImages.length > 1 && (
            <>
              <button 
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Image Navigation */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">{trip.title}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{trip.location}</span>
                {(trip.mapUrl || trip.map_url) && (
                  <a 
                    href={trip.mapUrl || trip.map_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Map className="h-5 w-5" />
                    <span>Lihat di Maps</span>
                  </a>
                )}
              </div>
              <div className="mt-4 flex items-center gap-2 text-primary">
                <Phone className="h-5 w-5" />
                <a 
                  href={`https://wa.me/${(trip.contact?.whatsapp || trip.contact_whatsapp || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Halo ${trip.contact?.name || trip.contact_name}, saya tertarik dengan trip ${trip.title}. Mohon info lebih lanjut.`
                  )}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Hubungi {trip.contact?.name || trip.contact_name} ({trip.contact?.role || trip.contact_role})
                </a>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg">{trip.shortDescription}</p>
            </div>

            {/* Titik Kumpul */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold mb-4">Titik Kumpul</h2>
              <div className="flex flex-col gap-2">
                <div className="font-medium text-lg">{trip.meetingPoint?.name || trip.meeting_point_name}</div>
                <p className="text-gray-600">{trip.meetingPoint?.address || trip.meeting_point_address}</p>
                {(trip.meetingPoint?.mapUrl || trip.meeting_point_map_url) && (
                  <a 
                    href={trip.meetingPoint?.mapUrl || trip.meeting_point_map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-2 mt-2"
                  >
                    <Map className="h-5 w-5" />
                    <span>Lihat lokasi di Maps</span>
                  </a>
                )}
              </div>
            </div>

            {/* Benefit Paket Trip */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold mb-4">Benefit Paket Trip</h2>
              <div className="space-y-6">
                {/* Harga Termasuk */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Harga Termasuk
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <span>Tour guide berpengalaman</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <span>Dokumentasi foto & video</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <span>P3K dan peralatan keamanan</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <span>Air mineral selama perjalanan</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <span>Asuransi perjalanan</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <span>Snack & makan sesuai itinerary</span>
                    </div>
                  </div>
                </div>

                {/* Harga Tidak Termasuk */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Harga Tidak Termasuk
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      <span>Transportasi ke meeting point</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      <span>Pengeluaran pribadi</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      <span>Tips untuk guide & crew</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      <span>Rental alat tambahan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold mb-4">Itinerary Perjalanan</h2>
              <div className="space-y-4">
                {trip.itinerary && trip.itinerary.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary font-medium">
                      {i + 1}
                    </div>
                    <p className="text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Perlengkapan */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold mb-4">Perlengkapan Yang Harus Dibawa</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {trip.requiredGear && trip.requiredGear.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Peraturan */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold mb-4">Peraturan Trip</h2>
              <div className="space-y-3">
                {trip.rules && trip.rules.map((rule, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary font-medium">
                      {i + 1}
                    </div>
                    <p className="text-gray-600">{rule}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow sticky top-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium">{new Date(trip.startDate || trip.start_date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</div>
                    {(trip.startTime || trip.start_time) && (
                      <div className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                        <Clock className="h-4 w-4" />
                        {trip.startTime || trip.start_time} WIB
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium">{trip.remainingQuota || trip.remaining_quota} slot tersisa</div>
                    <div className="text-sm text-gray-500">dari {trip.totalQuota || trip.total_quota} slot</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => {
                      window.open(
                        `https://wa.me/${(trip.contact?.whatsapp || trip.contact_whatsapp || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Halo ${trip.contact?.name || trip.contact_name}, saya tertarik dengan trip ${trip.title}. Mohon informasi lebih lanjut tentang pendaftaran, biaya, dan detail perjalanannya.`
                        )}`,
                        '_blank'
                      )
                    }}
                  >
                    Tanya Info & Daftar via WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}