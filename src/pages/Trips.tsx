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


// import { Link } from 'react-router-dom'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { ArrowLeft, Mountain, Users, Calendar, MapPin } from 'lucide-react'

// const Trips = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       {/* ✅ BACK TO HOME BUTTON */}
//       <Link to="/">
//         <Button variant="ghost" className="mb-6">
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Kembali ke Home
//         </Button>
//       </Link>
      
//       {/* ✅ IMPROVED HEADER */}
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold text-gray-900 mb-4">🏔️ Open Trip</h1>
//         <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
//           Bergabunglah dengan petualangan seru bersama komunitas outdoor terbaik!
//         </p>
//       </div>
      
//       {/* ✅ COMING SOON CARD */}
//       <Card className="max-w-4xl mx-auto">
//         <CardContent className="pt-8 pb-8">
//           <div className="text-center">
//             <Mountain className="h-20 w-20 text-blue-600 mx-auto mb-6" />
            
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">
//               🚧 Sedang Dalam Pengembangan
//             </h3>
            
//             <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
//               Kami sedang merancang open trip ke destinasi-destinasi menakjubkan
//             </p>

//             {/* ✅ PREVIEW FEATURES */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               <div className="text-center p-4">
//                 <MapPin className="h-12 w-12 text-red-500 mx-auto mb-3" />
//                 <h4 className="font-semibold text-gray-900 mb-2">Destinasi Epic</h4>
//                 <p className="text-gray-600 text-sm">Gunung, pantai, dan alam Indonesia</p>
//               </div>
              
//               <div className="text-center p-4">
//                 <Users className="h-12 w-12 text-purple-500 mx-auto mb-3" />
//                 <h4 className="font-semibold text-gray-900 mb-2">Komunitas</h4>
//                 <p className="text-gray-600 text-sm">Bertemu sesama pecinta alam</p>
//               </div>
              
//               <div className="text-center p-4">
//                 <Calendar className="h-12 w-12 text-green-500 mx-auto mb-3" />
//                 <h4 className="font-semibold text-gray-900 mb-2">Jadwal Rutin</h4>
//                 <p className="text-gray-600 text-sm">Trip setiap weekend & holiday</p>
//               </div>
              
//               <div className="text-center p-4">
//                 <Mountain className="h-12 w-12 text-blue-500 mx-auto mb-3" />
//                 <h4 className="font-semibold text-gray-900 mb-2">Guide Expert</h4>
//                 <p className="text-gray-600 text-sm">Pemandu berpengalaman</p>
//               </div>
//             </div>

//             {/* ✅ ACTION BUTTONS */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link to="/browse">
//                 <Button className="bg-blue-600 hover:bg-blue-700">
//                   🎒 Sewa Equipment Untuk Trip Pribadi
//                 </Button>
//               </Link>
              
//               <a 
//                 href="https://wa.me/6281258599058?text=Halo, saya ingin tahu tentang open trip yang akan tersedia"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
//                   💬 Tanya via WhatsApp
//                 </Button>
//               </a>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* ✅ DESTINASI PREVIEW */}
//       <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card className="overflow-hidden">
//           <div className="h-32 bg-gradient-to-r from-green-400 to-blue-500"></div>
//           <CardContent className="pt-4">
//             <h4 className="font-semibold text-gray-900 mb-2">🏔️ Gunung Bromo</h4>
//             <p className="text-gray-600 text-sm">Sunrise hunting & sea of sand</p>
//           </CardContent>
//         </Card>
        
//         <Card className="overflow-hidden">
//           <div className="h-32 bg-gradient-to-r from-purple-400 to-pink-500"></div>
//           <CardContent className="pt-4">
//             <h4 className="font-semibold text-gray-900 mb-2">🏕️ Ranu Kumbolo</h4>
//             <p className="text-gray-600 text-sm">Camping di surga tersembunyi</p>
//           </CardContent>
//         </Card>
        
//         <Card className="overflow-hidden">
//           <div className="h-32 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
//           <CardContent className="pt-4">
//             <h4 className="font-semibold text-gray-900 mb-2">🌊 Pantai Selatan</h4>
//             <p className="text-gray-600 text-sm">Beach camping & sunset vibes</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* ✅ BOTTOM INFO */}
//       <div className="mt-12 text-center">
//         <p className="text-gray-500 text-sm">
//           💡 Sementara waktu, Anda bisa sewa equipment untuk trip mandiri
//         </p>
//       </div>
//     </div>
//   </div>
// )

// export default Trips


