// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Navbar } from "@/components/Navbar";
// import { Search, ShoppingBag, Users, Shield } from "lucide-react";
// import heroImage from "@/assets/hero-outdoor.jpg";

// const Index = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
      
//       {/* Hero Section */}
//       <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
//         <div 
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: `url(${heroImage})` }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />
//         </div>
        
//         <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
//           <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
//             Rent, List & Trade Outdoor Gear
//           </h1>
//           <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
//             Connect with fellow outdoor enthusiasts. Find quality used gear or give your equipment a second life.
//           </p>
//           <div className="flex gap-4 justify-center flex-wrap">
//             <Link to="/browse">
//               <Button size="lg" variant="secondary" className="text-lg">
//                 Browse Gear
//               </Button>
//             </Link>
//             <Link to="/auth">
//               <Button size="lg" className="text-lg bg-accent hover:bg-accent/90">
//                 Get Started
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 px-4">
//         <div className="container mx-auto max-w-6xl">
//           <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
//                 <Users className="h-8 w-8" />
//               </div>
//               <h3 className="font-semibold text-lg mb-2">Create Account</h3>
//               <p className="text-muted-foreground">
//                 Sign up in seconds and join our community of outdoor enthusiasts
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
//                 <ShoppingBag className="h-8 w-8" />
//               </div>
//               <h3 className="font-semibold text-lg mb-2">Rent Your Gear</h3>
//               <p className="text-muted-foreground">
//                 Rent your Gear for the great adventure ahead
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
//                 <Search className="h-8 w-8" />
//               </div>
//               <h3 className="font-semibold text-lg mb-2">Browse & Search</h3>
//               <p className="text-muted-foreground">
//                 Find exactly what you need with our easy search and filters
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
//                 <Shield className="h-8 w-8" />
//               </div>
//               <h3 className="font-semibold text-lg mb-2">Connect Safely</h3>
//               <p className="text-muted-foreground">
//                 Message sellers directly and arrange secure exchanges
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-4 bg-primary/5">
//         <div className="container mx-auto max-w-4xl text-center">
//           <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
//           <p className="text-xl text-muted-foreground mb-8">
//             Join thousands of outdoor enthusiasts Adventur, Rent, and trading gear
//           </p>
//           <Link to="/auth">
//             <Button size="lg" className="text-lg">
//               Create Your Account
//             </Button>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Index;


// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { 
//   Search, 
//   ShoppingBag, 
//   Clock, 
//   Phone, 
//   Mountain,
//   Tent,
//   Backpack,
//   CheckCircle
// } from "lucide-react";

// const Index = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
      
//       {/* ✅ HERO SECTION */}
//       <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-green-600 to-blue-600">
//         <div className="text-center px-4 max-w-5xl mx-auto text-white">
//           {/* Brand Logo */}
//           <div className="mb-6">
//             <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
//               <Tent className="h-10 w-10 text-white" />
//             </div>
//             <h1 className="text-5xl md:text-6xl font-bold mb-2">
//               KUALA OUTDOOR
//             </h1>
//             <p className="text-xl md:text-2xl text-green-200 font-semibold mb-4">
//               PENYEWAAN ALAT CAMPING & PENDAKIAN
//             </p>
//           </div>
          
//           <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
//             🏕️ Solusi terpercaya untuk semua kebutuhan peralatan outdoor Anda! 
//             Dari tenda, sleeping bag, hingga perlengkapan mendaki gunung.
//           </p>
          
//           {/* Contact Info */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
//             <div className="flex items-center gap-2">
//               <Phone className="h-5 w-5" />
//               <span>📞 089692854470</span>
//             </div>
//             <div className="hidden sm:block">•</div>
//             <div className="flex items-center gap-2">
//               <Clock className="h-5 w-5" />
//               <span>⏰ Melayani 24 Jam</span>
//             </div>
//           </div>
          
