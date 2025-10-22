// // // // // import { useState, useEffect } from "react";
// // // // // import { Link } from "react-router-dom";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // import { Badge } from "@/components/ui/badge";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Textarea } from "@/components/ui/textarea";
// // // // // import { 
// // // // //   ArrowLeft,
// // // // //   Search, 
// // // // //   Plus,
// // // // //   Edit,
// // // // //   Trash2,
// // // // //   Package,
// // // // //   AlertTriangle,
// // // // //   CheckCircle,
// // // // //   Eye,
// // // // //   RefreshCw,
// // // // //   Filter,
// // // // //   Download
// // // // // } from "lucide-react";

// // // // // const EquipmentManagement = () => {
// // // // //   const [equipments, setEquipments] = useState([]);
// // // // //   const [filteredEquipments, setFilteredEquipments] = useState([]);
// // // // //   const [searchTerm, setSearchTerm] = useState("");
// // // // //   const [categoryFilter, setCategoryFilter] = useState("all");
// // // // //   const [conditionFilter, setConditionFilter] = useState("all");
// // // // //   const [showAddModal, setShowAddModal] = useState(false);
// // // // //   const [editingEquipment, setEditingEquipment] = useState(null);

// // // // //   // Form state
// // // // //   const [formData, setFormData] = useState({
// // // // //     name: "",
// // // // //     code: "",
// // // // //     description: "",
// // // // //     category: "tenda",
// // // // //     size_capacity: "",
// // // // //     dimensions: "",
// // // // //     weight: "",
// // // // //     material: "",
// // // // //     stock_quantity: "",
// // // // //     price_per_day: "",
// // // // //     condition: "baik"
// // // // //   });

// // // // //   // Mock data sesuai ERD
// // // // //   useEffect(() => {
// // // // //     const mockEquipments = [
// // // // //       {
// // // // //         equipment_id: 1,
// // // // //         name: "Tenda Dome 4-6 Orang",
// // // // //         code: "TENDA-001",
// // // // //         description: "Tenda berkualitas tinggi untuk 4-6 orang dengan double layer waterproof",
// // // // //         category: "tenda",
// // // // //         size_capacity: "4-6 Orang",
// // // // //         dimensions: "300x250x180 cm",
// // // // //         weight: 8.5,
// // // // //         material: "Nylon 210T Waterproof",
// // // // //         stock_quantity: 5,
// // // // //         price_per_day: 60000,
// // // // //         condition: "baik",
// // // // //         available_stock: 3,
// // // // //         reserved_stock: 1,
// // // // //         rented_stock: 1,
// // // // //         created_at: "2024-01-15"
// // // // //       },
// // // // //       {
// // // // //         equipment_id: 2,
// // // // //         name: "Tas Gunung 60 Liter",
// // // // //         code: "TAS-001", 
// // // // //         description: "Tas gunung dengan frame internal dan rain cover",
// // // // //         category: "tas",
// // // // //         size_capacity: "60 Liter",
// // // // //         dimensions: "70x35x35 cm",
// // // // //         weight: 1.8,
// // // // //         material: "Ripstop Nylon 420D",
// // // // //         stock_quantity: 10,
// // // // //         price_per_day: 25000,
// // // // //         condition: "baik",
// // // // //         available_stock: 7,
// // // // //         reserved_stock: 2,
// // // // //         rented_stock: 1,
// // // // //         created_at: "2024-01-10"
// // // // //       },
// // // // //       {
// // // // //         equipment_id: 3,
// // // // //         name: "Sleeping Bag Four Season",
// // // // //         code: "SLEEP-001",
// // // // //         description: "Sleeping bag dengan rating suhu -5°C untuk gunung tinggi",
// // // // //         category: "sleeping_bag",
// // // // //         size_capacity: "Single -5°C",
// // // // //         dimensions: "220x80 cm",
// // // // //         weight: 2.1,
// // // // //         material: "Duck Down + Nylon",
// // // // //         stock_quantity: 8,
// // // // //         price_per_day: 20000,
// // // // //         condition: "baik",
// // // // //         available_stock: 5,
// // // // //         reserved_stock: 1,
// // // // //         rented_stock: 2,
// // // // //         created_at: "2024-01-12"
// // // // //       },
// // // // //       {
// // // // //         equipment_id: 4,
// // // // //         name: "Kompor Portable Gas",
// // // // //         code: "KOMPOR-001",
// // // // //         description: "Kompor portable dengan auto ignition dan wind shield",
// // // // //         category: "kompor",
// // // // //         size_capacity: "220g gas",
// // // // //         dimensions: "12x8x8 cm", 
// // // // //         weight: 0.4,
// // // // //         material: "Aluminium + Stainless Steel",
// // // // //         stock_quantity: 15,
// // // // //         price_per_day: 8000,
// // // // //         condition: "baik",
// // // // //         available_stock: 12,
// // // // //         reserved_stock: 2,
// // // // //         rented_stock: 1,
// // // // //         created_at: "2024-01-08"
// // // // //       },
// // // // //       {
// // // // //         equipment_id: 5,
// // // // //         name: "Matras Camping Standard",
// // // // //         code: "MATRAS-001",
// // // // //         description: "Matras self-inflating dengan R-value 4.2",
// // // // //         category: "matras",
// // // // //         size_capacity: "Single",
// // // // //         dimensions: "183x51x2.5 cm",
// // // // //         weight: 0.9,
// // // // //         material: "PVC Tahan Air + Foam",
// // // // //         stock_quantity: 20,
// // // // //         price_per_day: 10000,
// // // // //         condition: "baik", 
// // // // //         available_stock: 15,
// // // // //         reserved_stock: 3,
// // // // //         rented_stock: 2,
// // // // //         created_at: "2024-01-05"
// // // // //       },
// // // // //       {
// // // // //         equipment_id: 6,
// // // // //         name: "Tenda Ultralight 2 Orang",
// // // // //         code: "TENDA-002",
// // // // //         description: "Tenda ultralight untuk hiking dengan bobot minimal",
// // // // //         category: "tenda", 
// // // // //         size_capacity: "2 Orang",
// // // // //         dimensions: "210x130x110 cm",
// // // // //         weight: 1.2,
// // // // //         material: "Nylon 15D Silicone",
// // // // //         stock_quantity: 3,
// // // // //         price_per_day: 45000,
// // // // //         condition: "rusak_ringan",
// // // // //         available_stock: 1,
// // // // //         reserved_stock: 0,
// // // // //         rented_stock: 1,
// // // // //         created_at: "2024-01-20"
// // // // //       }
// // // // //     ];
    
// // // // //     setEquipments(mockEquipments);
// // // // //     setFilteredEquipments(mockEquipments);
// // // // //   }, []);

// // // // //   // Filter equipments
// // // // //   useEffect(() => {
// // // // //     let filtered = equipments;
    
// // // // //     // Search filter
// // // // //     if (searchTerm) {
// // // // //       filtered = filtered.filter(equipment => 
// // // // //         equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //         equipment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //         equipment.category.toLowerCase().includes(searchTerm.toLowerCase())
// // // // //       );
// // // // //     }
    
// // // // //     // Category filter
// // // // //     if (categoryFilter !== "all") {
// // // // //       filtered = filtered.filter(equipment => equipment.category === categoryFilter);
// // // // //     }
    
// // // // //     // Condition filter
// // // // //     if (conditionFilter !== "all") {
// // // // //       filtered = filtered.filter(equipment => equipment.condition === conditionFilter);
// // // // //     }
    
// // // // //     setFilteredEquipments(filtered);
// // // // //   }, [equipments, searchTerm, categoryFilter, conditionFilter]);

// // // // //   const getStockStatus = (equipment) => {
// // // // //     const { available_stock, stock_quantity } = equipment;
// // // // //     if (available_stock === 0) return { status: 'out_of_stock', color: 'bg-red-500', text: 'Habis' };
// // // // //     if (available_stock <= 2) return { status: 'low_stock', color: 'bg-yellow-500', text: 'Stok Rendah' };
// // // // //     return { status: 'available', color: 'bg-green-500', text: 'Tersedia' };
// // // // //   };

// // // // //   const getConditionColor = (condition) => {
// // // // //     switch(condition) {
// // // // //       case 'baik': return 'bg-green-500';
// // // // //       case 'rusak_ringan': return 'bg-yellow-500';
// // // // //       case 'perbaikan': return 'bg-red-500';
// // // // //       default: return 'bg-gray-500';
// // // // //     }
// // // // //   };

// // // // //   const handleSubmit = (e) => {
// // // // //     e.preventDefault();
    
// // // // //     if (editingEquipment) {
// // // // //       // Update equipment
// // // // //       setEquipments(prev => prev.map(eq => 
// // // // //         eq.equipment_id === editingEquipment.equipment_id 
// // // // //           ? { ...eq, ...formData, equipment_id: editingEquipment.equipment_id }
// // // // //           : eq
// // // // //       ));
// // // // //       alert('Equipment berhasil diupdate!');
// // // // //     } else {
// // // // //       // Add new equipment
// // // // //       const newEquipment = {
// // // // //         ...formData,
// // // // //         equipment_id: Date.now(),
// // // // //         available_stock: parseInt(formData.stock_quantity),
// // // // //         reserved_stock: 0,
// // // // //         rented_stock: 0,
// // // // //         created_at: new Date().toISOString().split('T')[0]
// // // // //       };
// // // // //       setEquipments(prev => [...prev, newEquipment]);
// // // // //       alert('Equipment berhasil ditambahkan!');
// // // // //     }
    
// // // // //     // Reset form
// // // // //     setFormData({
// // // // //       name: "", code: "", description: "", category: "tenda",
// // // // //       size_capacity: "", dimensions: "", weight: "", material: "",
// // // // //       stock_quantity: "", price_per_day: "", condition: "baik"
// // // // //     });
// // // // //     setShowAddModal(false);
// // // // //     setEditingEquipment(null);
// // // // //   };

// // // // //   const handleEdit = (equipment) => {
// // // // //     setFormData({
// // // // //       name: equipment.name,
// // // // //       code: equipment.code,
// // // // //       description: equipment.description,
// // // // //       category: equipment.category,
// // // // //       size_capacity: equipment.size_capacity,
// // // // //       dimensions: equipment.dimensions,
// // // // //       weight: equipment.weight.toString(),
// // // // //       material: equipment.material,
// // // // //       stock_quantity: equipment.stock_quantity.toString(),
// // // // //       price_per_day: equipment.price_per_day.toString(),
// // // // //       condition: equipment.condition
// // // // //     });
// // // // //     setEditingEquipment(equipment);
// // // // //     setShowAddModal(true);
// // // // //   };

// // // // //   const handleDelete = (equipmentId) => {
// // // // //     if (confirm('Yakin ingin menghapus equipment ini?')) {
// // // // //       setEquipments(prev => prev.filter(eq => eq.equipment_id !== equipmentId));
// // // // //       alert('Equipment berhasil dihapus!');
// // // // //     }
// // // // //   };

// // // // //   const stats = {
// // // // //     total: equipments.length,
// // // // //     available: equipments.filter(eq => eq.available_stock > 0).length,
// // // // //     lowStock: equipments.filter(eq => eq.available_stock <= 2 && eq.available_stock > 0).length,
// // // // //     outOfStock: equipments.filter(eq => eq.available_stock === 0).length,
// // // // //     totalValue: equipments.reduce((sum, eq) => sum + (eq.price_per_day * eq.stock_quantity), 0)
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50">
// // // // //       {/* ✅ HEADER */}
// // // // //       <div className="bg-white shadow-sm border-b">
// // // // //         <div className="px-6 py-4">
// // // // //           <div className="flex items-center justify-between">
// // // // //             <div className="flex items-center gap-4">
// // // // //               <Link to="/admin/dashboard">
// // // // //                 <Button variant="outline" size="sm">
// // // // //                   <ArrowLeft className="h-4 w-4 mr-2" />
// // // // //                   Dashboard
// // // // //                 </Button>
// // // // //               </Link>
// // // // //               <div>
// // // // //                 <h1 className="text-2xl font-bold text-gray-900">Kelola Equipment</h1>
// // // // //                 <p className="text-gray-600">Manajemen stok dan inventory equipment</p>
// // // // //               </div>
// // // // //             </div>
            
// // // // //             <div className="flex gap-2">
// // // // //               <Button 
// // // // //                 onClick={() => setShowAddModal(true)}
// // // // //                 className="bg-green-600 hover:bg-green-700"
// // // // //               >
// // // // //                 <Plus className="h-4 w-4 mr-2" />
// // // // //                 Tambah Equipment
// // // // //               </Button>
// // // // //               <Button variant="outline">
// // // // //                 <RefreshCw className="h-4 w-4 mr-2" />
// // // // //                 Refresh
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="p-6">
// // // // //         {/* ✅ STATS CARDS */}
// // // // //         <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
// // // // //           <Card>
// // // // //             <CardContent className="p-4 text-center">
// // // // //               <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
// // // // //               <div className="text-sm text-gray-600">Total Equipment</div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //           <Card>
// // // // //             <CardContent className="p-4 text-center">
// // // // //               <div className="text-2xl font-bold text-green-600">{stats.available}</div>
// // // // //               <div className="text-sm text-gray-600">Tersedia</div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //           <Card>
// // // // //             <CardContent className="p-4 text-center">
// // // // //               <div className="text-2xl font-bold text-yellow-600">{stats.lowStock}</div>
// // // // //               <div className="text-sm text-gray-600">Stok Rendah</div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //           <Card>
// // // // //             <CardContent className="p-4 text-center">
// // // // //               <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
// // // // //               <div className="text-sm text-gray-600">Habis</div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //           <Card>
// // // // //             <CardContent className="p-4 text-center">
// // // // //               <div className="text-lg font-bold text-purple-600">
// // // // //                 Rp {stats.totalValue.toLocaleString()}
// // // // //               </div>
// // // // //               <div className="text-sm text-gray-600">Total Aset</div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         </div>

// // // // //         {/* ✅ FILTERS */}
// // // // //         <Card className="mb-6">
// // // // //           <CardContent className="p-4">
// // // // //             <div className="flex flex-col lg:flex-row gap-4">
// // // // //               <div className="flex-1">
// // // // //                 <div className="relative">
// // // // //                   <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// // // // //                   <Input
// // // // //                     placeholder="Cari nama, kode, atau kategori equipment..."
// // // // //                     value={searchTerm}
// // // // //                     onChange={(e) => setSearchTerm(e.target.value)}
// // // // //                     className="pl-10"
// // // // //                   />
// // // // //                 </div>
// // // // //               </div>
              
// // // // //               <select 
// // // // //                 value={categoryFilter}
// // // // //                 onChange={(e) => setCategoryFilter(e.target.value)}
// // // // //                 className="px-3 py-2 border rounded-md"
// // // // //               >
// // // // //                 <option value="all">Semua Kategori</option>
// // // // //                 <option value="tenda">Tenda</option>
// // // // //                 <option value="tas">Tas Gunung</option>
// // // // //                 <option value="sleeping_bag">Sleeping Bag</option>
// // // // //                 <option value="kompor">Kompor</option>
// // // // //                 <option value="matras">Matras</option>
// // // // //               </select>
              
// // // // //               <select 
// // // // //                 value={conditionFilter}
// // // // //                 onChange={(e) => setConditionFilter(e.target.value)}
// // // // //                 className="px-3 py-2 border rounded-md"
// // // // //               >
// // // // //                 <option value="all">Semua Kondisi</option>
// // // // //                 <option value="baik">Baik</option>
// // // // //                 <option value="rusak_ringan">Rusak Ringan</option>
// // // // //                 <option value="perbaikan">Perbaikan</option>
// // // // //               </select>
// // // // //             </div>
// // // // //           </CardContent>
// // // // //         </Card>

// // // // //         {/* ✅ EQUIPMENT GRID */}
// // // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //           {filteredEquipments.map((equipment) => {
// // // // //             const stockStatus = getStockStatus(equipment);
// // // // //             return (
// // // // //               <Card key={equipment.equipment_id} className="overflow-hidden">
// // // // //                 <CardContent className="p-6">
// // // // //                   {/* Header */}
// // // // //                   <div className="flex justify-between items-start mb-4">
// // // // //                     <div className="flex-1">
// // // // //                       <h3 className="font-semibold text-lg text-gray-900 mb-1">
// // // // //                         {equipment.name}
// // // // //                       </h3>
// // // // //                       <p className="text-sm text-gray-600 mb-2">{equipment.code}</p>
// // // // //                       <Badge variant="outline" className="text-xs">
// // // // //                         {equipment.category}
// // // // //                       </Badge>
// // // // //                     </div>
// // // // //                     <div className="flex gap-1">
// // // // //                       <Badge className={`${stockStatus.color} text-white text-xs`}>
// // // // //                         {stockStatus.text}
// // // // //                       </Badge>
// // // // //                       <Badge className={`${getConditionColor(equipment.condition)} text-white text-xs`}>
// // // // //                         {equipment.condition}
// // // // //                       </Badge>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   {/* Specs */}
// // // // //                   <div className="space-y-2 text-sm mb-4">
// // // // //                     <div className="flex justify-between">
// // // // //                       <span className="text-gray-600">Kapasitas:</span>
// // // // //                       <span className="font-medium">{equipment.size_capacity}</span>
// // // // //                     </div>
// // // // //                     <div className="flex justify-between">
// // // // //                       <span className="text-gray-600">Dimensi:</span>
// // // // //                       <span className="font-medium text-xs">{equipment.dimensions}</span>
// // // // //                     </div>
// // // // //                     <div className="flex justify-between">
// // // // //                       <span className="text-gray-600">Berat:</span>
// // // // //                       <span className="font-medium">{equipment.weight} kg</span>
// // // // //                     </div>
// // // // //                     <div className="flex justify-between">
// // // // //                       <span className="text-gray-600">Material:</span>
// // // // //                       <span className="font-medium text-xs">{equipment.material}</span>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   {/* Stock Info */}
// // // // //                   <div className="bg-gray-50 p-3 rounded-lg mb-4">
// // // // //                     <div className="grid grid-cols-3 gap-2 text-center text-sm">
// // // // //                       <div>
// // // // //                         <div className="font-semibold text-green-600">{equipment.available_stock}</div>
// // // // //                         <div className="text-xs text-gray-600">Tersedia</div>
// // // // //                       </div>
// // // // //                       <div>
// // // // //                         <div className="font-semibold text-yellow-600">{equipment.reserved_stock}</div>
// // // // //                         <div className="text-xs text-gray-600">Reserved</div>
// // // // //                       </div>
// // // // //                       <div>
// // // // //                         <div className="font-semibold text-blue-600">{equipment.rented_stock}</div>
// // // // //                         <div className="text-xs text-gray-600">Disewa</div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div className="mt-2 pt-2 border-t border-gray-200">
// // // // //                       <div className="flex justify-between text-sm">
// // // // //                         <span className="text-gray-600">Total Stok:</span>
// // // // //                         <span className="font-semibold">{equipment.stock_quantity} unit</span>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   {/* Price */}
// // // // //                   <div className="mb-4">
// // // // //                     <div className="text-2xl font-bold text-green-600">
// // // // //                       Rp {equipment.price_per_day.toLocaleString()}
// // // // //                     </div>
// // // // //                     <div className="text-sm text-gray-600">per hari</div>
// // // // //                   </div>

// // // // //                   {/* Actions */}
// // // // //                   <div className="flex gap-2">
// // // // //                     <Button 
// // // // //                       size="sm" 
// // // // //                       variant="outline"
// // // // //                       onClick={() => handleEdit(equipment)}
// // // // //                       className="flex-1"
// // // // //                     >
// // // // //                       <Edit className="h-4 w-4 mr-1" />
// // // // //                       Edit
// // // // //                     </Button>
// // // // //                     <Button 
// // // // //                       size="sm" 
// // // // //                       variant="outline"
// // // // //                       onClick={() => handleDelete(equipment.equipment_id)}
// // // // //                       className="text-red-600 hover:text-red-700"
// // // // //                     >
// // // // //                       <Trash2 className="h-4 w-4" />
// // // // //                     </Button>
// // // // //                   </div>
// // // // //                 </CardContent>
// // // // //               </Card>
// // // // //             );
// // // // //           })}
// // // // //         </div>

// // // // //         {filteredEquipments.length === 0 && (
// // // // //           <div className="text-center py-12">
// // // // //             <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
// // // // //             <p className="text-gray-500 text-lg">Tidak ada equipment ditemukan</p>
// // // // //             <Button 
// // // // //               onClick={() => setShowAddModal(true)}
// // // // //               className="mt-4 bg-green-600 hover:bg-green-700"
// // // // //             >
// // // // //               <Plus className="h-4 w-4 mr-2" />
// // // // //               Tambah Equipment Pertama
// // // // //             </Button>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>

// // // // //       {/* ✅ ADD/EDIT MODAL */}
// // // // //       {showAddModal && (
// // // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// // // // //           <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
// // // // //             <CardHeader>
// // // // //               <CardTitle>
// // // // //                 {editingEquipment ? 'Edit Equipment' : 'Tambah Equipment Baru'}
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <form onSubmit={handleSubmit} className="space-y-4">
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                   <div>
// // // // //                     <label className="block text-sm font-medium mb-2">Nama Equipment</label>
// // // // //                     <Input
// // // // //                       value={formData.name}
// // // // //                       onChange={(e) => setFormData({...formData, name: e.target.value})}
// // // // //                       placeholder="Tenda Dome 4 Orang"
// // // // //                       required
// // // // //                     />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <label className="block text-sm font-medium mb-2">Kode Equipment</label>
// // // // //                     <Input
// // // // //                       value={formData.code}
// // // // //                       onChange={(e) => setFormData({...formData, code: e.target.value})}
// // // // //                       placeholder="TENDA-001"
// // // // //                       required
// // // // //                     />
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div>
// // // // //                   <label className="block text-sm font-medium mb-2">Deskripsi</label>
// // // // //                   <Textarea
// // // // //                     value={formData.description}
// // // // //                     onChange={(e) => setFormData({...formData, description: e.target.value})}
// // // // //                     placeholder="Deskripsi detail equipment..."
// // // // //                     rows={3}
// // // // //                   />
// // // // //                 </div>

// // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // //                   <div>
// // // // //                     <label className="block text-sm font-medium mb-2">Kategori</label>
// // // // //                     <select
// // // // //                       value={formData.category}
// // // // //                       onChange={(e) => setFormData({...formData, category: e.target.value})}
// // // // //                       className="w-full px-3 py-2 border rounded-md"
// // // // //                       required
// // // // //                     >
// // // // //                       <option value="tenda">Tenda</option>
// // // // //                       <option value="tas">Tas Gunung</option>
// // // // //                       <option value="sleeping_bag">Sleeping Bag</option>
// // // // //                       <option value="kompor">Kompor</option>
// // // // //                       <option value="matras">Matras</option>
// // // // //                     </select>
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <label className="block text-sm font-medium mb-2">Kapasitas/Ukuran</label>
// // // // //                     <Input
// // // // //                       value={formData.size_capacity}
// // // // //                       onChange={(e) => setFormData({...formData, size_capacity: e.target.value})}
// // // // //                       placeholder="4-6 Orang / 60 Liter"
// // // // //                       required
// // // // //                     />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <label className="block text-sm font-medium mb-2">Kondisi</label>
// // // // //                     <select
// // // // //                       value={formData.condition}
// // // // //                       onChange={(e) => setFormData({...formData, condition: e.target.value})}
// // // // //                       className="w-full px-3 py-2 border rounded-md"
// // // // //                       required
// // // // //                     >
// // // // //                       <option value="baik">Baik</option>
// // // // //                       <option value="rusak_ringan">Rusak Ringan</option>
// // // // //                       <option value="perbaikan">Perbaikan</option>
// // // // //                     </select>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // //                   <div>
// // // // //                     <label className="block text-sm font-medium mb-2">Dimensi</label>
// // // // //                     <Input
// // // // //                       value={formData.dimensions}
// // // // //                       onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
// // // // //                       placeholder="300x250x180 cm"
// // // // //                     />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <label className="block text-sm font-medium mb-2">Berat (kg)</label>
// // // // //                     <Input
// // // // //                       type="number"
// // // // //                       step="0.1"
// // // // //                       value={formData.weight}
// // // // //                       onChange={(e) => setFormData({...formData, weight: e.target.value})}
// // // // //                       placeholder="8.5"
// // // // //                     />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <label className="block text-sm font-medium mb-2">Material</label>
// // // // //                     <Input
// // // // //                       value={formData.material}
// // // // //                       onChange={(e) => setFormData({...formData, material: e.target.value})}
// // // // //                       placeholder="Nylon 210T"
// // // // //                     />
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                   <div>
// // // // //                     <label className="block text-sm font-medium mb-2">Jumlah Stok</label>
// // // // //                     <Input
// // // // //                       type="number"
// // // // //                       value={formData.stock_quantity}
// // // // //                       onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
// // // // //                       placeholder="5"
// // // // //                       required
// // // // //                     />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <label className="block text-sm font-medium mb-2">Harga per Hari (Rp)</label>
// // // // //                     <Input
// // // // //                       type="number"
// // // // //                       value={formData.price_per_day}
// // // // //                       onChange={(e) => setFormData({...formData, price_per_day: e.target.value})}
// // // // //                       placeholder="60000"
// // // // //                       required
// // // // //                     />
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="flex gap-2 pt-4">
// // // // //                   <Button type="submit" className="bg-green-600 hover:bg-green-700">
// // // // //                     {editingEquipment ? 'Update Equipment' : 'Tambah Equipment'}
// // // // //                   </Button>
// // // // //                   <Button 
// // // // //                     type="button" 
// // // // //                     variant="outline"
// // // // //                     onClick={() => {
// // // // //                       setShowAddModal(false);
// // // // //                       setEditingEquipment(null);
// // // // //                       setFormData({
// // // // //                         name: "", code: "", description: "", category: "tenda",
// // // // //                         size_capacity: "", dimensions: "", weight: "", material: "",
// // // // //                         stock_quantity: "", price_per_day: "", condition: "baik"
// // // // //                       });
// // // // //                     }}
// // // // //                   >
// // // // //                     Batal
// // // // //                   </Button>
// // // // //                 </div>
// // // // //               </form>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default EquipmentManagement;



// // // // import { useState, useEffect } from "react";
// // // // import { Link } from "react-router-dom";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // import { Badge } from "@/components/ui/badge";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Textarea } from "@/components/ui/textarea";
// // // // import { 
// // // //   ArrowLeft,
// // // //   Search, 
// // // //   Plus,
// // // //   Edit,
// // // //   Trash2,
// // // //   Package,
// // // //   AlertTriangle,
// // // //   CheckCircle,
// // // //   Eye,
// // // //   RefreshCw,
// // // //   Filter,
// // // //   Download,
// // // //   Loader2
// // // // } from "lucide-react";

// // // // const EquipmentManagement = () => {
// // // //   const [equipments, setEquipments] = useState([]);
// // // //   const [filteredEquipments, setFilteredEquipments] = useState([]);
// // // //   const [searchTerm, setSearchTerm] = useState("");
// // // //   const [categoryFilter, setCategoryFilter] = useState("all");
// // // //   const [conditionFilter, setConditionFilter] = useState("all");
// // // //   const [showAddModal, setShowAddModal] = useState(false);
// // // //   const [editingEquipment, setEditingEquipment] = useState(null);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState(null);

// // // //   // Form state
// // // //   const [formData, setFormData] = useState({
// // // //     name: "",
// // // //     code: "",
// // // //     description: "",
// // // //     category: "tenda",
// // // //     size_capacity: "",
// // // //     dimensions: "",
// // // //     weight: "",
// // // //     material: "",
// // // //     stock_quantity: "",
// // // //     price_per_day: "",
// // // //     condition: "baik"
// // // //   });

// // // //   // ✅ FETCH FROM DATABASE API
// // // //   useEffect(() => {
// // // //     fetchEquipments();
// // // //   }, []);

// // // //   const fetchEquipments = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       setError(null);
      
// // // //       console.log('🔍 Fetching equipment from API...');
      
// // // //       const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php', {
// // // //         method: 'GET',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         }
// // // //       });
      
// // // //       if (!response.ok) {
// // // //         throw new Error(`HTTP error! status: ${response.status}`);
// // // //       }
      
// // // //       const text = await response.text();
// // // //       console.log('📄 Raw API response:', text.substring(0, 200));
      
// // // //       const data = JSON.parse(text);
// // // //       console.log('✅ Parsed equipment data:', data);
      
// // // //       if (data.error) {
// // // //         throw new Error(data.message || 'API returned error');
// // // //       }
      
// // // //       if (Array.isArray(data)) {
// // // //         setEquipments(data);
// // // //         setFilteredEquipments(data);
// // // //         console.log('✅ Equipment loaded:', data.length, 'items');
// // // //       } else {
// // // //         console.log('⚠️ No equipment data found');
// // // //         setEquipments([]);
// // // //         setFilteredEquipments([]);
// // // //       }
      
// // // //     } catch (err) {
// // // //       console.error('❌ Error fetching equipment:', err);
// // // //       setError('Gagal memuat equipment: ' + err.message);
      
// // // //       // ✅ FALLBACK TO MOCK DATA FOR DEVELOPMENT
// // // //       const mockEquipments = [
// // // //         {
// // // //           equipment_id: 1,
// // // //           name: "Tenda Dome 4-6 Orang (MOCK)",
// // // //           code: "TENDA-001",
// // // //           description: "Tenda berkualitas tinggi untuk 4-6 orang dengan double layer waterproof",
// // // //           category: "tenda",
// // // //           size_capacity: "4-6 Orang",
// // // //           dimensions: "300x250x180 cm",
// // // //           weight: 8.5,
// // // //           material: "Nylon 210T Waterproof",
// // // //           stock_quantity: 5,
// // // //           price_per_day: 60000,
// // // //           condition: "baik",
// // // //           available_stock: 3,
// // // //           reserved_stock: 1,
// // // //           rented_stock: 1,
// // // //           created_at: "2024-01-15"
// // // //         },
// // // //         {
// // // //           equipment_id: 2,
// // // //           name: "Tas Gunung 60 Liter (MOCK)",
// // // //           code: "TAS-001", 
// // // //           description: "Tas gunung dengan frame internal dan rain cover",
// // // //           category: "tas",
// // // //           size_capacity: "60 Liter",
// // // //           dimensions: "70x35x35 cm",
// // // //           weight: 1.8,
// // // //           material: "Ripstop Nylon 420D",
// // // //           stock_quantity: 10,
// // // //           price_per_day: 25000,
// // // //           condition: "baik",
// // // //           available_stock: 7,
// // // //           reserved_stock: 2,
// // // //           rented_stock: 1,
// // // //           created_at: "2024-01-10"
// // // //         }
// // // //       ];
      
// // // //       setEquipments(mockEquipments);
// // // //       setFilteredEquipments(mockEquipments);
      
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // ✅ FILTER EQUIPMENT
// // // //   useEffect(() => {
// // // //     let filtered = equipments;
    
// // // //     // Search filter
// // // //     if (searchTerm) {
// // // //       filtered = filtered.filter(equipment => 
// // // //         equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //         equipment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //         equipment.category.toLowerCase().includes(searchTerm.toLowerCase())
// // // //       );
// // // //     }
    
// // // //     // Category filter
// // // //     if (categoryFilter !== "all") {
// // // //       filtered = filtered.filter(equipment => equipment.category === categoryFilter);
// // // //     }
    
// // // //     // Condition filter
// // // //     if (conditionFilter !== "all") {
// // // //       filtered = filtered.filter(equipment => equipment.condition === conditionFilter);
// // // //     }
    
// // // //     setFilteredEquipments(filtered);
// // // //   }, [equipments, searchTerm, categoryFilter, conditionFilter]);

// // // //   // ✅ HANDLE FORM SUBMIT (ADD/EDIT)
// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);

// // // //     try {
// // // //       const equipmentData = {
// // // //         ...formData,
// // // //         weight: parseFloat(formData.weight) || null,
// // // //         stock_quantity: parseInt(formData.stock_quantity),
// // // //         price_per_day: parseFloat(formData.price_per_day)
// // // //       };

// // // //       let response;
// // // //       let url = 'http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php';
      
// // // //       if (editingEquipment) {
// // // //         // ✅ UPDATE EQUIPMENT
// // // //         response = await fetch(url, {
// // // //           method: 'PUT',
// // // //           headers: {
// // // //             'Content-Type': 'application/json',
// // // //           },
// // // //           body: JSON.stringify({
// // // //             equipment_id: editingEquipment.equipment_id,
// // // //             ...equipmentData
// // // //           })
// // // //         });
// // // //       } else {
// // // //         // ✅ ADD NEW EQUIPMENT
// // // //         response = await fetch(url, {
// // // //           method: 'POST',
// // // //           headers: {
// // // //             'Content-Type': 'application/json',
// // // //           },
// // // //           body: JSON.stringify(equipmentData)
// // // //         });
// // // //       }

// // // //       const text = await response.text();
// // // //       console.log('📡 API Response:', text);
      
// // // //       const result = JSON.parse(text);

// // // //       if (response.ok && result.success) {
// // // //         alert(editingEquipment ? 'Equipment berhasil diupdate!' : 'Equipment berhasil ditambahkan!');
        
// // // //         // Refresh data from database
// // // //         await fetchEquipments();
        
// // // //         // Reset form
// // // //         resetForm();
// // // //       } else {
// // // //         throw new Error(result.message || 'Gagal menyimpan equipment');
// // // //       }

// // // //     } catch (err) {
// // // //       console.error('❌ Error saving equipment:', err);
// // // //       alert('Error: ' + err.message);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // ✅ HANDLE DELETE
// // // //   const handleDelete = async (equipmentId) => {
// // // //     if (!confirm('Yakin ingin menghapus equipment ini?')) return;

// // // //     try {
// // // //       setLoading(true);
      
// // // //       const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?id=${equipmentId}`, {
// // // //         method: 'DELETE',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         }
// // // //       });

// // // //       const text = await response.text();
// // // //       const result = JSON.parse(text);

// // // //       if (response.ok && result.success) {
// // // //         alert('Equipment berhasil dihapus!');
// // // //         await fetchEquipments(); // Refresh data
// // // //       } else {
// // // //         throw new Error(result.message || 'Gagal menghapus equipment');
// // // //       }
// // // //     } catch (err) {
// // // //       console.error('❌ Error deleting equipment:', err);
// // // //       alert('Error: ' + err.message);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // ✅ HANDLE EDIT
// // // //   const handleEdit = (equipment) => {
// // // //     setFormData({
// // // //       name: equipment.name,
// // // //       code: equipment.code,
// // // //       description: equipment.description || '',
// // // //       category: equipment.category,
// // // //       size_capacity: equipment.size_capacity || '',
// // // //       dimensions: equipment.dimensions || '',
// // // //       weight: equipment.weight ? equipment.weight.toString() : '',
// // // //       material: equipment.material || '',
// // // //       stock_quantity: equipment.stock_quantity.toString(),
// // // //       price_per_day: equipment.price_per_day.toString(),
// // // //       condition: equipment.condition
// // // //     });
// // // //     setEditingEquipment(equipment);
// // // //     setShowAddModal(true);
// // // //   };

// // // //   // ✅ RESET FORM
// // // //   const resetForm = () => {
// // // //     setFormData({
// // // //       name: "", code: "", description: "", category: "tenda",
// // // //       size_capacity: "", dimensions: "", weight: "", material: "",
// // // //       stock_quantity: "", price_per_day: "", condition: "baik"
// // // //     });
// // // //     setShowAddModal(false);
// // // //     setEditingEquipment(null);
// // // //   };

// // // //   // ✅ UTILITY FUNCTIONS
// // // //   const getStockStatus = (equipment) => {
// // // //     const available = equipment.available_stock || equipment.stock_quantity;
// // // //     if (available === 0) return { status: 'out_of_stock', color: 'bg-red-500', text: 'Habis' };
// // // //     if (available <= 2) return { status: 'low_stock', color: 'bg-yellow-500', text: 'Stok Rendah' };
// // // //     return { status: 'available', color: 'bg-green-500', text: 'Tersedia' };
// // // //   };

// // // //   const getConditionColor = (condition) => {
// // // //     switch(condition) {
// // // //       case 'baik': return 'bg-green-500';
// // // //       case 'rusak_ringan': return 'bg-yellow-500';
// // // //       case 'perbaikan': return 'bg-red-500';
// // // //       default: return 'bg-gray-500';
// // // //     }
// // // //   };

// // // //   // ✅ CALCULATE STATS
// // // //   const stats = {
// // // //     total: equipments.length,
// // // //     available: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) > 0).length,
// // // //     lowStock: equipments.filter(eq => {
// // // //       const available = eq.available_stock || eq.stock_quantity;
// // // //       return available <= 2 && available > 0;
// // // //     }).length,
// // // //     outOfStock: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) === 0).length,
// // // //     totalValue: equipments.reduce((sum, eq) => sum + (eq.price_per_day * eq.stock_quantity), 0)
// // // //   };

// // // //   // ✅ LOADING STATE
// // // //   if (loading && equipments.length === 0) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
// // // //           <p className="text-gray-600">Memuat equipment dari database...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50">
// // // //       {/* ✅ HEADER */}
// // // //       <div className="bg-white shadow-sm border-b">
// // // //         <div className="px-6 py-4">
// // // //           <div className="flex items-center justify-between">
// // // //             <div className="flex items-center gap-4">
// // // //               <Link to="/admin/dashboard">
// // // //                 <Button variant="outline" size="sm">
// // // //                   <ArrowLeft className="h-4 w-4 mr-2" />
// // // //                   Dashboard
// // // //                 </Button>
// // // //               </Link>
// // // //               <div>
// // // //                 <h1 className="text-2xl font-bold text-gray-900">Kelola Equipment</h1>
// // // //                 <p className="text-gray-600">Manajemen stok dan inventory equipment</p>
// // // //               </div>
// // // //             </div>
            
