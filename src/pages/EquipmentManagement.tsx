// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { 
//   ArrowLeft,
//   Search, 
//   Plus,
//   Edit,
//   Trash2,
//   Package,
//   AlertTriangle,
//   CheckCircle,
//   Eye,
//   RefreshCw,
//   Filter,
//   Download
// } from "lucide-react";

// const EquipmentManagement = () => {
//   const [equipments, setEquipments] = useState([]);
//   const [filteredEquipments, setFilteredEquipments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [conditionFilter, setConditionFilter] = useState("all");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingEquipment, setEditingEquipment] = useState(null);

//   // Form state
//   const [formData, setFormData] = useState({
//     name: "",
//     code: "",
//     description: "",
//     category: "tenda",
//     size_capacity: "",
//     dimensions: "",
//     weight: "",
//     material: "",
//     stock_quantity: "",
//     price_per_day: "",
//     condition: "baik"
//   });

//   // Mock data sesuai ERD
//   useEffect(() => {
//     const mockEquipments = [
//       {
//         equipment_id: 1,
//         name: "Tenda Dome 4-6 Orang",
//         code: "TENDA-001",
//         description: "Tenda berkualitas tinggi untuk 4-6 orang dengan double layer waterproof",
//         category: "tenda",
//         size_capacity: "4-6 Orang",
//         dimensions: "300x250x180 cm",
//         weight: 8.5,
//         material: "Nylon 210T Waterproof",
//         stock_quantity: 5,
//         price_per_day: 60000,
//         condition: "baik",
//         available_stock: 3,
//         reserved_stock: 1,
//         rented_stock: 1,
//         created_at: "2024-01-15"
//       },
//       {
//         equipment_id: 2,
//         name: "Tas Gunung 60 Liter",
//         code: "TAS-001", 
//         description: "Tas gunung dengan frame internal dan rain cover",
//         category: "tas",
//         size_capacity: "60 Liter",
//         dimensions: "70x35x35 cm",
//         weight: 1.8,
//         material: "Ripstop Nylon 420D",
//         stock_quantity: 10,
//         price_per_day: 25000,
//         condition: "baik",
//         available_stock: 7,
//         reserved_stock: 2,
//         rented_stock: 1,
//         created_at: "2024-01-10"
//       },
//       {
//         equipment_id: 3,
//         name: "Sleeping Bag Four Season",
//         code: "SLEEP-001",
//         description: "Sleeping bag dengan rating suhu -5°C untuk gunung tinggi",
//         category: "sleeping_bag",
//         size_capacity: "Single -5°C",
//         dimensions: "220x80 cm",
//         weight: 2.1,
//         material: "Duck Down + Nylon",
//         stock_quantity: 8,
//         price_per_day: 20000,
//         condition: "baik",
//         available_stock: 5,
//         reserved_stock: 1,
//         rented_stock: 2,
//         created_at: "2024-01-12"
//       },
//       {
//         equipment_id: 4,
//         name: "Kompor Portable Gas",
//         code: "KOMPOR-001",
//         description: "Kompor portable dengan auto ignition dan wind shield",
//         category: "kompor",
//         size_capacity: "220g gas",
//         dimensions: "12x8x8 cm", 
//         weight: 0.4,
//         material: "Aluminium + Stainless Steel",
//         stock_quantity: 15,
//         price_per_day: 8000,
//         condition: "baik",
//         available_stock: 12,
//         reserved_stock: 2,
//         rented_stock: 1,
//         created_at: "2024-01-08"
//       },
//       {
//         equipment_id: 5,
//         name: "Matras Camping Standard",
//         code: "MATRAS-001",
//         description: "Matras self-inflating dengan R-value 4.2",
//         category: "matras",
//         size_capacity: "Single",
//         dimensions: "183x51x2.5 cm",
//         weight: 0.9,
//         material: "PVC Tahan Air + Foam",
//         stock_quantity: 20,
//         price_per_day: 10000,
//         condition: "baik", 
//         available_stock: 15,
//         reserved_stock: 3,
//         rented_stock: 2,
//         created_at: "2024-01-05"
//       },
//       {
//         equipment_id: 6,
//         name: "Tenda Ultralight 2 Orang",
//         code: "TENDA-002",
//         description: "Tenda ultralight untuk hiking dengan bobot minimal",
//         category: "tenda", 
//         size_capacity: "2 Orang",
//         dimensions: "210x130x110 cm",
//         weight: 1.2,
//         material: "Nylon 15D Silicone",
//         stock_quantity: 3,
//         price_per_day: 45000,
//         condition: "rusak_ringan",
//         available_stock: 1,
//         reserved_stock: 0,
//         rented_stock: 1,
//         created_at: "2024-01-20"
//       }
//     ];
    
