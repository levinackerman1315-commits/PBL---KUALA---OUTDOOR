import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { tripAdminApi } from "@/lib/triApi";
import { TripFormData } from "@/types/trip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Save, Upload, Image as ImageIcon } from "lucide-react";

const emptyForm: TripFormData = {
  title: "",
  location: "",
  category: "Mendaki",
  difficulty: "Mudah",
  start_date: "",
  start_time: "",
  duration_days: 1,
  remaining_quota: 0,
  total_quota: 0,
  short_description: "",
  meeting_point_name: "",
  meeting_point_address: "",
  meeting_point_map_url: "",
  contact_name: "",
  contact_whatsapp: "",
  contact_role: "PIC Trip",
  status: "active",
  cover_image: "",
  images: "",
  search_tags: "",
  map_url: "",
  itinerary: "",
  required_gear: "",
  rules: ""
};

// ✅ API Base URL for production deployment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://kualaoutdoor.free.nf/api';
const UPLOADS_BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost/PBL-KELANA-OUTDOOR';

export default function TripForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  
  const [form, setForm] = useState<TripFormData>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      navigate("/admin/login");
      return;
    }
    
    if (isEdit && id) {
      loadTripData(parseInt(id));
    }
  }, [id, isEdit, navigate]);

  const loadTripData = async (tripId: number) => {
    setLoading(true);
    try {
      const trip = await tripAdminApi.getById(tripId);
      setForm({
        title: trip.title || "",
        location: trip.location || "",
        category: trip.category || "Mendaki",
        difficulty: trip.difficulty || "Mudah",
        start_date: trip.start_date || "",
        start_time: trip.start_time || "",
        duration_days: trip.duration_days || 1,
        remaining_quota: trip.remaining_quota || 0,
        total_quota: trip.total_quota || 0,
        short_description: trip.short_description || "",
        meeting_point_name: trip.meeting_point_name || "",
        meeting_point_address: trip.meeting_point_address || "",
        meeting_point_map_url: trip.meeting_point_map_url || "",
        contact_name: trip.contact_name || "",
        contact_whatsapp: trip.contact_whatsapp || "",
        contact_role: trip.contact_role || "PIC Trip",
        status: trip.status || "active",
        cover_image: trip.cover_image || "",
        images: "",
        search_tags: "",
        map_url: "",
        itinerary: "",
        required_gear: "",
        rules: ""
      });
      setPreviewImage(trip.cover_image || "");
    } catch (err: any) {
      setError(err.message || "Gagal memuat data trip");
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPLOAD GAMBAR
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi ukuran (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file maksimal 5MB');
      return;
    }

    // Validasi tipe
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Format file harus JPG, PNG, atau WEBP');
      return;
    }

    setUploadingImage(true);
    setError("");
    
    const formDataImg = new FormData();
    formDataImg.append('image', file);

    try {
      const response = await fetch(`${API_BASE_URL}/trips.php`, {
        method: 'POST',
        body: formDataImg
      });

      const result = await response.json();
      
      if (result.success && result.data) {
        setForm(prev => ({
          ...prev,
          cover_image: result.data.url
        }));
        setPreviewImage(result.data.url);
        alert('✅ Gambar berhasil diupload!');
      } else {
        setError(result.message || 'Gagal mengupload gambar');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Terjadi kesalahan saat mengupload gambar');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validasi gambar
    if (!form.cover_image) {
      setError("Gambar cover wajib diupload!");
      setLoading(false);
      return;
    }

    // Prepare data untuk API
    const payload: any = {
      title: form.title,
      location: form.location,
      category: form.category,
      difficulty: form.difficulty,
      start_date: form.start_date,
      start_time: form.start_time,
      duration_days: form.duration_days,
      total_quota: form.total_quota,
      remaining_quota: form.remaining_quota,
      short_description: form.short_description,
      meeting_point_name: form.meeting_point_name,
      meeting_point_address: form.meeting_point_address,
      meeting_point_map_url: form.meeting_point_map_url,
      contact_name: form.contact_name,
      contact_whatsapp: form.contact_whatsapp,
      contact_role: form.contact_role,
      status: form.status,
      cover_image: form.cover_image
    };

    try {
      if (isEdit && id) {
        await tripAdminApi.update(parseInt(id), payload);
        alert("Trip berhasil diupdate!");
      } else {
        await tripAdminApi.create(payload);
        alert("Trip baru berhasil ditambahkan!");
      }
      navigate("/admin/trips");
    } catch (err: any) {
      setError(err.message || "Gagal menyimpan trip");
    } finally {
      setLoading(false);
    }
  };

  const updateField = <K extends keyof TripFormData>(field: K, value: TripFormData[K]) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  if (loading && isEdit) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4 gap-2"
          onClick={() => navigate("/admin/trips")}
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Daftar Trip
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {isEdit ? "Edit Trip" : "Tambah Trip Baru"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ✅ INFORMASI DASAR */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Informasi Dasar</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Judul Trip *</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      placeholder="Contoh: Pendakian Gunung Bawang"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Lokasi *</Label>
                    <Input
                      id="location"
                      value={form.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      placeholder="Contoh: Bengkayang, Kalimantan Barat"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Kategori *</Label>
                    <Select value={form.category} onValueChange={(v: any) => updateField("category", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mendaki">Mendaki</SelectItem>
                        <SelectItem value="Pantai">Pantai</SelectItem>
                        <SelectItem value="Wisata">Wisata</SelectItem>
                        <SelectItem value="Petualangan">Petualangan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Tingkat Kesulitan *</Label>
                    <Select value={form.difficulty} onValueChange={(v: any) => updateField("difficulty", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mudah">Mudah</SelectItem>
                        <SelectItem value="Sedang">Sedang</SelectItem>
                        <SelectItem value="Berat">Berat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="short_description">Deskripsi Singkat</Label>
                  <Textarea
                    id="short_description"
                    value={form.short_description}
                    onChange={(e) => updateField("short_description", e.target.value)}
                    placeholder="Deskripsi singkat tentang trip ini..."
                    rows={3}
                  />
                </div>
              </div>

              {/* ✅ JADWAL & KUOTA */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Jadwal & Kuota</h3>
                
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="start_date">Tanggal Mulai *</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={form.start_date}
                      onChange={(e) => updateField("start_date", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="start_time">Jam Mulai</Label>
                    <Input
                      id="start_time"
                      type="time"
                      value={form.start_time}
                      onChange={(e) => updateField("start_time", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="duration_days">Durasi (hari) *</Label>
                    <Input
                      id="duration_days"
                      type="number"
                      min="1"
                      value={form.duration_days === 0 ? "" : form.duration_days}
                      onChange={(e) => {
                        const val = e.target.value === "" ? 0 : parseInt(e.target.value);
                        updateField("duration_days", val);
                      }}
                      onBlur={(e) => {
                        // Set minimal 1 saat blur jika kosong
                        if (e.target.value === "" || parseInt(e.target.value) < 1) {
                          updateField("duration_days", 1);
                        }
                      }}
                      placeholder="Hari"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={form.status} onValueChange={(v: any) => updateField("status", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="total_quota">Total Kuota *</Label>
                    <Input
                      id="total_quota"
                      type="number"
                      min="1"
                      value={form.total_quota === 0 ? "" : form.total_quota}
                      onChange={(e) => {
                        const val = e.target.value === "" ? 0 : parseInt(e.target.value);
                        updateField("total_quota", val);
                        // Auto-set remaining_quota = total_quota (jika baru)
                        if (!isEdit) {
                          updateField("remaining_quota", val);
                        }
                      }}
                      onBlur={(e) => {
                        // Set minimal 1 saat blur jika kosong
                        if (e.target.value === "" || parseInt(e.target.value) < 1) {
                          updateField("total_quota", 1);
                          if (!isEdit) {
                            updateField("remaining_quota", 1);
                          }
                        }
                      }}
                      placeholder="Jumlah slot"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="remaining_quota">Sisa Kuota</Label>
                    <Input
                      id="remaining_quota"
                      type="number"
                      min="0"
                      max={form.total_quota}
                      value={form.remaining_quota === 0 ? "" : form.remaining_quota}
                      onChange={(e) => {
                        const val = e.target.value === "" ? 0 : parseInt(e.target.value);
                        updateField("remaining_quota", val);
                      }}
                      onBlur={(e) => {
                        // Set 0 jika kosong saat blur
                        if (e.target.value === "") {
                          updateField("remaining_quota", 0);
                        }
                        // Validasi tidak boleh lebih dari total
                        if (parseInt(e.target.value) > form.total_quota) {
                          updateField("remaining_quota", form.total_quota);
                        }
                      }}
                      placeholder="Slot tersisa"
                    />
                    <p className="text-xs text-gray-500 mt-1">Terbooking: {form.total_quota - form.remaining_quota}</p>
                  </div>
                </div>
              </div>

              {/* ✅ UPLOAD GAMBAR COVER */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Gambar Cover Trip *
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Label
                      htmlFor="image-upload"
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      {uploadingImage ? "Uploading..." : "Pilih Gambar"}
                    </Label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                    <span className="text-sm text-gray-500">
                      Max 5MB • JPG, PNG, WEBP
                    </span>
                  </div>

                  {uploadingImage && (
                    <div className="flex items-center gap-2 text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm">Mengupload gambar...</span>
                    </div>
                  )}

                  {(previewImage || form.cover_image) && (
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start gap-4">
                        <img
                          src={previewImage || form.cover_image}
                          alt="Preview"
                          className="w-48 h-48 object-cover rounded-lg shadow-md"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            ✅ Gambar berhasil diupload
                          </p>
                          <p className="text-xs text-gray-500 break-all">
                            {form.cover_image}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {!form.cover_image && !uploadingImage && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Belum ada gambar yang diupload
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* ✅ TITIK KUMPUL & KONTAK */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Titik Kumpul & Kontak</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="meeting_point_name">Nama Lokasi Kumpul</Label>
                    <Input
                      id="meeting_point_name"
                      value={form.meeting_point_name}
                      onChange={(e) => updateField("meeting_point_name", e.target.value)}
                      placeholder="Contoh: Parkir Alun-alun"
                    />
                  </div>

                  <div>
                    <Label htmlFor="meeting_point_address">Alamat Lengkap</Label>
                    <Input
                      id="meeting_point_address"
                      value={form.meeting_point_address}
                      onChange={(e) => updateField("meeting_point_address", e.target.value)}
                      placeholder="Alamat lokasi kumpul"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="contact_name">Nama PIC *</Label>
                    <Input
                      id="contact_name"
                      value={form.contact_name}
                      onChange={(e) => updateField("contact_name", e.target.value)}
                      placeholder="Nama guide/leader"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact_whatsapp">No. WhatsApp *</Label>
                    <Input
                      id="contact_whatsapp"
                      value={form.contact_whatsapp}
                      onChange={(e) => updateField("contact_whatsapp", e.target.value)}
                      placeholder="628xxx (tanpa +)"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact_role">Peran</Label>
                    <Input
                      id="contact_role"
                      value={form.contact_role}
                      onChange={(e) => updateField("contact_role", e.target.value)}
                      placeholder="Guide/Leader"
                    />
                  </div>
                </div>
              </div>

              {/* ✅ SUBMIT BUTTONS */}
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700 gap-2 flex-1"
                  disabled={loading || uploadingImage || !form.cover_image}
                >
                  <Save className="h-4 w-4" />
                  {loading ? "Menyimpan..." : (isEdit ? "Update Trip" : "Simpan Trip")}
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/admin/trips")}
                  disabled={loading}
                >
                  Batal
                </Button>
              </div>

              {!form.cover_image && (
                <p className="text-sm text-red-600 text-center font-medium">
                  ⚠️ Gambar cover wajib diupload sebelum menyimpan trip
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}