// // // //             <div className="flex gap-2">
// // // //               <Button 
// // // //                 onClick={() => setShowAddModal(true)}
// // // //                 className="bg-green-600 hover:bg-green-700"
// // // //                 disabled={loading}
// // // //               >
// // // //                 <Plus className="h-4 w-4 mr-2" />
// // // //                 Tambah Equipment
// // // //               </Button>
// // // //               <Button 
// // // //                 variant="outline" 
// // // //                 onClick={fetchEquipments}
// // // //                 disabled={loading}
// // // //               >
// // // //                 {loading ? (
// // // //                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
// // // //                 ) : (
// // // //                   <RefreshCw className="h-4 w-4 mr-2" />
// // // //                 )}
// // // //                 Refresh
// // // //               </Button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="p-6">
// // // //         {/* ✅ ERROR WARNING */}
// // // //         {error && (
// // // //           <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
// // // //             <div className="flex items-center gap-2">
// // // //               <AlertTriangle className="h-5 w-5 text-red-600" />
// // // //               <div>
// // // //                 <p className="text-red-800 font-medium">Database Connection Error</p>
// // // //                 <p className="text-red-600 text-sm">{error}</p>
// // // //                 <p className="text-red-600 text-sm">Menampilkan data mock untuk development.</p>
// // // //               </div>
// // // //             </div>
// // // //             <Button 
// // // //               onClick={fetchEquipments}
// // // //               size="sm"
// // // //               className="mt-2 bg-red-600 hover:bg-red-700"
// // // //             >
// // // //               Coba Lagi
// // // //             </Button>
// // // //           </div>
// // // //         )}

// // // //         {/* ✅ STATS CARDS */}
// // // //         <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
// // // //           <Card>
// // // //             <CardContent className="p-4 text-center">
// // // //               <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
// // // //               <div className="text-sm text-gray-600">Total Equipment</div>
// // // //             </CardContent>
// // // //           </Card>
// // // //           <Card>
// // // //             <CardContent className="p-4 text-center">
// // // //               <div className="text-2xl font-bold text-green-600">{stats.available}</div>
// // // //               <div className="text-sm text-gray-600">Tersedia</div>
// // // //             </CardContent>
// // // //           </Card>
// // // //           <Card>
// // // //             <CardContent className="p-4 text-center">
// // // //               <div className="text-2xl font-bold text-yellow-600">{stats.lowStock}</div>
// // // //               <div className="text-sm text-gray-600">Stok Rendah</div>
// // // //             </CardContent>
// // // //           </Card>
// // // //           <Card>
// // // //             <CardContent className="p-4 text-center">
// // // //               <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
// // // //               <div className="text-sm text-gray-600">Habis</div>
// // // //             </CardContent>
// // // //           </Card>
// // // //           <Card>
// // // //             <CardContent className="p-4 text-center">
// // // //               <div className="text-lg font-bold text-purple-600">
// // // //                 Rp {stats.totalValue.toLocaleString()}
// // // //               </div>
// // // //               <div className="text-sm text-gray-600">Total Aset</div>
// // // //             </CardContent>
// // // //           </Card>
// // // //         </div>

// // // //         {/* ✅ FILTERS */}
// // // //         <Card className="mb-6">
// // // //           <CardContent className="p-4">
// // // //             <div className="flex flex-col lg:flex-row gap-4">
// // // //               <div className="flex-1">
// // // //                 <div className="relative">
// // // //                   <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// // // //                   <Input
// // // //                     placeholder="Cari nama, kode, atau kategori equipment..."
// // // //                     value={searchTerm}
// // // //                     onChange={(e) => setSearchTerm(e.target.value)}
// // // //                     className="pl-10"
// // // //                   />
// // // //                 </div>
// // // //               </div>
              
// // // //               <select 
// // // //                 value={categoryFilter}
// // // //                 onChange={(e) => setCategoryFilter(e.target.value)}
// // // //                 className="px-3 py-2 border rounded-md"
// // // //               >
// // // //                 <option value="all">Semua Kategori</option>
// // // //                 <option value="tenda">Tenda</option>
// // // //                 <option value="tas">Tas Gunung</option>
// // // //                 <option value="sleeping_bag">Sleeping Bag</option>
// // // //                 <option value="kompor">Kompor</option>
// // // //                 <option value="matras">Matras</option>
// // // //               </select>
              
// // // //               <select 
// // // //                 value={conditionFilter}
// // // //                 onChange={(e) => setConditionFilter(e.target.value)}
// // // //                 className="px-3 py-2 border rounded-md"
// // // //               >
// // // //                 <option value="all">Semua Kondisi</option>
// // // //                 <option value="baik">Baik</option>
// // // //                 <option value="rusak_ringan">Rusak Ringan</option>
// // // //                 <option value="perbaikan">Perbaikan</option>
// // // //               </select>
// // // //             </div>
// // // //           </CardContent>
// // // //         </Card>

// // // //         {/* ✅ LOADING OVERLAY */}
// // // //         {loading && equipments.length > 0 && (
// // // //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
// // // //             <div className="bg-white p-6 rounded-lg text-center">
// // // //               <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
// // // //               <p className="text-gray-600">Menyimpan ke database...</p>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* ✅ EQUIPMENT GRID */}
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //           {filteredEquipments.map((equipment) => {
// // // //             const stockStatus = getStockStatus(equipment);
// // // //             const available = equipment.available_stock || equipment.stock_quantity;
// // // //             const reserved = equipment.reserved_stock || 0;
// // // //             const rented = equipment.rented_stock || 0;
            
// // // //             return (
// // // //               <Card key={equipment.equipment_id} className="overflow-hidden">
// // // //                 <CardContent className="p-6">
// // // //                   {/* Header */}
// // // //                   <div className="flex justify-between items-start mb-4">
// // // //                     <div className="flex-1">
// // // //                       <h3 className="font-semibold text-lg text-gray-900 mb-1">
// // // //                         {equipment.name}
// // // //                       </h3>
// // // //                       <p className="text-sm text-gray-600 mb-2">{equipment.code}</p>
// // // //                       <Badge variant="outline" className="text-xs">
// // // //                         {equipment.category}
// // // //                       </Badge>
// // // //                     </div>
// // // //                     <div className="flex flex-col gap-1">
// // // //                       <Badge className={`${stockStatus.color} text-white text-xs`}>
// // // //                         {stockStatus.text}
// // // //                       </Badge>
// // // //                       <Badge className={`${getConditionColor(equipment.condition)} text-white text-xs`}>
// // // //                         {equipment.condition}
// // // //                       </Badge>
// // // //                     </div>
// // // //                   </div>

// // // //                   {/* Description */}
// // // //                   {equipment.description && (
// // // //                     <p className="text-sm text-gray-600 mb-3 line-clamp-2">
// // // //                       {equipment.description}
// // // //                     </p>
// // // //                   )}

// // // //                   {/* Specs */}
// // // //                   <div className="space-y-2 text-sm mb-4">
// // // //                     {equipment.size_capacity && (
// // // //                       <div className="flex justify-between">
// // // //                         <span className="text-gray-600">Kapasitas:</span>
// // // //                         <span className="font-medium">{equipment.size_capacity}</span>
// // // //                       </div>
// // // //                     )}
// // // //                     {equipment.dimensions && (
// // // //                       <div className="flex justify-between">
// // // //                         <span className="text-gray-600">Dimensi:</span>
// // // //                         <span className="font-medium text-xs">{equipment.dimensions}</span>
// // // //                       </div>
// // // //                     )}
// // // //                     {equipment.weight > 0 && (
// // // //                       <div className="flex justify-between">
// // // //                         <span className="text-gray-600">Berat:</span>
// // // //                         <span className="font-medium">{equipment.weight} kg</span>
// // // //                       </div>
// // // //                     )}
// // // //                     {equipment.material && (
// // // //                       <div className="flex justify-between">
// // // //                         <span className="text-gray-600">Material:</span>
// // // //                         <span className="font-medium text-xs">{equipment.material}</span>
// // // //                       </div>
// // // //                     )}
// // // //                   </div>

// // // //                   {/* Stock Info */}
// // // //                   <div className="bg-gray-50 p-3 rounded-lg mb-4">
// // // //                     <div className="grid grid-cols-3 gap-2 text-center text-sm">
// // // //                       <div>
// // // //                         <div className="font-semibold text-green-600">{available}</div>
// // // //                         <div className="text-xs text-gray-600">Tersedia</div>
// // // //                       </div>
// // // //                       <div>
// // // //                         <div className="font-semibold text-yellow-600">{reserved}</div>
// // // //                         <div className="text-xs text-gray-600">Reserved</div>
// // // //                       </div>
// // // //                       <div>
// // // //                         <div className="font-semibold text-blue-600">{rented}</div>
// // // //                         <div className="text-xs text-gray-600">Disewa</div>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="mt-2 pt-2 border-t border-gray-200">
// // // //                       <div className="flex justify-between text-sm">
// // // //                         <span className="text-gray-600">Total Stok:</span>
// // // //                         <span className="font-semibold">{equipment.stock_quantity} unit</span>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>

// // // //                   {/* Price */}
// // // //                   <div className="mb-4">
// // // //                     <div className="text-2xl font-bold text-green-600">
// // // //                       Rp {equipment.price_per_day.toLocaleString()}
// // // //                     </div>
// // // //                     <div className="text-sm text-gray-600">per hari</div>
// // // //                   </div>

// // // //                   {/* Actions */}
// // // //                   <div className="flex gap-2">
// // // //                     <Button 
// // // //                       size="sm" 
// // // //                       variant="outline"
// // // //                       onClick={() => handleEdit(equipment)}
// // // //                       className="flex-1"
// // // //                       disabled={loading}
// // // //                     >
// // // //                       <Edit className="h-4 w-4 mr-1" />
// // // //                       Edit
// // // //                     </Button>
// // // //                     <Button 
// // // //                       size="sm" 
// // // //                       variant="outline"
// // // //                       onClick={() => handleDelete(equipment.equipment_id)}
// // // //                       className="text-red-600 hover:text-red-700"
// // // //                       disabled={loading}
// // // //                     >
// // // //                       <Trash2 className="h-4 w-4" />
// // // //                     </Button>
// // // //                   </div>
// // // //                 </CardContent>
// // // //               </Card>
// // // //             );
// // // //           })}
// // // //         </div>

// // // //         {/* ✅ EMPTY STATE */}
// // // //         {filteredEquipments.length === 0 && !loading && (
// // // //           <div className="text-center py-12">
// // // //             <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
// // // //             <p className="text-gray-500 text-lg">Tidak ada equipment ditemukan</p>
// // // //             <Button 
// // // //               onClick={() => setShowAddModal(true)}
// // // //               className="mt-4 bg-green-600 hover:bg-green-700"
// // // //             >
// // // //               <Plus className="h-4 w-4 mr-2" />
// // // //               Tambah Equipment Pertama
// // // //             </Button>
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {/* ✅ ADD/EDIT MODAL */}
// // // //       {showAddModal && (
// // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// // // //           <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
// // // //             <CardHeader>
// // // //               <CardTitle>
// // // //                 {editingEquipment ? 'Edit Equipment' : 'Tambah Equipment Baru'}
// // // //               </CardTitle>
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <form onSubmit={handleSubmit} className="space-y-4">
// // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                   <div>
// // // //                     <label className="block text-sm font-medium mb-2">Nama Equipment *</label>
// // // //                     <Input
// // // //                       value={formData.name}
// // // //                       onChange={(e) => setFormData({...formData, name: e.target.value})}
// // // //                       placeholder="Tenda Dome 4 Orang"
// // // //                       required
// // // //                     />
// // // //                   </div>
// // // //                   <div>
// // // //                     <label className="block text-sm font-medium mb-2">Kode Equipment *</label>
// // // //                     <Input
// // // //                       value={formData.code}
// // // //                       onChange={(e) => setFormData({...formData, code: e.target.value})}
// // // //                       placeholder="TENDA-001"
// // // //                       required
// // // //                     />
// // // //                   </div>
// // // //                 </div>

// // // //                 <div>
// // // //                   <label className="block text-sm font-medium mb-2">Deskripsi</label>
// // // //                   <Textarea
// // // //                     value={formData.description}
// // // //                     onChange={(e) => setFormData({...formData, description: e.target.value})}
// // // //                     placeholder="Deskripsi detail equipment..."
// // // //                     rows={3}
// // // //                   />
// // // //                 </div>

// // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // //                   <div>
// // // //                     <label className="block text-sm font-medium mb-2">Kategori *</label>
// // // //                     <select
// // // //                       value={formData.category}
// // // //                       onChange={(e) => setFormData({...formData, category: e.target.value})}
// // // //                       className="w-full px-3 py-2 border rounded-md"
// // // //                       required
// // // //                     >
// // // //                       <option value="tenda">Tenda</option>
// // // //                       <option value="tas">Tas Gunung</option>
// // // //                       <option value="sleeping_bag">Sleeping Bag</option>
// // // //                       <option value="kompor">Kompor</option>
// // // //                       <option value="matras">Matras</option>
// // // //                     </select>
// // // //                   </div>
// // // //                   <div>
// // // //                     <label className="block text-sm font-medium mb-2">Kapasitas/Ukuran</label>
// // // //                     <Input
// // // //                       value={formData.size_capacity}
// // // //                       onChange={(e) => setFormData({...formData, size_capacity: e.target.value})}
// // // //                       placeholder="4-6 Orang / 60 Liter"
// // // //                     />
// // // //                   </div>
// // // //                   <div>
// // // //                     <label className="block text-sm font-medium mb-2">Kondisi *</label>
// // // //                     <select
// // // //                       value={formData.condition}
// // // //                       onChange={(e) => setFormData({...formData, condition: e.target.value})}
// // // //                       className="w-full px-3 py-2 border rounded-md"
// // // //                       required
// // // //                     >
// // // //                       <option value="baik">Baik</option>
// // // //                       <option value="rusak_ringan">Rusak Ringan</option>
// // // //                       <option value="perbaikan">Perbaikan</option>
// // // //                     </select>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // //                   <div>
// // // //                     <label className="block text-sm font-medium mb-2">Dimensi</label>
// // // //                     <Input
// // // //                       value={formData.dimensions}
// // // //                       onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
// // // //                       placeholder="300x250x180 cm"
// // // //                     />
// // // //                   </div>
// // // //                   <div>
// // // //                     <label className="block text-sm font-medium mb-2">Berat (kg)</label>
// // // //                     <Input
// // // //                       type="number"
// // // //                       step="0.1"
// // // //                       value={formData.weight}
// // // //                       onChange={(e) => setFormData({...formData, weight: e.target.value})}
// // // //                       placeholder="8.5"
// // // //                     />
// // // //                   </div>
// // // //                   <div>
// // // //                     <label className="block text-sm font-medium mb-2">Material</label>
// // // //                     <Input
// // // //                       value={formData.material}
// // // //                       onChange={(e) => setFormData({...formData, material: e.target.value})}
// // // //                       placeholder="Nylon 210T"
// // // //                     />
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                   <div>
// // // //                     <label className="block text-sm font-medium mb-2">Jumlah Stok *</label>
// // // //                     <Input
// // // //                       type="number"
// // // //                       value={formData.stock_quantity}
// // // //                       onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
// // // //                       placeholder="5"
// // // //                       required
// // // //                     />
// // // //                   </div>
// // // //                   <div>
// // // //                     <label className="block text-sm font-medium mb-2">Harga per Hari (Rp) *</label>
// // // //                     <Input
// // // //                       type="number"
// // // //                       value={formData.price_per_day}
// // // //                       onChange={(e) => setFormData({...formData, price_per_day: e.target.value})}
// // // //                       placeholder="60000"
// // // //                       required
// // // //                     />
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="flex gap-2 pt-4">
// // // //                   <Button 
// // // //                     type="submit" 
// // // //                     className="bg-green-600 hover:bg-green-700"
// // // //                     disabled={loading}
// // // //                   >
// // // //                     {loading ? (
// // // //                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
// // // //                     ) : null}
// // // //                     {editingEquipment ? 'Update Equipment' : 'Tambah Equipment'}
// // // //                   </Button>
// // // //                   <Button 
// // // //                     type="button" 
// // // //                     variant="outline"
// // // //                     onClick={resetForm}
// // // //                     disabled={loading}
// // // //                   >
// // // //                     Batal
// // // //                   </Button>
// // // //                 </div>
// // // //               </form>
// // // //             </CardContent>
// // // //           </Card>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default EquipmentManagement;


// // // import { useState, useEffect, useCallback } from "react";
// // // import { Link } from "react-router-dom";
// // // import { Button } from "@/components/ui/button";
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { Badge } from "@/components/ui/badge";
// // // import { Input } from "@/components/ui/input";
// // // import { Textarea } from "@/components/ui/textarea";
// // // import { 
// // //   ArrowLeft,
// // //   Search, 
// // //   Plus,
// // //   Edit,
// // //   Trash2,
// // //   Package,
// // //   AlertTriangle,
// // //   RefreshCw,
// // //   Loader2,
// // //   X
// // // } from "lucide-react";

// // // const EquipmentManagement = () => {
// // //   const [equipments, setEquipments] = useState([]);
// // //   const [filteredEquipments, setFilteredEquipments] = useState([]);
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [categoryFilter, setCategoryFilter] = useState("all");
// // //   const [conditionFilter, setConditionFilter] = useState("all");
// // //   const [showAddModal, setShowAddModal] = useState(false);
// // //   const [editingEquipment, setEditingEquipment] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);


// // //    // ✅ TAMBAH STATE UNTUK CODE VALIDATION
// // //   const [codeValidation, setCodeValidation] = useState({
// // //     isChecking: false,
// // //     isDuplicate: false,
// // //     message: ''
// // //   });
// // //   // Form state
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     code: "",
// // //     description: "",
// // //     category: "tenda",
// // //     size_capacity: "",
// // //     dimensions: "",
// // //     weight: "",
// // //     material: "",
// // //     stock_quantity: "",
// // //     price_per_day: "",
// // //     condition: "baik"
// // //   });

// // //   useEffect(() => {
// // //     fetchEquipments();
// // //   }, []);

// // //   const fetchEquipments = async () => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);
      
// // //       const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php');
      
// // //       if (!response.ok) {
// // //         throw new Error(`HTTP error! status: ${response.status}`);
// // //       }
      
// // //       const data = await response.json();
      
// // //       if (Array.isArray(data)) {
// // //         setEquipments(data);
// // //         setFilteredEquipments(data);
// // //       } else {
// // //         setEquipments([]);
// // //         setFilteredEquipments([]);
// // //       }
      
// // //     } catch (err) {
// // //       console.error('❌ Error fetching equipment:', err);
// // //       setError('Gagal memuat equipment: ' + err.message);
      
// // //       // Fallback mock data
// // //       const mockEquipments = [
// // //         {
// // //           equipment_id: 1,
// // //           name: "Tenda Dome 4-6 Orang (MOCK)",
// // //           code: "TENDA-001",
// // //           description: "Tenda berkualitas tinggi untuk 4-6 orang",
// // //           category: "tenda",
// // //           size_capacity: "4-6 Orang",
// // //           dimensions: "300x250x180 cm",
// // //           weight: 8.5,
// // //           material: "Nylon 210T Waterproof",
// // //           stock_quantity: 5,
// // //           price_per_day: 60000,
// // //           condition: "baik",
// // //           available_stock: 3,
// // //           reserved_stock: 1,
// // //           rented_stock: 1,
// // //           created_at: "2024-01-15"
// // //         }
// // //       ];
      
// // //       setEquipments(mockEquipments);
// // //       setFilteredEquipments(mockEquipments);
      
// // //     } finally {
// // //       setLoading(false);
// // //     }
    
// // //   };

// // //   // Filter equipments
// // //   useEffect(() => {
// // //     let filtered = equipments;
    
// // //     if (searchTerm) {
// // //       filtered = filtered.filter(equipment => 
// // //         equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //         equipment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //         equipment.category.toLowerCase().includes(searchTerm.toLowerCase())
// // //       );
// // //     }
    
// // //     if (categoryFilter !== "all") {
// // //       filtered = filtered.filter(equipment => equipment.category === categoryFilter);
// // //     }
    
// // //     if (conditionFilter !== "all") {
// // //       filtered = filtered.filter(equipment => equipment.condition === conditionFilter);
// // //     }
    
// // //     setFilteredEquipments(filtered);
// // //   }, [equipments, searchTerm, categoryFilter, conditionFilter]);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);

// // //     try {
// // //       const equipmentData = {
// // //         ...formData,
// // //         weight: formData.weight ? parseFloat(formData.weight) : null,
// // //         stock_quantity: parseInt(formData.stock_quantity),
// // //         price_per_day: parseFloat(formData.price_per_day)
// // //       };

// // //       let response;
// // //       const url = 'http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php';
      
// // //       if (editingEquipment) {
// // //         response = await fetch(url, {
// // //           method: 'PUT',
// // //           headers: { 'Content-Type': 'application/json' },
// // //           body: JSON.stringify({
// // //             equipment_id: editingEquipment.equipment_id,
// // //             ...equipmentData
// // //           })
// // //         });
// // //       } else {
// // //         response = await fetch(url, {
// // //           method: 'POST',
// // //           headers: { 'Content-Type': 'application/json' },
// // //           body: JSON.stringify(equipmentData)
// // //         });
// // //       }

// // //       const result = await response.json();

// // //       if (response.ok && result.success) {
// // //         alert(editingEquipment ? 'Equipment berhasil diupdate!' : 'Equipment berhasil ditambahkan!');
// // //         await fetchEquipments();
// // //         resetForm();
// // //       } else {
// // //         throw new Error(result.message || 'Gagal menyimpan equipment');
// // //       }

// // //     } catch (err) {
// // //       console.error('❌ Error saving equipment:', err);
// // //       alert('Error: ' + err.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDelete = async (equipment) => {
// // //     if (!confirm(`Yakin ingin menghapus "${equipment.name}"?`)) return;

// // //     try {
// // //       setLoading(true);
      
// // //       const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?id=${equipment.equipment_id}`, {
// // //         method: 'DELETE',
// // //         headers: { 'Content-Type': 'application/json' }
// // //       });

// // //       const result = await response.json();

// // //       if (response.ok && result.success) {
// // //         alert('Equipment berhasil dihapus!');
// // //         await fetchEquipments();
// // //       } else {
// // //         throw new Error(result.message || 'Gagal menghapus equipment');
// // //       }
// // //     } catch (err) {
// // //       console.error('❌ Error deleting equipment:', err);
// // //       alert('Error: ' + err.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleEdit = (equipment) => {
// // //     setFormData({
// // //       name: equipment.name,
// // //       code: equipment.code,
// // //       description: equipment.description || '',
// // //       category: equipment.category,
// // //       size_capacity: equipment.size_capacity || '',
// // //       dimensions: equipment.dimensions || '',
// // //       weight: equipment.weight ? equipment.weight.toString() : '',
// // //       material: equipment.material || '',
// // //       stock_quantity: equipment.stock_quantity.toString(),
// // //       price_per_day: equipment.price_per_day.toString(),
// // //       condition: equipment.condition
// // //     });
// // //     setEditingEquipment(equipment);
// // //     setShowAddModal(true);
// // //   };

// // //   const resetForm = () => {
// // //     setFormData({
// // //       name: "", code: "", description: "", category: "tenda",
// // //       size_capacity: "", dimensions: "", weight: "", material: "",
// // //       stock_quantity: "", price_per_day: "", condition: "baik"
// // //     });
// // //     setShowAddModal(false);
// // //     setEditingEquipment(null);
// // //   };

// // //   const getStockStatus = (equipment) => {
// // //     const available = equipment.available_stock || equipment.stock_quantity;
// // //     if (available === 0) return { color: 'bg-red-500', text: 'Habis' };
// // //     if (available <= 2) return { color: 'bg-yellow-500', text: 'Stok Rendah' };
// // //     return { color: 'bg-green-500', text: 'Tersedia' };
// // //   };

// // //   const getConditionColor = (condition) => {
// // //     switch(condition) {
// // //       case 'baik': return 'bg-green-500';
// // //       case 'rusak_ringan': return 'bg-yellow-500';
// // //       case 'perbaikan': return 'bg-red-500';
// // //       default: return 'bg-gray-500';
// // //     }
// // //   };

// // //   const stats = {
// // //     total: equipments.length,
// // //     available: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) > 0).length,
// // //     lowStock: equipments.filter(eq => {
// // //       const available = eq.available_stock || eq.stock_quantity;
// // //       return available <= 2 && available > 0;
// // //     }).length,
// // //     outOfStock: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) === 0).length,
// // //     totalValue: equipments.reduce((sum, eq) => sum + (eq.price_per_day * eq.stock_quantity), 0)
// // //   };

// // //   if (loading && equipments.length === 0) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="text-center">
// // //           <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
// // //           <p className="text-gray-600">Memuat equipment dari database...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       {/* HEADER */}
// // //       <div className="bg-white shadow-sm border-b">
// // //         <div className="px-6 py-4">
// // //           <div className="flex items-center justify-between">
// // //             <div className="flex items-center gap-4">
// // //               <Link to="/admin/dashboard">
// // //                 <Button variant="outline" size="sm">
// // //                   <ArrowLeft className="h-4 w-4 mr-2" />
// // //                   Dashboard
// // //                 </Button>
// // //               </Link>
// // //               <div>
// // //                 <h1 className="text-2xl font-bold text-gray-900">Kelola Equipment</h1>
// // //                 <p className="text-gray-600">Manajemen stok dan inventory equipment</p>
// // //               </div>
// // //             </div>
            
// // //             <div className="flex gap-2">
// // //               <Button 
// // //                 onClick={() => setShowAddModal(true)}
// // //                 className="bg-green-600 hover:bg-green-700"
// // //                 disabled={loading}
// // //               >
// // //                 <Plus className="h-4 w-4 mr-2" />
// // //                 Tambah Equipment
// // //               </Button>
// // //               <Button 
// // //                 variant="outline" 
// // //                 onClick={fetchEquipments}
// // //                 disabled={loading}
// // //               >
// // //                 {loading ? (
// // //                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
// // //                 ) : (
// // //                   <RefreshCw className="h-4 w-4 mr-2" />
// // //                 )}
// // //                 Refresh
// // //               </Button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="p-6">
// // //         {/* ERROR ALERT */}
// // //         {error && (
// // //           <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
// // //             <div className="flex items-center gap-2">
// // //               <AlertTriangle className="h-5 w-5 text-red-600" />
// // //               <div>
// // //                 <p className="text-red-800 font-medium">Database Connection Error</p>
// // //                 <p className="text-red-600 text-sm">{error}</p>
// // //                 <p className="text-red-600 text-sm">Menampilkan data mock untuk development.</p>
// // //               </div>
// // //             </div>
// // //             <Button 
// // //               onClick={fetchEquipments}
// // //               size="sm"
// // //               className="mt-2 bg-red-600 hover:bg-red-700"
// // //             >
// // //               Coba Lagi
// // //             </Button>
// // //           </div>
// // //         )}

// // //         {/* STATS CARDS */}
// // //         <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
// // //           <Card>
// // //             <CardContent className="p-4 text-center">
// // //               <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
// // //               <div className="text-sm text-gray-600">Total Equipment</div>
// // //             </CardContent>
// // //           </Card>
// // //           <Card>
// // //             <CardContent className="p-4 text-center">
// // //               <div className="text-2xl font-bold text-green-600">{stats.available}</div>
// // //               <div className="text-sm text-gray-600">Tersedia</div>
// // //             </CardContent>
// // //           </Card>
// // //           <Card>
// // //             <CardContent className="p-4 text-center">
// // //               <div className="text-2xl font-bold text-yellow-600">{stats.lowStock}</div>
// // //               <div className="text-sm text-gray-600">Stok Rendah</div>
// // //             </CardContent>
// // //           </Card>
// // //           <Card>
// // //             <CardContent className="p-4 text-center">
// // //               <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
// // //               <div className="text-sm text-gray-600">Habis</div>
// // //             </CardContent>
// // //           </Card>
// // //           <Card>
// // //             <CardContent className="p-4 text-center">
// // //               <div className="text-lg font-bold text-purple-600">
// // //                 Rp {stats.totalValue.toLocaleString()}
// // //               </div>
// // //               <div className="text-sm text-gray-600">Total Aset</div>
// // //             </CardContent>
// // //           </Card>
// // //         </div>

// // //         {/* FILTERS */}
// // //         <Card className="mb-6">
// // //           <CardContent className="p-4">
// // //             <div className="flex flex-col lg:flex-row gap-4">
// // //               <div className="flex-1">
// // //                 <div className="relative">
// // //                   <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// // //                   <Input
// // //                     placeholder="Cari nama, kode, atau kategori equipment..."
// // //                     value={searchTerm}
// // //                     onChange={(e) => setSearchTerm(e.target.value)}
// // //                     className="pl-10"
// // //                   />
// // //                 </div>
// // //               </div>
              
// // //               <select 
// // //                 value={categoryFilter}
// // //                 onChange={(e) => setCategoryFilter(e.target.value)}
// // //                 className="px-3 py-2 border rounded-md"
// // //               >
// // //                 <option value="all">Semua Kategori</option>
// // //                 <option value="tenda">Tenda</option>
// // //                 <option value="tas">Tas Gunung</option>
// // //                 <option value="sleeping_bag">Sleeping Bag</option>
// // //                 <option value="kompor">Kompor</option>
// // //                 <option value="matras">Matras</option>
// // //               </select>
              
