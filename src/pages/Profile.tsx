import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Edit, Save, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = "http://localhost/PBL-KELANA-OUTDOOR/api";

interface Profile {
  full_name: string | null;
  identity_type: "NIK" | "KTP" | "SIM" | null;
  identity_number: string | null;
  birth_date: string | null;
  gender: "Laki-laki" | "Perempuan" | null;
  phone: string | null;
  address: string | null;
  profile_picture: string | null;
}

const Profile = () => {
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    identity_type: "KTP",
    identity_number: "",
    birth_date: "",
    gender: null,
    phone: "",
    address: "",
    profile_picture: null,
  });
  const [originalProfile, setOriginalProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
<<<<<<< HEAD
=======

>>>>>>> origin/Naufal
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

<<<<<<< HEAD
=======
  // Redirect jika belum login
>>>>>>> origin/Naufal
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else {
      fetchProfile();
    }
  }, [user, navigate]);

  // Fetch profil dari API
  const fetchProfile = async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/profile.php?action=fetch&user_id=${user.id}`
      );
      const result = await response.json();

      if (result.success && result.data) {
        const data = result.data;
        const profileData: Profile = {
          full_name: data.full_name || "",
          identity_type: data.identity_type || "KTP",
          identity_number: data.identity_number || "",
          birth_date: data.birth_date || "",
          gender: data.gender || null,
          phone: data.phone || "",
          address: data.address || "",
          profile_picture: data.profile_picture || null,
        };

        setProfile(profileData);
        setOriginalProfile(profileData);
        if (data.profile_picture) setPreviewImage(data.profile_picture);

        const complete = !!(
          data.full_name &&
          data.identity_type &&
          data.identity_number &&
          data.birth_date &&
          data.gender &&
          data.phone &&
          data.address
        );
        setIsProfileComplete(complete);

        if (!complete) setIsEditMode(true);
      } else {
        setIsEditMode(true);
        setIsProfileComplete(false);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Gagal mengambil data profil",
        variant: "destructive",
      });
    }
  };

  // Cek apakah ada perubahan
  const hasDataChanged = (): boolean => {
    if (!originalProfile) return true;
    return (
      profile.full_name !== originalProfile.full_name ||
      profile.identity_type !== originalProfile.identity_type ||
      profile.identity_number !== originalProfile.identity_number ||
      profile.birth_date !== originalProfile.birth_date ||
      profile.gender !== originalProfile.gender ||
      profile.phone !== originalProfile.phone ||
      profile.address !== originalProfile.address ||
      selectedFile !== null
    );
  };

  // Upload foto
  const uploadImage = async (): Promise<string | null> => {
    if (!selectedFile || !user?.id) return profile.profile_picture;

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("user_id", user.id.toString());

      const response = await fetch(`${API_BASE_URL}/upload-profile-picture.php`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) return result.url;
      throw new Error(result.message);
    } catch (error: any) {
      toast({
        title: "Upload Foto Gagal",
        description: "Foto tidak diupload, tapi profil tetap disimpan.",
        variant: "default",
      });
      return null;
    }
  };

  // Validasi form
  const validateForm = (): boolean => {
    if (!profile.full_name?.trim()) {
      toast({ title: "Error", description: "Nama Lengkap wajib diisi", variant: "destructive" });
      return false;
    }
    if (profile.full_name.length < 3) {
      toast({ title: "Error", description: "Nama minimal 3 karakter", variant: "destructive" });
      return false;
    }

    if (!profile.identity_number?.trim()) {
      toast({ title: "Error", description: "Nomor Identitas wajib diisi", variant: "destructive" });
      return false;
    }

    const idLength = profile.identity_type === "KTP" || profile.identity_type === "NIK" ? 16 : 12;
    if (profile.identity_number.length !== idLength) {
      toast({ title: "Error", description: `${profile.identity_type} harus ${idLength} digit`, variant: "destructive" });
      return false;
    }

    if (!profile.birth_date) {
      toast({ title: "Error", description: "Tanggal Lahir wajib diisi", variant: "destructive" });
      return false;
    }

    const birthDate = new Date(profile.birth_date);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 17) {
      toast({ title: "Error", description: "Usia minimal 17 tahun", variant: "destructive" });
      return false;
    }

    if (!profile.gender) {
      toast({ title: "Error", description: "Jenis Kelamin wajib diisi", variant: "destructive" });
      return false;
    }

    if (!profile.phone?.trim()) {
      toast({ title: "Error", description: "Nomor HP wajib diisi", variant: "destructive" });
      return false;
    }
    if (profile.phone.length < 10 || profile.phone.length > 13) {
      toast({ title: "Error", description: "Nomor HP harus 10-13 digit", variant: "destructive" });
      return false;
    }
    if (!profile.phone.startsWith("08") && !profile.phone.startsWith("62")) {
      toast({ title: "Error", description: "Nomor HP harus diawali 08 atau 62", variant: "destructive" });
      return false;
    }

    if (!profile.address?.trim()) {
      toast({ title: "Error", description: "Alamat wajib diisi", variant: "destructive" });
      return false;
    }
    if (profile.address.length < 10) {
      toast({ title: "Error", description: "Alamat minimal 10 karakter", variant: "destructive" });
      return false;
    }

    return true;
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isProfileComplete && !hasDataChanged()) {
      toast({ title: "Info", description: "Tidak ada perubahan data", variant: "default" });
      return;
    }

    if (!validateForm() || !user) return;

    setLoading(true);
    try {
      let profilePictureUrl = profile.profile_picture;
      if (selectedFile) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) profilePictureUrl = uploadedUrl;
      }

      const response = await fetch(`${API_BASE_URL}/profile.php?action=save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          email: user.email,
          full_name: profile.full_name,
          identity_type: profile.identity_type,
          identity_number: profile.identity_number,
          birth_date: profile.birth_date,
          gender: profile.gender,
          phone: profile.phone,
          address: profile.address,
          profile_picture: profilePictureUrl,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: "Berhasil",
          description: isProfileComplete
            ? "Perubahan profil disimpan"
            : "Profil Anda telah disimpan",
        });
        setSelectedFile(null);
        setIsEditMode(false);
        setIsProfileComplete(true);
        await fetchProfile();
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
<<<<<<< HEAD
      toast({
        title: "❌ Error menyimpan profil",
        description: error.message,
        variant: "destructive",
      });
