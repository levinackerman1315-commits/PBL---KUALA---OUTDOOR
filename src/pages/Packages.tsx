// import { Link } from 'react-router-dom'
// import { Button } from '@/components/ui/button'
// import { ArrowLeft } from 'lucide-react'

// const Packages = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <Link to="/">
//         <Button variant="ghost" className="mb-6">
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Kembali ke Home
//         </Button>
//       </Link>
      
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">📦 Paket Rental</h1>
//       <p className="text-gray-600 text-lg mb-8">
//         Paket lengkap untuk petualangan Anda - Coming Soon!
//       </p>
      
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500 text-lg mb-4">🚧 Fitur ini sedang dalam pengembangan</p>
//         <p className="text-gray-400 text-sm">
//           Akan tersedia paket rental lengkap untuk berbagai aktivitas outdoor
//         </p>
//       </div>
//     </div>
//   </div>
// )

// export default Packages


import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Users, ShoppingCart, MessageCircle, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import {Footer} from '@/components/Footer'

interface PackageItem {
  name: string;
  quantity: number;
}

interface Package {
  id: number;
  name: string;
  capacity: string;
  price: number;
  pricePerDay: string;
  badge?: string;
  badgeColor?: string;
  items: PackageItem[];
  popular?: boolean;
}

const packages: Package[] = [
  {
    id: 1,
    name: "PAKET KOMPLIT 6 ORANG",
    capacity: "6-8 Orang",
    price: 200000,
    pricePerDay: "200.000 / HARI",
    badge: "REKOMENDASI GRUP",
    badgeColor: "bg-orange-500",
    popular: true,
    items: [
      { name: "TENDA KAPASITAS 6-8 ORANG", quantity: 1 },
      { name: "TAS GUNUNG 45 LITER", quantity: 2 },
      { name: "LAMPU TENDA", quantity: 2 },
      { name: "FLYSHEET UKURAN 3X4", quantity: 1 },
      { name: "KOMPOR PORTABLE", quantity: 2 },
      { name: "COOKING SET", quantity: 2 },
      { name: "GAS", quantity: 4 },
      { name: "MATRAS", quantity: 6 },
      { name: "HEADLAMP", quantity: 6 },
    ]
  },
  {
    id: 2,
    name: "PAKET KOMPLIT 4 ORANG",
    capacity: "4-5 Orang",
    price: 140000,
    pricePerDay: "140.000 / HARI",
    badge: "PALING POPULER",
    badgeColor: "bg-green-500",
    popular: true,
    items: [
      { name: "TENDA KAPASITAS 4-5 ORANG", quantity: 1 },
      { name: "TAS GUNUNG 45 LITER", quantity: 2 },
      { name: "LAMPU TENDA", quantity: 1 },
      { name: "FLYSHEET UKURAN 3X4", quantity: 1 },
      { name: "KOMPOR PORTABLE", quantity: 1 },
      { name: "COOKING SET", quantity: 1 },
      { name: "GAS", quantity: 2 },
      { name: "MATRAS", quantity: 4 },
      { name: "HEADLAMP", quantity: 4 },
    ]
  },
  {
    id: 3,
    name: "PAKET KOMPLIT 2 ORANG",
    capacity: "2-3 Orang",
    price: 100000,
    pricePerDay: "100.000 / HARI",
    badge: "HEMAT",
    badgeColor: "bg-blue-500",
    items: [
      { name: "TENDA KAPASITAS 2-3 ORANG", quantity: 1 },
      { name: "TAS GUNUNG 45 LITER", quantity: 2 },
      { name: "LAMPU TENDA", quantity: 1 },
      { name: "FLYSHEET UKURAN 3X4", quantity: 1 },
      { name: "KOMPOR PORTABLE", quantity: 1 },
      { name: "COOKING SET", quantity: 1 },
      { name: "GAS", quantity: 4 },
      { name: "MATRAS", quantity: 2 },
      { name: "HEADLAMP", quantity: 2 },
    ]
  },
  {
    id: 4,
    name: "PAKET HEMAT 6 ORANG",
    capacity: "6-8 Orang",
    price: 140000,
    pricePerDay: "140.000 / HARI",
    badge: "BEST VALUE",
    badgeColor: "bg-red-500",
    items: [
      { name: "TENDA KAPASITAS 6-8 ORANG", quantity: 1 },
      { name: "LAMPU TENDA", quantity: 1 },
      { name: "FLYSHEET UKURAN 3X3", quantity: 1 },
      { name: "KOMPOR PORTABLE", quantity: 1 },
      { name: "COOKING SET", quantity: 1 },
      { name: "GAS", quantity: 2 },
      { name: "MATRAS", quantity: 4 },
      { name: "HEADLAMP", quantity: 6 },
    ]
  },
]

const Packages = () => {
  const handleWhatsAppBooking = (packageData: Package) => {
    const message = `Halo! Saya tertarik dengan *${packageData.name}*\n\nHarga: Rp ${packageData.pricePerDay}\n\nMohon info lebih lanjut untuk booking. Terima kasih!`
    const whatsappUrl = `https://wa.me/6285787553404?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* ✅ BACK BUTTON */}
        <Link to="/">
          <Button variant="ghost" className="mb-6 hover:bg-white/50">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Home
          </Button>
        </Link>
        
        {/* ✅ HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-600 mb-4">
            📦 Paket Rental Outdoor
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Pilih paket lengkap sesuai kebutuhan petualangan Anda dengan harga spesial!
          </p>
        </div>
        
        {/* ✅ PACKAGES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                pkg.popular ? 'border-2 border-orange-400 shadow-lg' : 'border border-gray-200'
              }`}
            >
              {/* ✅ BADGE */}
              {pkg.badge && (
                <div className="absolute top-4 right-4">
                  <Badge className={`${pkg.badgeColor} text-white px-3 py-1 text-xs font-bold`}>
                    {pkg.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100 pb-6">
                <CardTitle className="text-2xl font-bold text-amber-900 mb-2">
                  {pkg.name}
                </CardTitle>
                <div className="flex items-center gap-2 text-amber-700">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold">{pkg.capacity}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-6 pb-6">
                {/* ✅ PRICE */}
                <div className="mb-6 text-center">
                  <p className="text-4xl font-bold text-orange-600">
                    Rp {pkg.price.toLocaleString('id-ID')}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">per hari</p>
                </div>

                {/* ✅ ITEMS LIST */}
                <div className="mb-6">
                  <p className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Termasuk:
                  </p>
                  <ul className="space-y-2">
                    {pkg.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-orange-500 font-bold mt-0.5">{item.quantity}</span>
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ✅ BOOKING BUTTON */}
                <Button 
                  onClick={() => handleWhatsAppBooking(pkg)}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-6 text-lg"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Pesan via WhatsApp
                </Button>

                <p className="text-center text-xs text-gray-500 mt-3">
                  Klik untuk chat langsung dengan admin
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ✅ INFO SECTION */}
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-orange-200">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                💡 Informasi Penting
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center p-4">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Equipment Berkualitas</h4>
                  <p className="text-gray-600 text-sm">Semua peralatan dalam kondisi prima dan terawat</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <ShoppingCart className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Booking Mudah</h4>
                  <p className="text-gray-600 text-sm">Proses reservasi cepat via WhatsApp</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Bisa Disesuaikan</h4>
                  <p className="text-gray-600 text-sm">Paket dapat dikustomisasi sesuai kebutuhan</p>
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