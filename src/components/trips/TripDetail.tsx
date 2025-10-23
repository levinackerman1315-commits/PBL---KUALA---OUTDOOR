import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MapPin, Users, Calendar, Phone, ChevronLeft, ChevronRight, Map } from 'lucide-react'
import { TripMock } from '@/pages/Trips'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type TripDetailProps = {
  trip: TripMock | null
  open: boolean
  onClose: () => void
}

export default function TripDetail({ trip, open, onClose }: TripDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [joiningCount, setJoiningCount] = useState(1)
  const navigate = useNavigate()

  if (!trip) return null

  const allImages = [trip.coverImage, ...(trip.images || [])].filter(Boolean) as string[]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const handleViewFullDetails = () => {
    navigate(`/trips/${trip.id}`)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <div className="grid gap-6">
          {/* Image Carousel */}
          <div className="relative aspect-video rounded-lg overflow-hidden group">
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
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold">{trip.title}</h2>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{trip.location}</span>
                {trip.mapUrl && (
                  <a 
                    href={trip.mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Map className="h-4 w-4" />
                    <span>Lihat Peta</span>
                  </a>
                )}
              </div>

              <p className="text-gray-700">{trip.shortDescription}</p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Itinerary:</h3>
                <ul className="list-disc list-inside space-y-2">
                  {trip.itinerary.map((item, i) => (
                    <li key={i} className="text-gray-600">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Informasi Trip</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tanggal:</span>
                    <span>{new Date(trip.startDate).toLocaleDateString('id-ID', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  {trip.startTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jam:</span>
                      <span>{trip.startTime} WIB</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Durasi:</span>
                    <span>{trip.durationDays} hari</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kuota:</span>
                    <span>{trip.remainingQuota}/{trip.totalQuota} tersisa</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base">
                    <span>Harga:</span>
                    <span>Hubungi kontak</span>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm text-gray-600 block mb-1">Jumlah peserta:</label>
                  <input 
                    type="number" 
                    min={1} 
                    max={trip.remainingQuota} 
                    value={joiningCount} 
                    onChange={(e) => setJoiningCount(Number(e.target.value))} 
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Kontak Trip</h3>
                <div className="text-gray-600">
                  <p className="font-medium">{trip.contact.name}</p>
                  {trip.contact.role && (
                    <p className="text-sm mt-1">{trip.contact.role}</p>
                  )}
                  <a 
                    href={`https://wa.me/${trip.contact.whatsapp.replace(/[^0-9]/g, '')}`} 
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 mt-2 text-primary hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{trip.contact.whatsapp}</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button onClick={() => {
                  window.open(
                    `https://wa.me/6281258599058?text=${encodeURIComponent(
                      `Saya ingin bergabung untuk trip ${trip.title} (${joiningCount} peserta)`
                    )}`,
                    '_blank'
                  )
                }} className="w-full">
                  Gabung Trip (WA)
                </Button>
                <Button onClick={handleViewFullDetails} variant="outline" className="w-full">
                  Lihat Detail Lengkap
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

