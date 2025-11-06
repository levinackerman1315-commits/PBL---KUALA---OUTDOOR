import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Plus, X, Upload } from 'lucide-react'
import { tripAdminApi, type TripData } from '@/lib/triApi'

interface TripFormData {
  title: string
  location: string
  category: string
  difficulty: string
  start_date: string
  start_time: string
  duration_days: number
  remaining_quota: number
  total_quota: number
  short_description: string
  meeting_point_name: string
  meeting_point_address: string
  meeting_point_map_url: string
  contact_name: string
  contact_whatsapp: string
  contact_role: string
  status: string
  cover_image: string
  images: string[]
  search_tags: string[]
  itinerary: string[]
  required_gear: string[]
  rules: string[]
  map_url: string
}

const INITIAL_FORM: TripFormData = {
  title: '',
  location: '',
  category: 'Mendaki',
  difficulty: 'Mudah',
  start_date: '',
  start_time: '',
  duration_days: 1,
  remaining_quota: 0,
  total_quota: 0,
  short_description: '',
  meeting_point_name: '',
  meeting_point_address: '',
  meeting_point_map_url: '',
  contact_name: '',
  contact_whatsapp: '',
  contact_role: 'PIC Trip',
  status: 'upcoming',
  cover_image: '',
  images: [],
  search_tags: [],
  itinerary: [],
  required_gear: [],
  rules: [],
  map_url: ''
}

