// import { Link } from 'react-router-dom'
// import { Button } from '@/components/ui/button'
// import { ArrowLeft } from 'lucide-react'

// const Trips = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <Link to="/">
//         <Button variant="ghost" className="mb-6">
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Kembali ke Home
//         </Button>
//       </Link>
      
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">🏔️ Open Trip</h1>
//       <p className="text-gray-600 text-lg mb-8">
//         Bergabunglah dengan petualangan bersama - Coming Soon!
//       </p>
      
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500 text-lg mb-4">🚧 Fitur ini sedang dalam pengembangan</p>
//         <p className="text-gray-400 text-sm">
//           Akan tersedia open trip ke berbagai destinasi menarik
//         </p>
//       </div>
//     </div>
//   </div>
// )

// export default Trips


import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Mountain, Users, Calendar, MapPin } from 'lucide-react'

const Trips = () => (
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🏔️ Open Trip</h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Bergabunglah dengan petualangan seru bersama komunitas outdoor terbaik!
        </p>
      </div>
      
      {/* ✅ COMING SOON CARD */}
      <Card className="max-w-4xl mx-auto">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <Mountain className="h-20 w-20 text-blue-600 mx-auto mb-6" />
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🚧 Sedang Dalam Pengembangan
            </h3>
            
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              Kami sedang merancang open trip ke destinasi-destinasi menakjubkan
            </p>

            {/* ✅ PREVIEW FEATURES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4">
                <MapPin className="h-12 w-12 text-red-500 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Destinasi Epic</h4>
                <p className="text-gray-600 text-sm">Gunung, pantai, dan alam Indonesia</p>
              </div>
              
              <div className="text-center p-4">
                <Users className="h-12 w-12 text-purple-500 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Komunitas</h4>
                <p className="text-gray-600 text-sm">Bertemu sesama pecinta alam</p>
              </div>
              
              <div className="text-center p-4">
                <Calendar className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Jadwal Rutin</h4>
                <p className="text-gray-600 text-sm">Trip setiap weekend & holiday</p>
              </div>
              
              <div className="text-center p-4">
                <Mountain className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Guide Expert</h4>
                <p className="text-gray-600 text-sm">Pemandu berpengalaman</p>
              </div>
            </div>

            {/* ✅ ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/browse">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  🎒 Sewa Equipment Untuk Trip Pribadi
                </Button>
              </Link>
              
              <a 
                href="https://wa.me/6281258599058?text=Halo, saya ingin tahu tentang open trip yang akan tersedia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
                  💬 Tanya via WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ✅ DESTINASI PREVIEW */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-green-400 to-blue-500"></div>
          <CardContent className="pt-4">
            <h4 className="font-semibold text-gray-900 mb-2">🏔️ Gunung Bromo</h4>
            <p className="text-gray-600 text-sm">Sunrise hunting & sea of sand</p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-purple-400 to-pink-500"></div>
          <CardContent className="pt-4">
            <h4 className="font-semibold text-gray-900 mb-2">🏕️ Ranu Kumbolo</h4>
            <p className="text-gray-600 text-sm">Camping di surga tersembunyi</p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
          <CardContent className="pt-4">
            <h4 className="font-semibold text-gray-900 mb-2">🌊 Pantai Selatan</h4>
            <p className="text-gray-600 text-sm">Beach camping & sunset vibes</p>
          </CardContent>
        </Card>
      </div>

      {/* ✅ BOTTOM INFO */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          💡 Sementara waktu, Anda bisa sewa equipment untuk trip mandiri
        </p>
      </div>
    </div>
  </div>
)

export default Trips