import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { 
  Users, 
  Tent, 
  Shield, 
  Check, 
  ShoppingCart,
  ArrowLeft 
} from 'lucide-react'

// ...existing interfaces...

interface Package {
  id: number
  name: string
  capacity: string
  price: number
  pricePerDay: string
  badge?: string
  badgeColor?: string
  popular?: boolean
  description?: string
  image_url?: string
  total_items?: number
  package_stock?: number
  package_stock_reserved?: number
  available_stock?: number
  in_stock: boolean
  items: PackageItem[]
}

interface PackageItem {
  name: string
  quantity: number
}

const Packages = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { toast } = useToast()
  
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState<number | null>(null)

  // ✅ Fetch packages dari API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost/PBL-KELANA-OUTDOOR/api/public/packages.php')
        const data = await response.json()
        
        if (data.success) {
          setPackages(data.data)
        } else {
          throw new Error(data.message)
        }
      } catch (error: any) {
        console.error('Error fetching packages:', error)
        toast({
          title: '❌ Error',
          description: 'Gagal memuat data paket',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [toast])

  // ✅ HANDLER ADD TO CART (GANTI DARI handleWhatsAppBooking)
  const handleAddToCart = async (pkg: Package) => {
    // 1. Cek login
    if (!user) {
      toast({
        title: '⚠️ Login Required',
        description: 'Silakan login terlebih dahulu untuk melakukan booking',
        variant: 'destructive'
      })
      navigate('/auth', { state: { from: '/packages' } })
      return
    }

    // 2. Cek stock
    if (!pkg.in_stock) {
      toast({
        title: '❌ Stock Habis',
        description: 'Maaf, paket ini sedang tidak tersedia',
        variant: 'destructive'
      })
      return
    }

    try {
      setAddingToCart(pkg.id)

      // 3. Default rental: besok, 3 hari
      const startDate = new Date()
      startDate.setDate(startDate.getDate() + 1)
      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + 3)

      const rental_days = 3
      const total_price = pkg.price * rental_days * 1

      // 4. POST ke API
      const response = await fetch(
        'http://localhost/PBL-KELANA-OUTDOOR/api/customer/package-cart.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_id: Number(user.id),  // ✅ user.id (bukan user.user_id)
            package_id: pkg.id,
            package_name: pkg.name,         // ✅ TAMBAH
            capacity: pkg.capacity,         // ✅ TAMBAH
            quantity: 1,
            rental_start_date: startDate.toISOString().split('T')[0],
            rental_end_date: endDate.toISOString().split('T')[0],
            rental_days: rental_days,
            price_per_day: pkg.price,
            total_price: total_price
          })
        }
      )

      const data = await response.json()

      if (data.success) {
        // 5. Toast success
        toast({
          title: '✅ Ditambahkan ke Keranjang!',
          description: `${pkg.name} berhasil ditambahkan. Mengarahkan ke keranjang...`,
        })

        // 6. Redirect ke cart setelah 1 detik
        setTimeout(() => {
          navigate('/cart')
        }, 1000)

      } else {
        throw new Error(data.message || 'Gagal menambahkan paket')
      }
    } catch (error: any) {
      console.error('Add to cart error:', error)
      toast({
        title: '❌ Gagal',
        description: error.message || 'Gagal menambahkan ke keranjang',
        variant: 'destructive'
      })
    } finally {
      setAddingToCart(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat paket...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-6 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Home
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500 mb-4">
            Paket Rental Equipment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pilih paket lengkap untuk petualangan Anda! Sudah termasuk semua peralatan yang dibutuhkan.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id}
              className="relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 border-orange-200"
            >
              {/* Badge */}
              {pkg.badge && (
                <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-white font-bold text-sm shadow-lg z-10 ${
                  pkg.badgeColor === 'blue' ? 'bg-blue-500' : 'bg-red-500'
                }`}>
                  {pkg.badge}
                </div>
              )}

              {/* Header */}
              <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-6 text-white">
                <h3 className="text-3xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-center gap-2 text-orange-100">
                  <Users className="h-5 w-5" />
                  <span className="text-lg font-semibold">{pkg.capacity}</span>
                </div>
              </div>

              <CardContent className="pt-6 pb-6">
                {/* Price */}
                <div className="mb-6 text-center">
                  <div className="text-5xl font-extrabold text-orange-600 mb-2">
                    Rp {pkg.price.toLocaleString('id-ID')}
                  </div>
                  <div className="text-gray-500 text-lg">per hari</div>
                  
                  {/* Stock Info */}
                  <div className="mt-3">
                    {pkg.in_stock ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                        <Check className="h-4 w-4 mr-1" />
                        Tersedia ({pkg.available_stock} paket)
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">
                        Stock Habis
                      </span>
                    )}
                  </div>
                </div>

                {/* Items List */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Tent className="h-5 w-5 text-orange-600" />
                    Termasuk:
                  </h4>
                  <ul className="space-y-2">
                    {pkg.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-orange-500 font-bold mt-1">{item.quantity}</span>
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ✅ BUTTON ADD TO CART (GANTI DARI WHATSAPP) */}
                <Button 
                  onClick={() => handleAddToCart(pkg)}
                  disabled={!pkg.in_stock || addingToCart === pkg.id}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-6 text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingToCart === pkg.id ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Menambahkan...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Tambah ke Keranjang
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-gray-500 mt-3">
                  {addingToCart === pkg.id 
                    ? 'Sedang memproses...' 
                    : pkg.in_stock 
                      ? 'Item akan ditambahkan ke keranjang Anda' 
                      : 'Paket tidak tersedia'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-orange-200">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Kenapa Pilih Paket Kami?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center p-4">
                  <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">Lengkap</h3>
                  <p className="text-gray-600">Semua peralatan sudah termasuk dalam satu paket</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">Berkualitas</h3>
                  <p className="text-gray-600">Equipment terawat dan kondisi prima</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Check className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">Hemat</h3>
                  <p className="text-gray-600">Harga paket lebih murah dari rental satuan</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}

export default Packages