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
import { ArrowLeft, Save } from "lucide-react";

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

export default function TripForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  
  const [form, setForm] = useState<TripFormData>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        images: Array.isArray(trip.images) ? trip.images.join(", ") : trip.images || "",
        search_tags: Array.isArray(trip.search_tags) ? trip.search_tags.join(", ") : trip.search_tags || "",
        map_url: trip.map_url || "",
        itinerary: Array.isArray(trip.itinerary) ? JSON.stringify(trip.itinerary, null, 2) : trip.itinerary || "",
        required_gear: Array.isArray(trip.required_gear) ? trip.required_gear.join(", ") : trip.required_gear || "",
        rules: Array.isArray(trip.rules) ? trip.rules.join(", ") : trip.rules || ""
      });
    } catch (err: any) {
      setError(err.message || "Gagal memuat data trip");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Prepare data untuk API
    const payload: any = {
      ...form,
      images: form.images ? form.images.split(",").map(s => s.trim()).filter(Boolean) : [],
      search_tags: form.search_tags ? form.search_tags.split(",").map(s => s.trim()).filter(Boolean) : [],
      required_gear: form.required_gear ? form.required_gear.split(",").map(s => s.trim()).filter(Boolean) : [],
      rules: form.rules ? form.rules.split(",").map(s => s.trim()).filter(Boolean) : [],
    };

    // Parse itinerary jika ada
    if (form.itinerary) {
      try {
        payload.itinerary = JSON.parse(form.itinerary);
      } catch {
        payload.itinerary = [];
      }
    }

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
      <div className="max-w-5xl mx-auto">
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
              {/* Basic Info */}
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

              {/* Schedule & Quota */}
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
                      value={form.duration_days}
                      onChange={(e) => updateField("duration_days", parseInt(e.target.value))}
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
                      value={form.total_quota}
                      onChange={(e) => updateField("total_quota", parseInt(e.target.value))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="remaining_quota">Sisa Kuota *</Label>
                    <Input
                      id="remaining_quota"
                      type="number"
                      min="0"
                      value={form.remaining_quota}
                      onChange={(e) => updateField("remaining_quota", parseInt(e.target.value))}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Meeting Point */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Titik Kumpul</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="meeting_point_name">Nama Lokasi</Label>
                    <Input
                      id="meeting_point_name"
                      value={form.meeting_point_name}
                      onChange={(e) => updateField("meeting_point_name", e.target.value)}
                      placeholder="Contoh: Parkir Alun-alun"
                    />
                  </div>

                  <div>
                    <Label htmlFor="meeting_point_address">Alamat</Label>
                    <Input
                      id="meeting_point_address"
                      value={form.meeting_point_address}
                      onChange={(e) => updateField("meeting_point_address", e.target.value)}
                      placeholder="Alamat lengkap"
                    />
                  </div>

                  <div>
                    <Label htmlFor="meeting_point_map_url">Link Google Maps</Label>
                    <Input
                      id="meeting_point_map_url"
                      value={form.meeting_point_map_url}
                      onChange={(e) => updateField("meeting_point_map_url", e.target.value)}
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                </div>
              </div>

              {/* Contact Person */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Kontak Person</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="contact_name">Nama PIC *</Label>
                    <Input
                      id="contact_name"
                      value={form.contact_name}
                      onChange={(e) => updateField("contact_name", e.target.value)}
                      placeholder="Nama kontak person"
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
                      placeholder="PIC Trip"
                    />
                  </div>
                </div>
              </div>

              {/* Media */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Media & URL</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cover_image">Cover Image URL</Label>
                    <Input
                      id="cover_image"
                      value={form.cover_image}
                      onChange={(e) => updateField("cover_image", e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="map_url">Map URL</Label>
                    <Input
                      id="map_url"
                      value={form.map_url}
                      onChange={(e) => updateField("map_url", e.target.value)}
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="images">Gambar Lainnya (pisahkan dengan koma)</Label>
                  <Textarea
                    id="images"
                    value={form.images}
                    onChange={(e) => updateField("images", e.target.value)}
                    placeholder="url1, url2, url3"
                    rows={2}
                  />
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Informasi Tambahan</h3>
                
                <div>
                  <Label htmlFor="search_tags">Tags Pencarian (pisahkan dengan koma)</Label>
                  <Textarea
                    id="search_tags"
                    value={form.search_tags}
                    onChange={(e) => updateField("search_tags", e.target.value)}
                    placeholder="gunung, mendaki, camping, petualangan"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="required_gear">Perlengkapan Wajib (pisahkan dengan koma)</Label>
                  <Textarea
                    id="required_gear"
                    value={form.required_gear}
                    onChange={(e) => updateField("required_gear", e.target.value)}
                    placeholder="Carrier, Sleeping bag, Matras"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="rules">Peraturan Trip (pisahkan dengan koma)</Label>
                  <Textarea
                    id="rules"
                    value={form.rules}
                    onChange={(e) => updateField("rules", e.target.value)}
                    placeholder="Tidak buang sampah, Ikuti instruksi guide"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="itinerary">Itinerary (JSON format - optional)</Label>
                  <Textarea
                    id="itinerary"
                    value={form.itinerary}
                    onChange={(e) => updateField("itinerary", e.target.value)}
                    placeholder='[{"day": 1, "title": "...", "activities": ["..."]}]'
                    rows={4}
                    className="font-mono text-sm"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700 gap-2"
                  disabled={loading}
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
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}