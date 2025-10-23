import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ShoppingCart, Shirt, Ruler, Package } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

interface MerchandiseItem {
  id: string
  name: string
  color: string
  colorHex: string
  price: number
  stock: number
  images: string[]
  sizes: string[]
  material: string
  weight: string
  description: string
  features: string[]
}

const MERCHANDISE_ITEMS: MerchandiseItem[] = [
  {
    id: 'baju-hijau',
    name: 'Baju Kuala Outdoor - Hijau',
    color: 'Hijau',
    colorHex: '#16a34a',
    price: 55000,
    stock: 25,
    images: [
      'https://i.imgur.com/1Q9Z1ZB.png',
      'https://i.imgur.com/1Q9Z1ZB.png'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    material: '100% Cotton Combed 30s',
    weight: '180 gram',
    description: 'Kaos resmi Kuala Outdoor dengan desain eksklusif warna hijau yang merepresentasikan semangat petualangan alam.',
    features: [
      'Bahan katun combed premium',
      'Sablon rubber berkualitas tinggi',
      'Nyaman dan tidak panas',
      'Jahitan rapi dan kuat',
      'Logo Kuala Outdoor eksklusif'
    ]
  },
  {
    id: 'baju-abuabu',
    name: 'Baju Kuala Outdoor - Abu-abu',
    color: 'Abu-abu',
    colorHex: '#6b7280',
    price: 55000,
    stock: 30,
    images: [
      'https://i.imgur.com/2Q9Z1ZB.png',
      'https://i.imgur.com/2Q9Z1ZB.png'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    material: '100% Cotton Combed 30s',
    weight: '180 gram',
    description: 'Kaos resmi Kuala Outdoor dengan desain eksklusif warna abu-abu yang elegan dan cocok untuk segala aktivitas outdoor.',
    features: [
      'Bahan katun combed premium',
      'Sablon rubber berkualitas tinggi',
      'Nyaman dan tidak panas',
      'Jahitan rapi dan kuat',
      'Logo Kuala Outdoor eksklusif'
    ]
  },
  {
    id: 'baju-birutua',
    name: 'Baju Kuala Outdoor - Biru Tua',
    color: 'Biru Tua',
    colorHex: '#1e40af',
    price: 55000,
    stock: 20,
    images: [
      'https://i.imgur.com/3Q9Z1ZB.png',
      'https://i.imgur.com/3Q9Z1ZB.png'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    material: '100% Cotton Combed 30s',
    weight: '180 gram',
    description: 'Kaos resmi Kuala Outdoor dengan desain eksklusif warna biru tua yang stylish dan cocok untuk petualangan Anda.',
    features: [
      'Bahan katun combed premium',
      'Sablon rubber berkualitas tinggi',
      'Nyaman dan tidak panas',
      'Jahitan rapi dan kuat',
      'Logo Kuala Outdoor eksklusif'
    ]
  }
]

export default function Merchandise() {
  const [selectedItem, setSelectedItem] = useState<MerchandiseItem | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleOrderWhatsApp = (item: MerchandiseItem) => {
    const message = `Halo, saya ingin memesan:\n\n*${item.name}*\nHarga: ${formatPrice(item.price)}\n\nMohon info lebih lanjut mengenai cara pemesanan dan ukuran yang tersedia.`
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <div className="mb-8">
          <Link to="/trips">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Merchandise Kuala Outdoor 🌿
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dukung petualanganmu dengan merchandise resmi Kuala Outdoor. Tersedia dalam berbagai warna pilihan dengan kualitas premium.
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-emerald-900 mb-1">Pre-order Sekarang!</h3>
              <p className="text-sm text-emerald-700">
                Dapatkan diskon khusus untuk peserta trip. Estimasi pengiriman 7-14 hari kerja setelah pemesanan.
              </p>
            </div>
          </div>
        </div>

        {/* Merchandise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {MERCHANDISE_ITEMS.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Image */}
              <div className="relative h-64 bg-gray-100">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-contain p-4"
                />
                {item.stock < 10 && (
                  <Badge className="absolute top-3 right-3 bg-red-500">
                    Stok Terbatas
                  </Badge>
                )}
                <div 
                  className="absolute bottom-3 left-3 w-8 h-8 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: item.colorHex }}
                  title={item.color}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {item.description}
                </p>

                {/* Specs */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Shirt className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">Material:</span> {item.material}
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Ruler className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">Ukuran:</span> {item.sizes.join(', ')}
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Package className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">Berat:</span> {item.weight}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Fitur:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {item.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-emerald-600 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Stock */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">
                      {formatPrice(item.price)}
                    </p>
                    <p className="text-xs text-gray-500">Stok: {item.stock} pcs</p>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  onClick={() => handleOrderWhatsApp(item)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Pesan via WhatsApp
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Info Section */}
        <Card className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cara Pemesanan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Pilih Produk</h3>
                <p className="text-sm text-gray-600">
                  Klik tombol "Pesan via WhatsApp" pada produk yang Anda inginkan
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Konfirmasi Detail</h3>
                <p className="text-sm text-gray-600">
                  Admin kami akan membantu konfirmasi ukuran, jumlah, dan ongkir
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Transfer & Kirim</h3>
                <p className="text-sm text-gray-600">
                  Setelah transfer, pesanan akan diproses dan dikirim ke alamat Anda
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Size Chart Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            💡 Butuh panduan ukuran? Hubungi admin kami via WhatsApp untuk size chart lengkap
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