//           <div className="flex gap-4 justify-center flex-wrap">
//             <Link to="/browse">
//               <Button size="lg" className="text-lg bg-white text-green-600 hover:bg-gray-100">
//                 🎒 Browse Equipment
//               </Button>
//             </Link>
//             <a 
//               href="https://wa.me/6289692854470?text=Halo%20Kuala%20Outdoor"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               {/* <Button size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white hover:text-green-600">
//                 💬 Chat WhatsApp
//               </Button> */}
//               <Button size="lg" className="text-lg bg-green-400 text-white hover:bg-green-500 border-0">
//   💬 Chat WhatsApp
// </Button>
//             </a>
//           </div>
//         </div>
//       </section>
// <br />
// <br />
//       {/* Stats Section */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//   <div>
//     <div className="text-3xl font-bold text-green-600 mb-2">Kubu Raya</div>
//     <div className="text-gray-600">Lokasi Strategis</div>
//   </div>
//   <div>
//     <div className="text-3xl font-bold text-blue-600 mb-2">24 Jam</div>
//     <div className="text-gray-600">Fast Response</div>
//   </div>
//   <div>
//     <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
//     <div className="text-gray-600">Equipment Terawat</div>
//   </div>
//   <div>
//     <div className="text-3xl font-bold text-orange-600 mb-2">Terjangkau</div>
//     <div className="text-gray-600">Harga Rental</div>
//   </div>
// </div>

//       {/* How It Works */}
//       <section className="py-20 px-4">
//         <div className="container mx-auto max-w-6xl">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold mb-4">🚀 Cara Rental Equipment</h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Proses rental yang mudah dan cepat untuk mendukung petualangan outdoor Anda
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <Card className="text-center hover:shadow-lg transition-shadow">
//               <CardContent className="pt-8 pb-6">
//                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
//                   <Search className="h-8 w-8" />
//                 </div>
//                 <h3 className="font-semibold text-lg mb-2">1. Browse & Pilih</h3>
//                 <p className="text-gray-600 text-sm">
//                   Cari dan pilih equipment yang Anda butuhkan dari katalog lengkap kami
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="text-center hover:shadow-lg transition-shadow">
//               <CardContent className="pt-8 pb-6">
//                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
//                   <Phone className="h-8 w-8" />
//                 </div>
//                 <h3 className="font-semibold text-lg mb-2">2. Booking via WA</h3>
//                 <p className="text-gray-600 text-sm">
//                   Hubungi kami via WhatsApp untuk konfirmasi dan booking equipment
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="text-center hover:shadow-lg transition-shadow">
//               <CardContent className="pt-8 pb-6">
//                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
//                   <ShoppingBag className="h-8 w-8" />
//                 </div>
//                 <h3 className="font-semibold text-lg mb-2">3. Pickup & Bayar</h3>
//                 <p className="text-gray-600 text-sm">
//                   Ambil equipment di lokasi kami dan lakukan pembayaran sewa
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="text-center hover:shadow-lg transition-shadow">
//               <CardContent className="pt-8 pb-6">
//                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
//                   <Mountain className="h-8 w-8" />
//                 </div>
//                 <h3 className="font-semibold text-lg mb-2">4. Petualangan!</h3>
//                 <p className="text-gray-600 text-sm">
//                   Nikmati petualangan Anda dan kembalikan equipment tepat waktu
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Equipment Categories */}
//       <section className="py-20 px-4 bg-gray-50">
//         <div className="container mx-auto max-w-6xl">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold mb-4">🎒 Kategori Equipment</h2>
//             <p className="text-xl text-gray-600">
//               Berbagai macam peralatan outdoor berkualitas siap mendukung petualangan Anda
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-8">
//             <Link to="/browse">
//               <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
//                 <CardContent className="p-8 text-center">
//                   <Tent className="h-16 w-16 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
//                   <h3 className="text-xl font-semibold mb-2">🏕️ Tenda & Shelter</h3>
//                   <p className="text-gray-600 mb-4">Tenda berkualitas untuk camping dan pendakian</p>
//                   <Button variant="outline" className="group-hover:bg-green-600 group-hover:text-white transition-colors">
//                     Lihat Koleksi
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Link>

//             <Link to="/browse">
//               <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
//                 <CardContent className="p-8 text-center">
//                   <Backpack className="h-16 w-16 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
//                   <h3 className="text-xl font-semibold mb-2">🎒 Sleeping & Carrier</h3>
//                   <p className="text-gray-600 mb-4">Sleeping bag, carrier, dan perlengkapan tidur</p>
//                   <Button variant="outline" className="group-hover:bg-blue-600 group-hover:text-white transition-colors">
//                     Lihat Koleksi
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Link>

