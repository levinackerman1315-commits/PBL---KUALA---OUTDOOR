import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

const SIZES = ['S', 'M', 'L', 'XL', 'XXL']
const COLORS = ['Hitam', 'Putih']

export default function Store() {
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Home
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-outdoor-activity)'}} />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Merchandise Kuala Outdoor</h1>
              <p className="text-xl max-w-2xl mx-auto">Tampil stylish dalam petualangan Anda dengan koleksi baju eksklusif kami</p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {COLORS.map(color => (
            <Card key={color} className="p-6">
              <img 
                src={`https://i.imgur.com/${color === 'Hitam' ? '1Q9Z1ZB' : '2Q9Z1ZB'}.png`}
                alt={`Baju ${color}`}
                className="w-full aspect-square object-contain mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Baju Kuala Outdoor - {color}</h3>
              <p className="text-gray-600 mb-4">100% Cotton Premium, Design Exclusive</p>
              <p className="text-2xl font-bold text-green-600 mb-4">Rp 55.000</p>
              <Button className="w-full" onClick={() => setSelectedColor(color)}>
                Pilih {color}
              </Button>
            </Card>
          ))}
        </div>

        {/* Size Guide & Material */}
        <div className="bg-white rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Informasi Produk</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Size Guide</h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Size</th>
                    <th className="py-2">Lebar Dada</th>
                    <th className="py-2">Panjang</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZES.map(size => (
                    <tr key={size} className="border-b">
                      <td className="py-2 text-center">{size}</td>
                      <td className="py-2 text-center">50 cm</td>
                      <td className="py-2 text-center">70 cm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Material</h3>
              <ul className="space-y-2">
                <li>• 100% Cotton Premium</li>
                <li>• Sablon Premium DTF</li>
                <li>• Jahitan Rapi</li>
                <li>• Label Custom</li>
                <li>• Free Packaging Premium</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pre-order Form */}
        <div className="bg-white rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Form Pre-order</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <Label>Warna</Label>
                <select 
                  className="w-full border rounded-lg p-2"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  <option value="">Pilih Warna</option>
                  {COLORS.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Ukuran</Label>
                <select 
                  className="w-full border rounded-lg p-2"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Pilih Ukuran</option>
                  {SIZES.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Jumlah</Label>
                <Input 
                  type="number" 
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Nama Lengkap</Label>
                <Input type="text" placeholder="Masukkan nama lengkap" />
              </div>
              <div>
                <Label>No. WhatsApp</Label>
                <Input type="tel" placeholder="Contoh: 08123456789" />
              </div>
              <div>
                <Label>Alamat Pengiriman</Label>
                <textarea 
                  className="w-full border rounded-lg p-2" 
                  rows={3}
                  placeholder="Masukkan alamat lengkap"
                />
              </div>
            </div>
          </div>
          <Button 
            className="w-full mt-6"
            onClick={() => window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(
              `Saya ingin pre-order baju Kuala Outdoor dengan detail:
- Warna: ${selectedColor}
- Ukuran: ${selectedSize}
- Jumlah: ${quantity} pcs
              
Mohon info total harga dan cara pembayarannya.`
            )}`,'_blank')}
          >
            Pre-order via WhatsApp
          </Button>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Testimoni Pembeli</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <Card key={i} className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div>
                    <h4 className="font-semibold">Pembeli {i}</h4>
                    <p className="text-sm text-gray-500">⭐️⭐️⭐️⭐️⭐️</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Kualitas baju sangat bagus, nyaman dipakai untuk kegiatan outdoor. Pengiriman cepat dan pelayanan ramah."
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">FAQ</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Berapa lama proses pre-order?</AccordionTrigger>
              <AccordionContent>
                Proses pre-order memakan waktu 7-14 hari kerja sejak pembayaran dikonfirmasi.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Apakah bisa ganti ukuran setelah order?</AccordionTrigger>
              <AccordionContent>
                Penggantian ukuran bisa dilakukan selama barang belum diproduksi (1-2 hari setelah order).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Bagaimana cara merawat baju?</AccordionTrigger>
              <AccordionContent>
                Cuci dengan air dingin, jangan gunakan pemutih, dan setrika dengan suhu sedang.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}