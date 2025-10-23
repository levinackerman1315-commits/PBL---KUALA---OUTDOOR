import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import { useCart, Equipment } from '@/contexts/CartContext'

const EquipmentDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [equipment, setEquipment] = useState<any>(null)  // ← Ubah ke any untuk fleksibilitas
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { addToCart, isInCart, getCartItem, getCartCount } = useCart()

  useEffect(() => {
    if (id) {
      fetchEquipmentDetail(parseInt(id))
    }
  }, [id])

  const fetchEquipmentDetail = async (equipmentId: number) => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔍 Fetching equipment detail for ID:', equipmentId)
      
      const response = await fetch(`http://localhost/PBL-KELANA-OUTDOOR/api/public/equipment.php?id=${equipmentId}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const text = await response.text()
      console.log('📄 Raw response:', text.substring(0, 200))
      
      const data = JSON.parse(text)
      console.log('✅ Parsed data:', data)
      
      if (data.error) {
        throw new Error(data.message || 'Equipment tidak ditemukan')
      }

      if (data.equipment_id) {
        // ✅ MAP DATA API KE FORMAT YANG BENAR
        const mappedEquipment = {
          equipmentId: data.equipment_id.toString(),  // Convert number to string
          name: data.name,
          price: data.price_per_day,
          image: data.image_url || null,
          // Keep original API data
          stock_quantity: data.stock_quantity,
          category: data.category,
          description: data.description,
          dimensions: data.dimensions,
          weight: data.weight,
          material: data.material,
          code: data.code,
          condition: data.condition,
        }
        
        setEquipment(mappedEquipment)
        console.log('✅ Equipment loaded:', mappedEquipment.name)
        console.log('✅ Equipment ID (string):', mappedEquipment.equipmentId)
        
      } else if (Array.isArray(data)) {
        const foundEquipment = data.find((item: any) => item.equipment_id === equipmentId)
        if (foundEquipment) {
          const mappedEquipment = {
            equipmentId: foundEquipment.equipment_id.toString(),
            name: foundEquipment.name,
            price: foundEquipment.price_per_day,
            image: foundEquipment.image_url || null,
            stock_quantity: foundEquipment.stock_quantity,
            category: foundEquipment.category,
            description: foundEquipment.description,
          }
          setEquipment(mappedEquipment)
          console.log('✅ Equipment found in array:', mappedEquipment.name)
        } else {
          throw new Error('Equipment tidak ditemukan')
        }
      } else {
        throw new Error('Equipment tidak ditemukan')
      }
      
    } catch (err) {
      console.error('❌ Error:', err)
      setError('Gagal memuat detail equipment')
      
      const fallbackEquipment = {
        equipmentId: id || '1',  // String
        name: "Tenda Dome 4 Orang (FALLBACK)",
        price: 60000,
        image: null,
        stock_quantity: 5,
      }
      
      setEquipment(fallbackEquipment)
      
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!equipment) return
    
    console.log('🛒 Adding to cart:', equipment.name)
    console.log('🛒 Equipment ID:', equipment.equipmentId)
    
    // ✅ CREATE EQUIPMENT OBJECT FOR CART
    const cartEquipment: Equipment = {
      equipmentId: equipment.equipmentId,
      name: equipment.name,
      price: equipment.price,
      image: equipment.image,
    }
    
    addToCart(cartEquipment)
    alert(`✅ ${equipment.name} ditambahkan ke keranjang!`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat detail equipment...</p>
        </div>
      </div>
    )
  }

  if (!equipment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Equipment tidak ditemukan</p>
          <Link to="/browse">
            <Button>Kembali ke Browse</Button>
          </Link>
        </div>
      </div>
    )
  }

  // ✅ SEKARANG SUDAH AMAN
  const isAvailable = equipment.stock_quantity ? equipment.stock_quantity > 0 : true
  const itemInCart = isInCart(equipment.equipmentId)
  const cartItem = getCartItem(equipment.equipmentId)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/browse">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Browse
          </Button>
        </Link>

        {error && (
          <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
            <p className="text-yellow-800 text-sm">
              ⚠️ {error} - Menampilkan data fallback
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              {equipment.image ? (
                <img 
                  src={equipment.image} 
                  alt={equipment.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-white text-6xl font-bold">
                    {equipment.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-800 mb-2">
                🛒 Simpan untuk nanti?
              </h3>
              <p className="text-sm text-blue-600 mb-3">
                Tambahkan ke keranjang untuk booking multiple items
              </p>
              
              {itemInCart ? (
                <div className="space-y-2">
                  <p className="text-sm text-green-600 font-medium">
                    ✅ Sudah di keranjang ({cartItem?.quantity})
                  </p>
                  <div className="flex gap-2">
                    <Link to="/cart" className="flex-1">
                      <Button variant="outline" className="w-full border-blue-600 text-blue-600">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Lihat Keranjang
                      </Button>
                    </Link>
                    <Button 
                      onClick={handleAddToCart}
                      disabled={!isAvailable}
                      className="bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      +1
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  onClick={handleAddToCart}
                  disabled={!isAvailable}
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Tambah ke Keranjang
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {equipment.name}
              </h1>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-3xl font-bold text-green-600">
                      Rp {equipment.price.toLocaleString('id-ID')}
                    </p>
                    <p className="text-gray-500">per 24 jam</p>
                  </div>
                </div>

                <Link 
                  to={`/booking/form?equipment_id=${equipment.equipmentId}`}
                  className="block"
                >
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                  >
                    🎒 Sewa Sekarang
                  </Button>
                </Link>

                <div className="flex gap-2 mt-4">
                  <Link to="/cart" className="flex-1">
                    <Button variant="outline" className="w-full text-sm">
                      Lihat Keranjang ({getCartCount()})
                    </Button>
                  </Link>
                  
                  <Link to="/browse" className="flex-1">
                    <Button variant="outline" className="w-full text-sm">
                      Browse Lainnya
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EquipmentDetail