//             <Link to="/browse">
//               <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
//                 <CardContent className="p-8 text-center">
//                   <Mountain className="h-16 w-16 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
//                   <h3 className="text-xl font-semibold mb-2">🍳 Cooking & Tools</h3>
//                   <p className="text-gray-600 mb-4">Peralatan masak dan tools pendakian</p>
//                   <Button variant="outline" className="group-hover:bg-purple-600 group-hover:text-white transition-colors">
//                     Lihat Koleksi
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="py-20 px-4">
//         <div className="container mx-auto max-w-6xl">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold mb-4">⭐ Kenapa Pilih Kuala Outdoor?</h2>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <div className="flex gap-4">
//               <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
//               <div>
//                 <h3 className="font-semibold text-lg mb-2">Equipment Berkualitas</h3>
//                 <p className="text-gray-600">Semua equipment dalam kondisi prima dan terawat dengan baik</p>
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
//               <div>
//                 <h3 className="font-semibold text-lg mb-2">Harga Terjangkau</h3>
//                 <p className="text-gray-600">Tarif rental yang bersahabat untuk semua kalangan petualang</p>
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
//               <div>
//                 <h3 className="font-semibold text-lg mb-2">Layanan 24 Jam</h3>
//                 <p className="text-gray-600">Fast response dan siap melayani kapan saja Anda butuhkan</p>
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
//               <div>
//                 <h3 className="font-semibold text-lg mb-2">Lokasi Strategis</h3>
//                 <p className="text-gray-600">Mudah dijangkau di Kuala Dua, Kabupaten Kubu Raya</p>
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
//               <div>
//                 <h3 className="font-semibold text-lg mb-2">Pengalaman Terpercaya</h3>
//                 <p className="text-gray-600">Sudah melayani ribuan petualang dengan kepuasan tinggi</p>
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
//               <div>
//                 <h3 className="font-semibold text-lg mb-2">Konsultasi Gratis</h3>
//                 <p className="text-gray-600">Tim berpengalaman siap membantu memilih equipment yang tepat</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
//         <div className="container mx-auto max-w-4xl text-center">
//           <div className="mb-8">
//             <h2 className="text-4xl font-bold mb-4">🚀 Siap Memulai Petualangan?</h2>
//             <p className="text-xl mb-8 opacity-90">
//               Bergabunglah dengan ribuan petualang yang telah mempercayai Kuala Outdoor 
//               untuk mendukung aktivitas outdoor mereka!
//             </p>
//           </div>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link to="/browse">
//               <Button size="lg" className="text-lg bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
//                 🎒 Mulai Browse Equipment
//               </Button>
//             </Link>
//             <a 
//               href="https://wa.me/6289692854470?text=Halo%20Kuala%20Outdoor%20saya%20ingin%20konsultasi"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Button size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white hover:text-green-600 px-8 py-3">
//                 💬 Konsultasi Gratis
//               </Button>
//             </a>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Index;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useContact } from '@/contexts/ContactContext'; // ✅ IMPORT CONTEXT
import { 
  Search, 
  ShoppingBag, 
  Clock, 
  Phone, 
  Mountain,
  Tent,
  Backpack,
  CheckCircle
} from "lucide-react";