//     setEquipments(mockEquipments);
//     setFilteredEquipments(mockEquipments);
//   }, []);

//   // Filter equipments
//   useEffect(() => {
//     let filtered = equipments;
    
//     // Search filter
//     if (searchTerm) {
//       filtered = filtered.filter(equipment => 
//         equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         equipment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         equipment.category.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     // Category filter
//     if (categoryFilter !== "all") {
//       filtered = filtered.filter(equipment => equipment.category === categoryFilter);
//     }
    
//     // Condition filter
//     if (conditionFilter !== "all") {
//       filtered = filtered.filter(equipment => equipment.condition === conditionFilter);
//     }
    
//     setFilteredEquipments(filtered);
//   }, [equipments, searchTerm, categoryFilter, conditionFilter]);

//   const getStockStatus = (equipment) => {
//     const { available_stock, stock_quantity } = equipment;
//     if (available_stock === 0) return { status: 'out_of_stock', color: 'bg-red-500', text: 'Habis' };
//     if (available_stock <= 2) return { status: 'low_stock', color: 'bg-yellow-500', text: 'Stok Rendah' };
//     return { status: 'available', color: 'bg-green-500', text: 'Tersedia' };
//   };

//   const getConditionColor = (condition) => {
//     switch(condition) {
//       case 'baik': return 'bg-green-500';
//       case 'rusak_ringan': return 'bg-yellow-500';
//       case 'perbaikan': return 'bg-red-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (editingEquipment) {
//       // Update equipment
//       setEquipments(prev => prev.map(eq => 
//         eq.equipment_id === editingEquipment.equipment_id 
//           ? { ...eq, ...formData, equipment_id: editingEquipment.equipment_id }
//           : eq
//       ));
//       alert('Equipment berhasil diupdate!');
//     } else {
//       // Add new equipment
//       const newEquipment = {
//         ...formData,
//         equipment_id: Date.now(),
//         available_stock: parseInt(formData.stock_quantity),
//         reserved_stock: 0,
//         rented_stock: 0,
//         created_at: new Date().toISOString().split('T')[0]
//       };
//       setEquipments(prev => [...prev, newEquipment]);
//       alert('Equipment berhasil ditambahkan!');
//     }
    
//     // Reset form
//     setFormData({
//       name: "", code: "", description: "", category: "tenda",
//       size_capacity: "", dimensions: "", weight: "", material: "",
//       stock_quantity: "", price_per_day: "", condition: "baik"
//     });
//     setShowAddModal(false);
//     setEditingEquipment(null);
//   };

//   const handleEdit = (equipment) => {
//     setFormData({
//       name: equipment.name,
//       code: equipment.code,
//       description: equipment.description,
//       category: equipment.category,
//       size_capacity: equipment.size_capacity,
//       dimensions: equipment.dimensions,
//       weight: equipment.weight.toString(),
//       material: equipment.material,
//       stock_quantity: equipment.stock_quantity.toString(),
//       price_per_day: equipment.price_per_day.toString(),
//       condition: equipment.condition
//     });
//     setEditingEquipment(equipment);
//     setShowAddModal(true);
//   };

//   const handleDelete = (equipmentId) => {
//     if (confirm('Yakin ingin menghapus equipment ini?')) {
//       setEquipments(prev => prev.filter(eq => eq.equipment_id !== equipmentId));
//       alert('Equipment berhasil dihapus!');
//     }
//   };