// // //               <select 
// // //                 value={conditionFilter}
// // //                 onChange={(e) => setConditionFilter(e.target.value)}
// // //                 className="px-3 py-2 border rounded-md"
// // //               >
// // //                 <option value="all">Semua Kondisi</option>
// // //                 <option value="baik">Baik</option>
// // //                 <option value="rusak_ringan">Rusak Ringan</option>
// // //                 <option value="perbaikan">Perbaikan</option>
// // //               </select>
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         {/* EQUIPMENT GRID */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //           {filteredEquipments.map((equipment) => {
// // //             const stockStatus = getStockStatus(equipment);
// // //             const available = equipment.available_stock || equipment.stock_quantity;
// // //             const reserved = equipment.reserved_stock || 0;
// // //             const rented = equipment.rented_stock || 0;
            
// // //             return (
// // //               <Card key={equipment.equipment_id} className="overflow-hidden">
// // //                 <CardContent className="p-6">
// // //                   {/* Header */}
// // //                   <div className="flex justify-between items-start mb-4">
// // //                     <div className="flex-1">
// // //                       <h3 className="font-semibold text-lg text-gray-900 mb-1">
// // //                         {equipment.name}
// // //                       </h3>
// // //                       <p className="text-sm text-gray-600 mb-2">{equipment.code}</p>
// // //                       <Badge variant="outline" className="text-xs">
// // //                         {equipment.category}
// // //                       </Badge>
// // //                     </div>
// // //                     <div className="flex flex-col gap-1">
// // //                       <Badge className={`${stockStatus.color} text-white text-xs`}>
// // //                         {stockStatus.text}
// // //                       </Badge>
// // //                       <Badge className={`${getConditionColor(equipment.condition)} text-white text-xs`}>
// // //                         {equipment.condition}
// // //                       </Badge>
// // //                     </div>
// // //                   </div>

// // //                   {/* Description */}
// // //                   {equipment.description && (
// // //                     <p className="text-sm text-gray-600 mb-3">{equipment.description}</p>
// // //                   )}

// // //                   {/* Stock Info */}
// // //                   <div className="bg-gray-50 p-3 rounded-lg mb-4">
// // //                     <div className="grid grid-cols-3 gap-2 text-center text-sm">
// // //                       <div>
// // //                         <div className="font-semibold text-green-600">{available}</div>
// // //                         <div className="text-xs text-gray-600">Tersedia</div>
// // //                       </div>
// // //                       <div>
// // //                         <div className="font-semibold text-yellow-600">{reserved}</div>
// // //                         <div className="text-xs text-gray-600">Reserved</div>
// // //                       </div>
// // //                       <div>
// // //                         <div className="font-semibold text-blue-600">{rented}</div>
// // //                         <div className="text-xs text-gray-600">Disewa</div>
// // //                       </div>
// // //                     </div>
// // //                     <div className="mt-2 pt-2 border-t border-gray-200">
// // //                       <div className="flex justify-between text-sm">
// // //                         <span className="text-gray-600">Total Stok:</span>
// // //                         <span className="font-semibold">{equipment.stock_quantity} unit</span>
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {/* Price */}
// // //                   <div className="mb-4">
// // //                     <div className="text-2xl font-bold text-green-600">
// // //                       Rp {equipment.price_per_day.toLocaleString()}
// // //                     </div>
// // //                     <div className="text-sm text-gray-600">per hari</div>
// // //                   </div>

// // //                   {/* Actions */}
// // //                   <div className="flex gap-2">
// // //                     <Button 
// // //                       size="sm" 
// // //                       variant="outline"
// // //                       onClick={() => handleEdit(equipment)}
// // //                       className="flex-1"
// // //                       disabled={loading}
// // //                     >
// // //                       <Edit className="h-4 w-4 mr-1" />
// // //                       Edit
// // //                     </Button>
// // //                     <Button 
// // //                       size="sm" 
// // //                       variant="outline"
// // //                       onClick={() => handleDelete(equipment)}
// // //                       className="text-red-600 hover:text-red-700"
// // //                       disabled={loading}
// // //                     >
// // //                       <Trash2 className="h-4 w-4" />
// // //                     </Button>
// // //                   </div>
// // //                 </CardContent>
// // //               </Card>
// // //             );
// // //           })}
// // //         </div>

// // //         {/* Empty state */}
// // //         {filteredEquipments.length === 0 && !loading && (
// // //           <div className="text-center py-12">
// // //             <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
// // //             <p className="text-gray-500 text-lg">Tidak ada equipment ditemukan</p>
// // //             <Button 
// // //               onClick={() => setShowAddModal(true)}
// // //               className="mt-4 bg-green-600 hover:bg-green-700"
// // //             >
// // //               <Plus className="h-4 w-4 mr-2" />
// // //               Tambah Equipment Pertama
// // //             </Button>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* ADD/EDIT MODAL */}
// // //       {showAddModal && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// // //           <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
// // //             <CardHeader>
// // //               <div className="flex items-center justify-between">
// // //                 <CardTitle>
// // //                   {editingEquipment ? 'Edit Equipment' : 'Tambah Equipment Baru'}
// // //                 </CardTitle>
// // //                 <Button 
// // //                   variant="ghost" 
// // //                   size="sm"
// // //                   onClick={resetForm}
// // //                 >
// // //                   <X className="h-4 w-4" />
// // //                 </Button>
// // //               </div>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <form onSubmit={handleSubmit} className="space-y-4">
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2">Nama Equipment *</label>
// // //                     <Input
// // //                       value={formData.name}
// // //                       onChange={(e) => setFormData({...formData, name: e.target.value})}
// // //                       placeholder="Tenda Dome 4 Orang"
// // //                       required
// // //                     />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2">Kode Equipment *</label>
// // //                     <Input
// // //                       value={formData.code}
// // //                       onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
// // //                       placeholder="TENDA-001"
// // //                       required
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 <div>
// // //                   <label className="block text-sm font-medium mb-2">Deskripsi</label>
// // //                   <Textarea
// // //                     value={formData.description}
// // //                     onChange={(e) => setFormData({...formData, description: e.target.value})}
// // //                     placeholder="Deskripsi detail equipment..."
// // //                     rows={3}
// // //                   />
// // //                 </div>

// // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2">Kategori *</label>
// // //                     <select
// // //                       value={formData.category}
// // //                       onChange={(e) => setFormData({...formData, category: e.target.value})}
// // //                       className="w-full px-3 py-2 border rounded-md"
// // //                       required
// // //                     >
// // //                       <option value="tenda">Tenda</option>
// // //                       <option value="tas">Tas Gunung</option>
// // //                       <option value="sleeping_bag">Sleeping Bag</option>
// // //                       <option value="kompor">Kompor</option>
// // //                       <option value="matras">Matras</option>
// // //                     </select>
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2">Kapasitas/Ukuran</label>
// // //                     <Input
// // //                       value={formData.size_capacity}
// // //                       onChange={(e) => setFormData({...formData, size_capacity: e.target.value})}
// // //                       placeholder="4-6 Orang / 60 Liter"
// // //                     />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2">Kondisi *</label>
// // //                     <select
// // //                       value={formData.condition}
// // //                       onChange={(e) => setFormData({...formData, condition: e.target.value})}
// // //                       className="w-full px-3 py-2 border rounded-md"
// // //                       required
// // //                     >
// // //                       <option value="baik">Baik</option>
// // //                       <option value="rusak_ringan">Rusak Ringan</option>
// // //                       <option value="perbaikan">Perbaikan</option>
// // //                     </select>
// // //                   </div>
// // //                 </div>

// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2">Jumlah Stok *</label>
// // //                     <Input
// // //                       type="number"
// // //                       min="0"
// // //                       value={formData.stock_quantity}
// // //                       onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
// // //                       placeholder="5"
// // //                       required
// // //                     />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2">Harga per Hari (Rp) *</label>
// // //                     <Input
// // //                       type="number"
// // //                       min="0"
// // //                       value={formData.price_per_day}
// // //                       onChange={(e) => setFormData({...formData, price_per_day: e.target.value})}
// // //                       placeholder="60000"
// // //                       required
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex gap-2 pt-4 border-t">
// // //                   <Button 
// // //                     type="submit" 
// // //                     className="bg-green-600 hover:bg-green-700"
// // //                     disabled={loading}
// // //                   >
// // //                     {loading ? (
// // //                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
// // //                     ) : null}
// // //                     {editingEquipment ? 'Update Equipment' : 'Tambah Equipment'}
// // //                   </Button>
// // //                   <Button 
// // //                     type="button" 
// // //                     variant="outline"
// // //                     onClick={resetForm}
// // //                     disabled={loading}
// // //                   >
// // //                     Batal
// // //                   </Button>
// // //                 </div>
// // //               </form>
// // //             </CardContent>
// // //           </Card>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default EquipmentManagement;


// // import { useState, useEffect, useCallback } from "react";
// // import { Link } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import { 
// //   ArrowLeft,
// //   Search, 
// //   Plus,
// //   Edit,
// //   Trash2,
// //   Package,
// //   AlertTriangle,
// //   RefreshCw,
// //   Loader2,
// //   X,
// //   CheckCircle
// // } from "lucide-react";

// // const EquipmentManagement = () => {
// //   const [equipments, setEquipments] = useState([]);
// //   const [filteredEquipments, setFilteredEquipments] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [categoryFilter, setCategoryFilter] = useState("all");
// //   const [conditionFilter, setConditionFilter] = useState("all");
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [editingEquipment, setEditingEquipment] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   // ✅ STATE UNTUK CODE VALIDATION
// //   const [codeValidation, setCodeValidation] = useState({
// //     isChecking: false,
// //     isDuplicate: false,
// //     message: ''
// //   });

// //   // Form state
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     code: "",
// //     description: "",
// //     category: "tenda",
// //     size_capacity: "",
// //     dimensions: "",
// //     weight: "",
// //     material: "",
// //     stock_quantity: "",
// //     price_per_day: "",
// //     condition: "baik"
// //   });

// //   useEffect(() => {
// //     fetchEquipments();
// //   }, []);

// //   const fetchEquipments = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
      
// //       const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php');
      
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
      
// //       const data = await response.json();
      
// //       if (Array.isArray(data)) {
// //         setEquipments(data);
// //         setFilteredEquipments(data);
// //       } else {
// //         setEquipments([]);
// //         setFilteredEquipments([]);
// //       }
      
// //     } catch (err) {
// //       console.error('❌ Error fetching equipment:', err);
// //       setError('Gagal memuat equipment: ' + err.message);
      
// //       // Fallback mock data
// //       const mockEquipments = [
// //         {
// //           equipment_id: 1,
// //           name: "Tenda Dome 4-6 Orang (MOCK)",
// //           code: "TENDA-001",
// //           description: "Tenda berkualitas tinggi untuk 4-6 orang",
// //           category: "tenda",
// //           size_capacity: "4-6 Orang",
// //           dimensions: "300x250x180 cm",
// //           weight: 8.5,
// //           material: "Nylon 210T Waterproof",
// //           stock_quantity: 5,
// //           price_per_day: 60000,
// //           condition: "baik",
// //           available_stock: 3,
// //           reserved_stock: 1,
// //           rented_stock: 1,
// //           created_at: "2024-01-15"
// //         }
// //       ];
      
// //       setEquipments(mockEquipments);
// //       setFilteredEquipments(mockEquipments);
      
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ✅ DEBOUNCED CODE CHECK FUNCTION
// //   const checkCodeAvailability = useCallback(
// //     async (code, excludeId = null) => {
// //       if (!code || code.length < 3) {
// //         setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
// //         return;
// //       }

// //       setCodeValidation({ isChecking: true, isDuplicate: false, message: 'Mengecek ketersediaan kode...' });

// //       try {
// //         const url = excludeId 
// //           ? `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}&exclude_id=${excludeId}`
// //           : `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}`;
        
// //         const response = await fetch(url);
// //         const result = await response.json();

// //         if (response.ok) {
// //           setCodeValidation({
// //             isChecking: false,
// //             isDuplicate: result.exists,
// //             message: result.message
// //           });
// //         } else {
// //           setCodeValidation({
// //             isChecking: false,
// //             isDuplicate: false,
// //             message: ''
// //           });
// //         }

// //       } catch (error) {
// //         console.error('Error checking code:', error);
// //         setCodeValidation({
// //           isChecking: false, 
// //           isDuplicate: false, 
// //           message: ''
// //         });
// //       }
// //     }, []
// //   );

// //   // ✅ DEBOUNCED CODE CHECK (500ms delay)
// //   useEffect(() => {
// //     const timeoutId = setTimeout(() => {
// //       if (formData.code && formData.code.length >= 3) {
// //         const excludeId = editingEquipment ? editingEquipment.equipment_id : null;
// //         checkCodeAvailability(formData.code, excludeId);
// //       } else {
// //         setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
// //       }
// //     }, 500);

// //     return () => clearTimeout(timeoutId);
// //   }, [formData.code, editingEquipment, checkCodeAvailability]);

// //   // Filter equipments
// //   useEffect(() => {
// //     let filtered = equipments;
    
// //     if (searchTerm) {
// //       filtered = filtered.filter(equipment => 
// //         equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         equipment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         equipment.category.toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //     }
    
// //     if (categoryFilter !== "all") {
// //       filtered = filtered.filter(equipment => equipment.category === categoryFilter);
// //     }
    
// //     if (conditionFilter !== "all") {
// //       filtered = filtered.filter(equipment => equipment.condition === conditionFilter);
// //     }
    
// //     setFilteredEquipments(filtered);
// //   }, [equipments, searchTerm, categoryFilter, conditionFilter]);

// //   // ✅ HANDLE SUBMIT WITH VALIDATION
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     // Check for duplicate before submit
// //     if (codeValidation.isDuplicate) {
// //       alert('❌ Kode equipment sudah digunakan! Silakan gunakan kode lain.');
// //       return;
// //     }

// //     // Wait for validation if still checking
// //     if (codeValidation.isChecking) {
// //       alert('⏳ Sedang mengecek kode, tunggu sebentar...');
// //       return;
// //     }
    
// //     setLoading(true);

// //     try {
// //       const equipmentData = {
// //         ...formData,
// //         weight: formData.weight ? parseFloat(formData.weight) : null,
// //         stock_quantity: parseInt(formData.stock_quantity),
// //         price_per_day: parseFloat(formData.price_per_day)
// //       };

// //       let response;
// //       const url = 'http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php';
      
// //       if (editingEquipment) {
// //         response = await fetch(url, {
// //           method: 'PUT',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({
// //             equipment_id: editingEquipment.equipment_id,
// //             ...equipmentData
// //           })
// //         });
// //       } else {
// //         response = await fetch(url, {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify(equipmentData)
// //         });
// //       }

// //       const result = await response.json();

// //       if (response.ok && result.success) {
// //         alert(editingEquipment ? '✅ Equipment berhasil diupdate!' : '✅ Equipment berhasil ditambahkan!');
// //         await fetchEquipments();
// //         resetForm();
// //       } else {
// //         throw new Error(result.message || 'Gagal menyimpan equipment');
// //       }

// //     } catch (err) {
// //       console.error('❌ Error saving equipment:', err);
// //       alert('Error: ' + err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async (equipment) => {
// //     if (!confirm(`Yakin ingin menghapus "${equipment.name}"?`)) return;

// //     try {
// //       setLoading(true);
      
// //       const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?id=${equipment.equipment_id}`, {
// //         method: 'DELETE',
// //         headers: { 'Content-Type': 'application/json' }
// //       });

// //       const result = await response.json();

// //       if (response.ok && result.success) {
// //         alert('✅ Equipment berhasil dihapus!');
// //         await fetchEquipments();
// //       } else {
// //         throw new Error(result.message || 'Gagal menghapus equipment');
// //       }
// //     } catch (err) {
// //       console.error('❌ Error deleting equipment:', err);
// //       alert('Error: ' + err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEdit = (equipment) => {
// //     setFormData({
// //       name: equipment.name,
// //       code: equipment.code,
// //       description: equipment.description || '',
// //       category: equipment.category,
// //       size_capacity: equipment.size_capacity || '',
// //       dimensions: equipment.dimensions || '',
// //       weight: equipment.weight ? equipment.weight.toString() : '',
// //       material: equipment.material || '',
// //       stock_quantity: equipment.stock_quantity.toString(),
// //       price_per_day: equipment.price_per_day.toString(),
// //       condition: equipment.condition
// //     });
// //     setEditingEquipment(equipment);
// //     setShowAddModal(true);
// //   };

// //   // ✅ RESET FORM WITH CODE VALIDATION
// //   const resetForm = () => {
// //     setFormData({
// //       name: "", code: "", description: "", category: "tenda",
// //       size_capacity: "", dimensions: "", weight: "", material: "",
// //       stock_quantity: "", price_per_day: "", condition: "baik"
// //     });
// //     setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
// //     setShowAddModal(false);
// //     setEditingEquipment(null);
// //   };

// //   // ✅ GET INPUT BORDER COLOR BASED ON VALIDATION
// //   const getCodeInputStyle = () => {
// //     if (!formData.code || formData.code.length < 3) return '';
// //     if (codeValidation.isChecking) return 'border-yellow-400 bg-yellow-50';
// //     if (codeValidation.isDuplicate) return 'border-red-400 bg-red-50';
// //     return 'border-green-400 bg-green-50';
// //   };

// //   const getStockStatus = (equipment) => {
// //     const available = equipment.available_stock || equipment.stock_quantity;
// //     if (available === 0) return { color: 'bg-red-500', text: 'Habis' };
// //     if (available <= 2) return { color: 'bg-yellow-500', text: 'Stok Rendah' };
// //     return { color: 'bg-green-500', text: 'Tersedia' };
// //   };

// //   const getConditionColor = (condition) => {
// //     switch(condition) {
// //       case 'baik': return 'bg-green-500';
// //       case 'rusak_ringan': return 'bg-yellow-500';
// //       case 'perbaikan': return 'bg-red-500';
// //       default: return 'bg-gray-500';
// //     }
// //   };

// //   const stats = {
// //     total: equipments.length,
// //     available: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) > 0).length,
// //     lowStock: equipments.filter(eq => {
// //       const available = eq.available_stock || eq.stock_quantity;
// //       return available <= 2 && available > 0;
// //     }).length,
// //     outOfStock: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) === 0).length,
// //     totalValue: equipments.reduce((sum, eq) => sum + (eq.price_per_day * eq.stock_quantity), 0)
// //   };

// //   if (loading && equipments.length === 0) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
// //           <p className="text-gray-600">Memuat equipment dari database...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* HEADER */}
// //       <div className="bg-white shadow-sm border-b">
// //         <div className="px-6 py-4">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-4">
// //               <Link to="/admin/dashboard">
// //                 <Button variant="outline" size="sm">
// //                   <ArrowLeft className="h-4 w-4 mr-2" />
// //                   Dashboard
// //                 </Button>
// //               </Link>
// //               <div>
// //                 <h1 className="text-2xl font-bold text-gray-900">Kelola Equipment</h1>
// //                 <p className="text-gray-600">Manajemen stok dan inventory equipment</p>
// //               </div>
// //             </div>
            
// //             <div className="flex gap-2">
// //               <Button 
// //                 onClick={() => setShowAddModal(true)}
// //                 className="bg-green-600 hover:bg-green-700"
// //                 disabled={loading}
// //               >
// //                 <Plus className="h-4 w-4 mr-2" />
// //                 Tambah Equipment
// //               </Button>
// //               <Button 
// //                 variant="outline" 
// //                 onClick={fetchEquipments}
// //                 disabled={loading}
// //               >
// //                 {loading ? (
// //                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
// //                 ) : (
// //                   <RefreshCw className="h-4 w-4 mr-2" />
// //                 )}
// //                 Refresh
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="p-6">
// //         {/* ERROR ALERT */}
// //         {error && (
// //           <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
// //             <div className="flex items-center gap-2">
// //               <AlertTriangle className="h-5 w-5 text-red-600" />
// //               <div>
// //                 <p className="text-red-800 font-medium">Database Connection Error</p>
// //                 <p className="text-red-600 text-sm">{error}</p>
// //                 <p className="text-red-600 text-sm">Menampilkan data mock untuk development.</p>
// //               </div>
// //             </div>
// //             <Button 
// //               onClick={fetchEquipments}
// //               size="sm"
// //               className="mt-2 bg-red-600 hover:bg-red-700"
// //             >
// //               Coba Lagi
// //             </Button>
// //           </div>
// //         )}

// //         {/* STATS CARDS */}
// //         <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
// //           <Card>
// //             <CardContent className="p-4 text-center">
// //               <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
// //               <div className="text-sm text-gray-600">Total Equipment</div>
// //             </CardContent>
// //           </Card>
// //           <Card>
// //             <CardContent className="p-4 text-center">
// //               <div className="text-2xl font-bold text-green-600">{stats.available}</div>
// //               <div className="text-sm text-gray-600">Tersedia</div>
// //             </CardContent>
// //           </Card>
// //           <Card>
// //             <CardContent className="p-4 text-center">
// //               <div className="text-2xl font-bold text-yellow-600">{stats.lowStock}</div>
// //               <div className="text-sm text-gray-600">Stok Rendah</div>
// //             </CardContent>
// //           </Card>
// //           <Card>
// //             <CardContent className="p-4 text-center">
// //               <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
// //               <div className="text-sm text-gray-600">Habis</div>
// //             </CardContent>
// //           </Card>
// //           <Card>
// //             <CardContent className="p-4 text-center">
// //               <div className="text-lg font-bold text-purple-600">
// //                 Rp {stats.totalValue.toLocaleString()}
// //               </div>
// //               <div className="text-sm text-gray-600">Total Aset</div>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* FILTERS */}
// //         <Card className="mb-6">
// //           <CardContent className="p-4">
// //             <div className="flex flex-col lg:flex-row gap-4">
// //               <div className="flex-1">
// //                 <div className="relative">
// //                   <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //                   <Input
// //                     placeholder="Cari nama, kode, atau kategori equipment..."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     className="pl-10"
// //                   />
// //                 </div>
// //               </div>
              
// //               <select 
// //                 value={categoryFilter}
// //                 onChange={(e) => setCategoryFilter(e.target.value)}
// //                 className="px-3 py-2 border rounded-md"
// //               >
// //                 <option value="all">Semua Kategori</option>
// //                 <option value="tenda">Tenda</option>
// //                 <option value="tas">Tas Gunung</option>
// //                 <option value="sleeping_bag">Sleeping Bag</option>
// //                 <option value="kompor">Kompor</option>
// //                 <option value="matras">Matras</option>
// //               </select>
              
// //               <select 
// //                 value={conditionFilter}
// //                 onChange={(e) => setConditionFilter(e.target.value)}
// //                 className="px-3 py-2 border rounded-md"
// //               >
// //                 <option value="all">Semua Kondisi</option>
// //                 <option value="baik">Baik</option>
// //                 <option value="rusak_ringan">Rusak Ringan</option>
// //                 <option value="perbaikan">Perbaikan</option>
// //               </select>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* EQUIPMENT GRID */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredEquipments.map((equipment) => {
// //             const stockStatus = getStockStatus(equipment);
// //             const available = equipment.available_stock || equipment.stock_quantity;
// //             const reserved = equipment.reserved_stock || 0;
// //             const rented = equipment.rented_stock || 0;
            
// //             return (
// //               <Card key={equipment.equipment_id} className="overflow-hidden">
// //                 <CardContent className="p-6">
// //                   {/* Header */}
// //                   <div className="flex justify-between items-start mb-4">
// //                     <div className="flex-1">
// //                       <h3 className="font-semibold text-lg text-gray-900 mb-1">
// //                         {equipment.name}
// //                       </h3>
// //                       <p className="text-sm text-gray-600 mb-2">{equipment.code}</p>
// //                       <Badge variant="outline" className="text-xs">
// //                         {equipment.category}
// //                       </Badge>
// //                     </div>
// //                     <div className="flex flex-col gap-1">
// //                       <Badge className={`${stockStatus.color} text-white text-xs`}>
// //                         {stockStatus.text}
// //                       </Badge>
// //                       <Badge className={`${getConditionColor(equipment.condition)} text-white text-xs`}>
// //                         {equipment.condition}
// //                       </Badge>
// //                     </div>
// //                   </div>

// //                   {/* Description */}
// //                   {equipment.description && (
// //                     <p className="text-sm text-gray-600 mb-3">{equipment.description}</p>
// //                   )}

// //                   {/* Stock Info */}
// //                   <div className="bg-gray-50 p-3 rounded-lg mb-4">
// //                     <div className="grid grid-cols-3 gap-2 text-center text-sm">
// //                       <div>
// //                         <div className="font-semibold text-green-600">{available}</div>
// //                         <div className="text-xs text-gray-600">Tersedia</div>
// //                       </div>
// //                       <div>
// //                         <div className="font-semibold text-yellow-600">{reserved}</div>
// //                         <div className="text-xs text-gray-600">Reserved</div>
// //                       </div>
// //                       <div>
// //                         <div className="font-semibold text-blue-600">{rented}</div>
// //                         <div className="text-xs text-gray-600">Disewa</div>
// //                       </div>
// //                     </div>
// //                     <div className="mt-2 pt-2 border-t border-gray-200">
// //                       <div className="flex justify-between text-sm">
// //                         <span className="text-gray-600">Total Stok:</span>
// //                         <span className="font-semibold">{equipment.stock_quantity} unit</span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Price */}
// //                   <div className="mb-4">
// //                     <div className="text-2xl font-bold text-green-600">
// //                       Rp {equipment.price_per_day.toLocaleString()}
// //                     </div>
// //                     <div className="text-sm text-gray-600">per hari</div>
// //                   </div>

// //                   {/* Actions */}
// //                   <div className="flex gap-2">
// //                     <Button 
// //                       size="sm" 
// //                       variant="outline"
// //                       onClick={() => handleEdit(equipment)}
// //                       className="flex-1"
// //                       disabled={loading}
// //                     >
// //                       <Edit className="h-4 w-4 mr-1" />
// //                       Edit
// //                     </Button>
// //                     <Button 
// //                       size="sm" 
// //                       variant="outline"
// //                       onClick={() => handleDelete(equipment)}
// //                       className="text-red-600 hover:text-red-700"
// //                       disabled={loading}
// //                     >
// //                       <Trash2 className="h-4 w-4" />
// //                     </Button>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             );
// //           })}
// //         </div>

// //         {/* Empty state */}
// //         {filteredEquipments.length === 0 && !loading && (
// //           <div className="text-center py-12">
// //             <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
// //             <p className="text-gray-500 text-lg">Tidak ada equipment ditemukan</p>
// //             <Button 
// //               onClick={() => setShowAddModal(true)}
// //               className="mt-4 bg-green-600 hover:bg-green-700"
// //             >
// //               <Plus className="h-4 w-4 mr-2" />
// //               Tambah Equipment Pertama
// //             </Button>
// //           </div>
// //         )}
// //       </div>

// //       {/* ✅ ENHANCED ADD/EDIT MODAL WITH CODE VALIDATION */}
// //       {showAddModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //           <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
// //             <CardHeader>
// //               <div className="flex items-center justify-between">
// //                 <CardTitle>
// //                   {editingEquipment ? 'Edit Equipment' : 'Tambah Equipment Baru'}
// //                 </CardTitle>
// //                 <Button 
// //                   variant="ghost" 
// //                   size="sm"
// //                   onClick={resetForm}
// //                 >
// //                   <X className="h-4 w-4" />
// //                 </Button>
// //               </div>
// //             </CardHeader>
// //             <CardContent>
// //               <form onSubmit={handleSubmit} className="space-y-4">
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2">Nama Equipment *</label>
// //                     <Input
// //                       value={formData.name}
// //                       onChange={(e) => setFormData({...formData, name: e.target.value})}
// //                       placeholder="Tenda Dome 4 Orang"
// //                       required
// //                     />
// //                   </div>
                  
// //                   {/* ✅ ENHANCED CODE INPUT WITH REAL-TIME VALIDATION */}
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2">Kode Equipment *</label>
// //                     <div className="relative">
// //                       <Input
// //                         value={formData.code}
// //                         onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
// //                         placeholder="TENDA-001"
// //                         required
// //                         className={getCodeInputStyle()}
// //                       />
                      
// //                       {/* ✅ LOADING INDICATOR */}
// //                       {codeValidation.isChecking && (
// //                         <div className="absolute right-3 top-3">
// //                           <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
// //                         </div>
// //                       )}
                      
// //                       {/* ✅ SUCCESS INDICATOR */}
// //                       {formData.code && formData.code.length >= 3 && !codeValidation.isChecking && !codeValidation.isDuplicate && (
// //                         <div className="absolute right-3 top-3">
// //                           <CheckCircle className="h-4 w-4 text-green-600" />
// //                         </div>
// //                       )}
                      
// //                       {/* ✅ ERROR INDICATOR */}
// //                       {codeValidation.isDuplicate && (
// //                         <div className="absolute right-3 top-3">
// //                           <AlertTriangle className="h-4 w-4 text-red-600" />
// //                         </div>
// //                       )}
// //                     </div>
                    
// //                     {/* ✅ VALIDATION MESSAGE */}
// //                     {formData.code && formData.code.length >= 3 && codeValidation.message && (
// //                       <p className={`text-xs mt-1 ${
// //                         codeValidation.isDuplicate ? 'text-red-600' : 
// //                         codeValidation.isChecking ? 'text-yellow-600' : 'text-green-600'
// //                       }`}>
// //                         {codeValidation.isDuplicate ? '❌ ' : 
// //                          codeValidation.isChecking ? '⏳ ' : '✅ '}
// //                         {codeValidation.message}
// //                       </p>
// //                     )}
                    
// //                     {/* ✅ CODE FORMAT HINT */}
// //                     <p className="text-xs text-gray-500 mt-1">
// //                       💡 Format: KATEGORI-XXX (contoh: TENDA-001, TAS-002)
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium mb-2">Deskripsi</label>
// //                   <Textarea
// //                     value={formData.description}
// //                     onChange={(e) => setFormData({...formData, description: e.target.value})}
// //                     placeholder="Deskripsi detail equipment..."
// //                     rows={3}
// //                   />
// //                 </div>

// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2">Kategori *</label>
// //                     <select
// //                       value={formData.category}
// //                       onChange={(e) => setFormData({...formData, category: e.target.value})}
// //                       className="w-full px-3 py-2 border rounded-md"
// //                       required
// //                     >
// //                       <option value="tenda">Tenda</option>
// //                       <option value="tas">Tas Gunung</option>
// //                       <option value="sleeping_bag">Sleeping Bag</option>
// //                       <option value="kompor">Kompor</option>
// //                       <option value="matras">Matras</option>
// //                     </select>
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2">Kapasitas/Ukuran</label>
// //                     <Input
// //                       value={formData.size_capacity}
// //                       onChange={(e) => setFormData({...formData, size_capacity: e.target.value})}
// //                       placeholder="4-6 Orang / 60 Liter"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2">Kondisi *</label>
// //                     <select
// //                       value={formData.condition}
// //                       onChange={(e) => setFormData({...formData, condition: e.target.value})}
// //                       className="w-full px-3 py-2 border rounded-md"
// //                       required
// //                     >
// //                       <option value="baik">Baik</option>
// //                       <option value="rusak_ringan">Rusak Ringan</option>
// //                       <option value="perbaikan">Perbaikan</option>
// //                     </select>
// //                   </div>
// //                 </div>

// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2">Dimensi</label>
// //                     <Input
// //                       value={formData.dimensions}
// //                       onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
// //                       placeholder="300x250x180 cm"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2">Berat (kg)</label>
// //                     <Input
// //                       type="number"
// //                       step="0.1"
// //                       value={formData.weight}
// //                       onChange={(e) => setFormData({...formData, weight: e.target.value})}
// //                       placeholder="8.5"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2">Material</label>
// //                     <Input
// //                       value={formData.material}
// //                       onChange={(e) => setFormData({...formData, material: e.target.value})}
// //                       placeholder="Nylon 210T"
// //                     />
// //                   </div>
// //                 </div>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2">Jumlah Stok *</label>
// //                     <Input
// //                       type="number"
// //                       min="0"
// //                       value={formData.stock_quantity}
// //                       onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
// //                       placeholder="5"
// //                       required
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2">Harga per Hari (Rp) *</label>
// //                     <Input
// //                       type="number"
// //                       min="0"
// //                       value={formData.price_per_day}
// //                       onChange={(e) => setFormData({...formData, price_per_day: e.target.value})}
// //                       placeholder="60000"
// //                       required
// //                     />
// //                   </div>
// //                 </div>

// //                 <div className="flex gap-2 pt-4 border-t">
// //                   <Button 
// //                     type="submit" 
// //                     className="bg-green-600 hover:bg-green-700"
// //                     disabled={loading || codeValidation.isDuplicate || codeValidation.isChecking}
// //                   >
// //                     {loading ? (
// //                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
// //                     ) : null}
// //                     {editingEquipment ? 'Update Equipment' : 'Tambah Equipment'}
// //                   </Button>
// //                   <Button 
// //                     type="button" 
// //                     variant="outline"
// //                     onClick={resetForm}
// //                     disabled={loading}
// //                   >
// //                     Batal
// //                   </Button>
// //                 </div>
// //               </form>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EquipmentManagement;



// import { useState, useEffect, useCallback } from "react";
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
//   RefreshCw,
//   Loader2,
//   X,
//   CheckCircle
// } from "lucide-react";

// const EquipmentManagement = () => {
//   const [equipments, setEquipments] = useState([]);
//   const [filteredEquipments, setFilteredEquipments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [conditionFilter, setConditionFilter] = useState("all");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingEquipment, setEditingEquipment] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ STATE UNTUK CODE VALIDATION
//   const [codeValidation, setCodeValidation] = useState({
//     isChecking: false,
//     isDuplicate: false,
//     message: ''
//   });

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

//   useEffect(() => {
//     fetchEquipments();
//   }, []);

//   const fetchEquipments = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php');
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       if (Array.isArray(data)) {
//         setEquipments(data);
//         setFilteredEquipments(data);
//       } else {
//         setEquipments([]);
//         setFilteredEquipments([]);
//       }
      
//     } catch (err) {
//       console.error('❌ Error fetching equipment:', err);
//       setError('Gagal memuat equipment: ' + err.message);
      
//       // Fallback mock data
//       const mockEquipments = [
//         {
//           equipment_id: 1,
//           name: "Tenda Dome 4-6 Orang (MOCK)",
//           code: "TENDA-001",
//           description: "Tenda berkualitas tinggi untuk 4-6 orang",
//           category: "tenda",
//           size_capacity: "4-6 Orang",
//           dimensions: "300x250x180 cm",
//           weight: 8.5,
//           material: "Nylon 210T Waterproof",
//           stock_quantity: 5,
//           price_per_day: 60000,
//           condition: "baik",
//           available_stock: 3,
//           reserved_stock: 1,
//           rented_stock: 1,
//           created_at: "2024-01-15"
//         }
//       ];
      
//       setEquipments(mockEquipments);
//       setFilteredEquipments(mockEquipments);
      
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ DEBOUNCED CODE CHECK FUNCTION
//   const checkCodeAvailability = useCallback(
//     async (code, excludeId = null) => {
//       if (!code || code.length < 3) {
//         setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//         return;
//       }

//       setCodeValidation({ isChecking: true, isDuplicate: false, message: 'Mengecek ketersediaan kode...' });

//       try {
//         const url = excludeId 
//           ? `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}&exclude_id=${excludeId}`
//           : `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}`;
        
//         const response = await fetch(url);
//         const result = await response.json();

//         if (response.ok) {
//           // ✅ SMART MESSAGE HANDLING
//           let message = result.message;
//           if (editingEquipment && !result.exists && code === editingEquipment.code) {
//             message = 'Kode tidak berubah dari sebelumnya';
//           }

//           setCodeValidation({
//             isChecking: false,
//             isDuplicate: result.exists,
//             message: message
//           });
//         } else {
//           setCodeValidation({
//             isChecking: false,
//             isDuplicate: false,
//             message: ''
//           });
//         }

//       } catch (error) {
//         console.error('Error checking code:', error);
//         setCodeValidation({
//           isChecking: false, 
//           isDuplicate: false, 
//           message: ''
//         });
//       }
//     }, [editingEquipment]
//   );

//   // ✅ DEBOUNCED CODE CHECK (500ms delay)
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (formData.code && formData.code.length >= 3) {
//         const excludeId = editingEquipment ? editingEquipment.equipment_id : null;
//         checkCodeAvailability(formData.code, excludeId);
//       } else {
//         setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//       }
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [formData.code, editingEquipment, checkCodeAvailability]);

//   // Filter equipments
//   useEffect(() => {
//     let filtered = equipments;
    
//     if (searchTerm) {
//       filtered = filtered.filter(equipment => 
//         equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         equipment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         equipment.category.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     if (categoryFilter !== "all") {
//       filtered = filtered.filter(equipment => equipment.category === categoryFilter);
//     }
    
//     if (conditionFilter !== "all") {
//       filtered = filtered.filter(equipment => equipment.condition === conditionFilter);
//     }
    
//     setFilteredEquipments(filtered);
//   }, [equipments, searchTerm, categoryFilter, conditionFilter]);

//   // ✅ ENHANCED HANDLE SUBMIT WITH VALIDATION
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Check for duplicate before submit
//     if (codeValidation.isDuplicate) {
//       alert('❌ Kode equipment sudah digunakan! Silakan gunakan kode lain.');
//       return;
//     }

//     // Wait for validation if still checking
//     if (codeValidation.isChecking) {
//       alert('⏳ Sedang mengecek kode, tunggu sebentar...');
//       return;
//     }

//     // ✅ Additional validation for edit mode
//     if (editingEquipment && formData.code !== editingEquipment.code) {
//       // Code changed during edit, must be valid
//       if (!codeValidation.message || codeValidation.isDuplicate) {
//         alert('⚠️ Kode baru belum divalidasi. Tunggu proses pengecekan selesai.');
//         return;
//       }
//     }
    
//     setLoading(true);

//     try {
//       const equipmentData = {
//         ...formData,
//         weight: formData.weight ? parseFloat(formData.weight) : null,
//         stock_quantity: parseInt(formData.stock_quantity),
//         price_per_day: parseFloat(formData.price_per_day)
//       };

//       let response;
//       const url = 'http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php';
      
//       if (editingEquipment) {
//         response = await fetch(url, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             equipment_id: editingEquipment.equipment_id,
//             ...equipmentData
//           })
//         });
//       } else {
//         response = await fetch(url, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(equipmentData)
//         });
//       }

//       const result = await response.json();

//       if (response.ok && result.success) {
//         alert(editingEquipment ? '✅ Equipment berhasil diupdate!' : '✅ Equipment berhasil ditambahkan!');
//         await fetchEquipments();
//         resetForm();
//       } else {
//         throw new Error(result.message || 'Gagal menyimpan equipment');
//       }

//     } catch (err) {
//       console.error('❌ Error saving equipment:', err);
//       alert('Error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (equipment) => {
//     if (!confirm(`Yakin ingin menghapus "${equipment.name}"?`)) return;

//     try {
//       setLoading(true);
      
//       const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?id=${equipment.equipment_id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         alert('✅ Equipment berhasil dihapus!');
//         await fetchEquipments();
//       } else {
//         throw new Error(result.message || 'Gagal menghapus equipment');
//       }
//     } catch (err) {
//       console.error('❌ Error deleting equipment:', err);
//       alert('Error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ ENHANCED HANDLE EDIT
//   const handleEdit = (equipment) => {
//     setFormData({
//       name: equipment.name,
//       code: equipment.code,
//       description: equipment.description || '',
//       category: equipment.category,
//       size_capacity: equipment.size_capacity || '',
//       dimensions: equipment.dimensions || '',
//       weight: equipment.weight ? equipment.weight.toString() : '',
//       material: equipment.material || '',
//       stock_quantity: equipment.stock_quantity.toString(),
//       price_per_day: equipment.price_per_day.toString(),
//       condition: equipment.condition
//     });
    
//     // ✅ Reset validation state for edit mode
//     setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//     setEditingEquipment(equipment);
//     setShowAddModal(true);
//   };

//   // ✅ RESET FORM WITH CODE VALIDATION
//   const resetForm = () => {
//     setFormData({
//       name: "", code: "", description: "", category: "tenda",
//       size_capacity: "", dimensions: "", weight: "", material: "",
//       stock_quantity: "", price_per_day: "", condition: "baik"
//     });
//     setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//     setShowAddModal(false);
//     setEditingEquipment(null);
//   };

//   // ✅ GET INPUT BORDER COLOR BASED ON VALIDATION
//   const getCodeInputStyle = () => {
//     if (!formData.code || formData.code.length < 3) return '';
//     if (codeValidation.isChecking) return 'border-yellow-400 bg-yellow-50';
//     if (codeValidation.isDuplicate) return 'border-red-400 bg-red-50';
//     return 'border-green-400 bg-green-50';
//   };

//   const getStockStatus = (equipment) => {
//     const available = equipment.available_stock || equipment.stock_quantity;
//     if (available === 0) return { color: 'bg-red-500', text: 'Habis' };
//     if (available <= 2) return { color: 'bg-yellow-500', text: 'Stok Rendah' };
//     return { color: 'bg-green-500', text: 'Tersedia' };
//   };

//   const getConditionColor = (condition) => {
//     switch(condition) {
//       case 'baik': return 'bg-green-500';
//       case 'rusak_ringan': return 'bg-yellow-500';
//       case 'perbaikan': return 'bg-red-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const stats = {
//     total: equipments.length,
//     available: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) > 0).length,
//     lowStock: equipments.filter(eq => {
//       const available = eq.available_stock || eq.stock_quantity;
//       return available <= 2 && available > 0;
//     }).length,
//     outOfStock: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) === 0).length,
//     totalValue: equipments.reduce((sum, eq) => sum + (eq.price_per_day * eq.stock_quantity), 0)
//   };

//   if (loading && equipments.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
//           <p className="text-gray-600">Memuat equipment dari database...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HEADER */}
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
//                 disabled={loading}
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Tambah Equipment
//               </Button>
//               <Button 
//                 variant="outline" 
//                 onClick={fetchEquipments}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                 ) : (
//                   <RefreshCw className="h-4 w-4 mr-2" />
//                 )}
//                 Refresh
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         {/* ERROR ALERT */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
//             <div className="flex items-center gap-2">
//               <AlertTriangle className="h-5 w-5 text-red-600" />
//               <div>
//                 <p className="text-red-800 font-medium">Database Connection Error</p>
//                 <p className="text-red-600 text-sm">{error}</p>
//                 <p className="text-red-600 text-sm">Menampilkan data mock untuk development.</p>
//               </div>
//             </div>
//             <Button 
//               onClick={fetchEquipments}
//               size="sm"
//               className="mt-2 bg-red-600 hover:bg-red-700"
//             >
//               Coba Lagi
//             </Button>
//           </div>
//         )}

//         {/* STATS CARDS */}
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

//         {/* FILTERS */}
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

//         {/* EQUIPMENT GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredEquipments.map((equipment) => {
//             const stockStatus = getStockStatus(equipment);
//             const available = equipment.available_stock || equipment.stock_quantity;
//             const reserved = equipment.reserved_stock || 0;
//             const rented = equipment.rented_stock || 0;
            
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
//                     <div className="flex flex-col gap-1">
//                       <Badge className={`${stockStatus.color} text-white text-xs`}>
//                         {stockStatus.text}
//                       </Badge>
//                       <Badge className={`${getConditionColor(equipment.condition)} text-white text-xs`}>
//                         {equipment.condition}
//                       </Badge>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   {equipment.description && (
//                     <p className="text-sm text-gray-600 mb-3">{equipment.description}</p>
//                   )}

//                   {/* Stock Info */}
//                   <div className="bg-gray-50 p-3 rounded-lg mb-4">
//                     <div className="grid grid-cols-3 gap-2 text-center text-sm">
//                       <div>
//                         <div className="font-semibold text-green-600">{available}</div>
//                         <div className="text-xs text-gray-600">Tersedia</div>
//                       </div>
//                       <div>
//                         <div className="font-semibold text-yellow-600">{reserved}</div>
//                         <div className="text-xs text-gray-600">Reserved</div>
//                       </div>
//                       <div>
//                         <div className="font-semibold text-blue-600">{rented}</div>
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
//                       disabled={loading}
//                     >
//                       <Edit className="h-4 w-4 mr-1" />
//                       Edit
//                     </Button>
//                     <Button 
//                       size="sm" 
//                       variant="outline"
//                       onClick={() => handleDelete(equipment)}
//                       className="text-red-600 hover:text-red-700"
//                       disabled={loading}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Empty state */}
//         {filteredEquipments.length === 0 && !loading && (
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

//       {/* ✅ ENHANCED ADD/EDIT MODAL WITH REAL-TIME CODE VALIDATION */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle>
//                   {editingEquipment ? 'Edit Equipment' : 'Tambah Equipment Baru'}
//                 </CardTitle>
//                 <Button 
//                   variant="ghost" 
//                   size="sm"
//                   onClick={resetForm}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Nama Equipment *</label>
//                     <Input
//                       value={formData.name}
//                       onChange={(e) => setFormData({...formData, name: e.target.value})}
//                       placeholder="Tenda Dome 4 Orang"
//                       required
//                     />
//                   </div>
                  
//                   {/* ✅ ENHANCED CODE INPUT WITH REAL-TIME VALIDATION */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kode Equipment *</label>
//                     <div className="relative">
//                       <Input
//                         value={formData.code}
//                         onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
//                         placeholder="TENDA-001"
//                         required
//                         className={getCodeInputStyle()}
//                       />
                      
//                       {/* ✅ LOADING INDICATOR */}
//                       {codeValidation.isChecking && (
//                         <div className="absolute right-3 top-3">
//                           <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
//                         </div>
//                       )}
                      
//                       {/* ✅ SUCCESS INDICATOR */}
//                       {formData.code && formData.code.length >= 3 && !codeValidation.isChecking && !codeValidation.isDuplicate && (
//                         <div className="absolute right-3 top-3">
//                           <CheckCircle className="h-4 w-4 text-green-600" />
//                         </div>
//                       )}
                      
//                       {/* ✅ ERROR INDICATOR */}
//                       {codeValidation.isDuplicate && (
//                         <div className="absolute right-3 top-3">
//                           <AlertTriangle className="h-4 w-4 text-red-600" />
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* ✅ ENHANCED VALIDATION MESSAGE */}
//                     {formData.code && formData.code.length >= 3 && codeValidation.message && (
//                       <p className={`text-xs mt-1 ${
//                         codeValidation.isDuplicate ? 'text-red-600' : 
//                         codeValidation.isChecking ? 'text-yellow-600' : 
//                         editingEquipment && formData.code === editingEquipment.code ? 'text-blue-600' : 'text-green-600'
//                       }`}>
//                         {codeValidation.isDuplicate ? '❌ ' : 
//                          codeValidation.isChecking ? '⏳ ' : 
//                          editingEquipment && formData.code === editingEquipment.code ? '📝 ' : '✅ '}
//                         {codeValidation.message}
//                       </p>
//                     )}
                    
//                     {/* ✅ CODE FORMAT HINT */}
//                     <p className="text-xs text-gray-500 mt-1">
//                       💡 Format: KATEGORI-XXX (contoh: TENDA-001, TAS-002)
//                     </p>
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
//                     <label className="block text-sm font-medium mb-2">Kategori *</label>
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
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kondisi *</label>
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
//                     <label className="block text-sm font-medium mb-2">Jumlah Stok *</label>
//                     <Input
//                       type="number"
//                       min="0"
//                       value={formData.stock_quantity}
//                       onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
//                       placeholder="5"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Harga per Hari (Rp) *</label>
//                     <Input
//                       type="number"
//                       min="0"
//                       value={formData.price_per_day}
//                       onChange={(e) => setFormData({...formData, price_per_day: e.target.value})}
//                       placeholder="60000"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-2 pt-4 border-t">
//                   <Button 
//                     type="submit" 
//                     className="bg-green-600 hover:bg-green-700"
//                     disabled={loading || codeValidation.isDuplicate || codeValidation.isChecking}
//                   >
//                     {loading ? (
//                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                     ) : null}
//                     {editingEquipment ? 'Update Equipment' : 'Tambah Equipment'}
//                   </Button>
//                   <Button 
//                     type="button" 
//                     variant="outline"
//                     onClick={resetForm}
//                     disabled={loading}
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

// import { useState, useEffect, useCallback } from "react";
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
//   RefreshCw,
//   Loader2,
//   X,
//   CheckCircle,
//   Upload,
//   Image as ImageIcon
// } from "lucide-react";

// const EquipmentManagement = () => {
//   const [equipments, setEquipments] = useState([]);
//   const [filteredEquipments, setFilteredEquipments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [conditionFilter, setConditionFilter] = useState("all");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingEquipment, setEditingEquipment] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ STATE UNTUK CODE VALIDATION
//   const [codeValidation, setCodeValidation] = useState({
//     isChecking: false,
//     isDuplicate: false,
//     message: ''
//   });

//   // ✅ IMAGE UPLOAD STATES
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [uploadingImage, setUploadingImage] = useState(false);

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

//   useEffect(() => {
//     fetchEquipments();
//   }, []);

//   const fetchEquipments = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php');
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       if (Array.isArray(data)) {
//         setEquipments(data);
//         setFilteredEquipments(data);
//       } else {
//         setEquipments([]);
//         setFilteredEquipments([]);
//       }
      
//     } catch (err) {
//       console.error('❌ Error fetching equipment:', err);
//       setError('Gagal memuat equipment: ' + err.message);
      
//       // Fallback mock data
//       const mockEquipments = [
//         {
//           equipment_id: 1,
//           name: "Tenda Dome 4-6 Orang (MOCK)",
//           code: "TENDA-001",
//           description: "Tenda berkualitas tinggi untuk 4-6 orang",
//           category: "tenda",
//           size_capacity: "4-6 Orang",
//           dimensions: "300x250x180 cm",
//           weight: 8.5,
//           material: "Nylon 210T Waterproof",
//           stock_quantity: 5,
//           price_per_day: 60000,
//           condition: "baik",
//           available_stock: 3,
//           reserved_stock: 1,
//           rented_stock: 1,
//           image_url: null,
//           created_at: "2024-01-15"
//         }
//       ];
      
//       setEquipments(mockEquipments);
//       setFilteredEquipments(mockEquipments);
      
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ CODE VALIDATION
//   const checkCodeAvailability = useCallback(
//     async (code, excludeId = null) => {
//       if (!code || code.length < 3) {
//         setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//         return;
//       }

//       setCodeValidation({ isChecking: true, isDuplicate: false, message: 'Mengecek ketersediaan kode...' });

//       try {
//         const url = excludeId 
//           ? `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}&exclude_id=${excludeId}`
//           : `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}`;
        
//         const response = await fetch(url);
//         const result = await response.json();

//         if (response.ok) {
//           let message = result.message;
//           if (editingEquipment && !result.exists && code === editingEquipment.code) {
//             message = 'Kode tidak berubah dari sebelumnya';
//           }

//           setCodeValidation({
//             isChecking: false,
//             isDuplicate: result.exists,
//             message: message
//           });
//         } else {
//           setCodeValidation({
//             isChecking: false,
//             isDuplicate: false,
//             message: ''
//           });
//         }

//       } catch (error) {
//         console.error('Error checking code:', error);
//         setCodeValidation({
//           isChecking: false, 
//           isDuplicate: false, 
//           message: ''
//         });
//       }
//     }, [editingEquipment]
//   );

//   // ✅ IMAGE HANDLING
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         alert('⚠️ Ukuran gambar maksimal 5MB');
//         return;
//       }
      
//       const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//       if (!allowedTypes.includes(file.type)) {
//         alert('⚠️ Format file harus JPG, PNG, GIF, atau WEBP');
//         return;
//       }
      
//       setImageFile(file);
      
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const uploadImage = async (equipmentCode) => {
//     if (!imageFile) return null;
    
//     setUploadingImage(true);
    
//     try {
//       const formData = new FormData();
//       formData.append('image', imageFile);
//       formData.append('equipment_code', equipmentCode);
      
//       const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/upload/image.php', {
//         method: 'POST',
//         body: formData
//       });
      
//       const result = await response.json();
      
//       if (result.success) {
//         return result.image_url;
//       } else {
//         throw new Error(result.message);
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       throw error;
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   // ✅ DEBOUNCED CODE CHECK
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (formData.code && formData.code.length >= 3) {
//         const excludeId = editingEquipment ? editingEquipment.equipment_id : null;
//         checkCodeAvailability(formData.code, excludeId);
//       } else {
//         setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//       }
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [formData.code, editingEquipment, checkCodeAvailability]);

//   // Filter equipments
//   useEffect(() => {
//     let filtered = equipments;
    
//     if (searchTerm) {
//       filtered = filtered.filter(equipment => 
//         equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         equipment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         equipment.category.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     if (categoryFilter !== "all") {
//       filtered = filtered.filter(equipment => equipment.category === categoryFilter);
//     }
    
//     if (conditionFilter !== "all") {
//       filtered = filtered.filter(equipment => equipment.condition === conditionFilter);
//     }
    
//     setFilteredEquipments(filtered);
//   }, [equipments, searchTerm, categoryFilter, conditionFilter]);

//   // ✅ ENHANCED SUBMIT WITH IMAGE UPLOAD
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (codeValidation.isDuplicate) {
//       alert('❌ Kode equipment sudah digunakan! Silakan gunakan kode lain.');
//       return;
//     }

//     if (codeValidation.isChecking) {
//       alert('⏳ Sedang mengecek kode, tunggu sebentar...');
//       return;
//     }
    
//     setLoading(true);

//     try {
//       let image_url = editingEquipment ? editingEquipment.image_url : null;
      
//       // Upload image if new file selected
//       if (imageFile) {
//         image_url = await uploadImage(formData.code);
//       }
      
//       const equipmentData = {
//         ...formData,
//         image_url,
//         weight: formData.weight ? parseFloat(formData.weight) : null,
//         stock_quantity: parseInt(formData.stock_quantity),
//         price_per_day: parseFloat(formData.price_per_day)
//       };

//       let response;
//       const url = 'http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php';
      
//       if (editingEquipment) {
//         response = await fetch(url, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             equipment_id: editingEquipment.equipment_id,
//             ...equipmentData
//           })
//         });
//       } else {
//         response = await fetch(url, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(equipmentData)
//         });
//       }

//       const result = await response.json();

//       if (response.ok && result.success) {
//         alert(editingEquipment ? '✅ Equipment berhasil diupdate!' : '✅ Equipment berhasil ditambahkan!');
//         await fetchEquipments();
//         resetForm();
//       } else {
//         throw new Error(result.message || 'Gagal menyimpan equipment');
//       }

//     } catch (err) {
//       console.error('❌ Error saving equipment:', err);
//       alert('Error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (equipment) => {
//     if (!confirm(`Yakin ingin menghapus "${equipment.name}"?`)) return;

//     try {
//       setLoading(true);
      
//       const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?id=${equipment.equipment_id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         alert('✅ Equipment berhasil dihapus!');
//         await fetchEquipments();
//       } else {
//         throw new Error(result.message || 'Gagal menghapus equipment');
//       }
//     } catch (err) {
//       console.error('❌ Error deleting equipment:', err);
//       alert('Error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (equipment) => {
//     setFormData({
//       name: equipment.name,
//       code: equipment.code,
//       description: equipment.description || '',
//       category: equipment.category,
//       size_capacity: equipment.size_capacity || '',
//       dimensions: equipment.dimensions || '',
//       weight: equipment.weight ? equipment.weight.toString() : '',
//       material: equipment.material || '',
//       stock_quantity: equipment.stock_quantity.toString(),
//       price_per_day: equipment.price_per_day.toString(),
//       condition: equipment.condition
//     });
    
//     setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//     setImageFile(null);
//     setImagePreview(null);
//     setEditingEquipment(equipment);
//     setShowAddModal(true);
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "", code: "", description: "", category: "tenda",
//       size_capacity: "", dimensions: "", weight: "", material: "",
//       stock_quantity: "", price_per_day: "", condition: "baik"
//     });
//     setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//     setImageFile(null);
//     setImagePreview(null);
//     setShowAddModal(false);
//     setEditingEquipment(null);
//   };

//   const getCodeInputStyle = () => {
//     if (!formData.code || formData.code.length < 3) return '';
//     if (codeValidation.isChecking) return 'border-yellow-400 bg-yellow-50';
//     if (codeValidation.isDuplicate) return 'border-red-400 bg-red-50';
//     return 'border-green-400 bg-green-50';
//   };

//   const getStockStatus = (equipment) => {
//     const available = equipment.available_stock || equipment.stock_quantity;
//     if (available === 0) return { color: 'bg-red-500', text: 'Habis' };
//     if (available <= 2) return { color: 'bg-yellow-500', text: 'Stok Rendah' };
//     return { color: 'bg-green-500', text: 'Tersedia' };
//   };

//   const getConditionColor = (condition) => {
//     switch(condition) {
//       case 'baik': return 'bg-green-500';
//       case 'rusak_ringan': return 'bg-yellow-500';
//       case 'perbaikan': return 'bg-red-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const stats = {
//     total: equipments.length,
//     available: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) > 0).length,
//     lowStock: equipments.filter(eq => {
//       const available = eq.available_stock || eq.stock_quantity;
//       return available <= 2 && available > 0;
//     }).length,
//     outOfStock: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) === 0).length,
//     totalValue: equipments.reduce((sum, eq) => sum + (eq.price_per_day * eq.stock_quantity), 0)
//   };

//   if (loading && equipments.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
//           <p className="text-gray-600">Memuat equipment dari database...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HEADER */}
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
//                 disabled={loading}
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Tambah Equipment
//               </Button>
//               <Button 
//                 variant="outline" 
//                 onClick={fetchEquipments}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                 ) : (
//                   <RefreshCw className="h-4 w-4 mr-2" />
//                 )}
//                 Refresh
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         {/* ERROR ALERT */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
//             <div className="flex items-center gap-2">
//               <AlertTriangle className="h-5 w-5 text-red-600" />
//               <div>
//                 <p className="text-red-800 font-medium">Database Connection Error</p>
//                 <p className="text-red-600 text-sm">{error}</p>
//                 <p className="text-red-600 text-sm">Menampilkan data mock untuk development.</p>
//               </div>
//             </div>
//             <Button 
//               onClick={fetchEquipments}
//               size="sm"
//               className="mt-2 bg-red-600 hover:bg-red-700"
//             >
//               Coba Lagi
//             </Button>
//           </div>
//         )}

//         {/* STATS CARDS */}
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

//         {/* FILTERS */}
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

//         {/* ✅ EQUIPMENT GRID WITH IMAGE DISPLAY */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredEquipments.map((equipment) => {
//             const stockStatus = getStockStatus(equipment);
//             const available = equipment.available_stock || equipment.stock_quantity;
//             const reserved = equipment.reserved_stock || 0;
//             const rented = equipment.rented_stock || 0;
            
//             return (
//               <Card key={equipment.equipment_id} className="overflow-hidden">
//                 <CardContent className="p-6">
//                   {/* ✅ IMAGE SECTION */}
//                   {equipment.image_url ? (
//                     <div className="mb-4">
//                       <img 
//                         src={`http://localhost${equipment.image_url}`}
//                         alt={equipment.name}
//                         className="w-full h-48 object-cover rounded-lg"
//                         onError={(e) => {
//                           (e.target as HTMLImageElement).style.display = 'none';
//                         }}
//                       />
//                     </div>
//                   ) : (
//                     <div className="mb-4 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
//                       <div className="text-center text-gray-500">
//                         <ImageIcon className="h-12 w-12 mx-auto mb-2" />
//                         <p className="text-sm">Tidak ada gambar</p>
//                       </div>
//                     </div>
//                   )}
                  
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
//                     <div className="flex flex-col gap-1">
//                       <Badge className={`${stockStatus.color} text-white text-xs`}>
//                         {stockStatus.text}
//                       </Badge>
//                       <Badge className={`${getConditionColor(equipment.condition)} text-white text-xs`}>
//                         {equipment.condition}
//                       </Badge>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   {equipment.description && (
//                     <p className="text-sm text-gray-600 mb-3">{equipment.description}</p>
//                   )}

//                   {/* Stock Info */}
//                   <div className="bg-gray-50 p-3 rounded-lg mb-4">
//                     <div className="grid grid-cols-3 gap-2 text-center text-sm">
//                       <div>
//                         <div className="font-semibold text-green-600">{available}</div>
//                         <div className="text-xs text-gray-600">Tersedia</div>
//                       </div>
//                       <div>
//                         <div className="font-semibold text-yellow-600">{reserved}</div>
//                         <div className="text-xs text-gray-600">Reserved</div>
//                       </div>
//                       <div>
//                         <div className="font-semibold text-blue-600">{rented}</div>
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
//                       disabled={loading}
//                     >
//                       <Edit className="h-4 w-4 mr-1" />
//                       Edit
//                     </Button>
//                     <Button 
//                       size="sm" 
//                       variant="outline"
//                       onClick={() => handleDelete(equipment)}
//                       className="text-red-600 hover:text-red-700"
//                       disabled={loading}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Empty state */}
//         {filteredEquipments.length === 0 && !loading && (
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

//       {/* ✅ ENHANCED ADD/EDIT MODAL WITH IMAGE UPLOAD */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle>
//                   {editingEquipment ? 'Edit Equipment' : 'Tambah Equipment Baru'}
//                 </CardTitle>
//                 <Button 
//                   variant="ghost" 
//                   size="sm"
//                   onClick={resetForm}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
                
//                 {/* ✅ IMAGE UPLOAD SECTION */}
//                 <div className="border-b pb-6">
//                   <h3 className="text-lg font-medium mb-4">📷 Gambar Equipment</h3>
                  
//                   <div className="flex flex-col lg:flex-row gap-6">
//                     {/* Image Preview */}
//                     <div className="lg:w-1/3">
//                       {(imagePreview || editingEquipment?.image_url) ? (
//                         <div className="relative">
//                           <img 
//                             src={imagePreview || `http://localhost${editingEquipment.image_url}`}
//                             alt="Equipment preview"
//                             className="w-full h-48 object-cover rounded-lg border"
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).style.display = 'none';
//                             }}
//                           />
//                           {imagePreview && (
//                             <Button
//                               type="button"
//                               variant="destructive"
//                               size="sm"
//                               className="absolute top-2 right-2"
//                               onClick={() => {
//                                 setImageFile(null);
//                                 setImagePreview(null);
//                               }}
//                             >
//                               <X className="h-3 w-3" />
//                             </Button>
//                           )}
//                         </div>
//                       ) : (
//                         <div className="w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
//                           <div className="text-center text-gray-500">
//                             <ImageIcon className="h-12 w-12 mx-auto mb-2" />
//                             <p className="text-sm">Belum ada gambar</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Upload Controls */}
//                     <div className="lg:w-2/3">
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium mb-2">
//                             Upload Gambar Baru
//                           </label>
//                           <input
//                             type="file"
//                             accept="image/*"
//                             onChange={handleImageChange}
//                             className="block w-full text-sm text-gray-500
//                                        file:mr-4 file:py-2 file:px-4
//                                        file:rounded-lg file:border-0
//                                        file:text-sm file:font-medium
//                                        file:bg-green-50 file:text-green-700
//                                        hover:file:bg-green-100 cursor-pointer"
//                           />
//                         </div>
                        
//                         <div className="bg-blue-50 p-3 rounded-lg">
//                           <h4 className="font-medium text-blue-900 mb-2">📋 Panduan Upload:</h4>
//                           <ul className="text-sm text-blue-800 space-y-1">
//                             <li>• Format: JPG, PNG, GIF, WEBP</li>
//                             <li>• Ukuran maksimal: 5MB</li>
//                             <li>• Resolusi direkomendasikan: 800x600px</li>
//                             <li>• Gambar akan disimpan dengan nama kode equipment</li>
//                           </ul>
//                         </div>
                        
//                         {uploadingImage && (
//                           <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
//                             <Loader2 className="h-4 w-4 animate-spin mr-2 text-yellow-600" />
//                             <span className="text-sm text-yellow-800">Mengupload gambar...</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* FORM FIELDS */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Nama Equipment *</label>
//                     <Input
//                       value={formData.name}
//                       onChange={(e) => setFormData({...formData, name: e.target.value})}
//                       placeholder="Tenda Dome 4 Orang"
//                       required
//                     />
//                   </div>
                  
//                   {/* CODE INPUT WITH VALIDATION */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kode Equipment *</label>
//                     <div className="relative">
//                       <Input
//                         value={formData.code}
//                         onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
//                         placeholder="TENDA-001"
//                         required
//                         className={getCodeInputStyle()}
//                       />
                      
//                       {codeValidation.isChecking && (
//                         <div className="absolute right-3 top-3">
//                           <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
//                         </div>
//                       )}
                      
//                       {formData.code && formData.code.length >= 3 && !codeValidation.isChecking && !codeValidation.isDuplicate && (
//                         <div className="absolute right-3 top-3">
//                           <CheckCircle className="h-4 w-4 text-green-600" />
//                         </div>
//                       )}
                      
//                       {codeValidation.isDuplicate && (
//                         <div className="absolute right-3 top-3">
//                           <AlertTriangle className="h-4 w-4 text-red-600" />
//                         </div>
//                       )}
//                     </div>
                    
//                     {formData.code && formData.code.length >= 3 && codeValidation.message && (
//                       <p className={`text-xs mt-1 ${
//                         codeValidation.isDuplicate ? 'text-red-600' : 
//                         codeValidation.isChecking ? 'text-yellow-600' : 
//                         editingEquipment && formData.code === editingEquipment.code ? 'text-blue-600' : 'text-green-600'
//                       }`}>
//                         {codeValidation.isDuplicate ? '❌ ' : 
//                          codeValidation.isChecking ? '⏳ ' : 
//                          editingEquipment && formData.code === editingEquipment.code ? '📝 ' : '✅ '}
//                         {codeValidation.message}
//                       </p>
//                     )}
                    
//                     <p className="text-xs text-gray-500 mt-1">
//                       💡 Format: KATEGORI-XXX (contoh: TENDA-001, TAS-002)
//                     </p>
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
//                     <label className="block text-sm font-medium mb-2">Kategori *</label>
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
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kondisi *</label>
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
//                     <label className="block text-sm font-medium mb-2">Jumlah Stok *</label>
//                     <Input
//                       type="number"
//                       min="0"
//                       value={formData.stock_quantity}
//                       onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
//                       placeholder="5"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Harga per Hari (Rp) *</label>
//                     <Input
//                       type="number"
//                       min="0"
//                       value={formData.price_per_day}
//                       onChange={(e) => setFormData({...formData, price_per_day: e.target.value})}
//                       placeholder="60000"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-2 pt-4 border-t">
//                   <Button 
//                     type="submit" 
//                     className="bg-green-600 hover:bg-green-700"
//                     disabled={loading || codeValidation.isDuplicate || codeValidation.isChecking || uploadingImage}
//                   >
//                     {(loading || uploadingImage) ? (
//                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                     ) : (
//                       <Upload className="h-4 w-4 mr-2" />
//                     )}
//                     {editingEquipment ? 'Update Equipment' : 'Tambah Equipment'}
//                   </Button>
//                   <Button 
//                     type="button" 
//                     variant="outline"
//                     onClick={resetForm}
//                     disabled={loading || uploadingImage}
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


// import { useState, useEffect, useCallback } from "react";
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
//   RefreshCw,
//   Loader2,
//   X,
//   CheckCircle,
//   Upload,
//   Image as ImageIcon,
//   Weight,
//   Ruler
// } from "lucide-react";

// const EquipmentManagement = () => {
//   const [equipments, setEquipments] = useState([]);
//   const [filteredEquipments, setFilteredEquipments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [conditionFilter, setConditionFilter] = useState("all");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingEquipment, setEditingEquipment] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ STATE UNTUK CODE VALIDATION
//   const [codeValidation, setCodeValidation] = useState({
//     isChecking: false,
//     isDuplicate: false,
//     message: ''
//   });

//   // ✅ IMAGE UPLOAD STATES
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [uploadingImage, setUploadingImage] = useState(false);

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

//   useEffect(() => {
//     fetchEquipments();
//   }, []);

//   const fetchEquipments = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php');
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       if (Array.isArray(data)) {
//         setEquipments(data);
//         setFilteredEquipments(data);
//       } else {
//         setEquipments([]);
//         setFilteredEquipments([]);
//       }
      
//     } catch (err) {
//       console.error('❌ Error fetching equipment:', err);
//       setError('Gagal memuat equipment: ' + err.message);
      
//       // Fallback mock data
//       const mockEquipments = [
//         {
//           equipment_id: 1,
//           name: "Tenda Dome 4-6 Orang (MOCK)",
//           code: "TENDA-001",
//           description: "Tenda berkualitas tinggi untuk 4-6 orang dengan fitur tahan air dan mudah dipasang. Cocok untuk camping keluarga atau petualangan outdoor.",
//           category: "tenda",
//           size_capacity: "4-6 Orang",
//           dimensions: "300x250x180 cm",
//           weight: 8.5,
//           material: "Nylon 210T Waterproof",
//           stock_quantity: 5,
//           price_per_day: 60000,
//           condition: "baik",
//           available_stock: 3,
//           reserved_stock: 1,
//           rented_stock: 1,
//           image_url: null,
//           created_at: "2024-01-15"
//         }
//       ];
      
//       setEquipments(mockEquipments);
//       setFilteredEquipments(mockEquipments);
      
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ CODE VALIDATION
//   const checkCodeAvailability = useCallback(
//     async (code, excludeId = null) => {
//       if (!code || code.length < 3) {
//         setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//         return;
//       }

//       setCodeValidation({ isChecking: true, isDuplicate: false, message: 'Mengecek ketersediaan kode...' });

//       try {
//         const url = excludeId 
//           ? `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}&exclude_id=${excludeId}`
//           : `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}`;
        
//         const response = await fetch(url);
//         const result = await response.json();

//         if (response.ok) {
//           let message = result.message;
//           if (editingEquipment && !result.exists && code === editingEquipment.code) {
//             message = 'Kode tidak berubah dari sebelumnya';
//           }

//           setCodeValidation({
//             isChecking: false,
//             isDuplicate: result.exists,
//             message: message
//           });
//         } else {
//           setCodeValidation({
//             isChecking: false,
//             isDuplicate: false,
//             message: ''
//           });
//         }

//       } catch (error) {
//         console.error('Error checking code:', error);
//         setCodeValidation({
//           isChecking: false, 
//           isDuplicate: false, 
//           message: ''
//         });
//       }
//     }, [editingEquipment]
//   );

//   // ✅ IMAGE HANDLING
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         alert('⚠️ Ukuran gambar maksimal 5MB');
//         return;
//       }
      
//       const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//       if (!allowedTypes.includes(file.type)) {
//         alert('⚠️ Format file harus JPG, PNG, GIF, atau WEBP');
//         return;
//       }
      
//       setImageFile(file);
      
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // ✅ ENHANCED UPLOAD IMAGE WITH BETTER LOGGING
//   const uploadImage = async (equipmentCode) => {
//     if (!imageFile) return null;
    
//     setUploadingImage(true);
    
//     try {
//       const uploadFormData = new FormData(); // ✅ Rename untuk avoid conflict
//       uploadFormData.append('image', imageFile);
//       uploadFormData.append('equipment_code', equipmentCode);
      
//       console.log('📤 Uploading image for equipment:', equipmentCode);
      
//       const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/upload/image.php', {
//         method: 'POST',
//         body: uploadFormData
//       });
      
//       const result = await response.json();
//       console.log('📥 Upload response:', result);
      
//       if (result.success) {
//         console.log('✅ Image uploaded successfully:', result.image_url);
//         return result.image_url;
//       } else {
//         throw new Error(result.message || 'Upload failed');
//       }
//     } catch (error) {
//       console.error('❌ Error uploading image:', error);
//       throw error;
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   // ✅ DEBOUNCED CODE CHECK
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (formData.code && formData.code.length >= 3) {
//         const excludeId = editingEquipment ? editingEquipment.equipment_id : null;
//         checkCodeAvailability(formData.code, excludeId);
//       } else {
//         setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//       }
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [formData.code, editingEquipment, checkCodeAvailability]);

//   // Filter equipments
//   useEffect(() => {
//     let filtered = equipments;
    
//     if (searchTerm) {
//       filtered = filtered.filter(equipment => 
//         equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         equipment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         equipment.category.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     if (categoryFilter !== "all") {
//       filtered = filtered.filter(equipment => equipment.category === categoryFilter);
//     }
    
//     if (conditionFilter !== "all") {
//       filtered = filtered.filter(equipment => equipment.condition === conditionFilter);
//     }
    
//     setFilteredEquipments(filtered);
//   }, [equipments, searchTerm, categoryFilter, conditionFilter]);

//   // ✅ ENHANCED SUBMIT WITH BETTER IMAGE HANDLING
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (codeValidation.isDuplicate) {
//       alert('❌ Kode equipment sudah digunakan! Silakan gunakan kode lain.');
//       return;
//     }

//     if (codeValidation.isChecking) {
//       alert('⏳ Sedang mengecek kode, tunggu sebentar...');
//       return;
//     }
    
//     setLoading(true);

//     try {
//       let image_url = editingEquipment ? editingEquipment.image_url : null;
      
//       // ✅ Upload image if new file selected
//       if (imageFile) {
//         console.log('🖼️ New image file detected, uploading...');
//         image_url = await uploadImage(formData.code);
//         console.log('✅ New image URL:', image_url);
//       }
      
//       const equipmentData = {
//         ...formData,
//         image_url, // ✅ This will be the new URL or existing URL
//         weight: formData.weight ? parseFloat(formData.weight) : null,
//         stock_quantity: parseInt(formData.stock_quantity),
//         price_per_day: parseFloat(formData.price_per_day)
//       };

//       console.log('📤 Sending equipment data:', equipmentData);

//       let response;
//       const url = 'http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php';
      
//       if (editingEquipment) {
//         response = await fetch(url, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             equipment_id: editingEquipment.equipment_id,
//             ...equipmentData
//           })
//         });
//       } else {
//         response = await fetch(url, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(equipmentData)
//         });
//       }

//       const result = await response.json();
//       console.log('📥 API Response:', result);

//       if (response.ok && result.success) {
//         alert(editingEquipment ? '✅ Equipment berhasil diupdate!' : '✅ Equipment berhasil ditambahkan!');
        
//         // ✅ FORCE REFRESH FROM SERVER
//         await fetchEquipments();
//         resetForm();
//       } else {
//         throw new Error(result.message || 'Gagal menyimpan equipment');
//       }

//     } catch (err) {
//       console.error('❌ Error saving equipment:', err);
//       alert('Error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (equipment) => {
//     if (!confirm(`Yakin ingin menghapus "${equipment.name}"?`)) return;

//     try {
//       setLoading(true);
      
//       const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?id=${equipment.equipment_id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         alert('✅ Equipment berhasil dihapus!');
//         await fetchEquipments();
//       } else {
//         throw new Error(result.message || 'Gagal menghapus equipment');
//       }
//     } catch (err) {
//       console.error('❌ Error deleting equipment:', err);
//       alert('Error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (equipment) => {
//     setFormData({
//       name: equipment.name,
//       code: equipment.code,
//       description: equipment.description || '',
//       category: equipment.category,
//       size_capacity: equipment.size_capacity || '',
//       dimensions: equipment.dimensions || '',
//       weight: equipment.weight ? equipment.weight.toString() : '',
//       material: equipment.material || '',
//       stock_quantity: equipment.stock_quantity.toString(),
//       price_per_day: equipment.price_per_day.toString(),
//       condition: equipment.condition
//     });
    
//     setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//     setImageFile(null);
//     setImagePreview(null); // ✅ Reset preview
//     setEditingEquipment(equipment);
//     setShowAddModal(true);
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "", code: "", description: "", category: "tenda",
//       size_capacity: "", dimensions: "", weight: "", material: "",
//       stock_quantity: "", price_per_day: "", condition: "baik"
//     });
//     setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//     setImageFile(null);
//     setImagePreview(null);
//     setShowAddModal(false);
//     setEditingEquipment(null);
//   };

//   const getCodeInputStyle = () => {
//     if (!formData.code || formData.code.length < 3) return '';
//     if (codeValidation.isChecking) return 'border-yellow-400 bg-yellow-50';
//     if (codeValidation.isDuplicate) return 'border-red-400 bg-red-50';
//     return 'border-green-400 bg-green-50';
//   };

//   const getStockStatus = (equipment) => {
//     const available = equipment.available_stock || equipment.stock_quantity;
//     if (available === 0) return { color: 'bg-red-500', text: 'Habis' };
//     if (available <= 2) return { color: 'bg-yellow-500', text: 'Stok Rendah' };
//     return { color: 'bg-green-500', text: 'Tersedia' };
//   };

//   const getConditionColor = (condition) => {
//     switch(condition) {
//       case 'baik': return 'bg-green-500';
//       case 'rusak_ringan': return 'bg-yellow-500';
//       case 'perbaikan': return 'bg-red-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const stats = {
//     total: equipments.length,
//     available: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) > 0).length,
//     lowStock: equipments.filter(eq => {
//       const available = eq.available_stock || eq.stock_quantity;
//       return available <= 2 && available > 0;
//     }).length,
//     outOfStock: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) === 0).length,
//     totalValue: equipments.reduce((sum, eq) => sum + (eq.price_per_day * eq.stock_quantity), 0)
//   };

//   if (loading && equipments.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
//           <p className="text-gray-600">Memuat equipment dari database...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HEADER */}
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
//                 disabled={loading}
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Tambah Equipment
//               </Button>
//               <Button 
//                 variant="outline" 
//                 onClick={fetchEquipments}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                 ) : (
//                   <RefreshCw className="h-4 w-4 mr-2" />
//                 )}
//                 Refresh
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         {/* ERROR ALERT */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
//             <div className="flex items-center gap-2">
//               <AlertTriangle className="h-5 w-5 text-red-600" />
//               <div>
//                 <p className="text-red-800 font-medium">Database Connection Error</p>
//                 <p className="text-red-600 text-sm">{error}</p>
//                 <p className="text-red-600 text-sm">Menampilkan data mock untuk development.</p>
//               </div>
//             </div>
//             <Button 
//               onClick={fetchEquipments}
//               size="sm"
//               className="mt-2 bg-red-600 hover:bg-red-700"
//             >
//               Coba Lagi
//             </Button>
//           </div>
//         )}

//         {/* STATS CARDS */}
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

//         {/* FILTERS */}
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

//         {/* ✅ ENHANCED EQUIPMENT GRID WITH CACHE BUSTING & BETTER DESCRIPTION */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredEquipments.map((equipment) => {
//             const stockStatus = getStockStatus(equipment);
//             const available = equipment.available_stock || equipment.stock_quantity;
//             const reserved = equipment.reserved_stock || 0;
//             const rented = equipment.rented_stock || 0;
            
//             return (
//               <Card key={equipment.equipment_id} className="overflow-hidden hover:shadow-lg transition-shadow">
//                 <CardContent className="p-0">
//                   {/* ✅ IMAGE SECTION WITH CACHE BUSTING */}
//                   {equipment.image_url ? (
//                     <div className="w-full h-48 overflow-hidden">
//                       <img 
//                         src={`http://localhost${equipment.image_url}?t=${Date.now()}`} // ✅ Add timestamp to prevent caching
//                         alt={equipment.name}
//                         className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                         onError={(e) => {
//                           console.log('❌ Image failed to load:', equipment.image_url);
//                           (e.target as HTMLImageElement).style.display = 'none';
//                           const nextElement = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
//                           if (nextElement) {
//                             nextElement.style.display = 'flex';
//                           }
//                         }}
//                         onLoad={() => {
//                           console.log('✅ Image loaded successfully:', equipment.image_url);
//                         }}
//                       />
//                       {/* Fallback */}
//                       <div className="hidden h-full bg-gradient-to-br from-green-400 to-green-600 items-center justify-center">
//                         <div className="text-center text-white">
//                           <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-70" />
//                           <p className="text-sm opacity-70">Gambar tidak dapat dimuat</p>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
//                       <div className="text-center text-white">
//                         <span className="text-4xl font-bold block mb-2">
//                           {equipment.name.charAt(0)}
//                         </span>
//                         <p className="text-sm opacity-70">Tidak ada gambar</p>
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* CONTENT SECTION */}
//                   <div className="p-6">
//                     {/* Header */}
//                     <div className="flex justify-between items-start mb-3">
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
//                           {equipment.name}
//                         </h3>
//                         <p className="text-sm text-gray-600 mb-2">{equipment.code}</p>
//                         <Badge variant="outline" className="text-xs">
//                           {equipment.category.toUpperCase()}
//                         </Badge>
//                       </div>
//                       <div className="flex flex-col gap-1 ml-2">
//                         <Badge className={`${stockStatus.color} text-white text-xs text-center`}>
//                           {stockStatus.text}
//                         </Badge>
//                         <Badge className={`${getConditionColor(equipment.condition)} text-white text-xs text-center`}>
//                           {equipment.condition}
//                         </Badge>
//                       </div>
//                     </div>

//                     {/* ✅ DESCRIPTION SECTION - SEPERTI DI EQUIPMENT DETAIL */}
//                     {equipment.description && (
//                       <div className="mb-4">
//                         <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
//                           {equipment.description}
//                         </p>
//                       </div>
//                     )}

//                     {/* ✅ SPESIFIKASI SECTION - SEPERTI DI EQUIPMENT DETAIL */}
//                     <div className="bg-gray-50 p-3 rounded-lg mb-4">
//                       <h4 className="font-medium text-sm text-gray-800 mb-2">Spesifikasi</h4>
//                       <div className="space-y-2 text-xs">
//                         {equipment.size_capacity && (
//                           <div className="flex items-center gap-2">
//                             <Package className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Kapasitas:</span>
//                               <span className="font-medium text-gray-900">{equipment.size_capacity}</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         {equipment.dimensions && (
//                           <div className="flex items-center gap-2">
//                             <Ruler className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Dimensi:</span>
//                               <span className="font-medium text-gray-900">{equipment.dimensions}</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         {equipment.weight && equipment.weight > 0 && (
//                           <div className="flex items-center gap-2">
//                             <Weight className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Berat:</span>
//                               <span className="font-medium text-gray-900">{equipment.weight} kg</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         {equipment.material && (
//                           <div className="flex items-center gap-2">
//                             <CheckCircle className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Material:</span>
//                               <span className="font-medium text-gray-900">{equipment.material}</span>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Stock Info */}
//                     <div className="bg-blue-50 p-3 rounded-lg mb-4">
//                       <div className="grid grid-cols-3 gap-2 text-center text-sm">
//                         <div>
//                           <div className="font-semibold text-green-600">{available}</div>
//                           <div className="text-xs text-gray-600">Tersedia</div>
//                         </div>
//                         <div>
//                           <div className="font-semibold text-yellow-600">{reserved}</div>
//                           <div className="text-xs text-gray-600">Reserved</div>
//                         </div>
//                         <div>
//                           <div className="font-semibold text-blue-600">{rented}</div>
//                           <div className="text-xs text-gray-600">Disewa</div>
//                         </div>
//                       </div>
//                       <div className="mt-2 pt-2 border-t border-blue-200">
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">Total Stok:</span>
//                           <span className="font-semibold text-gray-900">{equipment.stock_quantity} unit</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Price */}
//                     <div className="mb-4">
//                       <div className="text-2xl font-bold text-green-600">
//                         Rp {equipment.price_per_day.toLocaleString('id-ID')}
//                       </div>
//                       <div className="text-sm text-gray-600">per hari</div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex gap-2">
//                       <Button 
//                         size="sm" 
//                         variant="outline"
//                         onClick={() => handleEdit(equipment)}
//                         className="flex-1"
//                         disabled={loading}
//                       >
//                         <Edit className="h-4 w-4 mr-1" />
//                         Edit
//                       </Button>
//                       <Button 
//                         size="sm" 
//                         variant="outline"
//                         onClick={() => handleDelete(equipment)}
//                         className="text-red-600 hover:text-red-700"
//                         disabled={loading}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Empty state */}
//         {filteredEquipments.length === 0 && !loading && (
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

//       {/* ✅ ENHANCED ADD/EDIT MODAL WITH IMAGE UPLOAD */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle>
//                   {editingEquipment ? 'Edit Equipment' : 'Tambah Equipment Baru'}
//                 </CardTitle>
//                 <Button 
//                   variant="ghost" 
//                   size="sm"
//                   onClick={resetForm}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
                
//                 {/* ✅ IMAGE UPLOAD SECTION */}
//                 <div className="border-b pb-6">
//                   <h3 className="text-lg font-medium mb-4">📷 Gambar Equipment</h3>
                  
//                   <div className="flex flex-col lg:flex-row gap-6">
//                     {/* Image Preview */}
//                     <div className="lg:w-1/3">
//                       {(imagePreview || editingEquipment?.image_url) ? (
//                         <div className="relative">
//                           <img 
//                             src={imagePreview || `http://localhost${editingEquipment.image_url}?t=${Date.now()}`} // ✅ Cache busting
//                             alt="Equipment preview"
//                             className="w-full h-48 object-cover rounded-lg border"
//                             onError={(e) => {
//                               console.log('❌ Preview image failed:', imagePreview || editingEquipment.image_url);
//                               (e.target as HTMLImageElement).style.display = 'none';
//                             }}
//                             onLoad={() => {
//                               console.log('✅ Preview loaded successfully');
//                             }}
//                           />
//                           {imagePreview && (
//                             <Button
//                               type="button"
//                               variant="destructive"
//                               size="sm"
//                               className="absolute top-2 right-2"
//                               onClick={() => {
//                                 setImageFile(null);
//                                 setImagePreview(null);
//                               }}
//                             >
//                               <X className="h-3 w-3" />
//                             </Button>
//                           )}
//                         </div>
//                       ) : (
//                         <div className="w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
//                           <div className="text-center text-gray-500">
//                             <ImageIcon className="h-12 w-12 mx-auto mb-2" />
//                             <p className="text-sm">Belum ada gambar</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Upload Controls */}
//                     <div className="lg:w-2/3">
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium mb-2">
//                             Upload Gambar Baru
//                           </label>
//                           <input
//                             type="file"
//                             accept="image/*"
//                             onChange={handleImageChange}
//                             className="block w-full text-sm text-gray-500
//                                        file:mr-4 file:py-2 file:px-4
//                                        file:rounded-lg file:border-0
//                                        file:text-sm file:font-medium
//                                        file:bg-green-50 file:text-green-700
//                                        hover:file:bg-green-100 cursor-pointer"
//                           />
//                         </div>
                        
//                         <div className="bg-blue-50 p-3 rounded-lg">
//                           <h4 className="font-medium text-blue-900 mb-2">📋 Panduan Upload:</h4>
//                           <ul className="text-sm text-blue-800 space-y-1">
//                             <li>• Format: JPG, PNG, GIF, WEBP</li>
//                             <li>• Ukuran maksimal: 5MB</li>
//                             <li>• Resolusi direkomendasikan: 800x600px</li>
//                             <li>• Gambar akan disimpan dengan nama kode equipment</li>
//                           </ul>
//                         </div>
                        
//                         {uploadingImage && (
//                           <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
//                             <Loader2 className="h-4 w-4 animate-spin mr-2 text-yellow-600" />
//                             <span className="text-sm text-yellow-800">Mengupload gambar...</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* FORM FIELDS */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Nama Equipment *</label>
//                     <Input
//                       value={formData.name}
//                       onChange={(e) => setFormData({...formData, name: e.target.value})}
//                       placeholder="Tenda Dome 4 Orang"
//                       required
//                     />
//                   </div>
                  
//                   {/* CODE INPUT WITH VALIDATION */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kode Equipment *</label>
//                     <div className="relative">
//                       <Input
//                         value={formData.code}
//                         onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
//                         placeholder="TENDA-001"
//                         required
//                         className={getCodeInputStyle()}
//                       />
                      
//                       {codeValidation.isChecking && (
//                         <div className="absolute right-3 top-3">
//                           <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
//                         </div>
//                       )}
                      
//                       {formData.code && formData.code.length >= 3 && !codeValidation.isChecking && !codeValidation.isDuplicate && (
//                         <div className="absolute right-3 top-3">
//                           <CheckCircle className="h-4 w-4 text-green-600" />
//                         </div>
//                       )}
                      
//                       {codeValidation.isDuplicate && (
//                         <div className="absolute right-3 top-3">
//                           <AlertTriangle className="h-4 w-4 text-red-600" />
//                         </div>
//                       )}
//                     </div>
                    
//                     {formData.code && formData.code.length >= 3 && codeValidation.message && (
//                       <p className={`text-xs mt-1 ${
//                         codeValidation.isDuplicate ? 'text-red-600' : 
//                         codeValidation.isChecking ? 'text-yellow-600' : 
//                         editingEquipment && formData.code === editingEquipment.code ? 'text-blue-600' : 'text-green-600'
//                       }`}>
//                         {codeValidation.isDuplicate ? '❌ ' : 
//                          codeValidation.isChecking ? '⏳ ' : 
//                          editingEquipment && formData.code === editingEquipment.code ? '📝 ' : '✅ '}
//                         {codeValidation.message}
//                       </p>
//                     )}
                    
//                     <p className="text-xs text-gray-500 mt-1">
//                       💡 Format: KATEGORI-XXX (contoh: TENDA-001, TAS-002)
//                     </p>
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
//                     <label className="block text-sm font-medium mb-2">Kategori *</label>
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
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kondisi *</label>
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
//                     <label className="block text-sm font-medium mb-2">Jumlah Stok *</label>
//                     <Input
//                       type="number"
//                       min="0"
//                       value={formData.stock_quantity}
//                       onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
//                       placeholder="5"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Harga per Hari (Rp) *</label>
//                     <Input
//                       type="number"
//                       min="0"
//                       value={formData.price_per_day}
//                       onChange={(e) => setFormData({...formData, price_per_day: e.target.value})}
//                       placeholder="60000"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-2 pt-4 border-t">
//                   <Button 
//                     type="submit" 
//                     className="bg-green-600 hover:bg-green-700"
//                     disabled={loading || codeValidation.isDuplicate || codeValidation.isChecking || uploadingImage}
//                   >
//                     {(loading || uploadingImage) ? (
//                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                     ) : (
//                       <Upload className="h-4 w-4 mr-2" />
//                     )}
//                     {editingEquipment ? 'Update Equipment' : 'Tambah Equipment'}
//                   </Button>
//                   <Button 
//                     type="button" 
//                     variant="outline"
//                     onClick={resetForm}
//                     disabled={loading || uploadingImage}
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

// import { useState, useEffect, useCallback } from "react";
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
//   RefreshCw,
//   Loader2,
//   X,
//   CheckCircle,
//   Upload,
//   Image as ImageIcon,
//   Weight,
//   Ruler
// } from "lucide-react";

// const EquipmentManagement = () => {
//   const [equipments, setEquipments] = useState([]);
//   const [filteredEquipments, setFilteredEquipments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [conditionFilter, setConditionFilter] = useState("all");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingEquipment, setEditingEquipment] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ STATE UNTUK CODE VALIDATION
//   const [codeValidation, setCodeValidation] = useState({
//     isChecking: false,
//     isDuplicate: false,
//     message: ''
//   });

//   // ✅ IMAGE UPLOAD STATES
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [uploadingImage, setUploadingImage] = useState(false);

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

//   useEffect(() => {
//     fetchEquipments();
//   }, []);

//   const fetchEquipments = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php');
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       if (Array.isArray(data)) {
//         setEquipments(data);
//         setFilteredEquipments(data);
//       } else {
//         setEquipments([]);
//         setFilteredEquipments([]);
//       }
      
//     } catch (err) {
//       console.error('❌ Error fetching equipment:', err);
//       setError('Gagal memuat equipment: ' + err.message);
      
//       // Fallback mock data
//       const mockEquipments = [
//         {
//           equipment_id: 1,
//           name: "Tenda Dome 4-6 Orang (MOCK)",
//           code: "TENDA-001",
//           description: "Tenda berkualitas tinggi untuk 4-6 orang dengan fitur tahan air dan mudah dipasang. Cocok untuk camping keluarga atau petualangan outdoor.",
//           category: "tenda",
//           size_capacity: "4-6 Orang",
//           dimensions: "300x250x180 cm",
//           weight: 8.5,
//           material: "Nylon 210T Waterproof",
//           stock_quantity: 5,
//           price_per_day: 60000,
//           condition: "baik",
//           available_stock: 3,
//           reserved_stock: 1,
//           rented_stock: 1,
//           image_url: null,
//           created_at: "2024-01-15"
//         }
//       ];
      
//       setEquipments(mockEquipments);
//       setFilteredEquipments(mockEquipments);
      
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ CODE VALIDATION
//   const checkCodeAvailability = useCallback(
//     async (code, excludeId = null) => {
//       if (!code || code.length < 3) {
//         setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//         return;
//       }

//       setCodeValidation({ isChecking: true, isDuplicate: false, message: 'Mengecek ketersediaan kode...' });

//       try {
//         const url = excludeId 
//           ? `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}&exclude_id=${excludeId}`
//           : `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}`;
        
//         const response = await fetch(url);
//         const result = await response.json();

//         if (response.ok) {
//           let message = result.message;
//           if (editingEquipment && !result.exists && code === editingEquipment.code) {
//             message = 'Kode tidak berubah dari sebelumnya';
//           }

//           setCodeValidation({
//             isChecking: false,
//             isDuplicate: result.exists,
//             message: message
//           });
//         } else {
//           setCodeValidation({
//             isChecking: false,
//             isDuplicate: false,
//             message: ''
//           });
//         }

//       } catch (error) {
//         console.error('Error checking code:', error);
//         setCodeValidation({
//           isChecking: false, 
//           isDuplicate: false, 
//           message: ''
//         });
//       }
//     }, [editingEquipment]
//   );

//   // ✅ ENHANCED IMAGE HANDLING WITH BETTER DEBUGGING
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     console.log('📁 File selected:', file);
    
//     if (file) {
//       // Validate file size
//       if (file.size > 5 * 1024 * 1024) {
//         alert('⚠️ Ukuran gambar maksimal 5MB');
//         e.target.value = ''; // Reset input
//         return;
//       }
      
//       // Validate file type
//       const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//       if (!allowedTypes.includes(file.type)) {
//         alert('⚠️ Format file harus JPG, PNG, GIF, atau WEBP');
//         e.target.value = ''; // Reset input
//         return;
//       }
      
//       console.log('✅ File validation passed');
//       console.log('📊 File info:', {
//         name: file.name,
//         size: file.size,
//         type: file.type
//       });
      
//       setImageFile(file);
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         console.log('✅ Image preview created');
//         setImagePreview(reader.result);
//       };
//       reader.onerror = (error) => {
//         console.error('❌ Error reading file:', error);
//         alert('Error membaca file gambar');
//         setImageFile(null);
//         setImagePreview(null);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       console.log('⚠️ No file selected');
//       setImageFile(null);
//       setImagePreview(null);
//     }
//   };

//   // ✅ ENHANCED UPLOAD IMAGE WITH COMPREHENSIVE ERROR HANDLING
//   const uploadImage = async (equipmentCode) => {
//     if (!imageFile) {
//       console.log('⚠️ No image file to upload');
//       return null;
//     }
    
//     if (!equipmentCode) {
//       console.error('❌ No equipment code provided for upload');
//       throw new Error('Equipment code is required for image upload');
//     }
    
//     console.log('🚀 Starting image upload...');
//     console.log('📝 Equipment code:', equipmentCode);
//     console.log('📁 File:', imageFile);
    
//     setUploadingImage(true);
    
//     try {
//       // Create FormData
//       const uploadFormData = new FormData();
//       uploadFormData.append('image', imageFile);
//       uploadFormData.append('equipment_code', equipmentCode);
      
//       // Debug FormData
//       console.log('📤 FormData prepared:');
//       for (let [key, value] of uploadFormData.entries()) {
//         console.log(`  ${key}:`, value instanceof File ? `File(${value.name}, ${value.size} bytes)` : value);
//       }
      
//       // Make upload request
//       console.log('🌐 Sending upload request...');
//       const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/upload/image.php', {
//         method: 'POST',
//         body: uploadFormData
//         // Don't set Content-Type header, let browser set it with boundary for FormData
//       });
      
//       console.log('📥 Upload response received:');
//       console.log('  Status:', response.status);
//       console.log('  Status text:', response.statusText);
      
//       // Check if response is ok
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('❌ Upload HTTP error:', errorText);
//         throw new Error(`Upload failed with status ${response.status}: ${errorText}`);
//       }
      
//       // Parse response
//       const result = await response.json();
//       console.log('📥 Upload response data:', result);
      
//       if (result.success) {
//         console.log('✅ Image uploaded successfully!');
//         console.log('🔗 Image URL:', result.image_url);
//         return result.image_url;
//       } else {
//         console.error('❌ Upload failed:', result);
//         throw new Error(result.message || result.error || 'Upload failed without error message');
//       }
//     } catch (error) {
//       console.error('❌ Upload error:', error);
      
//       // More specific error messages
//       if (error.name === 'TypeError' && error.message.includes('fetch')) {
//         throw new Error('Tidak dapat terhubung ke server upload. Pastikan server berjalan.');
//       } else if (error.name === 'SyntaxError') {
//         throw new Error('Server mengembalikan response yang tidak valid.');
//       } else {
//         throw new Error(error.message || 'Terjadi kesalahan saat upload gambar.');
//       }
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   // ✅ DEBOUNCED CODE CHECK
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (formData.code && formData.code.length >= 3) {
//         const excludeId = editingEquipment ? editingEquipment.equipment_id : null;
//         checkCodeAvailability(formData.code, excludeId);
//       } else {
//         setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//       }
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [formData.code, editingEquipment, checkCodeAvailability]);

//   // Filter equipments
//   useEffect(() => {
//     let filtered = equipments;
    
//     if (searchTerm) {
//       filtered = filtered.filter(equipment => 
//         equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         equipment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         equipment.category.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     if (categoryFilter !== "all") {
//       filtered = filtered.filter(equipment => equipment.category === categoryFilter);
//     }
    
//     if (conditionFilter !== "all") {
//       filtered = filtered.filter(equipment => equipment.condition === conditionFilter);
//     }
    
//     setFilteredEquipments(filtered);
//   }, [equipments, searchTerm, categoryFilter, conditionFilter]);

//   // ✅ ENHANCED SUBMIT WITH BETTER VALIDATION AND ERROR HANDLING
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     console.log('🚀 Form submission started...');
//     console.log('📝 Current form data:', formData);
//     console.log('🖼️ Image file:', imageFile);
//     console.log('✏️ Editing equipment:', editingEquipment);
    
//     // Validation checks
//     if (codeValidation.isDuplicate) {
//       alert('❌ Kode equipment sudah digunakan! Silakan gunakan kode lain.');
//       return;
//     }

//     if (codeValidation.isChecking) {
//       alert('⏳ Sedang mengecek kode, tunggu sebentar...');
//       return;
//     }

//     // Required field validation
//     if (!formData.name.trim()) {
//       alert('❌ Nama equipment harus diisi!');
//       return;
//     }

//     if (!formData.code.trim()) {
//       alert('❌ Kode equipment harus diisi!');
//       return;
//     }

//     if (!formData.stock_quantity || parseInt(formData.stock_quantity) < 0) {
//       alert('❌ Jumlah stok harus diisi dengan angka valid!');
//       return;
//     }

//     if (!formData.price_per_day || parseFloat(formData.price_per_day) < 0) {
//       alert('❌ Harga per hari harus diisi dengan angka valid!');
//       return;
//     }
    
//     setLoading(true);

//     try {
//       let image_url = editingEquipment ? editingEquipment.image_url : null;
      
//       // ✅ Upload image if new file selected
//       if (imageFile) {
//         console.log('🖼️ New image detected, uploading...');
//         try {
//           image_url = await uploadImage(formData.code.trim().toUpperCase());
//           console.log('✅ Image upload completed successfully');
//           console.log('🔗 Final image URL:', image_url);
//         } catch (uploadError) {
//           console.error('❌ Image upload failed:', uploadError);
          
//           // Ask user if they want to continue without image
//           const proceed = confirm(
//             `Upload gambar gagal: ${uploadError.message}\n\n` +
//             `Apakah Anda ingin melanjutkan menyimpan equipment tanpa mengubah gambar?`
//           );
          
//           if (!proceed) {
//             setLoading(false);
//             return;
//           }
          
//           console.log('⚠️ User chose to continue without image upload');
//           // Keep existing image_url (will be null for new equipment)
//         }
//       }
      
//       // Prepare equipment data
//       const equipmentData = {
//         name: formData.name.trim(),
//         code: formData.code.trim().toUpperCase(),
//         description: formData.description.trim(),
//         category: formData.category,
//         size_capacity: formData.size_capacity.trim(),
//         dimensions: formData.dimensions.trim(),
//         weight: formData.weight ? parseFloat(formData.weight) : null,
//         material: formData.material.trim(),
//         stock_quantity: parseInt(formData.stock_quantity),
//         price_per_day: parseFloat(formData.price_per_day),
//         condition: formData.condition,
//         image_url: image_url
//       };

//       console.log('📤 Final equipment data to send:', equipmentData);

//       // Send to API
//       const apiUrl = 'http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php';
//       let response;
      
//       if (editingEquipment) {
//         console.log('📝 Updating equipment with ID:', editingEquipment.equipment_id);
//         response = await fetch(apiUrl, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             equipment_id: editingEquipment.equipment_id,
//             ...equipmentData
//           })
//         });
//       } else {
//         console.log('➕ Creating new equipment');
//         response = await fetch(apiUrl, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(equipmentData)
//         });
//       }

//       console.log('📥 API response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('❌ API error response:', errorText);
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log('📥 API response data:', result);

//       if (result.success) {
//         const message = editingEquipment 
//           ? '✅ Equipment berhasil diupdate!' 
//           : '✅ Equipment berhasil ditambahkan!';
        
//         alert(message);
        
//         // Reset form and refresh data
//         console.log('🔄 Refreshing equipment list...');
//         await fetchEquipments();
//         resetForm();
//       } else {
//         throw new Error(result.message || result.error || 'Gagal menyimpan equipment');
//       }

//     } catch (err) {
//       console.error('❌ Error saving equipment:', err);
//       alert('Error menyimpan equipment: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (equipment) => {
//     if (!confirm(`Yakin ingin menghapus "${equipment.name}"?`)) return;

//     try {
//       setLoading(true);
      
//       const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?id=${equipment.equipment_id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         alert('✅ Equipment berhasil dihapus!');
//         await fetchEquipments();
//       } else {
//         throw new Error(result.message || 'Gagal menghapus equipment');
//       }
//     } catch (err) {
//       console.error('❌ Error deleting equipment:', err);
//       alert('Error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (equipment) => {
//     console.log('✏️ Editing equipment:', equipment);
    
//     setFormData({
//       name: equipment.name || '',
//       code: equipment.code || '',
//       description: equipment.description || '',
//       category: equipment.category || 'tenda',
//       size_capacity: equipment.size_capacity || '',
//       dimensions: equipment.dimensions || '',
//       weight: equipment.weight ? equipment.weight.toString() : '',
//       material: equipment.material || '',
//       stock_quantity: equipment.stock_quantity ? equipment.stock_quantity.toString() : '',
//       price_per_day: equipment.price_per_day ? equipment.price_per_day.toString() : '',
//       condition: equipment.condition || 'baik'
//     });
    
//     setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
    
//     // ✅ Reset image states
//     setImageFile(null);
//     setImagePreview(null);
    
//     // Clear file input
//     setTimeout(() => {
//       const fileInput = document.querySelector('input[type="file"]');
//       if (fileInput) fileInput.value = '';
//     }, 100);
    
//     setEditingEquipment(equipment);
//     setShowAddModal(true);
//   };

//   const resetForm = () => {
//     console.log('🔄 Resetting form...');
    
//     setFormData({
//       name: "", code: "", description: "", category: "tenda",
//       size_capacity: "", dimensions: "", weight: "", material: "",
//       stock_quantity: "", price_per_day: "", condition: "baik"
//     });
    
//     setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//     setImageFile(null);
//     setImagePreview(null);
//     setShowAddModal(false);
//     setEditingEquipment(null);
    
//     // Clear file input
//     setTimeout(() => {
//       const fileInput = document.querySelector('input[type="file"]');
//       if (fileInput) fileInput.value = '';
//     }, 100);
//   };

//   const getCodeInputStyle = () => {
//     if (!formData.code || formData.code.length < 3) return '';
//     if (codeValidation.isChecking) return 'border-yellow-400 bg-yellow-50';
//     if (codeValidation.isDuplicate) return 'border-red-400 bg-red-50';
//     return 'border-green-400 bg-green-50';
//   };

//   const getStockStatus = (equipment) => {
//     const available = equipment.available_stock || equipment.stock_quantity;
//     if (available === 0) return { color: 'bg-red-500', text: 'Habis' };
//     if (available <= 2) return { color: 'bg-yellow-500', text: 'Stok Rendah' };
//     return { color: 'bg-green-500', text: 'Tersedia' };
//   };

//   const getConditionColor = (condition) => {
//     switch(condition) {
//       case 'baik': return 'bg-green-500';
//       case 'rusak_ringan': return 'bg-yellow-500';
//       case 'perbaikan': return 'bg-red-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const stats = {
//     total: equipments.length,
//     available: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) > 0).length,
//     lowStock: equipments.filter(eq => {
//       const available = eq.available_stock || eq.stock_quantity;
//       return available <= 2 && available > 0;
//     }).length,
//     outOfStock: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) === 0).length,
//     totalValue: equipments.reduce((sum, eq) => sum + (eq.price_per_day * eq.stock_quantity), 0)
//   };

//   if (loading && equipments.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
//           <p className="text-gray-600">Memuat equipment dari database...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HEADER */}
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
//                 disabled={loading}
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Tambah Equipment
//               </Button>
//               <Button 
//                 variant="outline" 
//                 onClick={fetchEquipments}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                 ) : (
//                   <RefreshCw className="h-4 w-4 mr-2" />
//                 )}
//                 Refresh
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         {/* ERROR ALERT */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
//             <div className="flex items-center gap-2">
//               <AlertTriangle className="h-5 w-5 text-red-600" />
//               <div>
//                 <p className="text-red-800 font-medium">Database Connection Error</p>
//                 <p className="text-red-600 text-sm">{error}</p>
//                 <p className="text-red-600 text-sm">Menampilkan data mock untuk development.</p>
//               </div>
//             </div>
//             <Button 
//               onClick={fetchEquipments}
//               size="sm"
//               className="mt-2 bg-red-600 hover:bg-red-700"
//             >
//               Coba Lagi
//             </Button>
//           </div>
//         )}

//         {/* STATS CARDS */}
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

//         {/* FILTERS */}
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
//             const available = equipment.available_stock || equipment.stock_quantity;
//             const reserved = equipment.reserved_stock || 0;
//             const rented = equipment.rented_stock || 0;
            
//             return (
//               <Card key={equipment.equipment_id} className="overflow-hidden hover:shadow-lg transition-shadow">
//                 <CardContent className="p-0">
//                   {/* ✅ IMAGE SECTION */}
//                   {equipment.image_url ? (
//                     <div className="w-full h-48 overflow-hidden">
//                       <img 
//                         src={`http://localhost${equipment.image_url}?t=${Date.now()}`}
//                         alt={equipment.name}
//                         className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                         onError={(e) => {
//                           console.log('❌ Image failed to load:', equipment.image_url);
//                           (e.target as HTMLImageElement).style.display = 'none';
//                           const nextElement = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
//                           if (nextElement) {
//                             nextElement.style.display = 'flex';
//                           }
//                         }}
//                       />
//                       {/* Fallback */}
//                       <div className="hidden h-full bg-gradient-to-br from-green-400 to-green-600 items-center justify-center">
//                         <div className="text-center text-white">
//                           <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-70" />
//                           <p className="text-sm opacity-70">Gambar tidak dapat dimuat</p>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
//                       <div className="text-center text-white">
//                         <span className="text-4xl font-bold block mb-2">
//                           {equipment.name.charAt(0)}
//                         </span>
//                         <p className="text-sm opacity-70">Tidak ada gambar</p>
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* CONTENT SECTION */}
//                   <div className="p-6">
//                     {/* Header */}
//                     <div className="flex justify-between items-start mb-3">
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
//                           {equipment.name}
//                         </h3>
//                         <p className="text-sm text-gray-600 mb-2">{equipment.code}</p>
//                         <Badge variant="outline" className="text-xs">
//                           {equipment.category.toUpperCase()}
//                         </Badge>
//                       </div>
//                       <div className="flex flex-col gap-1 ml-2">
//                         <Badge className={`${stockStatus.color} text-white text-xs text-center`}>
//                           {stockStatus.text}
//                         </Badge>
//                         <Badge className={`${getConditionColor(equipment.condition)} text-white text-xs text-center`}>
//                           {equipment.condition}
//                         </Badge>
//                       </div>
//                     </div>

//                     {/* ✅ DESCRIPTION */}
//                     {equipment.description && (
//                       <div className="mb-4">
//                         <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
//                           {equipment.description}
//                         </p>
//                       </div>
//                     )}

//                     {/* ✅ SPESIFIKASI */}
//                     <div className="bg-gray-50 p-3 rounded-lg mb-4">
//                       <h4 className="font-medium text-sm text-gray-800 mb-2">Spesifikasi</h4>
//                       <div className="space-y-2 text-xs">
//                         {equipment.size_capacity && (
//                           <div className="flex items-center gap-2">
//                             <Package className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Kapasitas:</span>
//                               <span className="font-medium text-gray-900">{equipment.size_capacity}</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         {equipment.dimensions && (
//                           <div className="flex items-center gap-2">
//                             <Ruler className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Dimensi:</span>
//                               <span className="font-medium text-gray-900">{equipment.dimensions}</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         {equipment.weight && equipment.weight > 0 && (
//                           <div className="flex items-center gap-2">
//                             <Weight className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Berat:</span>
//                               <span className="font-medium text-gray-900">{equipment.weight} kg</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         {equipment.material && (
//                           <div className="flex items-center gap-2">
//                             <CheckCircle className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Material:</span>
//                               <span className="font-medium text-gray-900">{equipment.material}</span>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Stock Info */}
//                     <div className="bg-blue-50 p-3 rounded-lg mb-4">
//                       <div className="grid grid-cols-3 gap-2 text-center text-sm">
//                         <div>
//                           <div className="font-semibold text-green-600">{available}</div>
//                           <div className="text-xs text-gray-600">Tersedia</div>
//                         </div>
//                         <div>
//                           <div className="font-semibold text-yellow-600">{reserved}</div>
//                           <div className="text-xs text-gray-600">Reserved</div>
//                         </div>
//                         <div>
//                           <div className="font-semibold text-blue-600">{rented}</div>
//                           <div className="text-xs text-gray-600">Disewa</div>
//                         </div>
//                       </div>
//                       <div className="mt-2 pt-2 border-t border-blue-200">
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">Total Stok:</span>
//                           <span className="font-semibold text-gray-900">{equipment.stock_quantity} unit</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Price */}
//                     <div className="mb-4">
//                       <div className="text-2xl font-bold text-green-600">
//                         Rp {equipment.price_per_day.toLocaleString('id-ID')}
//                       </div>
//                       <div className="text-sm text-gray-600">per hari</div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex gap-2">
//                       <Button 
//                         size="sm" 
//                         variant="outline"
//                         onClick={() => handleEdit(equipment)}
//                         className="flex-1"
//                         disabled={loading}
//                       >
//                         <Edit className="h-4 w-4 mr-1" />
//                         Edit
//                       </Button>
//                       <Button 
//                         size="sm" 
//                         variant="outline"
//                         onClick={() => handleDelete(equipment)}
//                         className="text-red-600 hover:text-red-700"
//                         disabled={loading}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Empty state */}
//         {filteredEquipments.length === 0 && !loading && (
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

//       {/* ✅ ENHANCED MODAL WITH BETTER IMAGE HANDLING */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle>
//                   {editingEquipment ? 'Edit Equipment' : 'Tambah Equipment Baru'}
//                 </CardTitle>
//                 <Button 
//                   variant="ghost" 
//                   size="sm"
//                   onClick={resetForm}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
                
//                 {/* ✅ ENHANCED IMAGE UPLOAD SECTION */}
//                 <div className="border-b pb-6">
//                   <h3 className="text-lg font-medium mb-4">📷 Gambar Equipment</h3>
                  
//                   <div className="flex flex-col lg:flex-row gap-6">
//                     {/* Image Preview */}
//                     <div className="lg:w-1/3">
//                       {imagePreview ? (
//                         // New image preview
//                         <div className="relative">
//                           <img 
//                             src={imagePreview}
//                             alt="New equipment image"
//                             className="w-full h-48 object-cover rounded-lg border"
//                           />
//                           <Button
//                             type="button"
//                             variant="destructive"
//                             size="sm"
//                             className="absolute top-2 right-2"
//                             onClick={() => {
//                               setImageFile(null);
//                               setImagePreview(null);
//                               const fileInput = document.querySelector('input[type="file"]');
//                               if (fileInput) fileInput.value = '';
//                             }}
//                           >
//                             <X className="h-3 w-3" />
//                           </Button>
//                           <div className="absolute bottom-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
//                             Gambar Baru
//                           </div>
//                         </div>
//                       ) : editingEquipment?.image_url ? (
//                         // Existing image
//                         <div className="relative">
//                           <img 
//                             src={`http://localhost${editingEquipment.image_url}?t=${Date.now()}`}
//                             alt="Current equipment image"
//                             className="w-full h-48 object-cover rounded-lg border"
//                             onError={(e) => {
//                               console.log('❌ Current image failed to load');
//                               (e.target as HTMLImageElement).style.display = 'none';
//                               const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
//                               if (fallback) fallback.style.display = 'flex';
//                             }}
//                           />
//                           <div className="hidden w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 items-center justify-center">
//                             <div className="text-center text-gray-500">
//                               <ImageIcon className="h-12 w-12 mx-auto mb-2" />
//                               <p className="text-sm">Gambar tidak dapat dimuat</p>
//                             </div>
//                           </div>
//                           <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
//                             Gambar Saat Ini
//                           </div>
//                         </div>
//                       ) : (
//                         // No image placeholder
//                         <div className="w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
//                           <div className="text-center text-gray-500">
//                             <ImageIcon className="h-12 w-12 mx-auto mb-2" />
//                             <p className="text-sm">Belum ada gambar</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Upload Controls */}
//                     <div className="lg:w-2/3">
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium mb-2">
//                             Upload Gambar {editingEquipment ? 'Baru' : ''}
//                           </label>
//                           <input
//                             type="file"
//                             accept="image/jpeg,image/png,image/gif,image/webp"
//                             onChange={handleImageChange}
//                             className="block w-full text-sm text-gray-500
//                                        file:mr-4 file:py-2 file:px-4
//                                        file:rounded-lg file:border-0
//                                        file:text-sm file:font-medium
//                                        file:bg-green-50 file:text-green-700
//                                        hover:file:bg-green-100 cursor-pointer"
//                             disabled={uploadingImage}
//                           />
//                         </div>
                        
//                         {/* Status indicators */}
//                         {imageFile && (
//                           <div className="p-3 bg-green-50 rounded-lg">
//                             <div className="flex items-center text-green-800">
//                               <CheckCircle className="h-4 w-4 mr-2" />
//                               <span className="text-sm">
//                                 Gambar siap untuk diupload: <strong>{imageFile.name}</strong>
//                               </span>
//                             </div>
//                             <div className="text-xs text-green-600 mt-1">
//                               Ukuran: {(imageFile.size / 1024 / 1024).toFixed(2)} MB
//                             </div>
//                           </div>
//                         )}
                        
//                         <div className="bg-blue-50 p-3 rounded-lg">
//                           <h4 className="font-medium text-blue-900 mb-2">📋 Panduan Upload:</h4>
//                           <ul className="text-sm text-blue-800 space-y-1">
//                             <li>• Format: JPG, PNG, GIF, WEBP</li>
//                             <li>• Ukuran maksimal: 5MB</li>
//                             <li>• Resolusi direkomendasikan: 800x600px</li>
//                             <li>• Gambar akan disimpan dengan nama kode equipment</li>
//                           </ul>
//                         </div>
                        
//                         {uploadingImage && (
//                           <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
//                             <Loader2 className="h-4 w-4 animate-spin mr-2 text-yellow-600" />
//                             <span className="text-sm text-yellow-800">Mengupload gambar...</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* FORM FIELDS */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Nama Equipment *</label>
//                     <Input
//                       value={formData.name}
//                       onChange={(e) => setFormData({...formData, name: e.target.value})}
//                       placeholder="Tenda Dome 4 Orang"
//                       required
//                     />
//                   </div>
                  
//                   {/* CODE INPUT WITH VALIDATION */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kode Equipment *</label>
//                     <div className="relative">
//                       <Input
//                         value={formData.code}
//                         onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
//                         placeholder="TENDA-001"
//                         required
//                         className={getCodeInputStyle()}
//                       />
                      
//                       {codeValidation.isChecking && (
//                         <div className="absolute right-3 top-3">
//                           <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
//                         </div>
//                       )}
                      
//                       {formData.code && formData.code.length >= 3 && !codeValidation.isChecking && !codeValidation.isDuplicate && (
//                         <div className="absolute right-3 top-3">
//                           <CheckCircle className="h-4 w-4 text-green-600" />
//                         </div>
//                       )}
                      
//                       {codeValidation.isDuplicate && (
//                         <div className="absolute right-3 top-3">
//                           <AlertTriangle className="h-4 w-4 text-red-600" />
//                         </div>
//                       )}
//                     </div>
                    
//                     {formData.code && formData.code.length >= 3 && codeValidation.message && (
//                       <p className={`text-xs mt-1 ${
//                         codeValidation.isDuplicate ? 'text-red-600' : 
//                         codeValidation.isChecking ? 'text-yellow-600' : 
//                         editingEquipment && formData.code === editingEquipment.code ? 'text-blue-600' : 'text-green-600'
//                       }`}>
//                         {codeValidation.isDuplicate ? '❌ ' : 
//                          codeValidation.isChecking ? '⏳ ' : 
//                          editingEquipment && formData.code === editingEquipment.code ? '📝 ' : '✅ '}
//                         {codeValidation.message}
//                       </p>
//                     )}
                    
//                     <p className="text-xs text-gray-500 mt-1">
//                       💡 Format: KATEGORI-XXX (contoh: TENDA-001, TAS-002)
//                     </p>
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
//                     <label className="block text-sm font-medium mb-2">Kategori *</label>
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
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kondisi *</label>
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
//                     <label className="block text-sm font-medium mb-2">Jumlah Stok *</label>
//                     <Input
//                       type="number"
//                       min="0"
//                       value={formData.stock_quantity}
//                       onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
//                       placeholder="5"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Harga per Hari (Rp) *</label>
//                     <Input
//                       type="number"
//                       min="0"
//                       value={formData.price_per_day}
//                       onChange={(e) => setFormData({...formData, price_per_day: e.target.value})}
//                       placeholder="60000"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-2 pt-4 border-t">
//                   <Button 
//                     type="submit" 
//                     className="bg-green-600 hover:bg-green-700"
//                     disabled={loading || codeValidation.isDuplicate || codeValidation.isChecking || uploadingImage}
//                   >
//                     {(loading || uploadingImage) ? (
//                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                     ) : (
//                       <Upload className="h-4 w-4 mr-2" />
//                     )}
//                     {editingEquipment ? 'Update Equipment' : 'Tambah Equipment'}
//                   </Button>
//                   <Button 
//                     type="button" 
//                     variant="outline"
//                     onClick={resetForm}
//                     disabled={loading || uploadingImage}
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

// import { useState, useEffect, useCallback, useRef } from "react";
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
//   RefreshCw,
//   Loader2,
//   X,
//   CheckCircle,
//   Upload,
//   Image as ImageIcon,
//   Weight,
//   Ruler
// } from "lucide-react";

// const EquipmentManagement = () => {
//   const [equipments, setEquipments] = useState([]);
//   const [filteredEquipments, setFilteredEquipments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [conditionFilter, setConditionFilter] = useState("all");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingEquipment, setEditingEquipment] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ STATE UNTUK CODE VALIDATION
//   const [codeValidation, setCodeValidation] = useState({
//     isChecking: false,
//     isDuplicate: false,
//     message: ''
//   });

//   // ✅ IMAGE UPLOAD STATES
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [uploadingImage, setUploadingImage] = useState(false);

//   // ✅ REF UNTUK FILE INPUT
//   const fileInputRef = useRef<HTMLInputElement>(null);

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

//   useEffect(() => {
//     fetchEquipments();
//   }, []);

//   const fetchEquipments = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php');
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       if (Array.isArray(data)) {
//         setEquipments(data);
//         setFilteredEquipments(data);
//       } else {
//         setEquipments([]);
//         setFilteredEquipments([]);
//       }
      
//     } catch (err) {
//       console.error('❌ Error fetching equipment:', err);
//       setError('Gagal memuat equipment: ' + err.message);
      
//       // Fallback mock data
//       const mockEquipments = [
//         {
//           equipment_id: 1,
//           name: "Tenda Dome 4-6 Orang (MOCK)",
//           code: "TENDA-001",
//           description: "Tenda berkualitas tinggi untuk 4-6 orang dengan fitur tahan air dan mudah dipasang. Cocok untuk camping keluarga atau petualangan outdoor.",
//           category: "tenda",
//           size_capacity: "4-6 Orang",
//           dimensions: "300x250x180 cm",
//           weight: 8.5,
//           material: "Nylon 210T Waterproof",
//           stock_quantity: 5,
//           price_per_day: 60000,
//           condition: "baik",
//           available_stock: 3,
//           reserved_stock: 1,
//           rented_stock: 1,
//           image_url: null,
//           created_at: "2024-01-15"
//         }
//       ];
      
//       setEquipments(mockEquipments);
//       setFilteredEquipments(mockEquipments);
      
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ CODE VALIDATION
//   const checkCodeAvailability = useCallback(
//     async (code, excludeId = null) => {
//       if (!code || code.length < 3) {
//         setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//         return;
//       }

//       setCodeValidation({ isChecking: true, isDuplicate: false, message: 'Mengecek ketersediaan kode...' });

//       try {
//         const url = excludeId 
//           ? `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}&exclude_id=${excludeId}`
//           : `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}`;
        
//         const response = await fetch(url);
//         const result = await response.json();

//         if (response.ok) {
//           let message = result.message;
//           if (editingEquipment && !result.exists && code === editingEquipment.code) {
//             message = 'Kode tidak berubah dari sebelumnya';
//           }

//           setCodeValidation({
//             isChecking: false,
//             isDuplicate: result.exists,
//             message: message
//           });
//         } else {
//           setCodeValidation({
//             isChecking: false,
//             isDuplicate: false,
//             message: ''
//           });
//         }

//       } catch (error) {
//         console.error('Error checking code:', error);
//         setCodeValidation({
//           isChecking: false, 
//           isDuplicate: false, 
//           message: ''
//         });
//       }
//     }, [editingEquipment]
//   );

//   // ✅ FUNCTION TO CLEAR FILE INPUT
//   const clearFileInput = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   // ✅ ENHANCED IMAGE HANDLING WITH BETTER DEBUGGING
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     console.log('📁 File selected:', file);
    
//     if (file) {
//       // Validate file size
//       if (file.size > 5 * 1024 * 1024) {
//         alert('⚠️ Ukuran gambar maksimal 5MB');
//         clearFileInput();
//         return;
//       }
      
//       // Validate file type
//       const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//       if (!allowedTypes.includes(file.type)) {
//         alert('⚠️ Format file harus JPG, PNG, GIF, atau WEBP');
//         clearFileInput();
//         return;
//       }
      
//       console.log('✅ File validation passed');
//       console.log('📊 File info:', {
//         name: file.name,
//         size: file.size,
//         type: file.type
//       });
      
//       setImageFile(file);
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         console.log('✅ Image preview created');
//         setImagePreview(reader.result);
//       };
//       reader.onerror = (error) => {
//         console.error('❌ Error reading file:', error);
//         alert('Error membaca file gambar');
//         setImageFile(null);
//         setImagePreview(null);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       console.log('⚠️ No file selected');
//       setImageFile(null);
//       setImagePreview(null);
//     }
//   };

//   // ✅ ENHANCED UPLOAD IMAGE WITH COMPREHENSIVE ERROR HANDLING
//   const uploadImage = async (equipmentCode) => {
//     if (!imageFile) {
//       console.log('⚠️ No image file to upload');
//       return null;
//     }
    
//     if (!equipmentCode) {
//       console.error('❌ No equipment code provided for upload');
//       throw new Error('Equipment code is required for image upload');
//     }
    
//     console.log('🚀 Starting image upload...');
//     console.log('📝 Equipment code:', equipmentCode);
//     console.log('📁 File:', imageFile);
    
//     setUploadingImage(true);
    
//     try {
//       // Create FormData
//       const uploadFormData = new FormData();
//       uploadFormData.append('image', imageFile);
//       uploadFormData.append('equipment_code', equipmentCode);
      
//       // Debug FormData
//       console.log('📤 FormData prepared:');
//       for (let [key, value] of uploadFormData.entries()) {
//         console.log(`  ${key}:`, value instanceof File ? `File(${value.name}, ${value.size} bytes)` : value);
//       }
      
//       // Make upload request
//       console.log('🌐 Sending upload request...');
//       const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/upload/image.php', {
//         method: 'POST',
//         body: uploadFormData
//         // Don't set Content-Type header, let browser set it with boundary for FormData
//       });
      
//       console.log('📥 Upload response received:');
//       console.log('  Status:', response.status);
//       console.log('  Status text:', response.statusText);
      
//       // Check if response is ok
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('❌ Upload HTTP error:', errorText);
//         throw new Error(`Upload failed with status ${response.status}: ${errorText}`);
//       }
      
//       // Parse response
//       const result = await response.json();
//       console.log('📥 Upload response data:', result);
      
//       if (result.success) {
//         console.log('✅ Image uploaded successfully!');
//         console.log('🔗 Image URL:', result.image_url);
//         return result.image_url;
//       } else {
//         console.error('❌ Upload failed:', result);
//         throw new Error(result.message || result.error || 'Upload failed without error message');
//       }
//     } catch (error) {
//       console.error('❌ Upload error:', error);
      
//       // More specific error messages
//       if (error.name === 'TypeError' && error.message.includes('fetch')) {
//         throw new Error('Tidak dapat terhubung ke server upload. Pastikan server berjalan.');
//       } else if (error.name === 'SyntaxError') {
//         throw new Error('Server mengembalikan response yang tidak valid.');
//       } else {
//         throw new Error(error.message || 'Terjadi kesalahan saat upload gambar.');
//       }
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   // ✅ DEBOUNCED CODE CHECK
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (formData.code && formData.code.length >= 3) {
//         const excludeId = editingEquipment ? editingEquipment.equipment_id : null;
//         checkCodeAvailability(formData.code, excludeId);
//       } else {
//         setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//       }
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [formData.code, editingEquipment, checkCodeAvailability]);

//   // Filter equipments
//   useEffect(() => {
//     let filtered = equipments;
    
//     if (searchTerm) {
//       filtered = filtered.filter(equipment => 
//         equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         equipment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         equipment.category.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     if (categoryFilter !== "all") {
//       filtered = filtered.filter(equipment => equipment.category === categoryFilter);
//     }
    
//     if (conditionFilter !== "all") {
//       filtered = filtered.filter(equipment => equipment.condition === conditionFilter);
//     }
    
//     setFilteredEquipments(filtered);
//   }, [equipments, searchTerm, categoryFilter, conditionFilter]);

//   // ✅ ENHANCED SUBMIT WITH BETTER VALIDATION AND ERROR HANDLING
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     console.log('🚀 Form submission started...');
//     console.log('📝 Current form data:', formData);
//     console.log('🖼️ Image file:', imageFile);
//     console.log('✏️ Editing equipment:', editingEquipment);
    
//     // Validation checks
//     if (codeValidation.isDuplicate) {
//       alert('❌ Kode equipment sudah digunakan! Silakan gunakan kode lain.');
//       return;
//     }

//     if (codeValidation.isChecking) {
//       alert('⏳ Sedang mengecek kode, tunggu sebentar...');
//       return;
//     }

//     // Required field validation
//     if (!formData.name.trim()) {
//       alert('❌ Nama equipment harus diisi!');
//       return;
//     }

//     if (!formData.code.trim()) {
//       alert('❌ Kode equipment harus diisi!');
//       return;
//     }

//     if (!formData.stock_quantity || parseInt(formData.stock_quantity) < 0) {
//       alert('❌ Jumlah stok harus diisi dengan angka valid!');
//       return;
//     }

//     if (!formData.price_per_day || parseFloat(formData.price_per_day) < 0) {
//       alert('❌ Harga per hari harus diisi dengan angka valid!');
//       return;
//     }
    
//     setLoading(true);

//     try {
//       let image_url = editingEquipment ? editingEquipment.image_url : null;
      
//       // ✅ Upload image if new file selected
//       if (imageFile) {
//         console.log('🖼️ New image detected, uploading...');
//         try {
//           image_url = await uploadImage(formData.code.trim().toUpperCase());
//           console.log('✅ Image upload completed successfully');
//           console.log('🔗 Final image URL:', image_url);
//         } catch (uploadError) {
//           console.error('❌ Image upload failed:', uploadError);
          
//           // Ask user if they want to continue without image
//           const proceed = confirm(
//             `Upload gambar gagal: ${uploadError.message}\n\n` +
//             `Apakah Anda ingin melanjutkan menyimpan equipment tanpa mengubah gambar?`
//           );
          
//           if (!proceed) {
//             setLoading(false);
//             return;
//           }
          
//           console.log('⚠️ User chose to continue without image upload');
//           // Keep existing image_url (will be null for new equipment)
//         }
//       }
      
//       // Prepare equipment data
//       const equipmentData = {
//         name: formData.name.trim(),
//         code: formData.code.trim().toUpperCase(),
//         description: formData.description.trim(),
//         category: formData.category,
//         size_capacity: formData.size_capacity.trim(),
//         dimensions: formData.dimensions.trim(),
//         weight: formData.weight ? parseFloat(formData.weight) : null,
//         material: formData.material.trim(),
//         stock_quantity: parseInt(formData.stock_quantity),
//         price_per_day: parseFloat(formData.price_per_day),
//         condition: formData.condition,
//         image_url: image_url
//       };

//       console.log('📤 Final equipment data to send:', equipmentData);

//       // Send to API
//       const apiUrl = 'http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php';
//       let response;
      
//       if (editingEquipment) {
//         console.log('📝 Updating equipment with ID:', editingEquipment.equipment_id);
//         response = await fetch(apiUrl, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             equipment_id: editingEquipment.equipment_id,
//             ...equipmentData
//           })
//         });
//       } else {
//         console.log('➕ Creating new equipment');
//         response = await fetch(apiUrl, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(equipmentData)
//         });
//       }

//       console.log('📥 API response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('❌ API error response:', errorText);
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log('📥 API response data:', result);

//       if (result.success) {
//         const message = editingEquipment 
//           ? '✅ Equipment berhasil diupdate!' 
//           : '✅ Equipment berhasil ditambahkan!';
        
//         alert(message);
        
//         // Reset form and refresh data
//         console.log('🔄 Refreshing equipment list...');
//         await fetchEquipments();
//         resetForm();
//       } else {
//         throw new Error(result.message || result.error || 'Gagal menyimpan equipment');
//       }

//     } catch (err) {
//       console.error('❌ Error saving equipment:', err);
//       alert('Error menyimpan equipment: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (equipment) => {
//     if (!confirm(`Yakin ingin menghapus "${equipment.name}"?`)) return;

//     try {
//       setLoading(true);
      
//       const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?id=${equipment.equipment_id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         alert('✅ Equipment berhasil dihapus!');
//         await fetchEquipments();
//       } else {
//         throw new Error(result.message || 'Gagal menghapus equipment');
//       }
//     } catch (err) {
//       console.error('❌ Error deleting equipment:', err);
//       alert('Error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (equipment) => {
//     console.log('✏️ Editing equipment:', equipment);
    
//     setFormData({
//       name: equipment.name || '',
//       code: equipment.code || '',
//       description: equipment.description || '',
//       category: equipment.category || 'tenda',
//       size_capacity: equipment.size_capacity || '',
//       dimensions: equipment.dimensions || '',
//       weight: equipment.weight ? equipment.weight.toString() : '',
//       material: equipment.material || '',
//       stock_quantity: equipment.stock_quantity ? equipment.stock_quantity.toString() : '',
//       price_per_day: equipment.price_per_day ? equipment.price_per_day.toString() : '',
//       condition: equipment.condition || 'baik'
//     });
    
//     setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
    
//     // ✅ Reset image states
//     setImageFile(null);
//     setImagePreview(null);
    
//     // ✅ Clear file input using ref
//     clearFileInput();
    
//     setEditingEquipment(equipment);
//     setShowAddModal(true);
//   };

//   const resetForm = () => {
//     console.log('🔄 Resetting form...');
    
//     setFormData({
//       name: "", code: "", description: "", category: "tenda",
//       size_capacity: "", dimensions: "", weight: "", material: "",
//       stock_quantity: "", price_per_day: "", condition: "baik"
//     });
    
//     setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//     setImageFile(null);
//     setImagePreview(null);
//     setShowAddModal(false);
//     setEditingEquipment(null);
    
//     // ✅ Clear file input using ref
//     clearFileInput();
//   };

//   const getCodeInputStyle = () => {
//     if (!formData.code || formData.code.length < 3) return '';
//     if (codeValidation.isChecking) return 'border-yellow-400 bg-yellow-50';
//     if (codeValidation.isDuplicate) return 'border-red-400 bg-red-50';
//     return 'border-green-400 bg-green-50';
//   };

//   const getStockStatus = (equipment) => {
//     const available = equipment.available_stock || equipment.stock_quantity;
//     if (available === 0) return { color: 'bg-red-500', text: 'Habis' };
//     if (available <= 2) return { color: 'bg-yellow-500', text: 'Stok Rendah' };
//     return { color: 'bg-green-500', text: 'Tersedia' };
//   };

//   const getConditionColor = (condition) => {
//     switch(condition) {
//       case 'baik': return 'bg-green-500';
//       case 'rusak_ringan': return 'bg-yellow-500';
//       case 'perbaikan': return 'bg-red-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const stats = {
//     total: equipments.length,
//     available: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) > 0).length,
//     lowStock: equipments.filter(eq => {
//       const available = eq.available_stock || eq.stock_quantity;
//       return available <= 2 && available > 0;
//     }).length,
//     outOfStock: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) === 0).length,
//     totalValue: equipments.reduce((sum, eq) => sum + (eq.price_per_day * eq.stock_quantity), 0)
//   };

//   if (loading && equipments.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
//           <p className="text-gray-600">Memuat equipment dari database...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HEADER */}
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
//                 disabled={loading}
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Tambah Equipment
//               </Button>
//               <Button 
//                 variant="outline" 
//                 onClick={fetchEquipments}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                 ) : (
//                   <RefreshCw className="h-4 w-4 mr-2" />
//                 )}
//                 Refresh
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         {/* ERROR ALERT */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
//             <div className="flex items-center gap-2">
//               <AlertTriangle className="h-5 w-5 text-red-600" />
//               <div>
//                 <p className="text-red-800 font-medium">Database Connection Error</p>
//                 <p className="text-red-600 text-sm">{error}</p>
//                 <p className="text-red-600 text-sm">Menampilkan data mock untuk development.</p>
//               </div>
//             </div>
//             <Button 
//               onClick={fetchEquipments}
//               size="sm"
//               className="mt-2 bg-red-600 hover:bg-red-700"
//             >
//               Coba Lagi
//             </Button>
//           </div>
//         )}

//         {/* STATS CARDS */}
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

//         {/* FILTERS */}
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
//             const available = equipment.available_stock || equipment.stock_quantity;
//             const reserved = equipment.reserved_stock || 0;
//             const rented = equipment.rented_stock || 0;
            
//             return (
//               <Card key={equipment.equipment_id} className="overflow-hidden hover:shadow-lg transition-shadow">
//                 <CardContent className="p-0">
//                   {/* ✅ IMAGE SECTION */}
//                   {equipment.image_url ? (
//                     <div className="w-full h-48 overflow-hidden">
//                       <img 
//                         src={`http://localhost${equipment.image_url}?t=${Date.now()}`}
//                         alt={equipment.name}
//                         className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                         onError={(e) => {
//                           console.log('❌ Image failed to load:', equipment.image_url);
//                           (e.target as HTMLImageElement).style.display = 'none';
//                           const nextElement = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
//                           if (nextElement) {
//                             nextElement.style.display = 'flex';
//                           }
//                         }}
//                       />
//                       {/* Fallback */}
//                       <div className="hidden h-full bg-gradient-to-br from-green-400 to-green-600 items-center justify-center">
//                         <div className="text-center text-white">
//                           <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-70" />
//                           <p className="text-sm opacity-70">Gambar tidak dapat dimuat</p>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
//                       <div className="text-center text-white">
//                         <span className="text-4xl font-bold block mb-2">
//                           {equipment.name.charAt(0)}
//                         </span>
//                         <p className="text-sm opacity-70">Tidak ada gambar</p>
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* CONTENT SECTION */}
//                   <div className="p-6">
//                     {/* Header */}
//                     <div className="flex justify-between items-start mb-3">
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
//                           {equipment.name}
//                         </h3>
//                         <p className="text-sm text-gray-600 mb-2">{equipment.code}</p>
//                         <Badge variant="outline" className="text-xs">
//                           {equipment.category.toUpperCase()}
//                         </Badge>
//                       </div>
//                       <div className="flex flex-col gap-1 ml-2">
//                         <Badge className={`${stockStatus.color} text-white text-xs text-center`}>
//                           {stockStatus.text}
//                         </Badge>
//                         <Badge className={`${getConditionColor(equipment.condition)} text-white text-xs text-center`}>
//                           {equipment.condition}
//                         </Badge>
//                       </div>
//                     </div>

//                     {/* ✅ DESCRIPTION */}
//                     {equipment.description && (
//                       <div className="mb-4">
//                         <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
//                           {equipment.description}
//                         </p>
//                       </div>
//                     )}

//                     {/* ✅ SPESIFIKASI */}
//                     <div className="bg-gray-50 p-3 rounded-lg mb-4">
//                       <h4 className="font-medium text-sm text-gray-800 mb-2">Spesifikasi</h4>
//                       <div className="space-y-2 text-xs">
//                         {equipment.size_capacity && (
//                           <div className="flex items-center gap-2">
//                             <Package className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Kapasitas:</span>
//                               <span className="font-medium text-gray-900">{equipment.size_capacity}</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         {equipment.dimensions && (
//                           <div className="flex items-center gap-2">
//                             <Ruler className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Dimensi:</span>
//                               <span className="font-medium text-gray-900">{equipment.dimensions}</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         {equipment.weight && equipment.weight > 0 && (
//                           <div className="flex items-center gap-2">
//                             <Weight className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Berat:</span>
//                               <span className="font-medium text-gray-900">{equipment.weight} kg</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         {equipment.material && (
//                           <div className="flex items-center gap-2">
//                             <CheckCircle className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Material:</span>
//                               <span className="font-medium text-gray-900">{equipment.material}</span>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Stock Info */}
//                     <div className="bg-blue-50 p-3 rounded-lg mb-4">
//                       <div className="grid grid-cols-3 gap-2 text-center text-sm">
//                         <div>
//                           <div className="font-semibold text-green-600">{available}</div>
//                           <div className="text-xs text-gray-600">Tersedia</div>
//                         </div>
//                         <div>
//                           <div className="font-semibold text-yellow-600">{reserved}</div>
//                           <div className="text-xs text-gray-600">Reserved</div>
//                         </div>
//                         <div>
//                           <div className="font-semibold text-blue-600">{rented}</div>
//                           <div className="text-xs text-gray-600">Disewa</div>
//                         </div>
//                       </div>
//                       <div className="mt-2 pt-2 border-t border-blue-200">
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">Total Stok:</span>
//                           <span className="font-semibold text-gray-900">{equipment.stock_quantity} unit</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Price */}
//                     <div className="mb-4">
//                       <div className="text-2xl font-bold text-green-600">
//                         Rp {equipment.price_per_day.toLocaleString('id-ID')}
//                       </div>
//                       <div className="text-sm text-gray-600">per hari</div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex gap-2">
//                       <Button 
//                         size="sm" 
//                         variant="outline"
//                         onClick={() => handleEdit(equipment)}
//                         className="flex-1"
//                         disabled={loading}
//                       >
//                         <Edit className="h-4 w-4 mr-1" />
//                         Edit
//                       </Button>
//                       <Button 
//                         size="sm" 
//                         variant="outline"
//                         onClick={() => handleDelete(equipment)}
//                         className="text-red-600 hover:text-red-700"
//                         disabled={loading}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Empty state */}
//         {filteredEquipments.length === 0 && !loading && (
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

//       {/* ✅ ENHANCED MODAL WITH BETTER IMAGE HANDLING */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle>
//                   {editingEquipment ? 'Edit Equipment' : 'Tambah Equipment Baru'}
//                 </CardTitle>
//                 <Button 
//                   variant="ghost" 
//                   size="sm"
//                   onClick={resetForm}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
                
//                 {/* ✅ ENHANCED IMAGE UPLOAD SECTION */}
//                 <div className="border-b pb-6">
//                   <h3 className="text-lg font-medium mb-4">📷 Gambar Equipment</h3>
                  
//                   <div className="flex flex-col lg:flex-row gap-6">
//                     {/* Image Preview */}
//                     <div className="lg:w-1/3">
//                       {imagePreview ? (
//                         // New image preview
//                         <div className="relative">
//                           <img 
//                             src={imagePreview}
//                             alt="New equipment image"
//                             className="w-full h-48 object-cover rounded-lg border"
//                           />
//                           <Button
//                             type="button"
//                             variant="destructive"
//                             size="sm"
//                             className="absolute top-2 right-2"
//                             onClick={() => {
//                               setImageFile(null);
//                               setImagePreview(null);
//                               clearFileInput(); // ✅ Fixed
//                             }}
//                           >
//                             <X className="h-3 w-3" />
//                           </Button>
//                           <div className="absolute bottom-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
//                             Gambar Baru
//                           </div>
//                         </div>
//                       ) : editingEquipment?.image_url ? (
//                         // Existing image
//                         <div className="relative">
//                           <img 
//                             src={`http://localhost${editingEquipment.image_url}?t=${Date.now()}`}
//                             alt="Current equipment image"
//                             className="w-full h-48 object-cover rounded-lg border"
//                             onError={(e) => {
//                               console.log('❌ Current image failed to load');
//                               (e.target as HTMLImageElement).style.display = 'none';
//                               const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
//                               if (fallback) fallback.style.display = 'flex';
//                             }}
//                           />
//                           <div className="hidden w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 items-center justify-center">
//                             <div className="text-center text-gray-500">
//                               <ImageIcon className="h-12 w-12 mx-auto mb-2" />
//                               <p className="text-sm">Gambar tidak dapat dimuat</p>
//                             </div>
//                           </div>
//                           <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
//                             Gambar Saat Ini
//                           </div>
//                         </div>
//                       ) : (
//                         // No image placeholder
//                         <div className="w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
//                           <div className="text-center text-gray-500">
//                             <ImageIcon className="h-12 w-12 mx-auto mb-2" />
//                             <p className="text-sm">Belum ada gambar</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Upload Controls */}
//                     <div className="lg:w-2/3">
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium mb-2">
//                             Upload Gambar {editingEquipment ? 'Baru' : ''}
//                           </label>
//                           <input
//                             ref={fileInputRef} // ✅ Add ref
//                             type="file"
//                             accept="image/jpeg,image/png,image/gif,image/webp"
//                             onChange={handleImageChange}
//                             className="block w-full text-sm text-gray-500
//                                        file:mr-4 file:py-2 file:px-4
//                                        file:rounded-lg file:border-0
//                                        file:text-sm file:font-medium
//                                        file:bg-green-50 file:text-green-700
//                                        hover:file:bg-green-100 cursor-pointer"
//                             disabled={uploadingImage}
//                           />
//                         </div>
                        
//                         {/* Status indicators */}
//                         {imageFile && (
//                           <div className="p-3 bg-green-50 rounded-lg">
//                             <div className="flex items-center text-green-800">
//                               <CheckCircle className="h-4 w-4 mr-2" />
//                               <span className="text-sm">
//                                 Gambar siap untuk diupload: <strong>{imageFile.name}</strong>
//                               </span>
//                             </div>
//                             <div className="text-xs text-green-600 mt-1">
//                               Ukuran: {(imageFile.size / 1024 / 1024).toFixed(2)} MB
//                             </div>
//                           </div>
//                         )}
                        
//                         <div className="bg-blue-50 p-3 rounded-lg">
//                           <h4 className="font-medium text-blue-900 mb-2">📋 Panduan Upload:</h4>
//                           <ul className="text-sm text-blue-800 space-y-1">
//                             <li>• Format: JPG, PNG, GIF, WEBP</li>
//                             <li>• Ukuran maksimal: 5MB</li>
//                             <li>• Resolusi direkomendasikan: 800x600px</li>
//                             <li>• Gambar akan disimpan dengan nama kode equipment</li>
//                           </ul>
//                         </div>
                        
//                         {uploadingImage && (
//                           <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
//                             <Loader2 className="h-4 w-4 animate-spin mr-2 text-yellow-600" />
//                             <span className="text-sm text-yellow-800">Mengupload gambar...</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* FORM FIELDS */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Nama Equipment *</label>
//                     <Input
//                       value={formData.name}
//                       onChange={(e) => setFormData({...formData, name: e.target.value})}
//                       placeholder="Tenda Dome 4 Orang"
//                       required
//                     />
//                   </div>
                  
//                   {/* CODE INPUT WITH VALIDATION */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kode Equipment *</label>
//                     <div className="relative">
//                       <Input
//                         value={formData.code}
//                         onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
//                         placeholder="TENDA-001"
//                         required
//                         className={getCodeInputStyle()}
//                       />
                      
//                       {codeValidation.isChecking && (
//                         <div className="absolute right-3 top-3">
//                           <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
//                         </div>
//                       )}
                      
//                       {formData.code && formData.code.length >= 3 && !codeValidation.isChecking && !codeValidation.isDuplicate && (
//                         <div className="absolute right-3 top-3">
//                           <CheckCircle className="h-4 w-4 text-green-600" />
//                         </div>
//                       )}
                      
//                       {codeValidation.isDuplicate && (
//                         <div className="absolute right-3 top-3">
//                           <AlertTriangle className="h-4 w-4 text-red-600" />
//                         </div>
//                       )}
//                     </div>
                    
//                     {formData.code && formData.code.length >= 3 && codeValidation.message && (
//                       <p className={`text-xs mt-1 ${
//                         codeValidation.isDuplicate ? 'text-red-600' : 
//                         codeValidation.isChecking ? 'text-yellow-600' : 
//                         editingEquipment && formData.code === editingEquipment.code ? 'text-blue-600' : 'text-green-600'
//                       }`}>
//                         {codeValidation.isDuplicate ? '❌ ' : 
//                          codeValidation.isChecking ? '⏳ ' : 
//                          editingEquipment && formData.code === editingEquipment.code ? '📝 ' : '✅ '}
//                         {codeValidation.message}
//                       </p>
//                     )}
                    
//                     <p className="text-xs text-gray-500 mt-1">
//                       💡 Format: KATEGORI-XXX (contoh: TENDA-001, TAS-002)
//                     </p>
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
//                     <label className="block text-sm font-medium mb-2">Kategori *</label>
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
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kondisi *</label>
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
//                     <label className="block text-sm font-medium mb-2">Jumlah Stok *</label>
//                     <Input
//                       type="number"
//                       min="0"
//                       value={formData.stock_quantity}
//                       onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
//                       placeholder="5"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Harga per Hari (Rp) *</label>
//                     <Input
//                       type="number"
//                       min="0"
//                       value={formData.price_per_day}
//                       onChange={(e) => setFormData({...formData, price_per_day: e.target.value})}
//                       placeholder="60000"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-2 pt-4 border-t">
//                   <Button 
//                     type="submit" 
//                     className="bg-green-600 hover:bg-green-700"
//                     disabled={loading || codeValidation.isDuplicate || codeValidation.isChecking || uploadingImage}
//                   >
//                     {(loading || uploadingImage) ? (
//                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                     ) : (
//                       <Upload className="h-4 w-4 mr-2" />
//                     )}
//                     {editingEquipment ? 'Update Equipment' : 'Tambah Equipment'}
//                   </Button>
//                   <Button 
//                     type="button" 
//                     variant="outline"
//                     onClick={resetForm}
//                     disabled={loading || uploadingImage}
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



// import { useState, useEffect, useCallback, useRef } from "react";
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
//   RefreshCw,
//   Loader2,
//   X,
//   CheckCircle,
//   Upload,
//   Image as ImageIcon,
//   Weight,
//   Ruler
// } from "lucide-react";

// const EquipmentManagement = () => {
//   const [equipments, setEquipments] = useState([]);
//   const [filteredEquipments, setFilteredEquipments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [conditionFilter, setConditionFilter] = useState("all");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingEquipment, setEditingEquipment] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ STATE UNTUK CODE VALIDATION
//   const [codeValidation, setCodeValidation] = useState({
//     isChecking: false,
//     isDuplicate: false,
//     message: ''
//   });

//   // ✅ IMAGE UPLOAD STATES
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [uploadingImage, setUploadingImage] = useState(false);

//   // ✅ REF UNTUK FILE INPUT
//   const fileInputRef = useRef<HTMLInputElement>(null);

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

//   useEffect(() => {
//     fetchEquipments();
//   }, []);

//   const fetchEquipments = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php');
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       if (Array.isArray(data)) {
//         setEquipments(data);
//         setFilteredEquipments(data);
//       } else {
//         setEquipments([]);
//         setFilteredEquipments([]);
//       }
      
//     } catch (err) {
//       console.error('❌ Error fetching equipment:', err);
//       setError('Gagal memuat equipment: ' + err.message);
      
//       // Fallback mock data
//       const mockEquipments = [
//         {
//           equipment_id: 1,
//           name: "Tenda Dome 4-6 Orang (MOCK)",
//           code: "TENDA-001",
//           description: "Tenda berkualitas tinggi untuk 4-6 orang dengan fitur tahan air dan mudah dipasang. Cocok untuk camping keluarga atau petualangan outdoor.",
//           category: "tenda",
//           size_capacity: "4-6 Orang",
//           dimensions: "300x250x180 cm",
//           weight: 8.5,
//           material: "Nylon 210T Waterproof",
//           stock_quantity: 5,
//           price_per_day: 60000,
//           condition: "baik",
//           available_stock: 3,
//           reserved_stock: 1,
//           rented_stock: 1,
//           image_url: null,
//           created_at: "2024-01-15"
//         }
//       ];
      
//       setEquipments(mockEquipments);
//       setFilteredEquipments(mockEquipments);
      
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ CODE VALIDATION
//   const checkCodeAvailability = useCallback(
//     async (code, excludeId = null) => {
//       if (!code || code.length < 3) {
//         setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//         return;
//       }

//       setCodeValidation({ isChecking: true, isDuplicate: false, message: 'Mengecek ketersediaan kode...' });

//       try {
//         const url = excludeId 
//           ? `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}&exclude_id=${excludeId}`
//           : `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}`;
        
//         const response = await fetch(url);
//         const result = await response.json();

//         if (response.ok) {
//           let message = result.message;
//           if (editingEquipment && !result.exists && code === editingEquipment.code) {
//             message = 'Kode tidak berubah dari sebelumnya';
//           }

//           setCodeValidation({
//             isChecking: false,
//             isDuplicate: result.exists,
//             message: message
//           });
//         } else {
//           setCodeValidation({
//             isChecking: false,
//             isDuplicate: false,
//             message: ''
//           });
//         }

//       } catch (error) {
//         console.error('Error checking code:', error);
//         setCodeValidation({
//           isChecking: false, 
//           isDuplicate: false, 
//           message: ''
//         });
//       }
//     }, [editingEquipment]
//   );

//   // ✅ FUNCTION TO CLEAR FILE INPUT
//   const clearFileInput = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   // ✅ ENHANCED IMAGE HANDLING WITH BETTER DEBUGGING
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     console.log('📁 File selected:', file);
    
//     if (file) {
//       // Validate file size
//       if (file.size > 5 * 1024 * 1024) {
//         alert('⚠️ Ukuran gambar maksimal 5MB');
//         clearFileInput();
//         return;
//       }
      
//       // Validate file type
//       const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//       if (!allowedTypes.includes(file.type)) {
//         alert('⚠️ Format file harus JPG, PNG, GIF, atau WEBP');
//         clearFileInput();
//         return;
//       }
      
//       console.log('✅ File validation passed');
//       console.log('📊 File info:', {
//         name: file.name,
//         size: file.size,
//         type: file.type
//       });
      
//       setImageFile(file);
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         console.log('✅ Image preview created');
//         setImagePreview(reader.result);
//       };
//       reader.onerror = (error) => {
//         console.error('❌ Error reading file:', error);
//         alert('Error membaca file gambar');
//         setImageFile(null);
//         setImagePreview(null);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       console.log('⚠️ No file selected');
//       setImageFile(null);
//       setImagePreview(null);
//     }
//   };

//   // ✅ ENHANCED UPLOAD IMAGE WITH COMPREHENSIVE ERROR HANDLING
//   const uploadImage = async (equipmentCode) => {
//     if (!imageFile) {
//       console.log('⚠️ No image file to upload');
//       return null;
//     }
    
//     if (!equipmentCode) {
//       console.error('❌ No equipment code provided for upload');
//       throw new Error('Equipment code is required for image upload');
//     }
    
//     console.log('🚀 Starting image upload...');
//     console.log('📝 Equipment code:', equipmentCode);
//     console.log('📁 File:', imageFile);
    
//     setUploadingImage(true);
    
//     try {
//       // Create FormData
//       const uploadFormData = new FormData();
//       uploadFormData.append('image', imageFile);
//       uploadFormData.append('equipment_code', equipmentCode);
      
//       // Debug FormData
//       console.log('📤 FormData prepared:');
//       for (let [key, value] of uploadFormData.entries()) {
//         console.log(`  ${key}:`, value instanceof File ? `File(${value.name}, ${value.size} bytes)` : value);
//       }
      
//       // Make upload request
//       console.log('🌐 Sending upload request...');
//       const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/upload/image.php', {
//         method: 'POST',
//         body: uploadFormData
//         // Don't set Content-Type header, let browser set it with boundary for FormData
//       });
      
//       console.log('📥 Upload response received:');
//       console.log('  Status:', response.status);
//       console.log('  Status text:', response.statusText);
      
//       // Check if response is ok
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('❌ Upload HTTP error:', errorText);
//         throw new Error(`Upload failed with status ${response.status}: ${errorText}`);
//       }
      
//       // Parse response
//       const result = await response.json();
//       console.log('📥 Upload response data:', result);
      
//       if (result.success) {
//         console.log('✅ Image uploaded successfully!');
//         console.log('🔗 Image URL:', result.image_url);
//         return result.image_url;
//       } else {
//         console.error('❌ Upload failed:', result);
//         throw new Error(result.message || result.error || 'Upload failed without error message');
//       }
//     } catch (error) {
//       console.error('❌ Upload error:', error);
      
//       // More specific error messages
//       if (error.name === 'TypeError' && error.message.includes('fetch')) {
//         throw new Error('Tidak dapat terhubung ke server upload. Pastikan server berjalan.');
//       } else if (error.name === 'SyntaxError') {
//         throw new Error('Server mengembalikan response yang tidak valid.');
//       } else {
//         throw new Error(error.message || 'Terjadi kesalahan saat upload gambar.');
//       }
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   // ✅ DEBOUNCED CODE CHECK
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (formData.code && formData.code.length >= 3) {
//         const excludeId = editingEquipment ? editingEquipment.equipment_id : null;
//         checkCodeAvailability(formData.code, excludeId);
//       } else {
//         setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//       }
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [formData.code, editingEquipment, checkCodeAvailability]);

//   // Filter equipments
//   useEffect(() => {
//     let filtered = equipments;
    
//     if (searchTerm) {
//       filtered = filtered.filter(equipment => 
//         equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         equipment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         equipment.category.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     if (categoryFilter !== "all") {
//       filtered = filtered.filter(equipment => equipment.category === categoryFilter);
//     }
    
//     if (conditionFilter !== "all") {
//       filtered = filtered.filter(equipment => equipment.condition === conditionFilter);
//     }
    
//     setFilteredEquipments(filtered);
//   }, [equipments, searchTerm, categoryFilter, conditionFilter]);

//   // ✅ ENHANCED SUBMIT WITH BETTER VALIDATION AND ERROR HANDLING
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     console.log('🚀 Form submission started...');
//     console.log('📝 Current form data:', formData);
//     console.log('🖼️ Image file:', imageFile);
//     console.log('✏️ Editing equipment:', editingEquipment);
    
//     // Validation checks
//     if (codeValidation.isDuplicate) {
//       alert('❌ Kode equipment sudah digunakan! Silakan gunakan kode lain.');
//       return;
//     }

//     if (codeValidation.isChecking) {
//       alert('⏳ Sedang mengecek kode, tunggu sebentar...');
//       return;
//     }

//     // Required field validation
//     if (!formData.name.trim()) {
//       alert('❌ Nama equipment harus diisi!');
//       return;
//     }

//     if (!formData.code.trim()) {
//       alert('❌ Kode equipment harus diisi!');
//       return;
//     }

//     if (!formData.stock_quantity || parseInt(formData.stock_quantity) < 0) {
//       alert('❌ Jumlah stok harus diisi dengan angka valid!');
//       return;
//     }

//     if (!formData.price_per_day || parseFloat(formData.price_per_day) < 0) {
//       alert('❌ Harga per hari harus diisi dengan angka valid!');
//       return;
//     }
    
//     setLoading(true);

//     try {
//       let image_url = editingEquipment ? editingEquipment.image_url : null;
      
//       // ✅ Upload image if new file selected
//       if (imageFile) {
//         console.log('🖼️ New image detected, uploading...');
//         try {
//           image_url = await uploadImage(formData.code.trim().toUpperCase());
//           console.log('✅ Image upload completed successfully');
//           console.log('🔗 Final image URL:', image_url);
//         } catch (uploadError) {
//           console.error('❌ Image upload failed:', uploadError);
          
//           // Ask user if they want to continue without image
//           const proceed = confirm(
//             `Upload gambar gagal: ${uploadError.message}\n\n` +
//             `Apakah Anda ingin melanjutkan menyimpan equipment tanpa mengubah gambar?`
//           );
          
//           if (!proceed) {
//             setLoading(false);
//             return;
//           }
          
//           console.log('⚠️ User chose to continue without image upload');
//           // Keep existing image_url (will be null for new equipment)
//         }
//       }
      
//       // Prepare equipment data
//       const equipmentData = {
//         name: formData.name.trim(),
//         code: formData.code.trim().toUpperCase(),
//         description: formData.description.trim(),
//         category: formData.category,
//         size_capacity: formData.size_capacity.trim(),
//         dimensions: formData.dimensions.trim(),
//         weight: formData.weight ? parseFloat(formData.weight) : null,
//         material: formData.material.trim(),
//         stock_quantity: parseInt(formData.stock_quantity),
//         price_per_day: parseFloat(formData.price_per_day),
//         condition: formData.condition,
//         image_url: image_url
//       };

//       console.log('📤 Final equipment data to send:', equipmentData);

//       // Send to API
//       const apiUrl = 'http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php';
//       let response;
      
//       if (editingEquipment) {
//         console.log('📝 Updating equipment with ID:', editingEquipment.equipment_id);
//         response = await fetch(apiUrl, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             equipment_id: editingEquipment.equipment_id,
//             ...equipmentData
//           })
//         });
//       } else {
//         console.log('➕ Creating new equipment');
//         response = await fetch(apiUrl, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(equipmentData)
//         });
//       }

//       console.log('📥 API response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('❌ API error response:', errorText);
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log('📥 API response data:', result);

//       if (result.success) {
//         const message = editingEquipment 
//           ? '✅ Equipment berhasil diupdate!' 
//           : '✅ Equipment berhasil ditambahkan!';
        
//         alert(message);
        
//         // Reset form and refresh data
//         console.log('🔄 Refreshing equipment list...');
//         await fetchEquipments();
//         resetForm();
//       } else {
//         throw new Error(result.message || result.error || 'Gagal menyimpan equipment');
//       }

//     } catch (err) {
//       console.error('❌ Error saving equipment:', err);
//       alert('Error menyimpan equipment: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (equipment) => {
//     if (!confirm(`Yakin ingin menghapus "${equipment.name}"?`)) return;

//     try {
//       setLoading(true);
      
//       const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?id=${equipment.equipment_id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         alert('✅ Equipment berhasil dihapus!');
//         await fetchEquipments();
//       } else {
//         throw new Error(result.message || 'Gagal menghapus equipment');
//       }
//     } catch (err) {
//       console.error('❌ Error deleting equipment:', err);
//       alert('Error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (equipment) => {
//     console.log('✏️ Editing equipment:', equipment);
    
//     setFormData({
//       name: equipment.name || '',
//       code: equipment.code || '',
//       description: equipment.description || '',
//       category: equipment.category || 'tenda',
//       size_capacity: equipment.size_capacity || '',
//       dimensions: equipment.dimensions || '',
//       weight: equipment.weight ? equipment.weight.toString() : '',
//       material: equipment.material || '',
//       stock_quantity: equipment.stock_quantity ? equipment.stock_quantity.toString() : '',
//       price_per_day: equipment.price_per_day ? equipment.price_per_day.toString() : '',
//       condition: equipment.condition || 'baik'
//     });
    
//     setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
    
//     // ✅ Reset image states
//     setImageFile(null);
//     setImagePreview(null);
    
//     // ✅ Clear file input using ref
//     clearFileInput();
    
//     setEditingEquipment(equipment);
//     setShowAddModal(true);
//   };

//   const resetForm = () => {
//     console.log('🔄 Resetting form...');
    
//     setFormData({
//       name: "", code: "", description: "", category: "tenda",
//       size_capacity: "", dimensions: "", weight: "", material: "",
//       stock_quantity: "", price_per_day: "", condition: "baik"
//     });
    
//     setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//     setImageFile(null);
//     setImagePreview(null);
//     setShowAddModal(false);
//     setEditingEquipment(null);
    
//     // ✅ Clear file input using ref
//     clearFileInput();
//   };

//   const getCodeInputStyle = () => {
//     if (!formData.code || formData.code.length < 3) return '';
//     if (codeValidation.isChecking) return 'border-yellow-400 bg-yellow-50';
//     if (codeValidation.isDuplicate) return 'border-red-400 bg-red-50';
//     return 'border-green-400 bg-green-50';
//   };

//   const getStockStatus = (equipment) => {
//     const available = equipment.available_stock || equipment.stock_quantity;
//     if (available === 0) return { color: 'bg-red-500', text: 'Habis' };
//     if (available <= 2) return { color: 'bg-yellow-500', text: 'Stok Rendah' };
//     return { color: 'bg-green-500', text: 'Tersedia' };
//   };

//   const getConditionColor = (condition) => {
//     switch(condition) {
//       case 'baik': return 'bg-green-500';
//       case 'rusak_ringan': return 'bg-yellow-500';
//       case 'perbaikan': return 'bg-red-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   // ✅ FUNCTION TO BUILD IMAGE URL WITH MULTIPLE FALLBACKS
//   const getImageUrl = (equipment) => {
//     if (!equipment.image_url) return null;
    
//     // Try different URL patterns
//     const possibleUrls = [
//       `http://localhost${equipment.image_url}`,
//       `http://localhost/PBL - KELANA OUTDOOR${equipment.image_url}`,
//       `http://localhost/PBL - KELANA OUTDOOR/uploads/images/${equipment.code.toLowerCase()}.jpg`,
//       `http://localhost/PBL - KELANA OUTDOOR/uploads/images/${equipment.code.toLowerCase()}.png`,
//       equipment.image_url // In case it's already a full URL
//     ];
    
//     return possibleUrls[0]; // Return first one, will try others on error
//   };

//   const stats = {
//     total: equipments.length,
//     available: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) > 0).length,
//     lowStock: equipments.filter(eq => {
//       const available = eq.available_stock || eq.stock_quantity;
//       return available <= 2 && available > 0;
//     }).length,
//     outOfStock: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) === 0).length,
//     totalValue: equipments.reduce((sum, eq) => sum + (eq.price_per_day * eq.stock_quantity), 0)
//   };

//   if (loading && equipments.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
//           <p className="text-gray-600">Memuat equipment dari database...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HEADER */}
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
//                 disabled={loading}
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Tambah Equipment
//               </Button>
//               <Button 
//                 variant="outline" 
//                 onClick={fetchEquipments}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                 ) : (
//                   <RefreshCw className="h-4 w-4 mr-2" />
//                 )}
//                 Refresh
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         {/* ERROR ALERT */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
//             <div className="flex items-center gap-2">
//               <AlertTriangle className="h-5 w-5 text-red-600" />
//               <div>
//                 <p className="text-red-800 font-medium">Database Connection Error</p>
//                 <p className="text-red-600 text-sm">{error}</p>
//                 <p className="text-red-600 text-sm">Menampilkan data mock untuk development.</p>
//               </div>
//             </div>
//             <Button 
//               onClick={fetchEquipments}
//               size="sm"
//               className="mt-2 bg-red-600 hover:bg-red-700"
//             >
//               Coba Lagi
//             </Button>
//           </div>
//         )}

//         {/* STATS CARDS */}
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

//         {/* FILTERS */}
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

//         {/* ✅ ENHANCED EQUIPMENT GRID WITH BETTER IMAGE HANDLING */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredEquipments.map((equipment) => {
//             const stockStatus = getStockStatus(equipment);
//             const available = equipment.available_stock || equipment.stock_quantity;
//             const reserved = equipment.reserved_stock || 0;
//             const rented = equipment.rented_stock || 0;
            
//             return (
//               <Card key={equipment.equipment_id} className="overflow-hidden hover:shadow-lg transition-shadow">
//                 <CardContent className="p-0">
//                   {/* ✅ ENHANCED IMAGE SECTION WITH MULTIPLE FALLBACKS */}
//                   {equipment.image_url ? (
//                     <div className="w-full h-48 overflow-hidden bg-gray-100 relative">
//                       <img 
//                         src={getImageUrl(equipment)}
//                         alt={equipment.name}
//                         className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                         onError={(e) => {
//                           console.log('❌ Primary image failed to load:', getImageUrl(equipment));
                          
//                           // Try alternative URLs
//                           const img = e.target as HTMLImageElement;
//                           const currentSrc = img.src;
                          
//                           if (currentSrc.includes('http://localhost/PBL - KELANA OUTDOOR')) {
//                             // Try without the project folder
//                             img.src = `http://localhost${equipment.image_url}`;
//                           } else if (!currentSrc.includes('uploads/images/')) {
//                             // Try the uploads folder directly
//                             img.src = `http://localhost/PBL - KELANA OUTDOOR/uploads/images/${equipment.code.toLowerCase()}.jpg`;
//                           } else {
//                             // All attempts failed, show fallback
//                             img.style.display = 'none';
//                             const fallback = img.nextElementSibling as HTMLElement;
//                             if (fallback) fallback.style.display = 'flex';
//                           }
//                         }}
//                         onLoad={() => {
//                           console.log('✅ Image loaded successfully:', getImageUrl(equipment));
//                         }}
//                       />
                      
//                       {/* Fallback when image fails to load */}
//                       <div className="hidden absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 items-center justify-center">
//                         <div className="text-center text-white">
//                           <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-70" />
//                           <p className="text-sm opacity-70">Gambar tidak dapat dimuat</p>
//                           <p className="text-xs opacity-50 mt-1">{equipment.code}</p>
//                         </div>
//                       </div>
                      
//                       {/* Debug info overlay (only in development) */}
//                       <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs p-1 rounded opacity-0 hover:opacity-100 transition-opacity">
//                         {equipment.image_url}
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
//                       <div className="text-center text-white">
//                         <span className="text-4xl font-bold block mb-2">
//                           {equipment.name.charAt(0)}
//                         </span>
//                         <p className="text-sm opacity-70">Tidak ada gambar</p>
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* CONTENT SECTION */}
//                   <div className="p-6">
//                     {/* Header */}
//                     <div className="flex justify-between items-start mb-3">
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
//                           {equipment.name}
//                         </h3>
//                         <p className="text-sm text-gray-600 mb-2">{equipment.code}</p>
//                         <Badge variant="outline" className="text-xs">
//                           {equipment.category.toUpperCase()}
//                         </Badge>
//                       </div>
//                       <div className="flex flex-col gap-1 ml-2">
//                         <Badge className={`${stockStatus.color} text-white text-xs text-center`}>
//                           {stockStatus.text}
//                         </Badge>
//                         <Badge className={`${getConditionColor(equipment.condition)} text-white text-xs text-center`}>
//                           {equipment.condition}
//                         </Badge>
//                       </div>
//                     </div>

//                     {/* ✅ DESCRIPTION */}
//                     {equipment.description && (
//                       <div className="mb-4">
//                         <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
//                           {equipment.description}
//                         </p>
//                       </div>
//                     )}

//                     {/* ✅ SPESIFIKASI */}
//                     <div className="bg-gray-50 p-3 rounded-lg mb-4">
//                       <h4 className="font-medium text-sm text-gray-800 mb-2">Spesifikasi</h4>
//                       <div className="space-y-2 text-xs">
//                         {equipment.size_capacity && (
//                           <div className="flex items-center gap-2">
//                             <Package className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Kapasitas:</span>
//                               <span className="font-medium text-gray-900">{equipment.size_capacity}</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         {equipment.dimensions && (
//                           <div className="flex items-center gap-2">
//                             <Ruler className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Dimensi:</span>
//                               <span className="font-medium text-gray-900">{equipment.dimensions}</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         {equipment.weight && equipment.weight > 0 && (
//                           <div className="flex items-center gap-2">
//                             <Weight className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Berat:</span>
//                               <span className="font-medium text-gray-900">{equipment.weight} kg</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         {equipment.material && (
//                           <div className="flex items-center gap-2">
//                             <CheckCircle className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Material:</span>
//                               <span className="font-medium text-gray-900">{equipment.material}</span>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Stock Info */}
//                     <div className="bg-blue-50 p-3 rounded-lg mb-4">
//                       <div className="grid grid-cols-3 gap-2 text-center text-sm">
//                         <div>
//                           <div className="font-semibold text-green-600">{available}</div>
//                           <div className="text-xs text-gray-600">Tersedia</div>
//                         </div>
//                         <div>
//                           <div className="font-semibold text-yellow-600">{reserved}</div>
//                           <div className="text-xs text-gray-600">Reserved</div>
//                         </div>
//                         <div>
//                           <div className="font-semibold text-blue-600">{rented}</div>
//                           <div className="text-xs text-gray-600">Disewa</div>
//                         </div>
//                       </div>
//                       <div className="mt-2 pt-2 border-t border-blue-200">
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">Total Stok:</span>
//                           <span className="font-semibold text-gray-900">{equipment.stock_quantity} unit</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Price */}
//                     <div className="mb-4">
//                       <div className="text-2xl font-bold text-green-600">
//                         Rp {equipment.price_per_day.toLocaleString('id-ID')}
//                       </div>
//                       <div className="text-sm text-gray-600">per hari</div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex gap-2">
//                       <Button 
//                         size="sm" 
//                         variant="outline"
//                         onClick={() => handleEdit(equipment)}
//                         className="flex-1"
//                         disabled={loading}
//                       >
//                         <Edit className="h-4 w-4 mr-1" />
//                         Edit
//                       </Button>
//                       <Button 
//                         size="sm" 
//                         variant="outline"
//                         onClick={() => handleDelete(equipment)}
//                         className="text-red-600 hover:text-red-700"
//                         disabled={loading}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Empty state */}
//         {filteredEquipments.length === 0 && !loading && (
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

//       {/* ✅ ENHANCED MODAL WITH BETTER IMAGE HANDLING */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle>
//                   {editingEquipment ? 'Edit Equipment' : 'Tambah Equipment Baru'}
//                 </CardTitle>
//                 <Button 
//                   variant="ghost" 
//                   size="sm"
//                   onClick={resetForm}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
                
//                 {/* ✅ ENHANCED IMAGE UPLOAD SECTION */}
//                 <div className="border-b pb-6">
//                   <h3 className="text-lg font-medium mb-4">📷 Gambar Equipment</h3>
                  
//                   <div className="flex flex-col lg:flex-row gap-6">
//                     {/* Image Preview */}
//                     <div className="lg:w-1/3">
//                       {imagePreview ? (
//                         // New image preview
//                         <div className="relative">
//                           <img 
//                             src={imagePreview}
//                             alt="New equipment image"
//                             className="w-full h-48 object-cover rounded-lg border"
//                           />
//                           <Button
//                             type="button"
//                             variant="destructive"
//                             size="sm"
//                             className="absolute top-2 right-2"
//                             onClick={() => {
//                               setImageFile(null);
//                               setImagePreview(null);
//                               clearFileInput();
//                             }}
//                           >
//                             <X className="h-3 w-3" />
//                           </Button>
//                           <div className="absolute bottom-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
//                             Gambar Baru
//                           </div>
//                         </div>
//                       ) : editingEquipment?.image_url ? (
//                         // Existing image
//                         <div className="relative">
//                           <img 
//                             src={getImageUrl(editingEquipment)}
//                             alt="Current equipment image"
//                             className="w-full h-48 object-cover rounded-lg border"
//                             onError={(e) => {
//                               console.log('❌ Current image failed to load');
//                               (e.target as HTMLImageElement).style.display = 'none';
//                               const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
//                               if (fallback) fallback.style.display = 'flex';
//                             }}
//                           />
//                           <div className="hidden w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 items-center justify-center">
//                             <div className="text-center text-gray-500">
//                               <ImageIcon className="h-12 w-12 mx-auto mb-2" />
//                               <p className="text-sm">Gambar tidak dapat dimuat</p>
//                             </div>
//                           </div>
//                           <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
//                             Gambar Saat Ini
//                           </div>
//                         </div>
//                       ) : (
//                         // No image placeholder
//                         <div className="w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
//                           <div className="text-center text-gray-500">
//                             <ImageIcon className="h-12 w-12 mx-auto mb-2" />
//                             <p className="text-sm">Belum ada gambar</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Upload Controls */}
//                     <div className="lg:w-2/3">
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium mb-2">
//                             Upload Gambar {editingEquipment ? 'Baru' : ''}
//                           </label>
//                           <input
//                             ref={fileInputRef}
//                             type="file"
//                             accept="image/jpeg,image/png,image/gif,image/webp"
//                             onChange={handleImageChange}
//                             className="block w-full text-sm text-gray-500
//                                        file:mr-4 file:py-2 file:px-4
//                                        file:rounded-lg file:border-0
//                                        file:text-sm file:font-medium
//                                        file:bg-green-50 file:text-green-700
//                                        hover:file:bg-green-100 cursor-pointer"
//                             disabled={uploadingImage}
//                           />
//                         </div>
                        
//                         {/* Status indicators */}
//                         {imageFile && (
//                           <div className="p-3 bg-green-50 rounded-lg">
//                             <div className="flex items-center text-green-800">
//                               <CheckCircle className="h-4 w-4 mr-2" />
//                               <span className="text-sm">
//                                 Gambar siap untuk diupload: <strong>{imageFile.name}</strong>
//                               </span>
//                             </div>
//                             <div className="text-xs text-green-600 mt-1">
//                               Ukuran: {(imageFile.size / 1024 / 1024).toFixed(2)} MB
//                             </div>
//                           </div>
//                         )}
                        
//                         <div className="bg-blue-50 p-3 rounded-lg">
//                           <h4 className="font-medium text-blue-900 mb-2">📋 Panduan Upload:</h4>
//                           <ul className="text-sm text-blue-800 space-y-1">
//                             <li>• Format: JPG, PNG, GIF, WEBP</li>
//                             <li>• Ukuran maksimal: 5MB</li>
//                             <li>• Resolusi direkomendasikan: 800x600px</li>
//                             <li>• Gambar akan disimpan dengan nama kode equipment</li>
//                           </ul>
//                         </div>
                        
//                         {uploadingImage && (
//                           <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
//                             <Loader2 className="h-4 w-4 animate-spin mr-2 text-yellow-600" />
//                             <span className="text-sm text-yellow-800">Mengupload gambar...</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* FORM FIELDS */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Nama Equipment *</label>
//                     <Input
//                       value={formData.name}
//                       onChange={(e) => setFormData({...formData, name: e.target.value})}
//                       placeholder="Tenda Dome 4 Orang"
//                       required
//                     />
//                   </div>
                  
//                   {/* CODE INPUT WITH VALIDATION */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kode Equipment *</label>
//                     <div className="relative">
//                       <Input
//                         value={formData.code}
//                         onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
//                         placeholder="TENDA-001"
//                         required
//                         className={getCodeInputStyle()}
//                       />
                      
//                       {codeValidation.isChecking && (
//                         <div className="absolute right-3 top-3">
//                           <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
//                         </div>
//                       )}
                      
//                       {formData.code && formData.code.length >= 3 && !codeValidation.isChecking && !codeValidation.isDuplicate && (
//                         <div className="absolute right-3 top-3">
//                           <CheckCircle className="h-4 w-4 text-green-600" />
//                         </div>
//                       )}
                      
//                       {codeValidation.isDuplicate && (
//                         <div className="absolute right-3 top-3">
//                           <AlertTriangle className="h-4 w-4 text-red-600" />
//                         </div>
//                       )}
//                     </div>
                    
//                     {formData.code && formData.code.length >= 3 && codeValidation.message && (
//                       <p className={`text-xs mt-1 ${
//                         codeValidation.isDuplicate ? 'text-red-600' : 
//                         codeValidation.isChecking ? 'text-yellow-600' : 
//                         editingEquipment && formData.code === editingEquipment.code ? 'text-blue-600' : 'text-green-600'
//                       }`}>
//                         {codeValidation.isDuplicate ? '❌ ' : 
//                          codeValidation.isChecking ? '⏳ ' : 
//                          editingEquipment && formData.code === editingEquipment.code ? '📝 ' : '✅ '}
//                         {codeValidation.message}
//                       </p>
//                     )}
                    
//                     <p className="text-xs text-gray-500 mt-1">
//                       💡 Format: KATEGORI-XXX (contoh: TENDA-001, TAS-002)
//                     </p>
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
//                     <label className="block text-sm font-medium mb-2">Kategori *</label>
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
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kondisi *</label>
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
//                     <label className="block text-sm font-medium mb-2">Jumlah Stok *</label>
//                     <Input
//                       type="number"
//                       min="0"
//                       value={formData.stock_quantity}
//                       onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
//                       placeholder="5"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Harga per Hari (Rp) *</label>
//                     <Input
//                       type="number"
//                       min="0"
//                       value={formData.price_per_day}
//                       onChange={(e) => setFormData({...formData, price_per_day: e.target.value})}
//                       placeholder="60000"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-2 pt-4 border-t">
//                   <Button 
//                     type="submit" 
//                     className="bg-green-600 hover:bg-green-700"
//                     disabled={loading || codeValidation.isDuplicate || codeValidation.isChecking || uploadingImage}
//                   >
//                     {(loading || uploadingImage) ? (
//                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                     ) : (
//                       <Upload className="h-4 w-4 mr-2" />
//                     )}
//                     {editingEquipment ? 'Update Equipment' : 'Tambah Equipment'}
//                   </Button>
//                   <Button 
//                     type="button" 
//                     variant="outline"
//                     onClick={resetForm}
//                     disabled={loading || uploadingImage}
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


// import { useState, useEffect, useCallback, useRef } from "react";
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
//   RefreshCw,
//   Loader2,
//   X,
//   CheckCircle,
//   Upload,
//   Image as ImageIcon,
//   Weight,
//   Ruler
// } from "lucide-react";

// const EquipmentManagement = () => {
//   const [equipments, setEquipments] = useState([]);
//   const [filteredEquipments, setFilteredEquipments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [conditionFilter, setConditionFilter] = useState("all");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingEquipment, setEditingEquipment] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ STATE UNTUK CODE VALIDATION
//   const [codeValidation, setCodeValidation] = useState({
//     isChecking: false,
//     isDuplicate: false,
//     message: ''
//   });

//   // ✅ IMAGE UPLOAD STATES
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [uploadingImage, setUploadingImage] = useState(false);

//   // ✅ REF UNTUK FILE INPUT
//   const fileInputRef = useRef<HTMLInputElement>(null);

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

//   useEffect(() => {
//     fetchEquipments();
//   }, []);

//   const fetchEquipments = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php');
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       if (Array.isArray(data)) {
//         setEquipments(data);
//         setFilteredEquipments(data);
//       } else {
//         setEquipments([]);
//         setFilteredEquipments([]);
//       }
      
//     } catch (err) {
//       console.error('❌ Error fetching equipment:', err);
//       setError('Gagal memuat equipment: ' + err.message);
      
//       // Fallback mock data
//       const mockEquipments = [
//         {
//           equipment_id: 1,
//           name: "Tenda Dome 4-6 Orang (MOCK)",
//           code: "TENDA-001",
//           description: "Tenda berkualitas tinggi untuk 4-6 orang dengan fitur tahan air dan mudah dipasang. Cocok untuk camping keluarga atau petualangan outdoor.",
//           category: "tenda",
//           size_capacity: "4-6 Orang",
//           dimensions: "300x250x180 cm",
//           weight: 8.5,
//           material: "Nylon 210T Waterproof",
//           stock_quantity: 5,
//           price_per_day: 60000,
//           condition: "baik",
//           available_stock: 3,
//           reserved_stock: 1,
//           rented_stock: 1,
//           image_url: null,
//           created_at: "2024-01-15"
//         }
//       ];
      
//       setEquipments(mockEquipments);
//       setFilteredEquipments(mockEquipments);
      
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ CODE VALIDATION
//   const checkCodeAvailability = useCallback(
//     async (code, excludeId = null) => {
//       if (!code || code.length < 3) {
//         setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//         return;
//       }

//       setCodeValidation({ isChecking: true, isDuplicate: false, message: 'Mengecek ketersediaan kode...' });

//       try {
//         const url = excludeId 
//           ? `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}&exclude_id=${excludeId}`
//           : `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}`;
        
//         const response = await fetch(url);
//         const result = await response.json();

//         if (response.ok) {
//           let message = result.message;
//           if (editingEquipment && !result.exists && code === editingEquipment.code) {
//             message = 'Kode tidak berubah dari sebelumnya';
//           }

//           setCodeValidation({
//             isChecking: false,
//             isDuplicate: result.exists,
//             message: message
//           });
//         } else {
//           setCodeValidation({
//             isChecking: false,
//             isDuplicate: false,
//             message: ''
//           });
//         }

//       } catch (error) {
//         console.error('Error checking code:', error);
//         setCodeValidation({
//           isChecking: false, 
//           isDuplicate: false, 
//           message: ''
//         });
//       }
//     }, [editingEquipment]
//   );

//   // ✅ FUNCTION TO CLEAR FILE INPUT
//   const clearFileInput = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   // ✅ ENHANCED IMAGE HANDLING WITH BETTER DEBUGGING
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     console.log('📁 File selected:', file);
    
//     if (file) {
//       // Validate file size
//       if (file.size > 5 * 1024 * 1024) {
//         alert('⚠️ Ukuran gambar maksimal 5MB');
//         clearFileInput();
//         return;
//       }
      
//       // Validate file type
//       const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//       if (!allowedTypes.includes(file.type)) {
//         alert('⚠️ Format file harus JPG, PNG, GIF, atau WEBP');
//         clearFileInput();
//         return;
//       }
      
//       console.log('✅ File validation passed');
//       console.log('📊 File info:', {
//         name: file.name,
//         size: file.size,
//         type: file.type
//       });
      
//       setImageFile(file);
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         console.log('✅ Image preview created');
//         setImagePreview(reader.result);
//       };
//       reader.onerror = (error) => {
//         console.error('❌ Error reading file:', error);
//         alert('Error membaca file gambar');
//         setImageFile(null);
//         setImagePreview(null);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       console.log('⚠️ No file selected');
//       setImageFile(null);
//       setImagePreview(null);
//     }
//   };

//   // ✅ ENHANCED UPLOAD IMAGE WITH COMPREHENSIVE ERROR HANDLING
//   const uploadImage = async (equipmentCode) => {
//     if (!imageFile) {
//       console.log('⚠️ No image file to upload');
//       return null;
//     }
    
//     if (!equipmentCode) {
//       console.error('❌ No equipment code provided for upload');
//       throw new Error('Equipment code is required for image upload');
//     }
    
//     console.log('🚀 Starting image upload...');
//     console.log('📝 Equipment code:', equipmentCode);
//     console.log('📁 File:', imageFile);
    
//     setUploadingImage(true);
    
//     try {
//       // Create FormData
//       const uploadFormData = new FormData();
//       uploadFormData.append('image', imageFile);
//       uploadFormData.append('equipment_code', equipmentCode);
      
//       // Debug FormData
//       console.log('📤 FormData prepared:');
//       for (let [key, value] of uploadFormData.entries()) {
//         console.log(`  ${key}:`, value instanceof File ? `File(${value.name}, ${value.size} bytes)` : value);
//       }
      
//       // Make upload request
//       console.log('🌐 Sending upload request...');
//       const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/upload/image.php', {
//         method: 'POST',
//         body: uploadFormData
//         // Don't set Content-Type header, let browser set it with boundary for FormData
//       });
      
//       console.log('📥 Upload response received:');
//       console.log('  Status:', response.status);
//       console.log('  Status text:', response.statusText);
      
//       // Check if response is ok
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('❌ Upload HTTP error:', errorText);
//         throw new Error(`Upload failed with status ${response.status}: ${errorText}`);
//       }
      
//       // Parse response
//       const result = await response.json();
//       console.log('📥 Upload response data:', result);
      
//       if (result.success) {
//         console.log('✅ Image uploaded successfully!');
//         console.log('🔗 Image URL:', result.image_url);
//         return result.image_url;
//       } else {
//         console.error('❌ Upload failed:', result);
//         throw new Error(result.message || result.error || 'Upload failed without error message');
//       }
//     } catch (error) {
//       console.error('❌ Upload error:', error);
      
//       // More specific error messages
//       if (error.name === 'TypeError' && error.message.includes('fetch')) {
//         throw new Error('Tidak dapat terhubung ke server upload. Pastikan server berjalan.');
//       } else if (error.name === 'SyntaxError') {
//         throw new Error('Server mengembalikan response yang tidak valid.');
//       } else {
//         throw new Error(error.message || 'Terjadi kesalahan saat upload gambar.');
//       }
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   // ✅ DEBOUNCED CODE CHECK
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (formData.code && formData.code.length >= 3) {
//         const excludeId = editingEquipment ? editingEquipment.equipment_id : null;
//         checkCodeAvailability(formData.code, excludeId);
//       } else {
//         setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//       }
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [formData.code, editingEquipment, checkCodeAvailability]);

//   // Filter equipments
//   useEffect(() => {
//     let filtered = equipments;
    
//     if (searchTerm) {
//       filtered = filtered.filter(equipment => 
//         equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         equipment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         equipment.category.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     if (categoryFilter !== "all") {
//       filtered = filtered.filter(equipment => equipment.category === categoryFilter);
//     }
    
//     if (conditionFilter !== "all") {
//       filtered = filtered.filter(equipment => equipment.condition === conditionFilter);
//     }
    
//     setFilteredEquipments(filtered);
//   }, [equipments, searchTerm, categoryFilter, conditionFilter]);

//   // ✅ ENHANCED SUBMIT WITH BETTER VALIDATION AND ERROR HANDLING
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     console.log('🚀 Form submission started...');
//     console.log('📝 Current form data:', formData);
//     console.log('🖼️ Image file:', imageFile);
//     console.log('✏️ Editing equipment:', editingEquipment);
    
//     // Validation checks
//     if (codeValidation.isDuplicate) {
//       alert('❌ Kode equipment sudah digunakan! Silakan gunakan kode lain.');
//       return;
//     }

//     if (codeValidation.isChecking) {
//       alert('⏳ Sedang mengecek kode, tunggu sebentar...');
//       return;
//     }

//     // Required field validation
//     if (!formData.name.trim()) {
//       alert('❌ Nama equipment harus diisi!');
//       return;
//     }

//     if (!formData.code.trim()) {
//       alert('❌ Kode equipment harus diisi!');
//       return;
//     }

//     if (!formData.stock_quantity || parseInt(formData.stock_quantity) < 0) {
//       alert('❌ Jumlah stok harus diisi dengan angka valid!');
//       return;
//     }

//     if (!formData.price_per_day || parseFloat(formData.price_per_day) < 0) {
//       alert('❌ Harga per hari harus diisi dengan angka valid!');
//       return;
//     }
    
//     setLoading(true);

//     try {
//       let image_url = editingEquipment ? editingEquipment.image_url : null;
      
//       // ✅ Upload image if new file selected
//       if (imageFile) {
//         console.log('🖼️ New image detected, uploading...');
//         try {
//           image_url = await uploadImage(formData.code.trim().toUpperCase());
//           console.log('✅ Image upload completed successfully');
//           console.log('🔗 Final image URL:', image_url);
//         } catch (uploadError) {
//           console.error('❌ Image upload failed:', uploadError);
          
//           // Ask user if they want to continue without image
//           const proceed = confirm(
//             `Upload gambar gagal: ${uploadError.message}\n\n` +
//             `Apakah Anda ingin melanjutkan menyimpan equipment tanpa mengubah gambar?`
//           );
          
//           if (!proceed) {
//             setLoading(false);
//             return;
//           }
          
//           console.log('⚠️ User chose to continue without image upload');
//           // Keep existing image_url (will be null for new equipment)
//         }
//       }
      
//       // Prepare equipment data
//       const equipmentData = {
//         name: formData.name.trim(),
//         code: formData.code.trim().toUpperCase(),
//         description: formData.description.trim(),
//         category: formData.category,
//         size_capacity: formData.size_capacity.trim(),
//         dimensions: formData.dimensions.trim(),
//         weight: formData.weight ? parseFloat(formData.weight) : null,
//         material: formData.material.trim(),
//         stock_quantity: parseInt(formData.stock_quantity),
//         price_per_day: parseFloat(formData.price_per_day),
//         condition: formData.condition,
//         image_url: image_url
//       };

//       console.log('📤 Final equipment data to send:', equipmentData);

//       // Send to API
//       const apiUrl = 'http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php';
//       let response;
      
//       if (editingEquipment) {
//         console.log('📝 Updating equipment with ID:', editingEquipment.equipment_id);
//         response = await fetch(apiUrl, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             equipment_id: editingEquipment.equipment_id,
//             ...equipmentData
//           })
//         });
//       } else {
//         console.log('➕ Creating new equipment');
//         response = await fetch(apiUrl, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(equipmentData)
//         });
//       }

//       console.log('📥 API response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('❌ API error response:', errorText);
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log('📥 API response data:', result);

//       if (result.success) {
//         const message = editingEquipment 
//           ? '✅ Equipment berhasil diupdate!' 
//           : '✅ Equipment berhasil ditambahkan!';
        
//         alert(message);
        
//         // Reset form and refresh data
//         console.log('🔄 Refreshing equipment list...');
//         await fetchEquipments();
//         resetForm();
//       } else {
//         throw new Error(result.message || result.error || 'Gagal menyimpan equipment');
//       }

//     } catch (err) {
//       console.error('❌ Error saving equipment:', err);
//       alert('Error menyimpan equipment: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (equipment) => {
//     if (!confirm(`Yakin ingin menghapus "${equipment.name}"?`)) return;

//     try {
//       setLoading(true);
      
//       const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?id=${equipment.equipment_id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         alert('✅ Equipment berhasil dihapus!');
//         await fetchEquipments();
//       } else {
//         throw new Error(result.message || 'Gagal menghapus equipment');
//       }
//     } catch (err) {
//       console.error('❌ Error deleting equipment:', err);
//       alert('Error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (equipment) => {
//     console.log('✏️ Editing equipment:', equipment);
    
//     setFormData({
//       name: equipment.name || '',
//       code: equipment.code || '',
//       description: equipment.description || '',
//       category: equipment.category || 'tenda',
//       size_capacity: equipment.size_capacity || '',
//       dimensions: equipment.dimensions || '',
//       weight: equipment.weight ? equipment.weight.toString() : '',
//       material: equipment.material || '',
//       stock_quantity: equipment.stock_quantity ? equipment.stock_quantity.toString() : '',
//       price_per_day: equipment.price_per_day ? equipment.price_per_day.toString() : '',
//       condition: equipment.condition || 'baik'
//     });
    
//     setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
    
//     // ✅ Reset image states
//     setImageFile(null);
//     setImagePreview(null);
    
//     // ✅ Clear file input using ref
//     clearFileInput();
    
//     setEditingEquipment(equipment);
//     setShowAddModal(true);
//   };

//   const resetForm = () => {
//     console.log('🔄 Resetting form...');
    
//     setFormData({
//       name: "", code: "", description: "", category: "tenda",
//       size_capacity: "", dimensions: "", weight: "", material: "",
//       stock_quantity: "", price_per_day: "", condition: "baik"
//     });
    
//     setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
//     setImageFile(null);
//     setImagePreview(null);
//     setShowAddModal(false);
//     setEditingEquipment(null);
    
//     // ✅ Clear file input using ref
//     clearFileInput();
//   };

//   const getCodeInputStyle = () => {
//     if (!formData.code || formData.code.length < 3) return '';
//     if (codeValidation.isChecking) return 'border-yellow-400 bg-yellow-50';
//     if (codeValidation.isDuplicate) return 'border-red-400 bg-red-50';
//     return 'border-green-400 bg-green-50';
//   };

//   const getStockStatus = (equipment) => {
//     const available = equipment.available_stock || equipment.stock_quantity;
//     if (available === 0) return { color: 'bg-red-500', text: 'Habis' };
//     if (available <= 2) return { color: 'bg-yellow-500', text: 'Stok Rendah' };
//     return { color: 'bg-green-500', text: 'Tersedia' };
//   };

//   const getConditionColor = (condition) => {
//     switch(condition) {
//       case 'baik': return 'bg-green-500';
//       case 'rusak_ringan': return 'bg-yellow-500';
//       case 'perbaikan': return 'bg-red-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   // ✅ ENHANCED FUNCTION TO BUILD IMAGE URL WITH MULTIPLE FALLBACKS
//   const buildImageUrl = (equipment) => {
//     if (!equipment.image_url) return null;
    
//     // Clean the image_url if it starts with slash
//     let imagePath = equipment.image_url;
//     if (imagePath.startsWith('/')) {
//       imagePath = imagePath.substring(1);
//     }
    
//     // Build full URL
//     const baseUrl = 'http://localhost/PBL - KELANA OUTDOOR';
//     return `${baseUrl}/${imagePath}`;
//   };

//   // ✅ ENHANCED IMAGE LOADING WITH ERROR RECOVERY
//   const handleImageError = (e, equipment, retryCount = 0) => {
//     const img = e.target as HTMLImageElement;
//     const maxRetries = 3;
    
//     console.log(`❌ Image load error for ${equipment.code}, retry ${retryCount}/${maxRetries}`);
//     console.log('Failed URL:', img.src);
    
//     if (retryCount < maxRetries) {
//       // Try alternative URLs
//       const alternatives = [
//         `http://localhost/PBL - KELANA OUTDOOR${equipment.image_url}`,
//         `http://localhost${equipment.image_url}`,
//         `http://localhost/PBL - KELANA OUTDOOR/uploads/images/${equipment.code.toLowerCase()}.jpg`,
//         `http://localhost/PBL - KELANA OUTDOOR/uploads/images/${equipment.code.toLowerCase()}.png`
//       ];
      
//       if (alternatives[retryCount]) {
//         console.log(`🔄 Trying alternative URL: ${alternatives[retryCount]}`);
//         img.src = alternatives[retryCount];
//         return;
//       }
//     }
    
//     // All retries failed, show fallback
//     console.log('❌ All image URLs failed, showing fallback');
//     img.style.display = 'none';
//     const fallback = img.nextElementSibling as HTMLElement;
//     if (fallback) {
//       fallback.style.display = 'flex';
//     }
//   };

//   const stats = {
//     total: equipments.length,
//     available: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) > 0).length,
//     lowStock: equipments.filter(eq => {
//       const available = eq.available_stock || eq.stock_quantity;
//       return available <= 2 && available > 0;
//     }).length,
//     outOfStock: equipments.filter(eq => (eq.available_stock || eq.stock_quantity) === 0).length,
//     totalValue: equipments.reduce((sum, eq) => sum + (eq.price_per_day * eq.stock_quantity), 0)
//   };

//   if (loading && equipments.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
//           <p className="text-gray-600">Memuat equipment dari database...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HEADER */}
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
//                 disabled={loading}
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Tambah Equipment
//               </Button>
//               <Button 
//                 variant="outline" 
//                 onClick={fetchEquipments}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                 ) : (
//                   <RefreshCw className="h-4 w-4 mr-2" />
//                 )}
//                 Refresh
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         {/* ERROR ALERT */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
//             <div className="flex items-center gap-2">
//               <AlertTriangle className="h-5 w-5 text-red-600" />
//               <div>
//                 <p className="text-red-800 font-medium">Database Connection Error</p>
//                 <p className="text-red-600 text-sm">{error}</p>
//                 <p className="text-red-600 text-sm">Menampilkan data mock untuk development.</p>
//               </div>
//             </div>
//             <Button 
//               onClick={fetchEquipments}
//               size="sm"
//               className="mt-2 bg-red-600 hover:bg-red-700"
//             >
//               Coba Lagi
//             </Button>
//           </div>
//         )}

//         {/* STATS CARDS */}
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

//         {/* FILTERS */}
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

//         {/* ✅ ENHANCED EQUIPMENT GRID WITH ROBUST IMAGE HANDLING */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredEquipments.map((equipment) => {
//             const stockStatus = getStockStatus(equipment);
//             const available = equipment.available_stock || equipment.stock_quantity;
//             const reserved = equipment.reserved_stock || 0;
//             const rented = equipment.rented_stock || 0;
            
//             return (
//               <Card key={equipment.equipment_id} className="overflow-hidden hover:shadow-lg transition-shadow">
//                 <CardContent className="p-0">
//                   {/* ✅ ENHANCED IMAGE SECTION WITH MULTIPLE FALLBACK STRATEGIES */}
//                   {equipment.image_url ? (
//                     <div className="w-full h-48 overflow-hidden bg-gray-100 relative">
//                       <img 
//                         src={buildImageUrl(equipment)}
//                         alt={equipment.name}
//                         className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                         onError={(e) => handleImageError(e, equipment, 0)}
//                         onLoad={() => {
//                           console.log('✅ Image loaded successfully for:', equipment.code);
//                         }}
//                         style={{ display: 'block' }}
//                       />
                      
//                       {/* Enhanced Fallback */}
//                       <div className="hidden absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 items-center justify-center">
//                         <div className="text-center text-white p-4">
//                           <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-70" />
//                           <p className="text-sm opacity-70 mb-1">Gambar tidak dapat dimuat</p>
//                           <p className="text-xs opacity-50">{equipment.code}</p>
//                           <div className="mt-2 text-xs opacity-60 bg-black bg-opacity-20 p-1 rounded">
//                             {equipment.image_url}
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* Debug info overlay (development only) */}
//                       <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs p-1 rounded opacity-0 hover:opacity-100 transition-opacity">
//                         <div>Path: {equipment.image_url}</div>
//                         <div>Full: {buildImageUrl(equipment)}</div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="w-full h-48 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
//                       <div className="text-center text-white">
//                         <span className="text-4xl font-bold block mb-2">
//                           {equipment.name.charAt(0)}
//                         </span>
//                         <p className="text-sm opacity-70">Tidak ada gambar</p>
//                         <p className="text-xs opacity-50 mt-1">{equipment.code}</p>
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* CONTENT SECTION */}
//                   <div className="p-6">
//                     {/* Header */}
//                     <div className="flex justify-between items-start mb-3">
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
//                           {equipment.name}
//                         </h3>
//                         <p className="text-sm text-gray-600 mb-2">{equipment.code}</p>
//                         <Badge variant="outline" className="text-xs">
//                           {equipment.category.toUpperCase()}
//                         </Badge>
//                       </div>
//                       <div className="flex flex-col gap-1 ml-2">
//                         <Badge className={`${stockStatus.color} text-white text-xs text-center`}>
//                           {stockStatus.text}
//                         </Badge>
//                         <Badge className={`${getConditionColor(equipment.condition)} text-white text-xs text-center`}>
//                           {equipment.condition}
//                         </Badge>
//                       </div>
//                     </div>

//                     {/* ✅ DESCRIPTION */}
//                     {equipment.description && (
//                       <div className="mb-4">
//                         <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
//                           {equipment.description}
//                         </p>
//                       </div>
//                     )}

//                     {/* ✅ SPESIFIKASI */}
//                     <div className="bg-gray-50 p-3 rounded-lg mb-4">
//                       <h4 className="font-medium text-sm text-gray-800 mb-2">Spesifikasi</h4>
//                       <div className="space-y-2 text-xs">
//                         {equipment.size_capacity && (
//                           <div className="flex items-center gap-2">
//                             <Package className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Kapasitas:</span>
//                               <span className="font-medium text-gray-900">{equipment.size_capacity}</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         {equipment.dimensions && (
//                           <div className="flex items-center gap-2">
//                             <Ruler className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Dimensi:</span>
//                               <span className="font-medium text-gray-900">{equipment.dimensions}</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         {equipment.weight && equipment.weight > 0 && (
//                           <div className="flex items-center gap-2">
//                             <Weight className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Berat:</span>
//                               <span className="font-medium text-gray-900">{equipment.weight} kg</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         {equipment.material && (
//                           <div className="flex items-center gap-2">
//                             <CheckCircle className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                             <div className="flex justify-between w-full">
//                               <span className="text-gray-600">Material:</span>
//                               <span className="font-medium text-gray-900">{equipment.material}</span>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Stock Info */}
//                     <div className="bg-blue-50 p-3 rounded-lg mb-4">
//                       <div className="grid grid-cols-3 gap-2 text-center text-sm">
//                         <div>
//                           <div className="font-semibold text-green-600">{available}</div>
//                           <div className="text-xs text-gray-600">Tersedia</div>
//                         </div>
//                         <div>
//                           <div className="font-semibold text-yellow-600">{reserved}</div>
//                           <div className="text-xs text-gray-600">Reserved</div>
//                         </div>
//                         <div>
//                           <div className="font-semibold text-blue-600">{rented}</div>
//                           <div className="text-xs text-gray-600">Disewa</div>
//                         </div>
//                       </div>
//                       <div className="mt-2 pt-2 border-t border-blue-200">
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">Total Stok:</span>
//                           <span className="font-semibold text-gray-900">{equipment.stock_quantity} unit</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Price */}
//                     <div className="mb-4">
//                       <div className="text-2xl font-bold text-green-600">
//                         Rp {equipment.price_per_day.toLocaleString('id-ID')}
//                       </div>
//                       <div className="text-sm text-gray-600">per hari</div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex gap-2">
//                       <Button 
//                         size="sm" 
//                         variant="outline"
//                         onClick={() => handleEdit(equipment)}
//                         className="flex-1"
//                         disabled={loading}
//                       >
//                         <Edit className="h-4 w-4 mr-1" />
//                         Edit
//                       </Button>
//                       <Button 
//                         size="sm" 
//                         variant="outline"
//                         onClick={() => handleDelete(equipment)}
//                         className="text-red-600 hover:text-red-700"
//                         disabled={loading}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Empty state */}
//         {filteredEquipments.length === 0 && !loading && (
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

//       {/* ✅ ENHANCED MODAL WITH BETTER IMAGE HANDLING */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle>
//                   {editingEquipment ? 'Edit Equipment' : 'Tambah Equipment Baru'}
//                 </CardTitle>
//                 <Button 
//                   variant="ghost" 
//                   size="sm"
//                   onClick={resetForm}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
                
//                 {/* ✅ ENHANCED IMAGE UPLOAD SECTION */}
//                 <div className="border-b pb-6">
//                   <h3 className="text-lg font-medium mb-4">📷 Gambar Equipment</h3>
                  
//                   <div className="flex flex-col lg:flex-row gap-6">
//                     {/* Image Preview */}
//                     <div className="lg:w-1/3">
//                       {imagePreview ? (
//                         // New image preview
//                         <div className="relative">
//                           <img 
//                             src={imagePreview}
//                             alt="New equipment image"
//                             className="w-full h-48 object-cover rounded-lg border"
//                           />
//                           <Button
//                             type="button"
//                             variant="destructive"
//                             size="sm"
//                             className="absolute top-2 right-2"
//                             onClick={() => {
//                               setImageFile(null);
//                               setImagePreview(null);
//                               clearFileInput();
//                             }}
//                           >
//                             <X className="h-3 w-3" />
//                           </Button>
//                           <div className="absolute bottom-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
//                             Gambar Baru
//                           </div>
//                         </div>
//                       ) : editingEquipment?.image_url ? (
//                         // Existing image
//                         <div className="relative">
//                           <img 
//                             src={buildImageUrl(editingEquipment)}
//                             alt="Current equipment image"
//                             className="w-full h-48 object-cover rounded-lg border"
//                             onError={(e) => {
//                               console.log('❌ Current image failed to load');
//                               (e.target as HTMLImageElement).style.display = 'none';
//                               const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
//                               if (fallback) fallback.style.display = 'flex';
//                             }}
//                           />
//                           <div className="hidden w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 items-center justify-center">
//                             <div className="text-center text-gray-500">
//                               <ImageIcon className="h-12 w-12 mx-auto mb-2" />
//                               <p className="text-sm">Gambar tidak dapat dimuat</p>
//                             </div>
//                           </div>
//                           <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
//                             Gambar Saat Ini
//                           </div>
//                         </div>
//                       ) : (
//                         // No image placeholder
//                         <div className="w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
//                           <div className="text-center text-gray-500">
//                             <ImageIcon className="h-12 w-12 mx-auto mb-2" />
//                             <p className="text-sm">Belum ada gambar</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Upload Controls */}
//                     <div className="lg:w-2/3">
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium mb-2">
//                             Upload Gambar {editingEquipment ? 'Baru' : ''}
//                           </label>
//                           <input
//                             ref={fileInputRef}
//                             type="file"
//                             accept="image/jpeg,image/png,image/gif,image/webp"
//                             onChange={handleImageChange}
//                             className="block w-full text-sm text-gray-500
//                                        file:mr-4 file:py-2 file:px-4
//                                        file:rounded-lg file:border-0
//                                        file:text-sm file:font-medium
//                                        file:bg-green-50 file:text-green-700
//                                        hover:file:bg-green-100 cursor-pointer"
//                             disabled={uploadingImage}
//                           />
//                         </div>
                        
//                         {/* Status indicators */}
//                         {imageFile && (
//                           <div className="p-3 bg-green-50 rounded-lg">
//                             <div className="flex items-center text-green-800">
//                               <CheckCircle className="h-4 w-4 mr-2" />
//                               <span className="text-sm">
//                                 Gambar siap untuk diupload: <strong>{imageFile.name}</strong>
//                               </span>
//                             </div>
//                             <div className="text-xs text-green-600 mt-1">
//                               Ukuran: {(imageFile.size / 1024 / 1024).toFixed(2)} MB
//                             </div>
//                           </div>
//                         )}
                        
//                         <div className="bg-blue-50 p-3 rounded-lg">
//                           <h4 className="font-medium text-blue-900 mb-2">📋 Panduan Upload:</h4>
//                           <ul className="text-sm text-blue-800 space-y-1">
//                             <li>• Format: JPG, PNG, GIF, WEBP</li>
//                             <li>• Ukuran maksimal: 5MB</li>
//                             <li>• Resolusi direkomendasikan: 800x600px</li>
//                             <li>• Gambar akan disimpan dengan nama kode equipment</li>
//                           </ul>
//                         </div>
                        
//                         {uploadingImage && (
//                           <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
//                             <Loader2 className="h-4 w-4 animate-spin mr-2 text-yellow-600" />
//                             <span className="text-sm text-yellow-800">Mengupload gambar...</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* FORM FIELDS */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Nama Equipment *</label>
//                     <Input
//                       value={formData.name}
//                       onChange={(e) => setFormData({...formData, name: e.target.value})}
//                       placeholder="Tenda Dome 4 Orang"
//                       required
//                     />
//                   </div>
                  
//                   {/* CODE INPUT WITH VALIDATION */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kode Equipment *</label>
//                     <div className="relative">
//                       <Input
//                         value={formData.code}
//                         onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
//                         placeholder="TENDA-001"
//                         required
//                         className={getCodeInputStyle()}
//                       />
                      
//                       {codeValidation.isChecking && (
//                         <div className="absolute right-3 top-3">
//                           <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
//                         </div>
//                       )}
                      
//                       {formData.code && formData.code.length >= 3 && !codeValidation.isChecking && !codeValidation.isDuplicate && (
//                         <div className="absolute right-3 top-3">
//                           <CheckCircle className="h-4 w-4 text-green-600" />
//                         </div>
//                       )}
                      
//                       {codeValidation.isDuplicate && (
//                         <div className="absolute right-3 top-3">
//                           <AlertTriangle className="h-4 w-4 text-red-600" />
//                         </div>
//                       )}
//                     </div>
                    
//                     {formData.code && formData.code.length >= 3 && codeValidation.message && (
//                       <p className={`text-xs mt-1 ${
//                         codeValidation.isDuplicate ? 'text-red-600' : 
//                         codeValidation.isChecking ? 'text-yellow-600' : 
//                         editingEquipment && formData.code === editingEquipment.code ? 'text-blue-600' : 'text-green-600'
//                       }`}>
//                         {codeValidation.isDuplicate ? '❌ ' : 
//                          codeValidation.isChecking ? '⏳ ' : 
//                          editingEquipment && formData.code === editingEquipment.code ? '📝 ' : '✅ '}
//                         {codeValidation.message}
//                       </p>
//                     )}
                    
//                     <p className="text-xs text-gray-500 mt-1">
//                       💡 Format: KATEGORI-XXX (contoh: TENDA-001, TAS-002)
//                     </p>
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
//                     <label className="block text-sm font-medium mb-2">Kategori *</label>
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
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Kondisi *</label>
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
//                     <label className="block text-sm font-medium mb-2">Jumlah Stok *</label>
//                     <Input
//                       type="number"
//                       min="0"
//                       value={formData.stock_quantity}
//                       onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
//                       placeholder="5"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Harga per Hari (Rp) *</label>
//                     <Input
//                       type="number"
//                       min="0"
//                       value={formData.price_per_day}
//                       onChange={(e) => setFormData({...formData, price_per_day: e.target.value})}
//                       placeholder="60000"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-2 pt-4 border-t">
//                   <Button 
//                     type="submit" 
//                     className="bg-green-600 hover:bg-green-700"
//                     disabled={loading || codeValidation.isDuplicate || codeValidation.isChecking || uploadingImage}
//                   >
//                     {(loading || uploadingImage) ? (
//                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                     ) : (
//                       <Upload className="h-4 w-4 mr-2" />
//                     )}
//                     {editingEquipment ? 'Update Equipment' : 'Tambah Equipment'}
//                   </Button>
//                   <Button 
//                     type="button" 
//                     variant="outline"
//                     onClick={resetForm}
//                     disabled={loading || uploadingImage}
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



import { useState, useEffect, useCallback, useRef } from "react";
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
  RefreshCw,
  Loader2,
  X,
  CheckCircle,
  Upload,
  Image as ImageIcon,
  Weight,
  Ruler
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

  // ✅ STATE UNTUK CODE VALIDATION
  const [codeValidation, setCodeValidation] = useState({
    isChecking: false,
    isDuplicate: false,
    message: ''
  });

  // ✅ IMAGE UPLOAD STATES
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // ✅ REF UNTUK FILE INPUT
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    fetchEquipments();
  }, []);

  // ...existing code...

const fetchEquipments = async () => {
  try {
    setLoading(true);
    setError(null);
    
    // ✅ FIX URL - HAPUS SPASI EKSTRA DAN PASTIKAN KONSISTEN
    const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('📥 Fetched equipments:', data); // Debug log
    
    if (Array.isArray(data)) {
      setEquipments(data);
      setFilteredEquipments(data);
    } else {
      setEquipments([]);
      setFilteredEquipments([]);
    }
    
  } catch (err) {
    console.error('❌ Error fetching equipment:', err);
    setError('Gagal memuat equipment: ' + err.message);
    
    // Fallback mock data
    const mockEquipments = [
      {
        equipment_id: 1,
        name: "Tenda Dome 4-6 Orang (MOCK)",
        code: "TENDA-001",
        description: "Tenda berkualitas tinggi untuk 4-6 orang dengan fitur tahan air dan mudah dipasang. Cocok untuk camping keluarga atau petualangan outdoor.",
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
        image_url: null,
        created_at: "2024-01-15"
      }
    ];
    
    setEquipments(mockEquipments);
    setFilteredEquipments(mockEquipments);
    
  } finally {
    setLoading(false);
  }
};

// ✅ FIX CODE CHECK URL JUGA
const checkCodeAvailability = useCallback(
  async (code, excludeId = null) => {
    if (!code || code.length < 3) {
      setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
      return;
    }

    setCodeValidation({ isChecking: true, isDuplicate: false, message: 'Mengecek ketersediaan kode...' });

    try {
      const url = excludeId 
        ? `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}&exclude_id=${excludeId}`
        : `http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?check_code=${encodeURIComponent(code)}`;
      
      const response = await fetch(url);
      const result = await response.json();

      if (response.ok) {
        let message = result.message;
        if (editingEquipment && !result.exists && code === editingEquipment.code) {
          message = 'Kode tidak berubah dari sebelumnya';
        }

        setCodeValidation({
          isChecking: false,
          isDuplicate: result.exists,
          message: message
        });
      } else {
        setCodeValidation({
          isChecking: false,
          isDuplicate: false,
          message: ''
        });
      }

    } catch (error) {
      console.error('Error checking code:', error);
      setCodeValidation({
        isChecking: false, 
        isDuplicate: false, 
        message: ''
      });
    }
  }, [editingEquipment]
);

// ...existing code...

  // ✅ FUNCTION TO CLEAR FILE INPUT
  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // ✅ ENHANCED IMAGE HANDLING WITH BETTER DEBUGGING
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('📁 File selected:', file);
    
    if (file) {
      // Validate file size
      if (file.size > 5 * 1024 * 1024) {
        alert('⚠️ Ukuran gambar maksimal 5MB');
        clearFileInput();
        return;
      }
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('⚠️ Format file harus JPG, PNG, GIF, atau WEBP');
        clearFileInput();
        return;
      }
      
      console.log('✅ File validation passed');
      console.log('📊 File info:', {
        name: file.name,
        size: file.size,
        type: file.type
      });
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('✅ Image preview created');
        setImagePreview(reader.result);
      };
      reader.onerror = (error) => {
        console.error('❌ Error reading file:', error);
        alert('Error membaca file gambar');
        setImageFile(null);
        setImagePreview(null);
      };
      reader.readAsDataURL(file);
    } else {
      console.log('⚠️ No file selected');
      setImageFile(null);
      setImagePreview(null);
    }
  };

  // ✅ ENHANCED UPLOAD IMAGE WITH COMPREHENSIVE ERROR HANDLING
  const uploadImage = async (equipmentCode) => {
    if (!imageFile) {
      console.log('⚠️ No image file to upload');
      return null;
    }
    
    if (!equipmentCode) {
      console.error('❌ No equipment code provided for upload');
      throw new Error('Equipment code is required for image upload');
    }
    
    console.log('🚀 Starting image upload...');
    console.log('📝 Equipment code:', equipmentCode);
    console.log('📁 File:', imageFile);
    
    setUploadingImage(true);
    
    try {
      // Create FormData
      const uploadFormData = new FormData();
      uploadFormData.append('image', imageFile);
      uploadFormData.append('equipment_code', equipmentCode);
      
      // Debug FormData
      console.log('📤 FormData prepared:');
      for (let [key, value] of uploadFormData.entries()) {
        console.log(`  ${key}:`, value instanceof File ? `File(${value.name}, ${value.size} bytes)` : value);
      }
      
      // Make upload request
      console.log('🌐 Sending upload request...');
      const response = await fetch('http://localhost/PBL - KELANA OUTDOOR/api/upload/image.php', {
        method: 'POST',
        body: uploadFormData
        // Don't set Content-Type header, let browser set it with boundary for FormData
      });
      
      console.log('📥 Upload response received:');
      console.log('  Status:', response.status);
      console.log('  Status text:', response.statusText);
      
      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Upload HTTP error:', errorText);
        throw new Error(`Upload failed with status ${response.status}: ${errorText}`);
      }
      
      // Parse response
      const result = await response.json();
      console.log('📥 Upload response data:', result);
      
      if (result.success) {
        console.log('✅ Image uploaded successfully!');
        console.log('🔗 Image URL:', result.image_url);
        return result.image_url;
      } else {
        console.error('❌ Upload failed:', result);
        throw new Error(result.message || result.error || 'Upload failed without error message');
      }
    } catch (error) {
      console.error('❌ Upload error:', error);
      
      // More specific error messages
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Tidak dapat terhubung ke server upload. Pastikan server berjalan.');
      } else if (error.name === 'SyntaxError') {
        throw new Error('Server mengembalikan response yang tidak valid.');
      } else {
        throw new Error(error.message || 'Terjadi kesalahan saat upload gambar.');
      }
    } finally {
      setUploadingImage(false);
    }
  };

  // ✅ DEBOUNCED CODE CHECK
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.code && formData.code.length >= 3) {
        const excludeId = editingEquipment ? editingEquipment.equipment_id : null;
        checkCodeAvailability(formData.code, excludeId);
      } else {
        setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.code, editingEquipment, checkCodeAvailability]);

  // Filter equipments
  useEffect(() => {
    let filtered = equipments;
    
    if (searchTerm) {
      filtered = filtered.filter(equipment => 
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter !== "all") {
      filtered = filtered.filter(equipment => equipment.category === categoryFilter);
    }
    
    if (conditionFilter !== "all") {
      filtered = filtered.filter(equipment => equipment.condition === conditionFilter);
    }
    
    setFilteredEquipments(filtered);
  }, [equipments, searchTerm, categoryFilter, conditionFilter]);

  // ✅ ENHANCED SUBMIT WITH BETTER VALIDATION AND ERROR HANDLING
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🚀 Form submission started...');
    console.log('📝 Current form data:', formData);
    console.log('🖼️ Image file:', imageFile);
    console.log('✏️ Editing equipment:', editingEquipment);
    
    // Validation checks
    if (codeValidation.isDuplicate) {
      alert('❌ Kode equipment sudah digunakan! Silakan gunakan kode lain.');
      return;
    }

    if (codeValidation.isChecking) {
      alert('⏳ Sedang mengecek kode, tunggu sebentar...');
      return;
    }

    // Required field validation
    if (!formData.name.trim()) {
      alert('❌ Nama equipment harus diisi!');
      return;
    }

    if (!formData.code.trim()) {
      alert('❌ Kode equipment harus diisi!');
      return;
    }

    if (!formData.stock_quantity || parseInt(formData.stock_quantity) < 0) {
      alert('❌ Jumlah stok harus diisi dengan angka valid!');
      return;
    }

    if (!formData.price_per_day || parseFloat(formData.price_per_day) < 0) {
      alert('❌ Harga per hari harus diisi dengan angka valid!');
      return;
    }
    
    setLoading(true);

    try {
      let image_url = editingEquipment ? editingEquipment.image_url : null;
      
      // ✅ Upload image if new file selected
      if (imageFile) {
        console.log('🖼️ New image detected, uploading...');
        try {
          image_url = await uploadImage(formData.code.trim().toUpperCase());
          console.log('✅ Image upload completed successfully');
          console.log('🔗 Final image URL:', image_url);
        } catch (uploadError) {
          console.error('❌ Image upload failed:', uploadError);
          
          // Ask user if they want to continue without image
          const proceed = confirm(
            `Upload gambar gagal: ${uploadError.message}\n\n` +
            `Apakah Anda ingin melanjutkan menyimpan equipment tanpa mengubah gambar?`
          );
          
          if (!proceed) {
            setLoading(false);
            return;
          }
          
          console.log('⚠️ User chose to continue without image upload');
          // Keep existing image_url (will be null for new equipment)
        }
      }
      
      // Prepare equipment data
      const equipmentData = {
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase(),
        description: formData.description.trim(),
        category: formData.category,
        size_capacity: formData.size_capacity.trim(),
        dimensions: formData.dimensions.trim(),
        weight: formData.weight ? parseFloat(formData.weight) : null,
        material: formData.material.trim(),
        stock_quantity: parseInt(formData.stock_quantity),
        price_per_day: parseFloat(formData.price_per_day),
        condition: formData.condition,
        image_url: image_url
      };

      console.log('📤 Final equipment data to send:', equipmentData);

      // Send to API
      const apiUrl = 'http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php';
      let response;
      
      if (editingEquipment) {
        console.log('📝 Updating equipment with ID:', editingEquipment.equipment_id);
        response = await fetch(apiUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            equipment_id: editingEquipment.equipment_id,
            ...equipmentData
          })
        });
      } else {
        console.log('➕ Creating new equipment');
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(equipmentData)
        });
      }

      console.log('📥 API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('📥 API response data:', result);

      if (result.success) {
        const message = editingEquipment 
          ? '✅ Equipment berhasil diupdate!' 
          : '✅ Equipment berhasil ditambahkan!';
        
        alert(message);
        
        // ✅ FORCE REFRESH FROM SERVER WITH CACHE CLEAR
        console.log('🔄 Refreshing equipment list with cache clear...');
        
        // Wait a moment for database to update
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Force refresh from server
        await fetchEquipments();
        
        // Reset form
        resetForm();
      } else {
        throw new Error(result.message || result.error || 'Gagal menyimpan equipment');
      }

    } catch (err) {
      console.error('❌ Error saving equipment:', err);
      alert('Error menyimpan equipment: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (equipment) => {
    if (!confirm(`Yakin ingin menghapus "${equipment.name}"?`)) return;

    try {
      setLoading(true);
      
      const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/admin/equipment.php?id=${equipment.equipment_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('✅ Equipment berhasil dihapus!');
        await fetchEquipments();
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

  const handleEdit = (equipment) => {
    console.log('✏️ Editing equipment:', equipment);
    
    setFormData({
      name: equipment.name || '',
      code: equipment.code || '',
      description: equipment.description || '',
      category: equipment.category || 'tenda',
      size_capacity: equipment.size_capacity || '',
      dimensions: equipment.dimensions || '',
      weight: equipment.weight ? equipment.weight.toString() : '',
      material: equipment.material || '',
      stock_quantity: equipment.stock_quantity ? equipment.stock_quantity.toString() : '',
      price_per_day: equipment.price_per_day ? equipment.price_per_day.toString() : '',
      condition: equipment.condition || 'baik'
    });
    
    setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
    
    // ✅ Reset image states
    setImageFile(null);
    setImagePreview(null);
    
    // ✅ Clear file input using ref
    clearFileInput();
    
    setEditingEquipment(equipment);
    setShowAddModal(true);
  };

  const resetForm = () => {
    console.log('🔄 Resetting form...');
    
    setFormData({
      name: "", code: "", description: "", category: "tenda",
      size_capacity: "", dimensions: "", weight: "", material: "",
      stock_quantity: "", price_per_day: "", condition: "baik"
    });
    
    setCodeValidation({ isChecking: false, isDuplicate: false, message: '' });
    setImageFile(null);
    setImagePreview(null);
    setShowAddModal(false);
    setEditingEquipment(null);
    
    // ✅ Clear file input using ref
    clearFileInput();
  };

  const getCodeInputStyle = () => {
    if (!formData.code || formData.code.length < 3) return '';
    if (codeValidation.isChecking) return 'border-yellow-400 bg-yellow-50';
    if (codeValidation.isDuplicate) return 'border-red-400 bg-red-50';
    return 'border-green-400 bg-green-50';
  };

  const getStockStatus = (equipment) => {
    const available = equipment.available_stock || equipment.stock_quantity;
    if (available === 0) return { color: 'bg-red-500', text: 'Habis' };
    if (available <= 2) return { color: 'bg-yellow-500', text: 'Stok Rendah' };
    return { color: 'bg-green-500', text: 'Tersedia' };
  };

  const getConditionColor = (condition) => {
    switch(condition) {
      case 'baik': return 'bg-green-500';
      case 'rusak_ringan': return 'bg-yellow-500';
      case 'perbaikan': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // ✅ ENHANCED FUNCTION TO BUILD IMAGE URL WITH CACHE BUSTING
  const buildImageUrl = (equipment, forceRefresh = false) => {
    if (!equipment.image_url) return null;
    
    // Clean the image_url if it starts with slash
    let imagePath = equipment.image_url;
    if (imagePath.startsWith('/')) {
      imagePath = imagePath.substring(1);
    }
    
    // Build full URL with cache busting
    const baseUrl = 'http://localhost/PBL - KELANA OUTDOOR';
    const timestamp = forceRefresh ? `?t=${Date.now()}` : '';
    return `${baseUrl}/${imagePath}${timestamp}`;
  };

  // ✅ ENHANCED IMAGE LOADING WITH ERROR RECOVERY AND CACHE BUSTING
  const handleImageError = (e, equipment, retryCount = 0) => {
    const img = e.target as HTMLImageElement;
    const maxRetries = 3;
    
    console.log(`❌ Image load error for ${equipment.code}, retry ${retryCount}/${maxRetries}`);
    console.log('Failed URL:', img.src);
    
    if (retryCount < maxRetries) {
      // Try alternative URLs with cache busting
      const timestamp = `?t=${Date.now()}`;
      const alternatives = [
        `http://localhost/PBL - KELANA OUTDOOR${equipment.image_url}${timestamp}`,
        `http://localhost${equipment.image_url}${timestamp}`,
        `http://localhost/PBL - KELANA OUTDOOR/uploads/images/${equipment.code.toLowerCase()}.jpg${timestamp}`,
        `http://localhost/PBL - KELANA OUTDOOR/uploads/images/${equipment.code.toLowerCase()}.png${timestamp}`
      ];
      
      if (alternatives[retryCount]) {
        console.log(`🔄 Trying alternative URL: ${alternatives[retryCount]}`);
        setTimeout(() => {
          img.src = alternatives[retryCount];
        }, 100 * (retryCount + 1)); // Progressive delay
        return;
      }
    }
    
    // All retries failed, show fallback
    console.log('❌ All image URLs failed, showing fallback');
    img.style.display = 'none';
    const fallback = img.nextElementSibling as HTMLElement;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

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
      {/* HEADER */}
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
        {/* ERROR ALERT */}
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

        {/* STATS CARDS */}
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

        {/* FILTERS */}
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

        {/* ✅ ENHANCED EQUIPMENT GRID WITH ROBUST IMAGE HANDLING AND CACHE BUSTING */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipments.map((equipment, index) => {
            const stockStatus = getStockStatus(equipment);
            const available = equipment.available_stock || equipment.stock_quantity;
            const reserved = equipment.reserved_stock || 0;
            const rented = equipment.rented_stock || 0;
            
            return (
              <Card key={`${equipment.equipment_id}-${index}`} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* ✅ ENHANCED IMAGE SECTION WITH CACHE BUSTING AND FORCE REFRESH */}
                  {equipment.image_url ? (
                    <div className="w-full h-48 overflow-hidden bg-gray-100 relative">
                      <img 
                        key={`img-${equipment.equipment_id}-${Date.now()}`} // Force re-render
                        src={buildImageUrl(equipment, true)} // Force cache bust
                        alt={equipment.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => handleImageError(e, equipment, 0)}
                        onLoad={() => {
                          console.log('✅ Image loaded successfully for:', equipment.code);
                        }}
                        style={{ display: 'block' }}
                      />
                      
                      {/* Enhanced Fallback */}
                      <div className="hidden absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 items-center justify-center">
                        <div className="text-center text-white p-4">
                          <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-70" />
                          <p className="text-sm opacity-70 mb-1">Gambar tidak dapat dimuat</p>
                          <p className="text-xs opacity-50">{equipment.code}</p>
                          <div className="mt-2 text-xs opacity-60 bg-black bg-opacity-20 p-1 rounded">
                            {equipment.image_url}
                          </div>
                        </div>
                      </div>
                      
                      {/* Debug info overlay (development only) */}
                      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs p-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                        <div>Path: {equipment.image_url}</div>
                        <div>Full: {buildImageUrl(equipment, true)}</div>
                        <div>Updated: {new Date().toLocaleTimeString()}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                      <div className="text-center text-white">
                        <span className="text-4xl font-bold block mb-2">
                          {equipment.name.charAt(0)}
                        </span>
                        <p className="text-sm opacity-70">Tidak ada gambar</p>
                        <p className="text-xs opacity-50 mt-1">{equipment.code}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* CONTENT SECTION */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
                          {equipment.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{equipment.code}</p>
                        <Badge variant="outline" className="text-xs">
                          {equipment.category.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex flex-col gap-1 ml-2">
                        <Badge className={`${stockStatus.color} text-white text-xs text-center`}>
                          {stockStatus.text}
                        </Badge>
                        <Badge className={`${getConditionColor(equipment.condition)} text-white text-xs text-center`}>
                          {equipment.condition}
                        </Badge>
                      </div>
                    </div>

                    {/* ✅ DESCRIPTION */}
                    {equipment.description && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                          {equipment.description}
                        </p>
                      </div>
                    )}

                    {/* ✅ SPESIFIKASI */}
                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <h4 className="font-medium text-sm text-gray-800 mb-2">Spesifikasi</h4>
                      <div className="space-y-2 text-xs">
                        {equipment.size_capacity && (
                          <div className="flex items-center gap-2">
                            <Package className="h-3 w-3 text-gray-500 flex-shrink-0" />
                            <div className="flex justify-between w-full">
                              <span className="text-gray-600">Kapasitas:</span>
                              <span className="font-medium text-gray-900">{equipment.size_capacity}</span>
                            </div>
                          </div>
                        )}
                        
                        {equipment.dimensions && (
                          <div className="flex items-center gap-2">
                            <Ruler className="h-3 w-3 text-gray-500 flex-shrink-0" />
                            <div className="flex justify-between w-full">
                              <span className="text-gray-600">Dimensi:</span>
                              <span className="font-medium text-gray-900">{equipment.dimensions}</span>
                            </div>
                          </div>
                        )}
                        
                        {equipment.weight && equipment.weight > 0 && (
                          <div className="flex items-center gap-2">
                            <Weight className="h-3 w-3 text-gray-500 flex-shrink-0" />
                            <div className="flex justify-between w-full">
                              <span className="text-gray-600">Berat:</span>
                              <span className="font-medium text-gray-900">{equipment.weight} kg</span>
                            </div>
                          </div>
                        )}
                        
                        {equipment.material && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-gray-500 flex-shrink-0" />
                            <div className="flex justify-between w-full">
                              <span className="text-gray-600">Material:</span>
                              <span className="font-medium text-gray-900">{equipment.material}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stock Info */}
                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
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
                      <div className="mt-2 pt-2 border-t border-blue-200">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Stok:</span>
                          <span className="font-semibold text-gray-900">{equipment.stock_quantity} unit</span>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-green-600">
                        Rp {equipment.price_per_day.toLocaleString('id-ID')}
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
                        onClick={() => handleDelete(equipment)}
                        className="text-red-600 hover:text-red-700"
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty state */}
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

      {/* ✅ ENHANCED MODAL WITH BETTER IMAGE HANDLING */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {editingEquipment ? 'Edit Equipment' : 'Tambah Equipment Baru'}
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={resetForm}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* ✅ ENHANCED IMAGE UPLOAD SECTION */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-medium mb-4">📷 Gambar Equipment</h3>
                  
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image Preview */}
                    <div className="lg:w-1/3">
                      {imagePreview ? (
                        // New image preview
                        <div className="relative">
                          <img 
                            src={imagePreview}
                            alt="New equipment image"
                            className="w-full h-48 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                              clearFileInput();
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                          <div className="absolute bottom-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
                            Gambar Baru
                          </div>
                        </div>
                      ) : editingEquipment?.image_url ? (
                        // Existing image with cache busting
                        <div className="relative">
                          <img 
                            key={`modal-img-${editingEquipment.equipment_id}-${Date.now()}`} // Force re-render
                            src={buildImageUrl(editingEquipment, true)} // Force cache bust
                            alt="Current equipment image"
                            className="w-full h-48 object-cover rounded-lg border"
                            onError={(e) => {
                              console.log('❌ Current image failed to load in modal');
                              (e.target as HTMLImageElement).style.display = 'none';
                              const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                          <div className="hidden w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 items-center justify-center">
                            <div className="text-center text-gray-500">
                              <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                              <p className="text-sm">Gambar tidak dapat dimuat</p>
                            </div>
                          </div>
                          <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
                            Gambar Saat Ini
                          </div>
                        </div>
                      ) : (
                        // No image placeholder
                        <div className="w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                            <p className="text-sm">Belum ada gambar</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Upload Controls */}
                    <div className="lg:w-2/3">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Upload Gambar {editingEquipment ? 'Baru' : ''}
                          </label>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-500
                                       file:mr-4 file:py-2 file:px-4
                                       file:rounded-lg file:border-0
                                       file:text-sm file:font-medium
                                       file:bg-green-50 file:text-green-700
                                       hover:file:bg-green-100 cursor-pointer"
                            disabled={uploadingImage}
                          />
                        </div>
                        
                        {/* Status indicators */}
                        {imageFile && (
                          <div className="p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center text-green-800">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              <span className="text-sm">
                                Gambar siap untuk diupload: <strong>{imageFile.name}</strong>
                              </span>
                            </div>
                            <div className="text-xs text-green-600 mt-1">
                              Ukuran: {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>
                        )}
                        
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-2">📋 Panduan Upload:</h4>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Format: JPG, PNG, GIF, WEBP</li>
                            <li>• Ukuran maksimal: 5MB</li>
                            <li>• Resolusi direkomendasikan: 800x600px</li>
                            <li>• Gambar akan disimpan dengan nama kode equipment</li>
                            <li>• Gambar akan otomatis muncul setelah update berhasil</li>
                          </ul>
                        </div>
                        
                        {uploadingImage && (
                          <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                            <Loader2 className="h-4 w-4 animate-spin mr-2 text-yellow-600" />
                            <span className="text-sm text-yellow-800">Mengupload gambar...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* FORM FIELDS */}
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
                  
                  {/* CODE INPUT WITH VALIDATION */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Kode Equipment *</label>
                    <div className="relative">
                      <Input
                        value={formData.code}
                        onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                        placeholder="TENDA-001"
                        required
                        className={getCodeInputStyle()}
                      />
                      
                      {codeValidation.isChecking && (
                        <div className="absolute right-3 top-3">
                          <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
                        </div>
                      )}
                      
                      {formData.code && formData.code.length >= 3 && !codeValidation.isChecking && !codeValidation.isDuplicate && (
                        <div className="absolute right-3 top-3">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      )}
                      
                      {codeValidation.isDuplicate && (
                        <div className="absolute right-3 top-3">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        </div>
                      )}
                    </div>
                    
                    {formData.code && formData.code.length >= 3 && codeValidation.message && (
                      <p className={`text-xs mt-1 ${
                        codeValidation.isDuplicate ? 'text-red-600' : 
                        codeValidation.isChecking ? 'text-yellow-600' : 
                        editingEquipment && formData.code === editingEquipment.code ? 'text-blue-600' : 'text-green-600'
                      }`}>
                        {codeValidation.isDuplicate ? '❌ ' : 
                         codeValidation.isChecking ? '⏳ ' : 
                         editingEquipment && formData.code === editingEquipment.code ? '📝 ' : '✅ '}
                        {codeValidation.message}
                      </p>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-1">
                      💡 Format: KATEGORI-XXX (contoh: TENDA-001, TAS-002)
                    </p>
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
                      min="0"
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
                      min="0"
                      value={formData.price_per_day}
                      onChange={(e) => setFormData({...formData, price_per_day: e.target.value})}
                      placeholder="60000"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700"
                    disabled={loading || codeValidation.isDuplicate || codeValidation.isChecking || uploadingImage}
                  >
                    {(loading || uploadingImage) ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    {editingEquipment ? 'Update Equipment' : 'Tambah Equipment'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={resetForm}
                    disabled={loading || uploadingImage}
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