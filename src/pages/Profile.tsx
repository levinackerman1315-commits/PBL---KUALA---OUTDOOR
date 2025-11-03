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
  const [originalProfile, setOriginalProfile] = useState<Profile | null>(null); // ✨ NEW: Store original data
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!user?.id) return;
    
    try {
      const response = await fetch(
        `${API_BASE_URL}/profile.php?action=fetch&user_id=${user.id}`
      );
      
      const result = await response.json();

      if (result.success && result.data) {
        const data = result.data;
        const profileData = {
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
        setOriginalProfile(profileData); // ✨ NEW: Store original data

        if (data.profile_picture) {
          setPreviewImage(data.profile_picture);
        }

        // Check if profile is complete
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
        
        // If profile incomplete, enable edit mode automatically
        if (!complete) {
          setIsEditMode(true);
        }
      } else {
        // No profile yet, enable edit mode
        setIsEditMode(true);
        setIsProfileComplete(false);
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Gagal mengambil data profil",
        variant: "destructive",
      });
    }
  };

  // ✨ NEW: Check if data has changed
  const hasDataChanged = (): boolean => {
    if (!originalProfile) return true; // If no original data, allow save
    
    return (
      profile.full_name !== originalProfile.full_name ||
      profile.identity_type !== originalProfile.identity_type ||
      profile.identity_number !== originalProfile.identity_number ||
      profile.birth_date !== originalProfile.birth_date ||
      profile.gender !== originalProfile.gender ||
      profile.phone !== originalProfile.phone ||
      profile.address !== originalProfile.address ||
      selectedFile !== null // Photo changed
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditMode) return;
    
    const file = e.target.files?.[0];
    if (file) {
      // ✨ NEW: Validate file size and type
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Terlalu Besar",
          description: "Ukuran foto maksimal 5MB",
          variant: "destructive",
        });
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Format Tidak Didukung",
          description: "Hanya file JPG, PNG, dan GIF yang diperbolehkan",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedFile || !user?.id) return profile.profile_picture;

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('user_id', user.id.toString());

      const response = await fetch(`${API_BASE_URL}/upload-profile-picture.php`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        return result.url;
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast({
        title: "Info Upload Foto",
        description: "Foto tidak dapat diupload, tapi profil tetap akan disimpan.",
        variant: "default",
      });
      return null;
    }
  };

  const validateForm = (): boolean => {
    if (!profile.full_name?.trim()) {
      toast({
        title: "Validasi Error",
        description: "Nama Lengkap harus diisi",
        variant: "destructive",
      });
      return false;
    }

    if (profile.full_name.length < 3) {
      toast({
        title: "Validasi Error",
        description: "Nama Lengkap minimal 3 karakter",
        variant: "destructive",
      });
      return false;
    }

    if (!profile.identity_number?.trim()) {
      toast({
        title: "Validasi Error",
        description: "Nomor Identitas harus diisi",
        variant: "destructive",
      });
      return false;
    }

    const idLength = profile.identity_type === "KTP" || profile.identity_type === "NIK" ? 16 : 12;
    if (profile.identity_number.length !== idLength) {
      toast({
        title: "Validasi Error",
        description: `${profile.identity_type} harus ${idLength} digit`,
        variant: "destructive",
      });
      return false;
    }

    if (!profile.birth_date) {
      toast({
        title: "Validasi Error",
        description: "Tanggal Lahir harus diisi",
        variant: "destructive",
      });
      return false;
    }

    // ✨ NEW: Validate age (must be at least 17 years old)
    const birthDate = new Date(profile.birth_date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 17) {
      toast({
        title: "Validasi Error",
        description: "Anda harus berusia minimal 17 tahun",
        variant: "destructive",
      });
      return false;
    }

    if (!profile.gender) {
      toast({
        title: "Validasi Error",
        description: "Jenis Kelamin harus diisi",
        variant: "destructive",
      });
      return false;
    }

    if (!profile.phone?.trim()) {
      toast({
        title: "Validasi Error",
        description: "Nomor HP/WhatsApp harus diisi",
        variant: "destructive",
      });
      return false;
    }

    if (profile.phone.length < 10 || profile.phone.length > 13) {
      toast({
        title: "Validasi Error",
        description: "Nomor HP harus 10-13 digit",
        variant: "destructive",
      });
      return false;
    }

    // ✨ NEW: Validate phone format (must start with 08 or 62)
    if (!profile.phone.startsWith('08') && !profile.phone.startsWith('62')) {
      toast({
        title: "Validasi Error",
        description: "Nomor HP harus diawali dengan 08 atau 62",
        variant: "destructive",
      });
      return false;
    }

    if (!profile.address?.trim()) {
      toast({
        title: "Validasi Error",
        description: "Alamat Lengkap harus diisi",
        variant: "destructive",
      });
      return false;
    }

    if (profile.address.length < 10) {
      toast({
        title: "Validasi Error",
        description: "Alamat minimal 10 karakter",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✨ NEW: Check if data has changed
    if (isProfileComplete && !hasDataChanged()) {
      toast({
        title: "Tidak Ada Perubahan",
        description: "Anda belum mengubah data apapun",
        variant: "default",
      });
      return;
    }

    if (!validateForm() || !user) return;

    setLoading(true);

    try {
      let profilePictureUrl = profile.profile_picture;

      if (selectedFile) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          profilePictureUrl = uploadedUrl;
        }
      }

      const response = await fetch(`${API_BASE_URL}/profile.php?action=save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
          title: "✅ Berhasil",
          description: isProfileComplete 
            ? "Perubahan profil Anda telah disimpan" 
            : "Profil Anda telah disimpan dengan sukses",
        });

        setSelectedFile(null);
        setIsEditMode(false);
        setIsProfileComplete(true);
        await fetchProfile(); // Reload data
      } else {
        throw new Error(result.message || 'Failed to save profile');
      }
    } catch (error: any) {
      toast({
        title: "❌ Error menyimpan profil",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    toast({
      title: "✏️ Mode Edit Aktif",
      description: "Anda sekarang dapat mengubah data profil",
    });
  };

  const handleCancelEdit = () => {
    // ✨ NEW: Restore original data
    if (originalProfile) {
      setProfile(originalProfile);
      if (originalProfile.profile_picture) {
        setPreviewImage(originalProfile.profile_picture);
      }
    }
    
    setIsEditMode(false);
    setSelectedFile(null);
    
    toast({
      title: "❌ Batal Edit",
      description: "Perubahan dibatalkan, data dikembalikan ke semula",
    });
  };

  const handleIdNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditMode) return;
    
    const value = e.target.value.replace(/[^0-9]/g, "");
    const maxLength = profile.identity_type === "KTP" || profile.identity_type === "NIK" ? 16 : 12;

    setProfile({
      ...profile,
      identity_number: value.slice(0, maxLength),
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditMode) return;
    
    const value = e.target.value.replace(/[^0-9]/g, "");
    setProfile({
      ...profile,
      phone: value.slice(0, 13),
    });
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
                <div className="text-3xl">👤</div>
                <div>
                  <h1 className="text-2xl font-bold">Profil Pribadi</h1>
                  <p className="text-green-100 text-sm">
                    {isEditMode 
                      ? "Mode Edit - Lengkapi atau ubah data profil Anda"
                      : "Data profil Anda telah tersimpan"
                    }
                  </p>
                </div>
              </div>
              
              {isProfileComplete && !isEditMode && (
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                  ✅ Lengkap
                </div>
              )}
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Photo Upload Section */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative mb-3">
                    <div className="w-36 h-36 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
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
                    {isEditMode ? "Klik untuk ubah foto profil" : "Foto profil Anda"}
                  </p>
                  {/* ✨ NEW: Show if photo changed */}
                  {isEditMode && selectedFile && (
                    <p className="text-green-600 text-xs mt-1 font-semibold">
                      ✓ Foto baru dipilih: {selectedFile.name}
                    </p>
                  )}
                </div>

                {/* Nama Lengkap */}
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="font-semibold text-gray-700">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="full_name"
                    placeholder="Masukkan nama lengkap Anda"
                    value={profile.full_name || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, full_name: e.target.value })
                    }
                    disabled={!isEditMode}
                    className={`border-2 rounded-lg px-4 py-3 ${
                      isEditMode 
                        ? "border-gray-200 focus:border-green-500" 
                        : "bg-gray-50 border-gray-200 cursor-not-allowed"
                    }`}
                  />
                  {/* ✨ NEW: Show character count in edit mode */}
                  {isEditMode && (
                    <p className="text-xs text-gray-500">
                      {profile.full_name?.length || 0} karakter (minimal 3)
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="bg-gray-100 border-2 border-gray-200 rounded-lg px-4 py-3 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500">Email tidak dapat diubah</p>
                </div>

                {/* ID Type and Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="identity_type" className="font-semibold text-gray-700">
                      Jenis Identitas <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="identity_type"
                      value={profile.identity_type || "KTP"}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          identity_type: e.target.value as "NIK" | "KTP" | "SIM",
                          identity_number: "",
                        })
                      }
                      disabled={!isEditMode}
                      className={`w-full border-2 rounded-lg px-4 py-3 font-medium ${
                        isEditMode 
                          ? "border-gray-200 focus:border-green-500 bg-white" 
                          : "bg-gray-50 border-gray-200 cursor-not-allowed"
                      }`}
                    >
                      <option value="KTP">KTP</option>
                      <option value="SIM">SIM</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="identity_number" className="font-semibold text-gray-700">
                      Nomor Identitas <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="identity_number"
                      placeholder="Masukkan nomor"
                      value={profile.identity_number || ""}
                      onChange={handleIdNumberChange}
                      maxLength={profile.identity_type === "KTP" || profile.identity_type === "NIK" ? 16 : 12}
                      disabled={!isEditMode}
                      className={`border-2 rounded-lg px-4 py-3 font-mono ${
                        isEditMode 
                          ? "border-gray-200 focus:border-green-500" 
                          : "bg-gray-50 border-gray-200 cursor-not-allowed"
                      }`}
                    />
                    <p className="text-xs text-gray-500">
                      {profile.identity_type === "KTP" || profile.identity_type === "NIK"
                        ? `KTP: 16 digit${isEditMode ? ` (${profile.identity_number?.length || 0}/16)` : ''}`
                        : `SIM: 12 digit${isEditMode ? ` (${profile.identity_number?.length || 0}/12)` : ''}`}
                    </p>
                  </div>
                </div>

                {/* Date and Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birth_date" className="font-semibold text-gray-700">
                      Tanggal Lahir <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="birth_date"
                      type="date"
                      value={profile.birth_date || ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          birth_date: e.target.value,
                        })
                      }
                      disabled={!isEditMode}
                      max={new Date().toISOString().split('T')[0]} // ✨ NEW: Can't select future date
                      className={`border-2 rounded-lg px-4 py-3 ${
                        isEditMode 
                          ? "border-gray-200 focus:border-green-500" 
                          : "bg-gray-50 border-gray-200 cursor-not-allowed"
                      }`}
                    />
                    {isEditMode && (
                      <p className="text-xs text-gray-500">Minimal usia 17 tahun</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="font-semibold text-gray-700">
                      Jenis Kelamin <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="gender"
                      value={profile.gender || ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          gender: e.target.value as "Laki-laki" | "Perempuan",
                        })
                      }
                      disabled={!isEditMode}
                      className={`w-full border-2 rounded-lg px-4 py-3 ${
                        isEditMode 
                          ? "border-gray-200 focus:border-green-500 bg-white" 
                          : "bg-gray-50 border-gray-200 cursor-not-allowed"
                      }`}
                    >
                      <option value="">Pilih jenis kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-semibold text-gray-700">
                    Nomor HP/WhatsApp <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="08xxxxxxxxxx"
                    value={profile.phone || ""}
                    onChange={handlePhoneChange}
                    maxLength={13}
                    disabled={!isEditMode}
                    className={`border-2 rounded-lg px-4 py-3 font-mono ${
                      isEditMode 
                        ? "border-gray-200 focus:border-green-500" 
                        : "bg-gray-50 border-gray-200 cursor-not-allowed"
                    }`}
                  />
                  <p className="text-xs text-gray-500">
                    {isEditMode 
                      ? `${profile.phone?.length || 0}/13 digit (harus diawali 08 atau 62)`
                      : 'Maksimal 13 digit'}
                  </p>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="font-semibold text-gray-700">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Masukkan alamat lengkap Anda"
                    value={profile.address || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                    rows={4}
                    disabled={!isEditMode}
                    className={`border-2 rounded-lg px-4 py-3 resize-none ${
                      isEditMode 
                        ? "border-gray-200 focus:border-green-500" 
                        : "bg-gray-50 border-gray-200 cursor-not-allowed"
                    }`}
                  />
                  {isEditMode && (
                    <p className="text-xs text-gray-500">
                      {profile.address?.length || 0} karakter (minimal 10)
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {!isEditMode && isProfileComplete ? (
                    <Button
                      type="button"
                      onClick={handleEditClick}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg text-lg transition-all duration-200"
                    >
                      <Edit className="w-5 h-5 mr-2" />
                      Edit Profil
                    </Button>
                  ) : (
                    <>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-lg text-lg transition-all duration-200 disabled:opacity-50"
                      >
                        {loading ? (
                          "💾 Menyimpan..."
                        ) : (
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
                          className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 rounded-lg text-lg transition-all duration-200"
                        >
                          <X className="w-5 h-5 mr-2" />
                          Batal
                        </Button>
                      )}
                    </>
                  )}
                </div>

                {/* Warning Box */}
                {!isProfileComplete && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded flex gap-3">
                    <span className="text-xl">⚠️</span>
                    <p className="text-sm text-yellow-800">
                      Anda harus melengkapi profil untuk mengakses fitur-fitur lain
                    </p>
                  </div>
                )}
                
                {/* Success message */}
                {isProfileComplete && !isEditMode && (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded flex gap-3">
                    <span className="text-xl">✅</span>
                    <p className="text-sm text-green-800">
                      Profil Anda sudah lengkap! Klik "Edit Profil" jika ingin mengubah data.
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
