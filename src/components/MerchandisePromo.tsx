import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function MerchandisePromo() {
  return (
    <Card className="w-full bg-gradient-to-r from-green-50 to-green-100 p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-bold text-green-800">Baju Kuala Outdoor</h3>
          <p className="text-gray-600">Pre-order sekarang dan dapatkan diskon khusus untuk peserta trip!</p>
          <div className="flex gap-2">
            <Link to="/store">
              <Button className="bg-green-600 hover:bg-green-700">
                Lihat Katalog
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={() => window.open(`https://wa.me/6281234567890?text=${encodeURIComponent('Saya ingin pre-order baju Kuala Outdoor, mohon info warna dan cara pesan.')}`,'_blank')}
            >
              Pre-order via WA
            </Button>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <img 
              src="https://i.imgur.com/1Q9Z1ZB.png" 
              alt="Baju Hitam" 
              className="w-32 h-32 object-contain rounded-lg border bg-white p-2"
            />
            <span className="text-sm font-medium mt-1 block">Hitam</span>
          </div>
          <div className="text-center">
            <img 
              src="https://i.imgur.com/2Q9Z1ZB.png" 
              alt="Baju Putih" 
              className="w-32 h-32 object-contain rounded-lg border bg-white p-2"
            />
            <span className="text-sm font-medium mt-1 block">Putih</span>
          </div>
        </div>
      </div>
    </Card>
  )
}