//   const stats = {
//     total: equipments.length,
//     available: equipments.filter(eq => eq.available_stock > 0).length,
//     lowStock: equipments.filter(eq => eq.available_stock <= 2 && eq.available_stock > 0).length,
//     outOfStock: equipments.filter(eq => eq.available_stock === 0).length,
//     totalValue: equipments.reduce((sum, eq) => sum + (eq.price_per_day * eq.stock_quantity), 0)
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* ✅ HEADER */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Link to="/admin/dashboard">
//                 <Button variant="outline" size="sm">
//                   <ArrowLeft className="h-4 w-4 mr-2" />
//                   Dashboard
//                 </Button>
//               </Link>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Kelola Equipment</h1>
//                 <p className="text-gray-600">Manajemen stok dan inventory equipment</p>
//               </div>
//             </div>
            
//             <div className="flex gap-2">
//               <Button 
//                 onClick={() => setShowAddModal(true)}
//                 className="bg-green-600 hover:bg-green-700"
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Tambah Equipment
//               </Button>
//               <Button variant="outline">
//                 <RefreshCw className="h-4 w-4 mr-2" />
//                 Refresh
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         {/* ✅ STATS CARDS */}
//         <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
//           <Card>
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
//               <div className="text-sm text-gray-600">Total Equipment</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-green-600">{stats.available}</div>
//               <div className="text-sm text-gray-600">Tersedia</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-yellow-600">{stats.lowStock}</div>
//               <div className="text-sm text-gray-600">Stok Rendah</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
//               <div className="text-sm text-gray-600">Habis</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-4 text-center">
//               <div className="text-lg font-bold text-purple-600">
//                 Rp {stats.totalValue.toLocaleString()}
//               </div>
//               <div className="text-sm text-gray-600">Total Aset</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* ✅ FILTERS */}
//         <Card className="mb-6">
//           <CardContent className="p-4">
//             <div className="flex flex-col lg:flex-row gap-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                   <Input
//                     placeholder="Cari nama, kode, atau kategori equipment..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>
              
//               <select 
//                 value={categoryFilter}
//                 onChange={(e) => setCategoryFilter(e.target.value)}
//                 className="px-3 py-2 border rounded-md"
//               >
//                 <option value="all">Semua Kategori</option>
//                 <option value="tenda">Tenda</option>
//                 <option value="tas">Tas Gunung</option>
//                 <option value="sleeping_bag">Sleeping Bag</option>
//                 <option value="kompor">Kompor</option>
//                 <option value="matras">Matras</option>
//               </select>
              
//               <select 
//                 value={conditionFilter}
//                 onChange={(e) => setConditionFilter(e.target.value)}
//                 className="px-3 py-2 border rounded-md"
//               >
//                 <option value="all">Semua Kondisi</option>
//                 <option value="baik">Baik</option>
//                 <option value="rusak_ringan">Rusak Ringan</option>
//                 <option value="perbaikan">Perbaikan</option>
//               </select>
//             </div>
//           </CardContent>
//         </Card>

//         {/* ✅ EQUIPMENT GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredEquipments.map((equipment) => {
//             const stockStatus = getStockStatus(equipment);
//             return (
//               <Card key={equipment.equipment_id} className="overflow-hidden">
//                 <CardContent className="p-6">
//                   {/* Header */}
//                   <div className="flex justify-between items-start mb-4">
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-lg text-gray-900 mb-1">
//                         {equipment.name}
//                       </h3>
//                       <p className="text-sm text-gray-600 mb-2">{equipment.code}</p>
//                       <Badge variant="outline" className="text-xs">
//                         {equipment.category}
//                       </Badge>
//                     </div>
//                     <div className="flex gap-1">
//                       <Badge className={`${stockStatus.color} text-white text-xs`}>
//                         {stockStatus.text}
//                       </Badge>
//                       <Badge className={`${getConditionColor(equipment.condition)} text-white text-xs`}>
//                         {equipment.condition}
//                       </Badge>
//                     </div>
//                   </div>