import React, { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import TripCard from '../components/trips/TripCard'

export interface TripMock {
  id: string
  trip_id?: number
  title: string
  location: string
  mapUrl?: string
  map_url?: string
  meetingPoint: {
    name: string
    address: string
    mapUrl?: string
  }
  meeting_point_name?: string
  meeting_point_address?: string
  meeting_point_map_url?: string
  startDate: string
  start_date?: string
  startTime?: string
  start_time?: string
  durationDays: number
  duration_days?: number
  remainingQuota: number
  remaining_quota?: number
  totalQuota: number
  total_quota?: number
  difficulty: 'Mudah' | 'Sedang' | 'Berat'
  category: 'Mendaki' | 'Pantai' | 'Wisata' | 'Petualangan'
  shortDescription: string
  short_description?: string
  itinerary: string[]
  images?: string[]
  coverImage?: string
  cover_image?: string
  requiredGear: string[]
  required_gear?: string | string[]
  rules: string[]
  searchTags?: string[]
  search_tags?: string | string[]
  contact: {
    name: string
    whatsapp: string
    role: string
  }
  contact_name?: string
  contact_whatsapp?: string
  contact_role?: string
  status?: 'active' | 'inactive' | 'completed'
}

export const MOCK_TRIPS: TripMock[] = [
  // Keep mock data as fallback
  {
    id: 'gb-001',
    title: 'Pendakian Gunung Bawang',
    location: 'Bengkayang, Kalimantan Barat',
    mapUrl: 'https://maps.google.com/?q=Gunung+Bawang+Bengkayang',
    startDate: '2025-11-08',
    startTime: '06:00',
    durationDays: 2,
    remainingQuota: 10,
    totalQuota: 15,
    difficulty: 'Sedang',
    category: 'Mendaki',
    shortDescription: 'Pendakian gunung tertinggi di Bengkayang dengan pemandangan spektakuler Kalimantan Barat',
    searchTags: ['gunung', 'mendaki', 'hiking', 'camping', 'summit', 'puncak', 'petualangan', 'alam', 'bengkayang', 'bawang', 'trekking', 'outdoor', 'mountain', 'pendakian', '2 hari'],
    itinerary: [
      'Hari 1: Berkumpul di basecamp, briefing, start pendakian, camping',
      'Hari 2: Summit attack subuh, turun gunung, penutupan'
    ],
    coverImage: 'https://picsum.photos/id/1018/800/600',
    images: [
      'https://picsum.photos/id/1043/800/600',
      'https://picsum.photos/id/1044/800/600',
      'https://picsum.photos/id/1045/800/600',
      'https://picsum.photos/id/1047/800/600'
    ],
    meetingPoint: {
      name: 'Terminal Bengkayang',
      address: 'Jl. Raya Bengkayang, Kab. Bengkayang',
      mapUrl: 'https://maps.google.com/?q=Terminal+Bengkayang'
    },
    requiredGear: [
      'Carrier 40-60L',
      'Sleeping bag',
      'Matras',
      'Tenda (1 tenda untuk 2-3 orang)',
      'Headlamp/Senter',
      'Raincoat/Jas hujan',
      'Pakaian hangat/Jaket',
      'Sepatu gunung',
      'Bekal makanan dan minuman',
      'Obat-obatan pribadi'
    ],
    rules: [
      'Wajib mengikuti briefing sebelum pendakian',
      'Dilarang membawa minuman beralkohol',
      'Dilarang membuang sampah sembarangan',
      'Wajib mengikuti arahan guide',
      'Wajib membawa perlengkapan wajib yang ditentukan'
    ],
    contact: {
      name: 'Pak Rahman',
      whatsapp: '085234567890',
      role: 'Guide Lokal Gunung Bawang'
    }
  },
  {
    id: 'dr-002',
    title: 'Eksplorasi Danau Riam',
    location: 'Singkawang, Kalimantan Barat',
    mapUrl: 'https://maps.google.com/?q=Danau+Riam+Singkawang',
    startDate: '2025-12-05',
    startTime: '08:00',
    durationDays: 1,
    remainingQuota: 15,
    totalQuota: 20,
    difficulty: 'Mudah',
  category: 'Wisata',
    shortDescription: 'Wisata alam danau dengan aktivitas camping dan memancing di tengah hutan',
    searchTags: ['danau', 'lake', 'wisata', 'memancing', 'fishing', 'camping', 'bbq', 'api unggun', 'singkawang', 'riam', 'keluarga', 'santai', 'alam', 'hutan', '1 hari', 'pemula'],
    itinerary: [
      'Pagi: Berkumpul, perjalanan ke lokasi',
      'Siang: Aktivitas memancing dan eksplorasi danau',
      'Sore: BBQ dan api unggun',
      'Malam: Kembali ke kota'
    ],
    coverImage: 'https://picsum.photos/id/1019/800/600',
    images: [
      'https://picsum.photos/id/1039/800/600',
      'https://picsum.photos/id/1040/800/600',
      'https://picsum.photos/id/1041/800/600',
      'https://picsum.photos/id/1042/800/600'
    ],
    meetingPoint: {
      name: 'Alun-alun Singkawang',
      address: 'Jl. Alianyang, Singkawang Utara',
      mapUrl: 'https://maps.google.com/?q=Alun+Alun+Singkawang'
    },
    requiredGear: [
      'Tenda camping',
      'Alat pancing (disediakan)',
      'Pakaian ganti',
      'Alat mandi',
      'Obat-obatan pribadi',
      'Senter/Headlamp',
      'Matras',
      'Peralatan BBQ (disediakan)'
    ],
    rules: [
      'Wajib mengikuti briefing keselamatan',
      'Dilarang membuang sampah sembarangan',
      'Menjaga ketertiban dan ketenangan',
      'Mengikuti arahan guide',
      'Tidak membuat api unggun sembarangan'
    ],
    contact: {
      name: 'Pak Hendra',
      whatsapp: '081345678901',
      role: 'Pemandu Wisata Danau Riam'
    }
  },
  {
    id: 'rb-003',
    title: 'Riam Merasap Adventure',
    location: 'Bengkayang, Kalimantan Barat',
    mapUrl: 'https://maps.google.com/?q=Riam+Merasap+Bengkayang',
    startDate: '2025-11-21',
    startTime: '07:30',
    durationDays: 2,
    remainingQuota: 8,
    totalQuota: 12,
    difficulty: 'Berat',
  category: 'Petualangan',
    shortDescription: 'Petualangan air terjun dan arung jeram di Riam Merasap yang menantang',
    searchTags: ['riam', 'air terjun', 'waterfall', 'arung jeram', 'rafting', 'petualangan', 'ekstrem', 'adventure', 'bengkayang', 'merasap', 'sungai', 'river', 'camping', 'adrenalin', '2 hari'],
    itinerary: [
      'Hari 1: Meeting point, perjalanan ke lokasi, camping dan eksplorasi air terjun',
      'Hari 2: Arung jeram, makan siang, kembali ke kota'
    ],
    coverImage: 'https://picsum.photos/id/1015/800/600',
    images: [
      'https://picsum.photos/id/1035/800/600',
      'https://picsum.photos/id/1036/800/600',
      'https://picsum.photos/id/1037/800/600',
      'https://picsum.photos/id/1038/800/600'
    ],
    meetingPoint: {
      name: 'Rest Area Riam Merasap',
      address: 'Jl. Riam Merasap, Kec. Tujuh Belas, Bengkayang',
      mapUrl: 'https://maps.google.com/?q=Riam+Merasap+Bengkayang'
    },
    requiredGear: [
      'Pakaian renang/olahraga air',
      'Pakaian ganti (min. 2 set)',
      'Tenda camping',
      'Sleeping bag',
      'Matras',
      'Peralatan pelampung (disediakan)',
      'Helm rafting (disediakan)',
      'Sepatu anti slip',
      'Obat-obatan pribadi'
    ],
    rules: [
      'Wajib mengikuti safety briefing',
      'Wajib menggunakan pelampung saat aktivitas air',
      'Dilarang berenang sendiri tanpa pengawasan',
      'Mengikuti instruksi pemandu',
      'Tidak membawa barang elektronik saat aktivitas air',
      'Wajib memberitahu kondisi kesehatan sebelumnya'
    ],
    contact: {
      name: 'Bang Rudi',
      whatsapp: '082345678902',
      role: 'Instruktur Arung Jeram Bersertifikat'
    }
  },
  {
    id: 'pn-004',
    title: 'Camping Pantai Kura-Kura',
    location: 'Bengkayang, Kalimantan Barat',
    mapUrl: 'https://maps.google.com/?q=Pantai+Kura+Kura+Bengkayang',
    startDate: '2025-12-15',
    startTime: '14:00',
    durationDays: 2,
    remainingQuota: 12,
    totalQuota: 15,
    difficulty: 'Mudah',
  category: 'Pantai',
    shortDescription: 'Beach camping dan snorkeling di pantai tersembunyi Kalimantan Barat',
    searchTags: ['pantai', 'beach', 'camping', 'snorkeling', 'laut', 'sea', 'diving', 'kura-kura', 'sunset', 'pasir putih', 'bengkayang', 'keluarga', 'santai', 'pemula', '2 hari', 'berenang'],
    itinerary: [
      'Hari 1: Kumpul siang, perjalanan ke pantai, setup camp, sunset watching',
      'Hari 2: Snorkeling, eksplorasi pantai, pulang sore'
    ],
    coverImage: 'https://picsum.photos/id/1016/800/600',
    images: [
      'https://picsum.photos/id/1027/800/600',
      'https://picsum.photos/id/1028/800/600',
      'https://picsum.photos/id/1029/800/600',
      'https://picsum.photos/id/1030/800/600'
    ],
    meetingPoint: {
      name: 'Pantai Kura-Kura Parking Area',
      address: 'Pantai Kura-Kura, Kec. Sungai Raya, Bengkayang',
      mapUrl: 'https://maps.google.com/?q=Pantai+Kura+Kura+Bengkayang'
    },
    requiredGear: [
      'Tenda camping',
      'Sleeping bag',
      'Matras',
      'Pakaian renang',
      'Pakaian ganti (min. 2 set)',
      'Peralatan snorkeling (bisa disewa)',
      'Sunscreen/Tabir surya',
      'Topi/Pelindung kepala',
      'Peralatan mandi',
      'Obat-obatan pribadi'
    ],
    rules: [
      'Wajib mengikuti briefing keselamatan',
      'Dilarang snorkeling sendiri tanpa guide',
      'Menjaga kebersihan pantai',
      'Tidak membuat api unggun sembarangan',
      'Wajib memberitahu kondisi kesehatan',
      'Mengikuti protokol keselamatan air'
    ],
    contact: {
      name: 'Kak Lisa',
      whatsapp: '083456789013',
      role: 'Pemandu Wisata Pantai'
    }
  },
  {
    id: 'gp-005',
    title: 'Pendakian Gunung Poteng',
    location: 'Sanggau, Kalimantan Barat',
    mapUrl: 'https://maps.google.com/?q=Gunung+Poteng+Sanggau',
    startDate: '2025-11-15',
    startTime: '05:00',
    durationDays: 3,
    remainingQuota: 8,
    totalQuota: 12,
    difficulty: 'Berat',
    category: 'Mendaki',
    shortDescription: 'Pendakian gunung dengan track menantang dan pemandangan sunrise spektakuler di puncak Kalimantan Barat',
    searchTags: ['gunung', 'mendaki', 'hiking', 'poteng', 'sanggau', 'summit', 'sunrise', 'puncak', 'camping', 'trekking', 'ekstrem', 'petualangan', 'tantangan', '3 hari', 'mountain'],
    itinerary: [
      'Hari 1: Kumpul di basecamp, registrasi, perjalanan ke pos 1, camping',
      'Hari 2: Lanjut pendakian ke pos 2, eksplorasi area puncak, camping',
      'Hari 3: Summit attack subuh, enjoy sunrise, turun gunung, penutupan'
    ],
    coverImage: 'https://picsum.photos/id/1020/800/600',
    images: [
      'https://picsum.photos/id/1050/800/600',
      'https://picsum.photos/id/1051/800/600',
      'https://picsum.photos/id/1052/800/600',
      'https://picsum.photos/id/1053/800/600'
    ],
    meetingPoint: {
      name: 'Kantor Desa Setanduk',
      address: 'Desa Setanduk, Kec. Bonti, Sanggau',
      mapUrl: 'https://maps.google.com/?q=Desa+Setanduk+Sanggau'
    },
    requiredGear: [
      'Carrier 50-70L',
      'Sleeping bag suhu dingin',
      'Matras tebal',
      'Tenda 4 season',
      'Headlamp dengan baterai cadangan',
      'Raincoat/Ponco',
      'Pakaian hangat berlapis',
      'Sepatu gunung high cut',
      'Trekking pole',
      'Sarung tangan',
      'Masker/buff',
      'Bekal makanan 3 hari',
      'Kompor portable & gas',
      'Obat-obatan pribadi'
    ],
    rules: [
      'Wajib medical check-up sebelum pendakian',
      'Wajib mengikuti briefing dan peraturan guide',
      'Dilarang membawa minuman beralkohol dan narkoba',
      'Wajib membawa sampah turun',
      'Tidak boleh membunyikan musik keras',
      'Wajib membawa perlengkapan standar gunung',
      'Mendahulukan keselamatan, guide berhak membatalkan summit jika cuaca buruk'
    ],
    contact: {
      name: 'Pak Agung',
      whatsapp: '084567890124',
      role: 'Guide Profesional Gunung Poteng'
    }
  },
  {
    id: 'ps-006',
    title: 'Island Hopping Pantai Simping',
    location: 'Singkawang, Kalimantan Barat',
    mapUrl: 'https://maps.google.com/?q=Pantai+Simping+Singkawang',
    startDate: '2025-12-20',
    startTime: '07:00',
    durationDays: 1,
    remainingQuota: 18,
    totalQuota: 20,
    difficulty: 'Mudah',
    category: 'Pantai',
    shortDescription: 'Jelajahi pulau-pulau cantik di sekitar Pantai Simping dengan perahu, snorkeling, dan wisata kuliner seafood',
    searchTags: ['pantai', 'beach', 'island hopping', 'pulau', 'snorkeling', 'simping', 'singkawang', 'laut', 'perahu', 'boat', 'seafood', 'kuliner', 'pasir putih', 'keluarga', '1 hari', 'pemula', 'berenang'],
    itinerary: [
      'Pagi: Kumpul di pantai, sarapan, berangkat island hopping',
      'Siang: Snorkeling di spot terbaik, makan siang seafood di pulau',
      'Sore: Bermain di pantai pasir putih, foto-foto, kembali ke kota'
    ],
    coverImage: 'https://picsum.photos/id/1021/800/600',
    images: [
      'https://picsum.photos/id/1054/800/600',
      'https://picsum.photos/id/1055/800/600',
      'https://picsum.photos/id/1056/800/600',
      'https://picsum.photos/id/1057/800/600'
    ],
    meetingPoint: {
      name: 'Dermaga Pantai Simping',
      address: 'Jl. Pantai Simping, Sedau, Singkawang Selatan',
      mapUrl: 'https://maps.google.com/?q=Pantai+Simping+Singkawang'
    },
    requiredGear: [
      'Pakaian renang',
      'Pakaian ganti',
      'Handuk',
      'Sunscreen SPF 50+',
      'Topi/Topi pantai',
      'Kacamata hitam',
      'Sandal/Sepatu air',
      'Dry bag (opsional)',
      'Kamera underwater (opsional)',
      'Obat-obatan pribadi'
    ],
    rules: [
      'Wajib menggunakan pelampung saat di perahu',
      'Tidak boleh menginjak karang',
      'Dilarang mengambil biota laut',
      'Menjaga kebersihan pantai dan laut',
      'Mengikuti instruksi guide dan kapten kapal',
      'Memberitahu kondisi kesehatan sebelum berangkat'
    ],
    contact: {
      name: 'Bang Roni',
      whatsapp: '085678901235',
      role: 'Kapten Kapal & Tour Guide Pantai'
    }
  },
  {
    id: 'dl-007',
    title: 'Camping & Fishing Danau Lait',
    location: 'Landak, Kalimantan Barat',
    mapUrl: 'https://maps.google.com/?q=Danau+Lait+Landak',
    startDate: '2025-12-10',
    startTime: '06:00',
    durationDays: 2,
    remainingQuota: 10,
    totalQuota: 15,
    difficulty: 'Mudah',
    category: 'Wisata',
    shortDescription: 'Nikmati ketenangan Danau Lait dengan camping, memancing ikan air tawar, dan menikmati kuliner ikan bakar',
    searchTags: ['danau', 'lake', 'camping', 'fishing', 'memancing', 'lait', 'landak', 'ikan', 'bbq', 'bakar', 'sunrise', 'wisata', 'santai', 'keluarga', 'alam', 'pemula', '2 hari'],
    itinerary: [
      'Hari 1: Berangkat pagi, setup camp di tepi danau, fishing competition, BBQ ikan hasil tangkapan',
      'Hari 2: Sunrise di danau, sarapan, eksplorasi sekitar danau, packing, pulang'
    ],
    coverImage: 'https://picsum.photos/id/1022/800/600',
    images: [
      'https://picsum.photos/id/1058/800/600',
      'https://picsum.photos/id/1059/800/600',
      'https://picsum.photos/id/1060/800/600',
      'https://picsum.photos/id/1061/800/600'
    ],
    meetingPoint: {
      name: 'Pasar Ngabang',
      address: 'Jl. Ahmad Yani, Ngabang, Landak',
      mapUrl: 'https://maps.google.com/?q=Pasar+Ngabang+Landak'
    },
    requiredGear: [
      'Tenda camping (bisa sewa)',
      'Sleeping bag',
      'Matras',
      'Alat pancing (bisa sewa)',
      'Pakaian ganti 2 set',
      'Jaket/Pakaian hangat',
      'Sendal/Sepatu santai',
      'Peralatan mandi',
      'Senter/Headlamp',
      'Obat-obatan pribadi',
      'Alat masak portable (opsional)'
    ],
    rules: [
      'Menjaga kebersihan danau',
      'Dilarang menggunakan bahan peledak untuk memancing',
      'Tidak membuat keributan',
      'Mengikuti aturan lokal',
      'Api unggun hanya di area yang ditentukan',
      'Membawa pulang sampah masing-masing'
    ],
    contact: {
      name: 'Pak Budi',
      whatsapp: '086789012346',
      role: 'Pengelola Wisata Danau Lait'
    }
  },
  {
    id: 'rb-008',
    title: 'Canyoning Riam Berasap',
    location: 'Sintang, Kalimantan Barat',
    mapUrl: 'https://maps.google.com/?q=Riam+Berasap+Sintang',
    startDate: '2025-11-28',
    startTime: '06:30',
    durationDays: 2,
    remainingQuota: 6,
    totalQuota: 10,
    difficulty: 'Berat',
    category: 'Petualangan',
    shortDescription: 'Tantangan canyoning ekstrem di aliran sungai berbatu dengan rappelling air terjun dan body rafting',
    searchTags: ['canyoning', 'riam', 'air terjun', 'waterfall', 'rappelling', 'berasap', 'sintang', 'ekstrem', 'petualangan', 'adventure', 'rafting', 'sungai', 'tantangan', 'adrenalin', '2 hari'],
    itinerary: [
      'Hari 1: Safety briefing, perjalanan ke start point, canyoning dimulai, camping di riverside',
      'Hari 2: Lanjut canyoning, rappelling air terjun besar, finish point, makan siang, pulang'
    ],
    coverImage: 'https://picsum.photos/id/1023/800/600',
    images: [
      'https://picsum.photos/id/1062/800/600',
      'https://picsum.photos/id/1063/800/600',
      'https://picsum.photos/id/1064/800/600',
      'https://picsum.photos/id/1065/800/600'
    ],
    meetingPoint: {
      name: 'Base Camp Riam Berasap',
      address: 'Desa Sei Tebelian, Kec. Sintang, Sintang',
      mapUrl: 'https://maps.google.com/?q=Riam+Berasap+Sintang'
    },
    requiredGear: [
      'Wetsuit (disediakan)',
      'Helm canyoning (disediakan)',
      'Harness & karabiner (disediakan)',
      'Sepatu canyoning/sepatu gunung yang kuat',
      'Pakaian cepat kering',
      'Pakaian ganti 3 set',
      'Dry bag waterproof',
      'Sleeping bag',
      'Matras',
      'Tenda (disediakan)',
      'Obat-obatan pribadi',
      'Energy bar/snack'
    ],
    rules: [
      'WAJIB kondisi fisik prima dan bisa berenang',
      'Wajib mengikuti safety briefing dan training',
      'Wajib menggunakan full equipment keselamatan',
      'Mengikuti instruksi instruktur tanpa kecuali',
      'Memberitahu riwayat penyakit sebelumnya',
      'Dilarang melakukan gerakan berbahaya',
      'Guide berhak membatalkan aktivitas jika kondisi tidak aman'
    ],
    contact: {
      name: 'Bang Eko',
      whatsapp: '087890123457',
      role: 'Instruktur Canyoning Bersertifikat'
    }
  }
]

// Helper function to normalize trip data from API
function normalizeTrip(trip: any): TripMock {
  return {
    id: String(trip.trip_id || trip.id),
    trip_id: trip.trip_id,
    title: trip.title,
    location: trip.location,
    mapUrl: trip.map_url,
    map_url: trip.map_url,
    meetingPoint: {
      name: trip.meeting_point_name || '',
      address: trip.meeting_point_address || '',
      mapUrl: trip.meeting_point_map_url
    },
    meeting_point_name: trip.meeting_point_name,
    meeting_point_address: trip.meeting_point_address,
    meeting_point_map_url: trip.meeting_point_map_url,
    startDate: trip.start_date,
    start_date: trip.start_date,
    startTime: trip.start_time,
    start_time: trip.start_time,
    durationDays: parseInt(trip.duration_days) || 1,
    duration_days: trip.duration_days,
    remainingQuota: parseInt(trip.remaining_quota) || 0,
    remaining_quota: trip.remaining_quota,
    totalQuota: parseInt(trip.total_quota) || 0,
    total_quota: trip.total_quota,
    difficulty: trip.difficulty || 'Mudah',
    category: trip.category,
    shortDescription: trip.short_description || '',
    short_description: trip.short_description,
    itinerary: Array.isArray(trip.itinerary) ? trip.itinerary : 
              (typeof trip.itinerary === 'string' ? JSON.parse(trip.itinerary || '[]') : []),
    images: Array.isArray(trip.images) ? trip.images : 
           (typeof trip.images === 'string' ? JSON.parse(trip.images || '[]') : []),
    coverImage: trip.cover_image,
    cover_image: trip.cover_image,
    requiredGear: Array.isArray(trip.required_gear) ? trip.required_gear : 
                 (typeof trip.required_gear === 'string' ? JSON.parse(trip.required_gear || '[]') : []),
    required_gear: trip.required_gear,
    rules: Array.isArray(trip.rules) ? trip.rules : 
          (typeof trip.rules === 'string' ? JSON.parse(trip.rules || '[]') : []),
    searchTags: Array.isArray(trip.search_tags) ? trip.search_tags : 
               (typeof trip.search_tags === 'string' ? JSON.parse(trip.search_tags || '[]') : []),
    search_tags: trip.search_tags,
    contact: {
      name: trip.contact_name || '',
      whatsapp: trip.contact_whatsapp || '',
      role: trip.contact_role || ''
    },
    contact_name: trip.contact_name,
    contact_whatsapp: trip.contact_whatsapp,
    contact_role: trip.contact_role,
    status: trip.status || 'active'
  }
}

export default function Trips() {
  const [query, setQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<'All'|'Mudah'|'Sedang'|'Berat'>('All')
  const [categoryFilter, setCategoryFilter] = useState<'All'|'Mendaki'|'Pantai'|'Wisata'|'Petualangan'>('All')
  const [searchParams, setSearchParams] = useSearchParams()
  const [allTrips, setAllTrips] = useState<TripMock[]>(MOCK_TRIPS)
  const [loading, setLoading] = useState(true)

  // Fetch trips from API on mount
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost/PBL-KELANA-OUTDOOR/api/trips.php')
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        
        const data = await response.json()
        console.log('API Response:', data) // Debug: lihat response format
        
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          // API return data successfully
          const apiTrips = data.data.map(normalizeTrip)
          setAllTrips(apiTrips)
          console.log('Loaded from API:', apiTrips.length, 'trips')
        } else if (Array.isArray(data) && data.length > 0) {
          // Fallback jika API return array langsung
          const normalized = data.map(normalizeTrip)
          setAllTrips(normalized)
          console.log('Loaded from API (array format):', normalized.length, 'trips')
        } else {
          // Jika API return empty atau format tidak sesuai, gunakan mock
          console.warn('API returned no data, using mock data')
          setAllTrips(MOCK_TRIPS)
        }
      } catch (error) {
        console.error('Error fetching trips:', error)
        console.log('Fallback to mock data')
        setAllTrips(MOCK_TRIPS)
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [])

  const trips = useMemo(()=>{
    return allTrips
      .filter(t => categoryFilter === 'All' ? true : t.category === categoryFilter)
      .filter(t => difficultyFilter === 'All' ? true : t.difficulty === difficultyFilter)
      .filter(t=> {
        if (!query) return true;
        const searchQuery = query.toLowerCase();
        return (
          t.title.toLowerCase().includes(searchQuery) || 
          t.location.toLowerCase().includes(searchQuery) ||
          t.shortDescription.toLowerCase().includes(searchQuery) ||
          (t.searchTags && t.searchTags.some(tag => tag.toLowerCase().includes(searchQuery)))
        );
      })
  },[query, difficultyFilter, categoryFilter, allTrips])

  // Initialize filters from URL params on mount
  useEffect(() => {
    const q = searchParams.get('q') || ''
    const lvl = searchParams.get('lvl') as 'Mudah'|'Sedang'|'Berat'|null
    const cat = searchParams.get('cat') as 'Mendaki'|'Pantai'|'Wisata'|'Petualangan'|null
    if (q) setQuery(q)
    if (lvl && ['Mudah','Sedang','Berat'].includes(lvl)) setDifficultyFilter(lvl)
    if (cat && ['Mendaki','Pantai','Wisata','Petualangan'].includes(cat)) setCategoryFilter(cat)
  }, [])

  // Sync filters to URL params
  useEffect(() => {
    const params: Record<string,string> = {}
    if (query) params.q = query
    if (difficultyFilter !== 'All') params.lvl = difficultyFilter
    if (categoryFilter !== 'All') params.cat = categoryFilter
    setSearchParams(params, { replace: true })
  }, [query, difficultyFilter, categoryFilter, setSearchParams])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Home
            </Button>
          </Link>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Hero Content */}
            <div className="relative h-[400px] bg-gradient-to-r from-emerald-800 to-green-700">
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">🏔️ Informasi Open Trip</h1>
                <p className="text-xl text-gray-100 mb-8 max-w-2xl">
                  Temukan trip yang cocok untuk skill dan jadwal Anda — dari pemula sampai yang berpengalaman
                </p>
              </div>
            </div>
            
            {/* Search & Filter Section */}
            <div className="p-6 bg-white">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col gap-6">
                  {/* Search Bar */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      aria-label="Cari trip"
                      placeholder="Cari trip, lokasi, atau kata kunci..."
                      value={query}
                      onChange={(e)=>setQuery(e.target.value)}
                      className="w-full border rounded-lg pl-12 pr-4 py-3 shadow-sm bg-white"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-sm text-gray-500">Kategori Tempat</div>
                    <div className="flex flex-wrap justify-center gap-3">
                      <button
                        onClick={() => setCategoryFilter('All')}
                        className={`px-5 py-2 rounded-full font-medium transition-all ${
                          categoryFilter === 'All'
                            ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Semua
                      </button>
                      <button
                        onClick={() => setCategoryFilter('Mendaki')}
                        className={`px-5 py-2 rounded-full font-medium transition-all ${
                          categoryFilter === 'Mendaki'
                            ? 'bg-emerald-600 text-white shadow-md hover:bg-emerald-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Gunung
                      </button>
                      <button
                        onClick={() => setCategoryFilter('Pantai')}
                        className={`px-5 py-2 rounded-full font-medium transition-all ${
                          categoryFilter === 'Pantai'
                            ? 'bg-sky-600 text-white shadow-md hover:bg-sky-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Pantai
                      </button>
                      <button
                        onClick={() => setCategoryFilter('Wisata')}
                        className={`px-5 py-2 rounded-full font-medium transition-all ${
                          categoryFilter === 'Wisata'
                            ? 'bg-amber-600 text-white shadow-md hover:bg-amber-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Wisata
                      </button>
                      <button
                        onClick={() => setCategoryFilter('Petualangan')}
                        className={`px-5 py-2 rounded-full font-medium transition-all ${
                          categoryFilter === 'Petualangan'
                            ? 'bg-rose-600 text-white shadow-md hover:bg-rose-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Riam/Air Terjun
                      </button>
                    </div>
                  </div>

                  {/* Difficulty Filter */}
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setDifficultyFilter('All')}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${
                        difficultyFilter === 'All'
                          ? 'bg-green-600 text-white shadow-md hover:bg-green-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Semua
                    </button>
                    <button
                      onClick={() => setDifficultyFilter('Mudah')}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${
                        difficultyFilter === 'Mudah'
                          ? 'bg-green-600 text-white shadow-md hover:bg-green-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Pemula
                    </button>
                    <button
                      onClick={() => setDifficultyFilter('Sedang')}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${
                        difficultyFilter === 'Sedang'
                          ? 'bg-yellow-500 text-white shadow-md hover:bg-yellow-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Sedang
                    </button>
                    <button
                      onClick={() => setDifficultyFilter('Berat')}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${
                        difficultyFilter === 'Berat'
                          ? 'bg-red-600 text-white shadow-md hover:bg-red-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Berpengalaman
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        )}

        {/* Trips Display */}
        {!loading && (
          <>
            {/* Section - Kategori Trip */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-8">Kategori Trip</h2>

              {/* Group trips by category */}
              {[
                { key: 'Mendaki', label: 'Mendaki Gunung', color: 'text-emerald-700' },
                { key: 'Pantai', label: 'Pantai & Snorkeling', color: 'text-sky-700' },
                { key: 'Wisata', label: 'Wisata Alam', color: 'text-amber-700' },
                { key: 'Petualangan', label: 'Petualangan (Arung Jeram, Air Terjun)', color: 'text-rose-700' },
              ].map(cat => {
                const categoryTrips = trips.filter(t => t.category === (cat.key as any));
                if (categoryTrips.length === 0) return null;

                return (
                  <div key={cat.key} className="mb-12">
                    <h3 className={`text-xl font-semibold mb-4 ${cat.color}`}>{cat.label}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {categoryTrips.map(trip => (
                        <div key={trip.id} className="h-full">
                          <TripCard trip={trip} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Merchandise Promo Banner */}
            <div className="mt-12 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl overflow-hidden shadow-lg">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8">
                  <div className="flex-1 mb-6 md:mb-0 md:mr-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      Dukung petualanganmu dengan Baju Resmi Kuala Outdoor 
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      Tampil keren dengan desain eksklusif, nyaman dipakai untuk segala aktivitas outdoor. Mulai dari Rp55.000
                    </p>
                    <Link to="/merchandise">
                      <Button size="lg" variant="default">
                        Lihat Merchandise
                      </Button>
                    </Link>
                  </div>
                  <div className="flex-shrink-0 w-full md:w-1/3">
                    <img
                      src="https://i.imgur.com/1Q9Z1ZB.png"
                      alt="Baju Kuala Outdoor"
                      className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {trips.length === 0 && (
              <div className="mt-12 text-center">
                <p className="text-gray-500 text-lg mb-4">Tidak ada trip yang sesuai dengan filter Anda</p>
                <p className="text-gray-500 text-sm">💡 Hubungi kami via WhatsApp untuk informasi lebih lanjut.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}