const Index = () => {
  const { contactInfo } = useContact(); // ✅ GUNAKAN CONTEXT

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* ✅ HERO SECTION - MENGGUNAKAN DATA DARI CONTEXT */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-green-600 to-blue-600">
        <div className="text-center px-4 max-w-5xl mx-auto text-white">
          {/* Brand Logo */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <Tent className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-2">
              KUALA OUTDOOR
            </h1>
            <p className="text-xl md:text-2xl text-green-200 font-semibold mb-4">
              PENYEWAAN ALAT CAMPING & PENDAKIAN
            </p>
          </div>
          
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            🏕️ Solusi terpercaya untuk semua kebutuhan peralatan outdoor Anda! 
            Dari tenda, sleeping bag, hingga perlengkapan mendaki gunung.
          </p>
          
          {/* Contact Info - MENGGUNAKAN DATA DARI CONTEXT */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>📞 {contactInfo.phone1}</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>⏰ Melayani 24 Jam</span>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/browse">
              <Button size="lg" className="text-lg bg-white text-green-600 hover:bg-gray-100">
                🎒 Browse Equipment
              </Button>
            </Link>
            {/* ✅ TOMBOL WHATSAPP MENGGUNAKAN NOMOR DARI CONTEXT */}
            <a 
              href={`https://wa.me/${contactInfo.phone1.replace(/[^\d]/g, '')}?text=Halo%20Kuala%20Outdoor`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="text-lg bg-green-400 text-white hover:bg-green-500 border-0">
                💬 Chat WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
<br /> <br />
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-3xl font-bold text-green-600 mb-2">Kubu Raya</div>
          <div className="text-gray-600">Lokasi Strategis</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-600 mb-2">24 Jam</div>
          <div className="text-gray-600">Fast Response</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
          <div className="text-gray-600">Equipment Terawat</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-orange-600 mb-2">Terjangkau</div>
          <div className="text-gray-600">Harga Rental</div>
        </div>
      </div>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">🚀 Cara Rental Equipment</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proses rental yang mudah dan cepat untuk mendukung petualangan outdoor Anda
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">1. Browse & Pilih</h3>
                <p className="text-gray-600 text-sm">
                  Cari dan pilih equipment yang Anda butuhkan dari katalog lengkap kami
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">2. Booking via WA</h3>
                <p className="text-gray-600 text-sm">
                  Hubungi kami via WhatsApp untuk konfirmasi dan booking equipment
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">3. Pickup & Bayar</h3>
                <p className="text-gray-600 text-sm">
                  Ambil equipment di lokasi kami dan lakukan pembayaran sewa
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                  <Mountain className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">4. Petualangan!</h3>
                <p className="text-gray-600 text-sm">
                  Nikmati petualangan Anda dan kembalikan equipment tepat waktu
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">🎒 Kategori Equipment</h2>
            <p className="text-xl text-gray-600">
              Berbagai macam peralatan outdoor berkualitas siap mendukung petualangan Anda
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/browse">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <CardContent className="p-8 text-center">
                  <Tent className="h-16 w-16 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-2">🏕️ Tenda & Shelter</h3>
                  <p className="text-gray-600 mb-4">Tenda berkualitas untuk camping dan pendakian</p>
                  <Button variant="outline" className="group-hover:bg-green-600 group-hover:text-white transition-colors">
                    Lihat Koleksi
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/browse">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <CardContent className="p-8 text-center">
                  <Backpack className="h-16 w-16 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-2">🎒 Sleeping & Carrier</h3>
                  <p className="text-gray-600 mb-4">Sleeping bag, carrier, dan perlengkapan tidur</p>
                  <Button variant="outline" className="group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    Lihat Koleksi
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/browse">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <CardContent className="p-8 text-center">
                  <Mountain className="h-16 w-16 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-2">🍳 Cooking & Tools</h3>
                  <p className="text-gray-600 mb-4">Peralatan masak dan tools pendakian</p>
                  <Button variant="outline" className="group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    Lihat Koleksi
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">⭐ Kenapa Pilih Kuala Outdoor?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Equipment Berkualitas</h3>
                <p className="text-gray-600">Semua equipment dalam kondisi prima dan terawat dengan baik</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Harga Terjangkau</h3>
                <p className="text-gray-600">Tarif rental yang bersahabat untuk semua kalangan petualang</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Layanan 24 Jam</h3>
                <p className="text-gray-600">Fast response dan siap melayani kapan saja Anda butuhkan</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Lokasi Strategis</h3>
                <p className="text-gray-600">Mudah dijangkau di {contactInfo.address.split(',')[0]}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Pengalaman Terpercaya</h3>
                <p className="text-gray-600">Sudah melayani ribuan petualang dengan kepuasan tinggi</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Konsultasi Gratis</h3>
                <p className="text-gray-600">Tim berpengalaman siap membantu memilih equipment yang tepat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - MENGGUNAKAN DATA DARI CONTEXT */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4">🚀 Siap Memulai Petualangan?</h2>
            <p className="text-xl mb-8 opacity-90">
              Bergabunglah dengan ribuan petualang yang telah mempercayai Kuala Outdoor 
              untuk mendukung aktivitas outdoor mereka!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg" className="text-lg bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                🎒 Mulai Browse Equipment
              </Button>
            </Link>
            {/* ✅ TOMBOL WHATSAPP MENGGUNAKAN NOMOR DARI CONTEXT */}
            <a 
              href={`https://wa.me/${contactInfo.phone1.replace(/[^\d]/g, '')}?text=Halo%20Kuala%20Outdoor%20saya%20ingin%20konsultasi`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white hover:text-green-600 px-8 py-3">
                💬 Konsultasi Gratis
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;