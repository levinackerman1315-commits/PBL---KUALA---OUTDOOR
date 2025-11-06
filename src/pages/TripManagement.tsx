import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert' // ✅ IMPORT Alert
import { Plus, Search, Edit, Trash2, Calendar, MapPin, Users } from 'lucide-react'
import { tripAdminApi, type TripData } from '@/lib/triApi'

export default function TripManagement() {
  const navigate = useNavigate()
  const [trips, setTrips] = useState<TripData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState('') // ✅ TAMBAHKAN INI!

  // ✅ Fetch trips saat component mount
  useEffect(() => {
    fetchTrips()
  }, [])

  // ✅ Function fetch trips
  const fetchTrips = async () => {
    setLoading(true)
    setError('') // ✅ Reset error
    try {
      const result = await tripAdminApi.getAll()
      
      if (result.success) {
        setTrips(result.records || [])
      } else {
        setTrips([])
        setError('Gagal memuat data trip')
      }
    } catch (err: any) {
      console.error('Error fetching trips:', err)
      setError(err.message || 'Gagal memuat data trip')
      setTrips([])
    } finally {
      setLoading(false)
    }
  }

  // ✅ Delete trip
  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus trip "${title}"?`)) {
      return
    }

    try {
      const result = await tripAdminApi.delete(id)
      
      if (result.success) {
        alert('Trip berhasil dihapus!')
        fetchTrips() // Reload list
      } else {
        alert(result.error || 'Gagal menghapus trip')
      }
    } catch (err: any) {
      alert(err.message || 'Terjadi kesalahan')
    }
  }

  // ✅ Filter trips by search query
  const filteredTrips = trips.filter(trip => 
    trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* ✅ Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🗺️ Kelola Open Trip</h1>
            <p className="text-gray-600">Manajemen trip dan paket perjalanan</p>
          </div>
          
          <Button
            onClick={() => navigate('/admin/trips/new')}
            className="bg-green-600 hover:bg-green-700"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Trip Baru
          </Button>
        </div>

        {/* ✅ TAMPILKAN ERROR (JIKA ADA) */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setError('')}
              >
                ✕
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* ✅ Filter & Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filter & Pencarian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Cari trip, lokasi, kategori..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ✅ Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600 mb-1">Total Trip</div>
              <div className="text-3xl font-bold text-gray-800">{trips.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600 mb-1">Upcoming</div>
              <div className="text-3xl font-bold text-blue-600">
                {trips.filter(t => t.status === 'upcoming').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600 mb-1">Ongoing</div>
              <div className="text-3xl font-bold text-orange-600">
                {trips.filter(t => t.status === 'ongoing').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600 mb-1">Completed</div>
              <div className="text-3xl font-bold text-green-600">
                {trips.filter(t => t.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ✅ Daftar Trip */}
        <Card>
          <CardHeader>
            <CardTitle>
              Daftar Trip ({filteredTrips.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredTrips.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {searchQuery ? 'Tidak ada hasil' : 'Belum ada trip'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery 
                    ? 'Coba kata kunci lain' 
                    : 'Klik tombol "Trip Baru" untuk menambahkan trip pertama'}
                </p>
                {!searchQuery && (
                  <Button
                    onClick={() => navigate('/admin/trips/new')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Tambah Trip Pertama
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTrips.map((trip) => (
                  <div
                    key={trip.trip_id}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-6">
                      {/* ✅ Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={trip.cover_image || 'https://via.placeholder.com/200x150?text=No+Image'}
                          alt={trip.title}
                          className="w-48 h-32 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/200x150?text=No+Image'
                          }}
                        />
                      </div>

                      {/* ✅ Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">
                              {trip.title}
                            </h3>
                            <div className="flex gap-2 mb-2">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                                {trip.category}
                              </span>
                              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                                {trip.difficulty}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                trip.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                                trip.status === 'ongoing' ? 'bg-orange-100 text-orange-800' :
                                trip.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {trip.status}
                              </span>
                            </div>
                          </div>

                          {/* ✅ Actions */}
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/admin/trips/edit/${trip.trip_id}`)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(trip.trip_id, trip.title)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Hapus
                            </Button>
                          </div>
                        </div>

                        {/* ✅ Info */}
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{trip.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(trip.start_date).toLocaleDateString('id-ID')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{trip.remaining_quota}/{trip.total_quota} slot</span>
                          </div>
                        </div>

                        {trip.short_description && (
                          <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                            {trip.short_description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}