//                   {/* Specs */}
//                   <div className="space-y-2 text-sm mb-4">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Kapasitas:</span>
//                       <span className="font-medium">{equipment.size_capacity}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Dimensi:</span>
//                       <span className="font-medium text-xs">{equipment.dimensions}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Berat:</span>
//                       <span className="font-medium">{equipment.weight} kg</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Material:</span>
//                       <span className="font-medium text-xs">{equipment.material}</span>
//                     </div>
//                   </div>

//                   {/* Stock Info */}
//                   <div className="bg-gray-50 p-3 rounded-lg mb-4">
//                     <div className="grid grid-cols-3 gap-2 text-center text-sm">
//                       <div>
//                         <div className="font-semibold text-green-600">{equipment.available_stock}</div>
//                         <div className="text-xs text-gray-600">Tersedia</div>
//                       </div>
//                       <div>
//                         <div className="font-semibold text-yellow-600">{equipment.reserved_stock}</div>
//                         <div className="text-xs text-gray-600">Reserved</div>
//                       </div>
//                       <div>
//                         <div className="font-semibold text-blue-600">{equipment.rented_stock}</div>
//                         <div className="text-xs text-gray-600">Disewa</div>
//                       </div>
//                     </div>
//                     <div className="mt-2 pt-2 border-t border-gray-200">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Total Stok:</span>
//                         <span className="font-semibold">{equipment.stock_quantity} unit</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Price */}
//                   <div className="mb-4">
//                     <div className="text-2xl font-bold text-green-600">
//                       Rp {equipment.price_per_day.toLocaleString()}
//                     </div>
//                     <div className="text-sm text-gray-600">per hari</div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex gap-2">
//                     <Button 
//                       size="sm" 
//                       variant="outline"
//                       onClick={() => handleEdit(equipment)}
//                       className="flex-1"
//                     >
//                       <Edit className="h-4 w-4 mr-1" />
//                       Edit
//                     </Button>
//                     <Button 
//                       size="sm" 
//                       variant="outline"
//                       onClick={() => handleDelete(equipment.equipment_id)}
//                       className="text-red-600 hover:text-red-700"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {filteredEquipments.length === 0 && (
//           <div className="text-center py-12">
//             <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-500 text-lg">Tidak ada equipment ditemukan</p>
//             <Button 
//               onClick={() => setShowAddModal(true)}
//               className="mt-4 bg-green-600 hover:bg-green-700"
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Tambah Equipment Pertama
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* ✅ ADD/EDIT MODAL */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <CardHeader>
//               <CardTitle>
//                 {editingEquipment ? 'Edit Equipment' : 'Tambah Equipment Baru'}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Nama Equipment</label>
//                     <Input
//                       value={formData.name}
//                       onChange={(e) => setFormData({...formData, name: e.target.value})}
//                       placeholder="Tenda Dome 4 Orang"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kode Equipment</label>
//                     <Input
//                       value={formData.code}
//                       onChange={(e) => setFormData({...formData, code: e.target.value})}
//                       placeholder="TENDA-001"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">Deskripsi</label>
//                   <Textarea
//                     value={formData.description}
//                     onChange={(e) => setFormData({...formData, description: e.target.value})}
//                     placeholder="Deskripsi detail equipment..."
//                     rows={3}
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kategori</label>
//                     <select
//                       value={formData.category}
//                       onChange={(e) => setFormData({...formData, category: e.target.value})}
//                       className="w-full px-3 py-2 border rounded-md"
//                       required
//                     >
//                       <option value="tenda">Tenda</option>
//                       <option value="tas">Tas Gunung</option>
//                       <option value="sleeping_bag">Sleeping Bag</option>
//                       <option value="kompor">Kompor</option>
//                       <option value="matras">Matras</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kapasitas/Ukuran</label>
//                     <Input
//                       value={formData.size_capacity}
//                       onChange={(e) => setFormData({...formData, size_capacity: e.target.value})}
//                       placeholder="4-6 Orang / 60 Liter"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kondisi</label>
//                     <select
//                       value={formData.condition}
//                       onChange={(e) => setFormData({...formData, condition: e.target.value})}
//                       className="w-full px-3 py-2 border rounded-md"
//                       required
//                     >
//                       <option value="baik">Baik</option>
//                       <option value="rusak_ringan">Rusak Ringan</option>
//                       <option value="perbaikan">Perbaikan</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Dimensi</label>
//                     <Input
//                       value={formData.dimensions}
//                       onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
//                       placeholder="300x250x180 cm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Berat (kg)</label>
//                     <Input
//                       type="number"
//                       step="0.1"
//                       value={formData.weight}
//                       onChange={(e) => setFormData({...formData, weight: e.target.value})}
//                       placeholder="8.5"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Material</label>
//                     <Input
//                       value={formData.material}
//                       onChange={(e) => setFormData({...formData, material: e.target.value})}
//                       placeholder="Nylon 210T"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Jumlah Stok</label>
//                     <Input
//                       type="number"
//                       value={formData.stock_quantity}
//                       onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
//                       placeholder="5"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Harga per Hari (Rp)</label>
//                     <Input
//                       type="number"
//                       value={formData.price_per_day}
//                       onChange={(e) => setFormData({...formData, price_per_day: e.target.value})}
//                       placeholder="60000"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-2 pt-4">
//                   <Button type="submit" className="bg-green-600 hover:bg-green-700">
//                     {editingEquipment ? 'Update Equipment' : 'Tambah Equipment'}
//                   </Button>
//                   <Button 
//                     type="button" 
//                     variant="outline"
//                     onClick={() => {
//                       setShowAddModal(false);
//                       setEditingEquipment(null);
//                       setFormData({
//                         name: "", code: "", description: "", category: "tenda",
//                         size_capacity: "", dimensions: "", weight: "", material: "",
//                         stock_quantity: "", price_per_day: "", condition: "baik"
//                       });
//                     }}
//                   >
//                     Batal
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EquipmentManagement;