=======
      toast({ title: "Error", description: error.message, variant: "destructive" });
>>>>>>> origin/Naufal
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
=======
  // Handler tambahan
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditMode) return;
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Error", description: "Ukuran maksimal 5MB", variant: "destructive" });
      return;
    }
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowed.includes(file.type)) {
      toast({ title: "Error", description: "Hanya JPG, PNG, GIF", variant: "destructive" });
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

>>>>>>> origin/Naufal
  const handleEditClick = () => {
    setIsEditMode(true);
    toast({ title: "Edit Mode", description: "Anda dapat mengubah profil" });
  };

  const handleCancelEdit = () => {
    if (originalProfile) {
      setProfile(originalProfile);
      if (originalProfile.profile_picture) setPreviewImage(originalProfile.profile_picture);
    }
    setSelectedFile(null);
    setIsEditMode(false);
    toast({ title: "Dibatalkan", description: "Perubahan dibatalkan" });
  };

  const handleIdNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditMode) return;
    const value = e.target.value.replace(/[^0-9]/g, "");
    const max = profile.identity_type === "KTP" || profile.identity_type === "NIK" ? 16 : 12;
    setProfile({ ...profile, identity_number: value.slice(0, max) });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditMode) return;
    const value = e.target.value.replace(/[^0-9]/g, "");
    setProfile({ ...profile, phone: value.slice(0, 13) });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      {!user ? (
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali</span>
          </button>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">Profil</div>
                <div>
                  <h1 className="text-2xl font-bold">Profil Pribadi</h1>
                  <p className="text-green-100 text-sm">
                    {isEditMode
                      ? "Edit data Anda"
                      : "Profil Anda telah tersimpan"}
                  </p>
                </div>
              </div>
              {isProfileComplete && !isEditMode && (
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                  Lengkap
                </div>
              )}
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Foto Profil */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative mb-3">
                    <div className="w-36 h-36 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                      {previewImage ? (
                        <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    {isEditMode && (
                      <label
                        htmlFor="photo-upload"
                        className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors shadow-md border-4 border-white"
                      >
                        <Camera className="w-6 h-6" />
                      </label>
                    )}
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={!isEditMode}
                    />
                  </div>
                  <p className="text-gray-500 text-sm">
                    {isEditMode ? "Klik untuk ubah foto" : "Foto profil Anda"}
                  </p>
                  {isEditMode && selectedFile && (
                    <p className="text-green-600 text-xs mt-1 font-semibold">
                      Foto baru: {selectedFile.name}
                    </p>
                  )}
                </div>

                {/* Form Fields */}
                <div className="space-y-2">
                  <Label className="font-semibold text-gray-700">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={profile.full_name || ""}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    disabled={!isEditMode}
                    placeholder="Nama lengkap"
                    className={`border-2 rounded-lg px-4 py-3 ${
                      isEditMode ? "focus:border-green-500" : "bg-gray-50 cursor-not-allowed"
                    }`}
                  />
                  {isEditMode && (
                    <p className="text-xs text-gray-500">{profile.full_name?.length || 0} karakter (min 3)</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold text-gray-700">Email</Label>
                  <Input value={user.email || ""} disabled className="bg-gray-100 cursor-not-allowed" />
                  <p className="text-xs text-gray-500">Email tidak dapat diubah</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-semibold text-gray-700">
                      Jenis Identitas <span className="text-red-500">*</span>
                    </Label>
                    <select
                      value={profile.identity_type || "KTP"}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          identity_type: e.target.value as "KTP" | "SIM",
                          identity_number: "",
                        })
                      }
                      disabled={!isEditMode}
                      className={`w-full border-2 rounded-lg px-4 py-3 ${
                        isEditMode ? "bg-white focus:border-green-500" : "bg-gray-50 cursor-not-allowed"
                      }`}
                    >
                      <option value="KTP">KTP</option>
                      <option value="SIM">SIM</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-semibold text-gray-700">
                      Nomor Identitas <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={profile.identity_number || ""}
                      onChange={handleIdNumberChange}
                      disabled={!isEditMode}
                      placeholder="Masukkan nomor"
                      className={`font-mono ${isEditMode ? "focus:border-green-500" : "bg-gray-50 cursor-not-allowed"}`}
                    />
                    <p className="text-xs text-gray-500">
                      {profile.identity_type === "KTP" ? `16 digit` : `12 digit`}
                      {isEditMode && ` (${profile.identity_number?.length || 0}/${profile.identity_type === "KTP" ? 16 : 12})`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-semibold text-gray-700">
                      Tanggal Lahir <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="date"
                      value={profile.birth_date || ""}
                      onChange={(e) => setProfile({ ...profile, birth_date: e.target.value })}
                      disabled={!isEditMode}
                      max={new Date().toISOString().split("T")[0]}
                      className={isEditMode ? "focus:border-green-500" : "bg-gray-50 cursor-not-allowed"}
                    />
                    {isEditMode && <p className="text-xs text-gray-500">Min. 17 tahun</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="font-semibold text-gray-700">
                      Jenis Kelamin <span className="text-red-500">*</span>
                    </Label>
                    <select
                      value={profile.gender || ""}
                      onChange={(e) =>
                        setProfile({ ...profile, gender: e.target.value as "Laki-laki" | "Perempuan" })
                      }
                      disabled={!isEditMode}
                      className={`w-full border-2 rounded-lg px-4 py-3 ${
                        isEditMode ? "bg-white focus:border-green-500" : "bg-gray-50 cursor-not-allowed"
                      }`}
                    >
                      <option value="">Pilih</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold text-gray-700">
                    Nomor HP/WhatsApp <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={profile.phone || ""}
                    onChange={handlePhoneChange}
                    disabled={!isEditMode}
                    placeholder="08xxxxxxxxxx"
                    className={`font-mono ${isEditMode ? "focus:border-green-500" : "bg-gray-50 cursor-not-allowed"}`}
                  />
                  <p className="text-xs text-gray-500">
                    {isEditMode
                      ? `${profile.phone?.length || 0}/13 digit (08 atau 62)`
                      : "Maksimal 13 digit"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold text-gray-700">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    value={profile.address || ""}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    disabled={!isEditMode}
                    rows={4}
                    placeholder="Alamat lengkap"
                    className={`resize-none ${isEditMode ? "focus:border-green-500" : "bg-gray-50 cursor-not-allowed"}`}
                  />
                  {isEditMode && (
                    <p className="text-xs text-gray-500">{profile.address?.length || 0} karakter (min 10)</p>
                  )}
                </div>

                {/* Tombol Aksi */}
                <div className="flex gap-3">
                  {!isEditMode && isProfileComplete ? (
                    <Button
                      type="button"
                      onClick={handleEditClick}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg text-lg"
                    >
                      <Edit className="w-5 h-5 mr-2" />
                      Edit Profil
                    </Button>
                  ) : (
                    <>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-lg text-lg disabled:opacity-50"
                      >
                        {loading ? "Menyimpan..." : (
                          <>
                            <Save className="w-5 h-5 mr-2" />
                            Simpan Profil
                          </>
                        )}
                      </Button>
                      {isProfileComplete && (
                        <Button
                          type="button"
                          onClick={handleCancelEdit}
                          disabled={loading}
                          className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 rounded-lg text-lg"
                        >
                          <X className="w-5 h-5 mr-2" />
                          Batal
                        </Button>
                      )}
                    </>
                  )}
                </div>

                {/* Notifikasi */}
                {!isProfileComplete && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded flex gap-3">
                    <span className="text-xl">Peringatan</span>
                    <p className="text-sm text-yellow-800">
                      Lengkapi profil untuk akses fitur lengkap
                    </p>
                  </div>
                )}
                {isProfileComplete && !isEditMode && (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded flex gap-3">
                    <span className="text-xl">Sukses</span>
                    <p className="text-sm text-green-800">
                      Profil lengkap! Klik "Edit Profil" untuk ubah data.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;