export default function TripForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [form, setForm] = useState<TripFormData>(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // ✅ FIX: Load data untuk edit mode
  useEffect(() => {
    if (isEdit && id) {
      loadTripData(parseInt(id))
    }
  }, [id, isEdit])

  // ✅ FIX: Function untuk load data trip
  const loadTripData = async (tripId: number) => {
    setLoading(true)
    try {
      // ✅ Gunakan tripPublicApi.getById untuk ambil data
      const trip = await tripAdminApi.getAll()
      const foundTrip = trip.records.find((t: TripData) => t.trip_id === tripId)
      
      if (foundTrip) {
        setForm({
          title: foundTrip.title || '',
          location: foundTrip.location || '',
          category: foundTrip.category || 'Mendaki',
          difficulty: foundTrip.difficulty || 'Mudah',
          start_date: foundTrip.start_date || '',
          start_time: foundTrip.start_time || '',
          duration_days: foundTrip.duration_days || 1,
          remaining_quota: foundTrip.remaining_quota || 0,
          total_quota: foundTrip.total_quota || 0,
          short_description: foundTrip.short_description || '',
          meeting_point_name: foundTrip.meeting_point_name || '',
          meeting_point_address: foundTrip.meeting_point_address || '',
          meeting_point_map_url: foundTrip.meeting_point_map_url || '',
          contact_name: foundTrip.contact_name || '',
          contact_whatsapp: foundTrip.contact_whatsapp || '',
          contact_role: foundTrip.contact_role || 'PIC Trip',
          status: foundTrip.status || 'upcoming',
          cover_image: foundTrip.cover_image || '',
          images: Array.isArray(foundTrip.images) ? foundTrip.images : [],
          search_tags: Array.isArray(foundTrip.search_tags) ? foundTrip.search_tags : [],
          itinerary: Array.isArray(foundTrip.itinerary) ? foundTrip.itinerary : [],
          required_gear: Array.isArray(foundTrip.required_gear) ? foundTrip.required_gear : [],
          rules: Array.isArray(foundTrip.rules) ? foundTrip.rules : [],
          map_url: foundTrip.map_url || ''
        })
      } else {
        setError('Trip tidak ditemukan')
      }
    } catch (err: any) {
      setError(err.message || 'Gagal memuat data trip')
    } finally {
      setLoading(false)
    }
  }

  // ✅ FIX: Submit form
  const handleSubmit = async (data: TripFormData) => {
    setLoading(true)
    setError('')

    try {
      if (isEdit && id) {
        // ✅ UPDATE trip existing
        const result = await tripAdminApi.update(parseInt(id), data)
        
        if (result.success) {
          alert('Trip berhasil diupdate!')
          navigate('/admin/trips')
        } else {
          throw new Error(result.error || 'Gagal update trip')
        }
      } else {
        // ✅ CREATE trip baru
        const result = await tripAdminApi.create(data)
        
        if (result.success) {
          alert('Trip baru berhasil ditambahkan!')
          navigate('/admin/trips')
        } else {
          throw new Error(result.error || 'Gagal menambah trip')
        }
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  // ✅ Update field helper
  const updateField = <K extends keyof TripFormData>(field: K, value: TripFormData[K]) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  // ✅ Handle form submit
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(form)
  }

  // ✅ Loading state
  if (loading && isEdit) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Memuat data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/admin/trips">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Daftar Trip
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {isEdit ? "Edit Trip" : "Tambah Trip Baru"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
              {/* ==================== BASIC INFO ==================== */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Informasi Dasar</h3>
                
                {/* Judul Trip */}
                <div>
                  <Label htmlFor="title">Judul Trip *</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="Contoh: Pendakian Gunung Bawang"
                    required
                  />
                </div>

                {/* Lokasi */}
                <div>
                  <Label htmlFor="location">Lokasi *</Label>
                  <Input
                    id="location"
                    value={form.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    placeholder="Contoh: Bengkayang, Kalimantan Barat"
                    required
                  />
                </div>

                {/* Category & Difficulty */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Kategori *</Label>
                    <select
                      id="category"
                      value={form.category}
                      onChange={(e) => updateField("category", e.target.value)}
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    >
                      <option value="Mendaki">Mendaki</option>
                      <option value="Pantai">Pantai & Snorkeling</option>
                      <option value="Wisata">Wisata Alam</option>
                      <option value="Petualangan">Petualangan</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Tingkat Kesulitan *</Label>
                    <select
                      id="difficulty"
                      value={form.difficulty}
                      onChange={(e) => updateField("difficulty", e.target.value)}
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    >
                      <option value="Mudah">Mudah</option>
                      <option value="Sedang">Sedang</option>
                      <option value="Berat">Berat</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start_date">Tanggal Berangkat *</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={form.start_date}
                      onChange={(e) => updateField("start_date", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="start_time">Waktu Berangkat</Label>
                    <Input
                      id="start_time"
                      type="time"
                      value={form.start_time}
                      onChange={(e) => updateField("start_time", e.target.value)}
                    />
                  </div>
                </div>

                {/* Duration & Quota */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="duration_days">Durasi (Hari) *</Label>
                    <Input
                      id="duration_days"
                      type="number"
                      min="1"
                      value={form.duration_days}
                      onChange={(e) => updateField("duration_days", parseInt(e.target.value) || 1)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="total_quota">Total Kuota *</Label>
                    <Input
                      id="total_quota"
                      type="number"
                      min="1"
                      value={form.total_quota}
                      onChange={(e) => {
                        const total = parseInt(e.target.value) || 0
                        updateField("total_quota", total)
                        // Auto set remaining quota sama dengan total jika trip baru
                        if (!isEdit) {
                          updateField("remaining_quota", total)
                        }
                      }}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="remaining_quota">Kuota Tersisa *</Label>
                    <Input
                      id="remaining_quota"
                      type="number"
                      min="0"
                      max={form.total_quota}
                      value={form.remaining_quota}
                      onChange={(e) => updateField("remaining_quota", parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <Label htmlFor="short_description">Deskripsi Singkat</Label>
                  <Textarea
                    id="short_description"
                    value={form.short_description}
                    onChange={(e) => updateField("short_description", e.target.value)}
                    placeholder="Jelaskan singkat tentang trip ini..."
                    rows={3}
                  />
                </div>
              </div>

              {/* ==================== MEETING POINT ==================== */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Meeting Point</h3>
                
                <div>
                  <Label htmlFor="meeting_point_name">Nama Meeting Point</Label>
                  <Input
                    id="meeting_point_name"
                    value={form.meeting_point_name}
                    onChange={(e) => updateField("meeting_point_name", e.target.value)}
                    placeholder="Contoh: Basecamp Kelana Outdoor"
                  />
                </div>

                <div>
                  <Label htmlFor="meeting_point_address">Alamat Meeting Point</Label>
                  <Textarea
                    id="meeting_point_address"
                    value={form.meeting_point_address}
                    onChange={(e) => updateField("meeting_point_address", e.target.value)}
                    placeholder="Alamat lengkap meeting point..."
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="meeting_point_map_url">Link Google Maps Meeting Point</Label>
                  <Input
                    id="meeting_point_map_url"
                    value={form.meeting_point_map_url}
                    onChange={(e) => updateField("meeting_point_map_url", e.target.value)}
                    placeholder="https://maps.google.com/..."
                  />
                </div>
              </div>

              {/* ==================== CONTACT INFO ==================== */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Informasi Kontak</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact_name">Nama PIC *</Label>
                    <Input
                      id="contact_name"
                      value={form.contact_name}
                      onChange={(e) => updateField("contact_name", e.target.value)}
                      placeholder="Nama penanggung jawab"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact_whatsapp">WhatsApp PIC *</Label>
                    <Input
                      id="contact_whatsapp"
                      value={form.contact_whatsapp}
                      onChange={(e) => updateField("contact_whatsapp", e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact_role">Role PIC</Label>
                  <Input
                    id="contact_role"
                    value={form.contact_role}
                    onChange={(e) => updateField("contact_role", e.target.value)}
                    placeholder="Contoh: Tour Leader"
                  />
                </div>
              </div>

              {/* ==================== IMAGES ==================== */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Gambar Trip</h3>
                
                <div>
                  <Label htmlFor="cover_image">Cover Image URL</Label>
                  <Input
                    id="cover_image"
                    value={form.cover_image}
                    onChange={(e) => updateField("cover_image", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* TODO: Implement image upload */}
                <p className="text-sm text-gray-500">
                  💡 Untuk sementara, masukkan URL gambar secara manual. 
                  Fitur upload gambar akan ditambahkan nanti.
                </p>
              </div>

              {/* ==================== STATUS ==================== */}
              <div>
                <Label htmlFor="status">Status Trip *</Label>
                <select
                  id="status"
                  value={form.status}
                  onChange={(e) => updateField("status", e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                >
                  <option value="upcoming">Upcoming (Akan Datang)</option>
                  <option value="ongoing">Ongoing (Sedang Berjalan)</option>
                  <option value="completed">Completed (Selesai)</option>
                  <option value="cancelled">Cancelled (Dibatalkan)</option>
                </select>
              </div>

              {/* ==================== SUBMIT BUTTONS ==================== */}
              <div className="flex gap-3 pt-6 border-t">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  {loading ? (
                    <>💾 Menyimpan...</>
                  ) : (
                    <>{isEdit ? '✓ Update Trip' : '+ Tambah Trip'}</>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/trips')}
                  disabled={loading}
                  size="lg"
                >
                  Batal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}