import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Construction, Shirt, Package, AlertCircle } from 'lucide-react'

const MerchandiseManagement = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <Shirt className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Kelola Merchandise</h1>
                <p className="text-sm text-gray-600">Manajemen produk merchandise Kuala Outdoor</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Under Construction */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Alert Banner */}
          <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">
                  Fitur Dalam Pengembangan
                </h3>
                <p className="text-yellow-700 text-sm">
                  Halaman manajemen merchandise sedang dalam tahap pengembangan dan akan segera tersedia.
                </p>
              </div>
            </div>
          </div>

          {/* Under Construction Card */}
          <Card className="border-2 border-orange-200 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center py-12">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Construction className="h-32 w-32 text-white animate-pulse" />
                  <Shirt className="h-16 w-16 text-white absolute bottom-0 right-0 animate-bounce" />
                </div>
              </div>
              <CardTitle className="text-4xl font-extrabold mb-3">
                Under Construction
              </CardTitle>
              <p className="text-orange-50 text-lg max-w-2xl mx-auto">
                Kami sedang membangun fitur manajemen merchandise yang lebih baik untuk Anda
              </p>
            </CardHeader>

            <CardContent className="p-8">
              {/* Fitur yang Akan Datang */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-orange-600" />
                  Fitur yang Akan Datang
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          Tambah & Edit Produk
                        </h4>
                        <p className="text-sm text-gray-600">
                          Kelola produk merchandise seperti kaos, jaket, topi, dan aksesori outdoor
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          Manajemen Stok
                        </h4>
                        <p className="text-sm text-gray-600">
                          Pantau ketersediaan stok per ukuran dan warna produk
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          Upload Foto Produk
                        </h4>
                        <p className="text-sm text-gray-600">
                          Upload multiple foto produk dengan berbagai angle
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          Manajemen Harga
                        </h4>
                        <p className="text-sm text-gray-600">
                          Atur harga, diskon, dan variasi harga per ukuran
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          Laporan Penjualan
                        </h4>
                        <p className="text-sm text-gray-600">
                          Statistik dan laporan penjualan merchandise
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          Integrasi Pemesanan
                        </h4>
                        <p className="text-sm text-gray-600">
                          Terima pesanan langsung dari website dan WhatsApp
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  📅 Estimasi Rilis
                </h3>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      UKNOWN
                    </div>
                    <p className="text-sm text-gray-600">Target Peluncuran</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/admin/dashboard">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Dashboard
                  </Button>
                </Link>
                
                <Button 
                  size="lg"
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 gap-2"
                  onClick={() => {
                    window.open(
                      'https://wa.me/6281345708472?text=Halo, saya tertarik untuk memberikan feedback tentang fitur Merchandise Management yang akan datang.',
                      '_blank'
                    )
                  }}
                >
                  <Shirt className="h-4 w-4" />
                  Berikan Feedback
                </Button>
              </div>

              {/* Info Box */}
              <div className="mt-8 text-center text-sm text-gray-500">
                <p>
                  Sementara waktu, Anda bisa mengelola merchandise melalui{' '}
                  <a 
                    href="https://wa.me/6281345708472" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:underline font-medium"
                  >
                    WhatsApp Admin
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MerchandiseManagement