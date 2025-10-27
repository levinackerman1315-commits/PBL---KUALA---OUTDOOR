import React, { useState } from 'react'
// ...existing code...
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Users, Calendar, BarChart, Phone, Clock } from 'lucide-react'

function difficultyBadge(difficulty:string){
  const common = 'inline-block text-xs font-medium px-2 py-0.5 rounded'
  if(difficulty === 'Mudah' || difficulty === 'Pemula') return <span className={common + ' bg-green-100 text-green-800'}>Pemula</span>
  if(difficulty === 'Sedang') return <span className={common + ' bg-yellow-100 text-yellow-800'}>Sedang</span>
  return <span className={common + ' bg-red-100 text-red-800'}>Berpengalaman</span>
}

function categoryBadge(category: string){
  const common = 'inline-block text-xs font-medium px-2 py-0.5 rounded'
  if(category === 'Mendaki') return <span className={common + ' bg-emerald-100 text-emerald-800'}>Gunung</span>
  if(category === 'Pantai') return <span className={common + ' bg-sky-100 text-sky-800'}>Pantai</span>
  if(category === 'Wisata') return <span className={common + ' bg-amber-100 text-amber-800'}>Wisata</span>
  if(category === 'Petualangan') return <span className={common + ' bg-rose-100 text-rose-800'}>Riam/Air Terjun</span>
  return <span className={common + ' bg-gray-100 text-gray-800'}>{category}</span>
}

import type { TripMock } from '@/pages/Trips'

interface TripCardProps {
  trip: TripMock
  guide?: {
    name: string
    contact: string
  }
}



export default function TripCard({ trip }: TripCardProps) {
  const formattedDate = new Date(trip.startDate).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row items-stretch w-full h-full">
        {/* Left: Image */}
        <div className="sm:w-1/3 w-full flex-shrink-0 flex flex-col justify-center items-center p-4">
          <img 
            src={trip.coverImage}
            alt={trip.title}
            className="rounded-lg object-cover w-full h-40 sm:h-48"
            style={{minWidth: '180px', maxWidth: '260px'}}
          />
          <div className="mt-2 flex items-center gap-2">
            {difficultyBadge(trip.difficulty)}
            {categoryBadge(trip.category as any)}
          </div>
        </div>
        {/* Right: Info */}
        <div className="flex-1 flex flex-col justify-between p-4">
          <div>
            <h3 className="text-xl font-bold mb-2">{trip.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate">{trip.location}</span>
            </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-1">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 shrink-0 text-primary" />
                <span>{trip.remainingQuota}/{trip.totalQuota} slot</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-primary" />
                <span>{trip.durationDays} hari</span>
              </div>
            </div>
            <div className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Tanggal:</span> {formattedDate} {trip.startTime && <>• <span>{trip.startTime}</span></>}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Biaya:</span> Rp 150.000 - 200.000
            </div>
            <div className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Transportasi:</span> Bis Pariwisata
            </div>
            <div className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Makan:</span> Ditanggung
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Link to={`/trips/${trip.id}`}>
              <Button size="sm" variant="secondary">Detail</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}