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
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Package, Star, Clock, Shield } from 'lucide-react'

const Packages = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-8">
      {/* ✅ BACK TO HOME BUTTON */}
      <Link to="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Home
        </Button>
      </Link>
      
      {/* ✅ IMPROVED HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">📦 Paket Rental</h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Paket lengkap untuk petualangan Anda dengan harga spesial dan kemudahan booking!
        </p>
      </div>
      
      {/* ✅ COMING SOON CARD */}
      <Card className="max-w-4xl mx-auto">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <Package className="h-20 w-20 text-green-600 mx-auto mb-6" />
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🚧 Sedang Dalam Pengembangan
            </h3>
            
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              Kami sedang menyiapkan paket rental terbaik untuk petualangan Anda
            </p>

            {/* ✅ PREVIEW FEATURES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <Star className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Paket Premium</h4>
                <p className="text-gray-600 text-sm">Equipment berkualitas tinggi dengan harga bundling</p>
              </div>
              
              <div className="text-center p-4">
                <Clock className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Booking Mudah</h4>
                <p className="text-gray-600 text-sm">Proses reservasi yang cepat dan simple</p>
              </div>
              
              <div className="text-center p-4">
                <Shield className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Garansi Aman</h4>
                <p className="text-gray-600 text-sm">Jaminan equipment dalam kondisi prima</p>
              </div>
            </div>

            {/* ✅ ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/browse">
                <Button className="bg-green-600 hover:bg-green-700">
                  🎒 Browse Equipment Sekarang
                </Button>
              </Link>
              
              <a 
                href="https://wa.me/6281258599058?text=Halo, saya ingin tahu tentang paket rental yang akan tersedia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-100">
                  💬 Tanya via WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ✅ BOTTOM INFO */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          💡 Sementara waktu, Anda bisa browse dan booking equipment secara individual
        </p>
      </div>
    </div>
  </div>
)

export default Packages