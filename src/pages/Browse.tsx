// import { useState, useEffect } from "react";
// import { Navbar } from "@/components/Navbar";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { supabase } from "@/integrations/supabase/client";
// import { Link } from "react-router-dom";
// import { Search, MapPin } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// interface Listing {
//   id: string;
//   title: string;
//   description: string;
//   price: number | null;
//   category: string;
//   condition: string;
//   image_url: string | null;
//   location: string | null;
//   created_at: string;
//   profiles: {
//     full_name: string | null;
//   };
// }

// const Browse = () => {
//   const [listings, setListings] = useState<Listing[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState<string>("all");
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();

//   const categories = [
//     "all",
//     "Backpacks",
//     "Tents",
//     "Sleeping Bags",
//     "Climbing",
//     "Footwear",
//     "Clothing",
//     "Camping",
//     "Other",
//   ];

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   const fetchListings = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("listings")
//         .select(`
//           *,
//           profiles (
//             full_name
//           )
//         `)
//         .eq("status", "active")
//         .order("created_at", { ascending: false });

//       if (error) throw error;
//       setListings(data || []);
//     } catch (error: any) {
//       toast({
//         title: "Error loading listings",
//         description: error.message,
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredListings = listings.filter((listing) => {
//     const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       listing.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = categoryFilter === "all" || listing.category === categoryFilter;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
      
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-8">Browse Gear</h1>
        
//         {/* Search and Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search gear..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>
          
//           <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//             <SelectTrigger className="w-full md:w-[200px]">
//               <SelectValue placeholder="Category" />
//             </SelectTrigger>
//             <SelectContent>
//               {categories.map((category) => (
//                 <SelectItem key={category} value={category}>
//                   {category === "all" ? "All Categories" : category}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Listings Grid */}
//         {loading ? (
//           <div className="text-center py-12">
//             <p className="text-muted-foreground">Loading listings...</p>
//           </div>
//         ) : filteredListings.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-muted-foreground">No listings found</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredListings.map((listing) => (
//               <Link key={listing.id} to={`/listing/${listing.id}`}>
//                 <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
//                   {listing.image_url && (
//                     <div className="aspect-video overflow-hidden rounded-t-lg">
//                       <img
//                         src={listing.image_url}
//                         alt={listing.title}
//                         className="w-full h-full object-cover hover:scale-105 transition-transform"
//                       />
//                     </div>
//                   )}
//                   <CardHeader>
//                     <div className="flex items-start justify-between gap-2">
//                       <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
//                       {listing.price && (
//                         <Badge variant="secondary" className="shrink-0">
//                           ${listing.price}
//                         </Badge>
//                       )}
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
//                       {listing.description}
//                     </p>
//                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                       <Badge variant="outline">{listing.category}</Badge>
//                       <Badge variant="outline">{listing.condition}</Badge>
//                     </div>
//                   </CardContent>
//                   <CardFooter className="text-sm text-muted-foreground flex items-center gap-2">
//                     {listing.location && (
//                       <>
//                         <MapPin className="h-4 w-4" />
//                         {listing.location}
//                       </>
//                     )}
//                   </CardFooter>
//                 </Card>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Browse;


// import { useEffect, useState } from 'react'
// import { equipmentAPI, Equipment, ApiResponse } from '@/lib/api'

// const Browse = () => {
//   const [equipment, setEquipment] = useState<Equipment[]>([])
//   const [categories, setCategories] = useState<string[]>([])
//   const [selectedCategory, setSelectedCategory] = useState<string>('all')
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // Fetch all equipment and categories on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)
        
//         // Fetch equipment and categories simultaneously
//         const [equipmentRes, categoriesRes] = await Promise.all([
//           equipmentAPI.getAll(),
//           equipmentAPI.getCategories()
//         ])

//         if (equipmentRes.data.status === 'success') {
//           setEquipment(equipmentRes.data.data)
//         }

//         if (categoriesRes.data.status === 'success') {
//           setCategories(['all', ...categoriesRes.data.data])
//         }

//       } catch (err) {
//         console.error('Error fetching data:', err)
//         setError('Gagal memuat data equipment')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   // Filter equipment by category
//   const handleCategoryChange = async (category: string) => {
//     try {
//       setLoading(true)
//       setSelectedCategory(category)

//       if (category === 'all') {
//         const response = await equipmentAPI.getAll()
//         if (response.data.status === 'success') {
//           setEquipment(response.data.data)
//         }
//       } else {
//         const response = await equipmentAPI.getByCategory(category)
//         if (response.data.status === 'success') {
//           setEquipment(response.data.data)
//         }
//       }
//     } catch (err) {
//       console.error('Error filtering equipment:', err)
//       setError('Gagal memfilter equipment')
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading && equipment.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Memuat equipment...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 text-lg">{error}</p>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Coba Lagi
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Sewa Peralatan Outdoor
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Temukan peralatan berkualitas untuk petualangan Anda
//           </p>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         {/* Category Filter */}
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold mb-4">Filter Kategori:</h3>
//           <div className="flex flex-wrap gap-2">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => handleCategoryChange(category)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                   selectedCategory === category
//                     ? 'bg-green-600 text-white'
//                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 {category === 'all' ? 'Semua' : category.charAt(0).toUpperCase() + category.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Equipment Grid */}
//         {loading ? (
//           <div className="text-center py-8">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
//             <p className="mt-2 text-gray-600">Memuat...</p>
//           </div>
//         ) : equipment.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">Tidak ada equipment ditemukan</p>
//           </div>
//         ) : (
//           <>
//             <div className="mb-4">
//               <p className="text-gray-600">
//                 Menampilkan {equipment.length} equipment
//                 {selectedCategory !== 'all' && ` dalam kategori "${selectedCategory}"`}
//               </p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {equipment.map((item) => (
//                 <div key={item.equipment_id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//                   <div className="aspect-w-16 aspect-h-12 bg-gray-200">
//                     {item.image_url ? (
//                       <img 
//                         src={item.image_url} 
//                         alt={item.name}
//                         className="w-full h-48 object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
//                         <span className="text-white text-4xl font-bold">
//                           {item.name.charAt(0)}
//                         </span>
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
//                       {item.name}
//                     </h3>
                    
//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
//                         {item.category}
//                       </span>
//                       <span className="text-xs text-gray-500">
//                         {item.code}
//                       </span>
//                     </div>
                    
//                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                       {item.description}
//                     </p>
                    
//                     {item.size_capacity && (
//                       <p className="text-sm text-gray-500 mb-2">
//                         <span className="font-medium">Kapasitas:</span> {item.size_capacity}
//                       </p>
//                     )}
                    
//                     <div className="flex justify-between items-center mt-4">
//                       <div>
//                         <p className="text-2xl font-bold text-green-600">
//                           Rp {item.price_per_day.toLocaleString('id-ID')}
//                         </p>
//                         <p className="text-xs text-gray-500">per hari</p>
//                       </div>
                      
//                       <div className="text-right">
//                         <p className="text-sm text-gray-600">
//                           Stock: <span className="font-medium">{item.stock_quantity}</span>
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           {item.condition}
//                         </p>
//                       </div>
//                     </div>
                    
//                     <button className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
//                       Sewa Sekarang
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Browse


import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Package, ArrowLeft, Weight, Ruler, AlertTriangle } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'

interface Equipment {
  equipment_id: number;
  name: string;
  code: string;
  description?: string;
  category: string;
  size_capacity?: string;
  dimensions?: string;
  weight?: number;
  material?: string;
  stock_quantity: number;
  available_stock: number;
  reserved_stock: number;
  rented_stock: number;
  price_per_day: number;
  condition: string;
  equipment_type?: string;
  image_url?: string;
  created_at: string;
}

const Browse = () => {
  const [searchParams] = useSearchParams()
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [allEquipment, setAllEquipment] = useState<Equipment[]>([]) // Store original data
  const [categories, setCategories] = useState<string[]>(['all'])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEquipment()
  }, [])

  const fetchEquipment = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log("🔍 Fetching equipment from database...")
      
      const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/public/equipment.php', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      console.log("📡 Response status:", response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const text = await response.text()
      console.log("📄 Raw response preview:", text.substring(0, 300))
      
      let data;
      try {
        data = JSON.parse(text)
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError)
        throw new Error('Invalid JSON response from server')
      }

      console.log("✅ Parsed data:", data)

      // Check if response has error
      if (data.error) {
        throw new Error(data.message || 'API returned error')
      }

      if (Array.isArray(data) && data.length > 0) {
        setEquipment(data)
        setAllEquipment(data) // Store original data
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map((item: Equipment) => item.category))]
        setCategories(['all', ...uniqueCategories])
        
        console.log("✅ Equipment loaded:", data.length, "items")
        console.log("✅ Categories found:", uniqueCategories)
        console.log("✅ Sample equipment:", data[0])
        
      } else if (Array.isArray(data) && data.length === 0) {
        console.warn("⚠️ Database is empty")
        setEquipment([])
        setAllEquipment([])
        setError('Database kosong - belum ada equipment')
      } else {
        console.warn("⚠️ Unexpected data format:", data)
        throw new Error('Unexpected data format from API')
      }

    } catch (err) {
      console.error('❌ Error fetching equipment:', err)
      
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(`Database Error: ${errorMessage}`)
      
      // Set empty state
      setEquipment([])
      setAllEquipment([])
      
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    console.log("🔍 Search:", searchKeyword)
    
    if (!searchKeyword.trim()) {
      // Reset to all equipment
      setEquipment(allEquipment)
      return
    }
    
    // Filter from all equipment
    const filtered = allEquipment.filter(item =>
      item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.code.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.category.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.material?.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    
    setEquipment(filtered)
    console.log(`🔍 Search results: ${filtered.length} items found`)
  }

  const handleCategoryFilter = (category: string) => {
    console.log("🏷️ Filter category:", category)
    setSelectedCategory(category)
    
    let filtered = allEquipment;
    
    if (category !== 'all') {
      filtered = allEquipment.filter(item => item.category === category)
    }
    
    // Apply search filter if there's a search keyword
    if (searchKeyword.trim()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.code.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    }
    
    setEquipment(filtered)
    console.log(`🏷️ Category filter results: ${filtered.length} items`)
  }

  const handleClearSearch = () => {
    setSearchKeyword('')
    setSelectedCategory('all')
    setEquipment(allEquipment)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Home
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🏕️ Katalog Peralatan Outdoor
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Temukan peralatan berkualitas tinggi untuk petualangan outdoor Anda dari database kami.
            </p>
            
            {/* Error Warning */}
            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg max-w-lg mx-auto">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-medium">Database Error</span>
                </div>
                <p className="text-red-700 text-sm mt-1">{error}</p>
                <Button 
                  onClick={fetchEquipment} 
                  className="mt-2 bg-red-600 hover:bg-red-700"
                  size="sm"
                >
                  Coba Lagi
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filter */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            {/* Search Bar */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Cari equipment berdasarkan nama, kode, kategori, atau material..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
              
              <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
                <Search className="h-4 w-4 mr-2" />
                Cari
              </Button>
              
              {(searchKeyword || selectedCategory !== 'all') && (
                <Button variant="outline" onClick={handleClearSearch}>
                  Reset
                </Button>
              )}
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Filter Kategori:</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => handleCategoryFilter(category)}
                    className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
                    size="sm"
                  >
                    {category === 'all' ? 'Semua Kategori' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center text-sm">
                <p className="text-gray-600">
                  {loading ? (
                    "Memuat equipment dari database..."
                  ) : (
                    <>
                      Menampilkan <span className="font-semibold text-green-600">{equipment.length}</span> equipment
                      {allEquipment.length > 0 && equipment.length !== allEquipment.length && (
                        <span className="text-gray-500"> dari total {allEquipment.length}</span>
                      )}
                      {selectedCategory !== 'all' && (
                        <span className="text-green-600"> dalam kategori "{selectedCategory}"</span>
                      )}
                    </>
                  )}
                </p>
                
                {!loading && allEquipment.length > 0 && (
                  <p className="text-xs text-gray-500">
                    Database: kuala_outdoor | Total categories: {categories.length - 1}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Memuat equipment dari database kuala_outdoor...</p>
            <p className="text-gray-500 text-sm mt-2">Connecting to MySQL database...</p>
          </div>
        ) : error && equipment.length === 0 ? (
          <div className="text-center py-12">
            <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <p className="text-red-600 text-lg mb-2">Gagal memuat data dari database</p>
            <p className="text-gray-600 text-sm mb-4">Periksa koneksi database dan pastikan tabel equipment ada</p>
            <div className="space-y-2">
              <Button onClick={fetchEquipment} className="bg-green-600 hover:bg-green-700">
                Coba Lagi
              </Button>
              <p className="text-xs text-gray-500">
                Database: kuala_outdoor | Table: equipment
              </p>
            </div>
          </div>
        ) : equipment.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Tidak ada equipment ditemukan</p>
            <p className="text-gray-400 text-sm mb-4">
              {searchKeyword || selectedCategory !== 'all' ? 'Coba ubah filter pencarian' : 'Database masih kosong'}
            </p>
            <Button onClick={handleClearSearch} variant="outline">
              Reset Filter
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {equipment.map((item) => (
              <Card key={item.equipment_id} className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                {/* Equipment Image */}
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center relative">
                  {item.image_url ? (
                    <img 
                      src={item.image_url} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-4xl font-bold">
                      {item.name.charAt(0)}
                    </span>
                  )}
                  
                  {/* Stock indicator */}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
                    item.stock_quantity > 5 ? 'bg-green-500 text-white' :
                    item.stock_quantity > 0 ? 'bg-yellow-500 text-white' :
                    'bg-red-500 text-white'
                  }`}>
                    {item.stock_quantity > 0 ? `${item.stock_quantity} unit` : 'Habis'}
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                      {item.category.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-gray-500">{item.code}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
                    {item.name}
                  </h3>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Equipment Specifications */}
                  <div className="space-y-1 mb-3">
                    {item.size_capacity && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Package className="h-3 w-3" />
                        <span className="truncate">{item.size_capacity}</span>
                      </div>
                    )}
                    
                    {item.dimensions && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Ruler className="h-3 w-3" />
                        <span className="truncate">{item.dimensions}</span>
                      </div>
                    )}
                    
                    {item.weight && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Weight className="h-3 w-3" />
                        <span>{item.weight} kg</span>
                      </div>
                    )}

                    {item.material && (
                      <div className="text-sm text-gray-600 truncate">
                        Material: <span className="font-medium">{item.material}</span>
                      </div>
                    )}
                  </div>
                  
                  {item.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  
                  {/* Price & Stock */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xl font-bold text-green-600">
                          Rp {item.price_per_day.toLocaleString('id-ID')}
                        </p>
                        <p className="text-xs text-gray-500">per hari</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={item.condition === 'baik' ? 'default' : 'secondary'} className="mb-1">
                          {item.condition}
                        </Badge>
                        <p className="text-xs text-gray-600">
                          ID: {item.equipment_id}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Link to={`/equipment/${item.equipment_id}`}>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={item.stock_quantity === 0}
                    >
                      {item.stock_quantity === 0 ? 'Stok Habis' : 'Lihat Detail'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Footer info */}
        {!loading && !error && equipment.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Data dimuat dari database MySQL kuala_outdoor</p>
            <p>Last updated: {new Date().toLocaleString('id-ID')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Browse