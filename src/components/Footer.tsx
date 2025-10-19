// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { 
//   Phone, 
//   MapPin, 
//   Clock, 
//   Instagram, 
//   MessageCircle,
//   Tent,
//   Mail
// } from "lucide-react";

// export const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
//           {/* ✅ BRAND INFO */}
//           <div>
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
//                 <Tent className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold">KUALA OUTDOOR</h3>
//                 <p className="text-green-400 text-sm">Rental Equipment</p>
//               </div>
//             </div>
//             <p className="text-gray-400 text-sm leading-relaxed">
//               Solusi terpercaya untuk semua kebutuhan peralatan outdoor Anda. 
//               Melayani rental equipment camping dan pendakian dengan kualitas terbaik.
//             </p>
//           </div>

//           {/* ✅ QUICK LINKS */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link to="/browse" className="text-gray-400 hover:text-white transition-colors">
//                   🎒 Browse Equipment
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/packages" className="text-gray-400 hover:text-white transition-colors">
//                   📦 Paket Rental
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/trips" className="text-gray-400 hover:text-white transition-colors">
//                   🏔️ Open Trip
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
//                   ℹ️ Tentang Kami
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/cart" className="text-gray-400 hover:text-white transition-colors">
//                   🛒 Keranjang
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* ✅ CONTACT INFO */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Kontak Kami</h4>
//             <div className="space-y-3 text-sm">
//               <div className="flex items-center gap-3">
//                 <Phone className="h-4 w-4 text-green-400" />
//                 <div>
//                   <a href="tel:089692854470" className="text-gray-400 hover:text-white transition-colors">
//                     089692854470
//                   </a>
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-3">
//                 <Phone className="h-4 w-4 text-green-400" />
//                 <div>
//                   <a href="tel:082253446316" className="text-gray-400 hover:text-white transition-colors">
//                     082253446316
//                   </a>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <MapPin className="h-4 w-4 text-red-400 mt-1" />
//                 <div className="text-gray-400">
//                   Jl. K.H. Abdurrahman Wahid<br />
//                   Kuala Dua, Gg Jambu, No 78<br />
//                   Kab. Kubu Raya
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <Clock className="h-4 w-4 text-blue-400" />
//                 <span className="text-gray-400">Melayani 24 Jam</span>
//               </div>
//             </div>
//           </div>

//           {/* ✅ SOCIAL & CTA */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
            
//             <div className="space-y-3">
//               <a 
//                 href="https://instagram.com/kuala_outdoor" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors"
//               >
//                 <Instagram className="h-5 w-5" />
//                 <span className="text-sm">@kuala_outdoor</span>
//               </a>

//               <a 
//                 href="https://wa.me/6289692854470?text=Halo Kuala Outdoor!"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block"
//               >
//                 <Button className="w-full bg-green-600 hover:bg-green-700 text-sm">
//                   <MessageCircle className="h-4 w-4 mr-2" />
//                   Chat WhatsApp
//                 </Button>
//               </a>

//               <div className="mt-4 pt-4 border-t border-gray-700">
//                 <p className="text-xs text-gray-500">
//                   🌟 1,504 Followers<br />
//                   📸 395 Posts<br />
//                   ⭐ Travel Service
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ✅ BOTTOM BAR */}
//         <div className="border-t border-gray-700 mt-8 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-gray-400 text-sm">
//               © 2024 Kuala Outdoor. All rights reserved.
//             </p>
//             <div className="flex gap-6 text-xs text-gray-500">
//               <Link to="/about" className="hover:text-white transition-colors">
//                 Syarat & Ketentuan
//               </Link>
//               <Link to="/about" className="hover:text-white transition-colors">
//                 Privacy Policy
//               </Link>
//               <a 
//                 href="https://wa.me/6289692854470?text=Halo, saya butuh bantuan"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-white transition-colors"
//               >
//                 Bantuan
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  MessageCircle,
  Tent,
  Mail
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* ✅ BRAND INFO */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Tent className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">KUALA OUTDOOR</h3>
                <p className="text-green-400 text-sm">Rental Equipment</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Solusi terpercaya untuk semua kebutuhan peralatan outdoor Anda. 
              Melayani rental equipment camping dan pendakian dengan kualitas terbaik.
            </p>
          </div>

          {/* ✅ QUICK LINKS */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/browse" className="text-gray-400 hover:text-white transition-colors">
                  🎒 Browse Equipment
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-400 hover:text-white transition-colors">
                  📦 Paket Rental
                </Link>
              </li>
              <li>
                <Link to="/trips" className="text-gray-400 hover:text-white transition-colors">
                  🏔️ Open Trip
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  ℹ️ Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white transition-colors">
                  🛒 Keranjang
                </Link>
              </li>
            </ul>
          </div>

          {/* ✅ CONTACT INFO */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak Kami</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-green-400" />
                <div>
                  <a href="tel:089692854470" className="text-gray-400 hover:text-white transition-colors">
                    089692854470
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-green-400" />
                <div>
                  <a href="tel:082253446316" className="text-gray-400 hover:text-white transition-colors">
                    082253446316
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-red-400 mt-1" />
                <div className="text-gray-400">
                  Jl. K.H. Abdurrahman Wahid<br />
                  Kuala Dua, Gg Jambu, No 78<br />
                  Kab. Kubu Raya
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">Melayani 24 Jam</span>
              </div>
            </div>
          </div>

          {/* ✅ SOCIAL & CTA */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
            
            <div className="space-y-3">
              <a 
                href="https://instagram.com/kuala_outdoor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="text-sm">@kuala_outdoor</span>
              </a>

              <a 
                href="https://wa.me/6289692854470?text=Halo%20Kuala%20Outdoor!"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-green-600 hover:bg-green-700 text-sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat WhatsApp
                </Button>
              </a>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-xs text-gray-500">
                  🌟 1,504 Followers<br />
                  📸 395 Posts<br />
                  ⭐ Travel Service
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ BOTTOM BAR */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Kuala Outdoor. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-gray-500">
              <Link to="/about" className="hover:text-white transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link to="/about" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <a 
                href="https://wa.me/6289692854470?text=Halo,%20saya%20butuh%20bantuan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Bantuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};