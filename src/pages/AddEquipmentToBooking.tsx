import { useState, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { equipmentAPI, Equipment } from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Search, Plus, Filter } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AddEquipmentToBooking = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  // Get existing booking parameters
  const existingEquipmentIds = searchParams.get('existing_ids')?.split(',').filter(Boolean) || []
  const fromBooking = searchParams.get('from') === 'booking'

  useEffect(() => {
    fetchAllEquipment()
  }, [])

  const fetchAllEquipment = async () => {
    try {
      setLoading(true)
      const response = await equipmentAPI.getAll()
      
      if (response.data.status === 'success') {
        setEquipment(response.data.data)
      }
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToBooking = (selectedEquipment: Equipment) => {
    if (!fromBooking) {
      // Jika tidak dari booking, redirect ke booking form dengan equipment ini
      navigate(`/booking/form?equipment_id=${selectedEquipment.equipment_id}`)
      return
    }

    // Jika dari booking form, kembali ke booking dengan parameter equipment baru
    const currentParams = new URLSearchParams(window.location.search)
    currentParams.delete('from')
    currentParams.delete('existing_ids')
    
    // Tambah equipment baru ke parameter
    currentParams.set('additional_equipment_id', selectedEquipment.equipment_id.toString())
    
    navigate(`/booking/form?${currentParams.toString()}`)
  }

  // Filter equipment
  const filteredEquipment = equipment.filter(item => {
    // Exclude equipment yang sudah ada di booking
    if (existingEquipmentIds.includes(item.equipment_id.toString())) {
      return false
    }

    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.code.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory

    return matchesSearch && matchesCategory && item.stock_quantity > 0
  })

  // Get unique categories
  const categories = [...new Set(equipment.map(item => item.category))]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat peralatan...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to={fromBooking ? "/booking/form" : "/browse"}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {fromBooking ? 'Kembali ke Booking' : 'Kembali ke Browse'}
            </Button>
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {fromBooking ? 'Tambah Peralatan ke Booking' : 'Pilih Peralatan untuk Booking'}
          </h1>
          <p className="text-gray-600">
            {fromBooking 
              ? 'Pilih peralatan tambahan untuk ditambahkan ke booking Anda'
              : 'Pilih peralatan yang ingin Anda sewa'
            }
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari nama atau kode peralatan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Category Filter */}
              <div className="md:w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              Menampilkan {filteredEquipment.length} dari {equipment.length} peralatan
              {existingEquipmentIds.length > 0 && (
                <span className="text-blue-600">
                  • {existingEquipmentIds.length} peralatan sudah dipilih
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEquipment.map((item) => (
            <Card key={item.equipment_id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {/* Equipment Image */}
                <div className="aspect-square bg-gray-200 overflow-hidden">
                  {item.image_url ? (
                    <img 
                      src={item.image_url} 
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">
                        {item.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Equipment Info */}
                <div className="p-4">
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.category.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-500">{item.code}</span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {item.name}
                    </h3>
                    
                    {item.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Price & Stock */}
                  <div className="mb-4">
                    <p className="text-lg font-bold text-green-600">
                      Rp {item.price_per_day.toLocaleString('id-ID')}
                    </p>
                    <p className="text-xs text-gray-500">per hari</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Stok: {item.stock_quantity} | Kondisi: {item.condition}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    {/* Add to Booking Button */}
                    <Button
                      onClick={() => handleAddToBooking(item)}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={item.stock_quantity === 0}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {fromBooking ? 'Tambah ke Booking' : 'Pilih untuk Booking'}
                    </Button>

                    {/* View Detail Button */}
                    <Link to={`/equipment/${item.equipment_id}`} className="block">
                      <Button variant="outline" className="w-full" size="sm">
                        Lihat Detail
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredEquipment.length === 0 && !loading && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tidak ada peralatan ditemukan
            </h3>
            <p className="text-gray-600 mb-4">
              Coba ubah kata kunci pencarian atau filter kategori
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              variant="outline"
            >
              Reset Filter
            </Button>
          </div>
        )}

        {/* Bottom Info */}
        {fromBooking && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">
                  💡 Tips Memilih Peralatan
                </h3>
                <p className="text-sm text-gray-600">
                  Pilih peralatan yang sesuai dengan kebutuhan petualangan Anda. 
                  Setelah menambah peralatan, Anda akan kembali ke form booking untuk melanjutkan proses.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default AddEquipmentToBooking