import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft,
  Search, 
  Plus,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
  CheckCircle,
  Eye,
  RefreshCw,
  Filter,
  Download,
  Loader2
} from "lucide-react";

const EquipmentManagement = () => {
  const [equipments, setEquipments] = useState([]);
  const [filteredEquipments, setFilteredEquipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    category: "tenda",
    size_capacity: "",
    dimensions: "",
    weight: "",
    material: "",
    stock_quantity: "",
    price_per_day: "",
    condition: "baik"
  });

  // ✅ FETCH FROM DATABASE API
  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Fetching equipment from API...');
      
      const response = await fetch('http://localhost/PBL-KELANA-OUTDOOR/api/admin/equipment.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      console.log('📄 Raw API response:', text.substring(0, 200));
      
      const data = JSON.parse(text);
      console.log('✅ Parsed equipment data:', data);
      
      if (data.error) {
        throw new Error(data.message || 'API returned error');
      }
      
      if (Array.isArray(data)) {
        setEquipments(data);
        setFilteredEquipments(data);
        console.log('✅ Equipment loaded:', data.length, 'items');
      } else {
        console.log('⚠️ No equipment data found');
        setEquipments([]);
        setFilteredEquipments([]);
      }
      
    } catch (err) {
      console.error('❌ Error fetching equipment:', err);
      setError('Gagal memuat equipment: ' + err.message);
      
      // ✅ FALLBACK TO MOCK DATA FOR DEVELOPMENT
      const mockEquipments = [
        {
          equipment_id: 1,
          name: "Tenda Dome 4-6 Orang (MOCK)",
          code: "TENDA-001",
          description: "Tenda berkualitas tinggi untuk 4-6 orang dengan double layer waterproof",
          category: "tenda",
          size_capacity: "4-6 Orang",
          dimensions: "300x250x180 cm",
          weight: 8.5,
          material: "Nylon 210T Waterproof",
          stock_quantity: 5,
          price_per_day: 60000,
          condition: "baik",
          available_stock: 3,
          reserved_stock: 1,
          rented_stock: 1,
          created_at: "2024-01-15"
        },
        {
          equipment_id: 2,
          name: "Tas Gunung 60 Liter (MOCK)",
          code: "TAS-001", 
          description: "Tas gunung dengan frame internal dan rain cover",
          category: "tas",
          size_capacity: "60 Liter",
          dimensions: "70x35x35 cm",
          weight: 1.8,
          material: "Ripstop Nylon 420D",
          stock_quantity: 10,
          price_per_day: 25000,
          condition: "baik",
          available_stock: 7,
          reserved_stock: 2,
          rented_stock: 1,
          created_at: "2024-01-10"
        }
      ];
      
      setEquipments(mockEquipments);
      setFilteredEquipments(mockEquipments);
      
    } finally {
      setLoading(false);
    }
  };

  // ✅ FILTER EQUIPMENT
  useEffect(() => {
    let filtered = equipments;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(equipment => 
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(equipment => equipment.category === categoryFilter);
    }
    
    // Condition filter
    if (conditionFilter !== "all") {
      filtered = filtered.filter(equipment => equipment.condition === conditionFilter);
    }
    
    setFilteredEquipments(filtered);
  }, [equipments, searchTerm, categoryFilter, conditionFilter]);

  // ✅ HANDLE FORM SUBMIT (ADD/EDIT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const equipmentData = {
        ...formData,
        weight: parseFloat(formData.weight) || null,
        stock_quantity: parseInt(formData.stock_quantity),
        price_per_day: parseFloat(formData.price_per_day)
      };

      let response;
      let url = 'http://localhost/PBL-KELANA-OUTDOOR/api/admin/equipment.php';
      
      if (editingEquipment) {
        // ✅ UPDATE EQUIPMENT
        response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            equipment_id: editingEquipment.equipment_id,
            ...equipmentData
          })
        });
      } else {
        // ✅ ADD NEW EQUIPMENT
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(equipmentData)
        });
      }

      const text = await response.text();
      console.log('📡 API Response:', text);
      
      const result = JSON.parse(text);

      if (response.ok && result.success) {
        alert(editingEquipment ? 'Equipment berhasil diupdate!' : 'Equipment berhasil ditambahkan!');
        
        // Refresh data from database
        await fetchEquipments();
        
        // Reset form
        resetForm();
      } else {
        throw new Error(result.message || 'Gagal menyimpan equipment');
      }

    } catch (err) {
      console.error('❌ Error saving equipment:', err);
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ HANDLE DELETE
  const handleDelete = async (equipmentId) => {
    if (!confirm('Yakin ingin menghapus equipment ini?')) return;

    try {
      setLoading(true);

      const response = await fetch(`http://localhost/PBL-KELANA-OUTDOOR/api/admin/equipment.php?id=${equipmentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const text = await response.text();
      const result = JSON.parse(text);

      if (response.ok && result.success) {
        alert('Equipment berhasil dihapus!');
        await fetchEquipments(); // Refresh data
      } else {
        throw new Error(result.message || 'Gagal menghapus equipment');
      }
    } catch (err) {
      console.error('❌ Error deleting equipment:', err);
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ HANDLE EDIT
  const handleEdit = (equipment) => {
    setFormData({
      name: equipment.name,
      code: equipment.code,
      description: equipment.description || '',
      category: equipment.category,
      size_capacity: equipment.size_capacity || '',
      dimensions: equipment.dimensions || '',
      weight: equipment.weight ? equipment.weight.toString() : '',
      material: equipment.material || '',
      stock_quantity: equipment.stock_quantity.toString(),
      price_per_day: equipment.price_per_day.toString(),
      condition: equipment.condition
    });
    setEditingEquipment(equipment);
    setShowAddModal(true);
  };

  // ✅ RESET FORM
  const resetForm = () => {
    setFormData({
      name: "", code: "", description: "", category: "tenda",
      size_capacity: "", dimensions: "", weight: "", material: "",
      stock_quantity: "", price_per_day: "", condition: "baik"
    });
    setShowAddModal(false);
    setEditingEquipment(null);
  };

  // ✅ UTILITY FUNCTIONS
  const getStockStatus = (equipment) => {
    const available = equipment.available_stock || equipment.stock_quantity;
    if (available === 0) return { status: 'out_of_stock', color: 'bg-red-500', text: 'Habis' };
    if (available <= 2) return { status: 'low_stock', color: 'bg-yellow-500', text: 'Stok Rendah' };
    return { status: 'available', color: 'bg-green-500', text: 'Tersedia' };
  };

  const getConditionColor = (condition) => {
    switch(condition) {
      case 'baik': return 'bg-green-500';
      case 'rusak_ringan': return 'bg-yellow-500';
      case 'perbaikan': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // ✅ CALCULATE STATS
  const stats = {
    total: equipments.length,
    available: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) > 0).length,
    lowStock: equipments.filter(eq => {
      const available = eq.available_stock || eq.stock_quantity;
      return available <= 2 && available > 0;
    }).length,
    outOfStock: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) === 0).length,
    totalValue: equipments.reduce((sum, eq) => sum + (eq.price_per_day * eq.stock_quantity), 0)
  };

  // ✅ LOADING STATE
  if (loading && equipments.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Memuat equipment dari database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ HEADER */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Kelola Equipment</h1>
                <p className="text-gray-600">Manajemen stok dan inventory equipment</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowAddModal(true)}
                className="bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Equipment
              </Button>
              <Button 
                variant="outline" 
                onClick={fetchEquipments}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* ✅ ERROR WARNING */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-red-800 font-medium">Database Connection Error</p>
                <p className="text-red-600 text-sm">{error}</p>
                <p className="text-red-600 text-sm">Menampilkan data mock untuk development.</p>
              </div>
            </div>
            <Button 
              onClick={fetchEquipments}
              size="sm"
              className="mt-2 bg-red-600 hover:bg-red-700"
            >
              Coba Lagi
            </Button>
          </div>
        )}

        {/* ✅ STATS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Equipment</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.available}</div>
              <div className="text-sm text-gray-600">Tersedia</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.lowStock}</div>
              <div className="text-sm text-gray-600">Stok Rendah</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
              <div className="text-sm text-gray-600">Habis</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-purple-600">
                Rp {stats.totalValue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Aset</div>
            </CardContent>
          </Card>
        </div>

        {/* ✅ FILTERS */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari nama, kode, atau kategori equipment..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">Semua Kategori</option>
                <option value="tenda">Tenda</option>
                <option value="tas">Tas Gunung</option>
                <option value="sleeping_bag">Sleeping Bag</option>
                <option value="kompor">Kompor</option>
                <option value="matras">Matras</option>
              </select>
              
              <select 
                value={conditionFilter}
                onChange={(e) => setConditionFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">Semua Kondisi</option>
                <option value="baik">Baik</option>
                <option value="rusak_ringan">Rusak Ringan</option>
                <option value="perbaikan">Perbaikan</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* ✅ LOADING OVERLAY */}
        {loading && equipments.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white p-6 rounded-lg text-center">
              <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
              <p className="text-gray-600">Menyimpan ke database...</p>
            </div>
          </div>
        )}

        {/* ✅ EQUIPMENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipments.map((equipment) => {
            const stockStatus = getStockStatus(equipment);
            const available = equipment.available_stock || equipment.stock_quantity;
            const reserved = equipment.reserved_stock || 0;
            const rented = equipment.rented_stock || 0;
            
            return (
              <Card key={equipment.equipment_id} className="overflow-hidden">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">
                        {equipment.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{equipment.code}</p>
                      <Badge variant="outline" className="text-xs">
                        {equipment.category}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge className={`${stockStatus.color} text-white text-xs`}>
                        {stockStatus.text}
                      </Badge>
                      <Badge className={`${getConditionColor(equipment.condition)} text-white text-xs`}>
                        {equipment.condition}
                      </Badge>
                    </div>
                  </div>

                  {/* Description */}
                  {equipment.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {equipment.description}
                    </p>
                  )}

                  {/* Specs */}
                  <div className="space-y-2 text-sm mb-4">
                    {equipment.size_capacity && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kapasitas:</span>
                        <span className="font-medium">{equipment.size_capacity}</span>
                      </div>
                    )}
                    {equipment.dimensions && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dimensi:</span>
                        <span className="font-medium text-xs">{equipment.dimensions}</span>
                      </div>
                    )}
                    {equipment.weight > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Berat:</span>
                        <span className="font-medium">{equipment.weight} kg</span>
                      </div>
                    )}
                    {equipment.material && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Material:</span>
                        <span className="font-medium text-xs">{equipment.material}</span>
                      </div>
                    )}
                  </div>

                  {/* Stock Info */}
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div>
                        <div className="font-semibold text-green-600">{available}</div>
                        <div className="text-xs text-gray-600">Tersedia</div>
                      </div>
                      <div>
                        <div className="font-semibold text-yellow-600">{reserved}</div>
                        <div className="text-xs text-gray-600">Reserved</div>
                      </div>
                      <div>
                        <div className="font-semibold text-blue-600">{rented}</div>
                        <div className="text-xs text-gray-600">Disewa</div>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Stok:</span>
                        <span className="font-semibold">{equipment.stock_quantity} unit</span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-green-600">
                      Rp {equipment.price_per_day.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">per hari</div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEdit(equipment)}
                      className="flex-1"
                      disabled={loading}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDelete(equipment.equipment_id)}
                      className="text-red-600 hover:text-red-700"
                      disabled={loading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ✅ EMPTY STATE */}
        {filteredEquipments.length === 0 && !loading && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Tidak ada equipment ditemukan</p>
            <Button 
              onClick={() => setShowAddModal(true)}
              className="mt-4 bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Equipment Pertama
            </Button>
          </div>
        )}
      </div>

      {/* ✅ ADD/EDIT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {editingEquipment ? 'Edit Equipment' : 'Tambah Equipment Baru'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nama Equipment *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Tenda Dome 4 Orang"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Kode Equipment *</label>
                    <Input
                      value={formData.code}
                      onChange={(e) => setFormData({...formData, code: e.target.value})}
                      placeholder="TENDA-001"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Deskripsi</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Deskripsi detail equipment..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Kategori *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    >
                      <option value="tenda">Tenda</option>
                      <option value="tas">Tas Gunung</option>
                      <option value="sleeping_bag">Sleeping Bag</option>
                      <option value="kompor">Kompor</option>
                      <option value="matras">Matras</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Kapasitas/Ukuran</label>
                    <Input
                      value={formData.size_capacity}
                      onChange={(e) => setFormData({...formData, size_capacity: e.target.value})}
                      placeholder="4-6 Orang / 60 Liter"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Kondisi *</label>
                    <select
                      value={formData.condition}
                      onChange={(e) => setFormData({...formData, condition: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    >
                      <option value="baik">Baik</option>
                      <option value="rusak_ringan">Rusak Ringan</option>
                      <option value="perbaikan">Perbaikan</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Dimensi</label>
                    <Input
                      value={formData.dimensions}
                      onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
                      placeholder="300x250x180 cm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Berat (kg)</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      placeholder="8.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Material</label>
                    <Input
                      value={formData.material}
                      onChange={(e) => setFormData({...formData, material: e.target.value})}
                      placeholder="Nylon 210T"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Jumlah Stok *</label>
                    <Input
                      type="number"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
                      placeholder="5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Harga per Hari (Rp) *</label>
                    <Input
                      type="number"
                      value={formData.price_per_day}
                      onChange={(e) => setFormData({...formData, price_per_day: e.target.value})}
                      placeholder="60000"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : null}
                    {editingEquipment ? 'Update Equipment' : 'Tambah Equipment'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={resetForm}
                    disabled={loading}
                  >
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EquipmentManagement;