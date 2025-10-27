// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/contexts/AuthContext";
// import { Mountain, ShoppingCart, User, LogOut, Menu } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// export const Navbar = () => {
//   const { user, signOut } = useAuth();

//   return (
//     <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2 font-bold text-xl text-green-600 hover:text-green-700">
//           <Mountain className="h-7 w-7" />
//           Kelana Outdoor
//         </Link>
        
//         {/* Navigation Links - Desktop */}
//         <div className="hidden md:flex items-center gap-6">
//           <Link to="/browse">
//             <Button variant="ghost" className="hover:text-green-600">
//               Browse Equipment
//             </Button>
//           </Link>
          
//           <Link to="/packages">
//             <Button variant="ghost" className="hover:text-green-600">
//               Rental Packages
//             </Button>
//           </Link>
          
//           <Link to="/trips">
//             <Button variant="ghost" className="hover:text-green-600">
//               Open Trip
//             </Button>
//           </Link>
          
//           <Link to="/about">
//             <Button variant="ghost" className="hover:text-green-600">
//               About Us
//             </Button>
//           </Link>
//         </div>
        
//         {/* User Actions */}
//         <div className="flex items-center gap-3">
//           {/* Cart Icon (always visible) */}
//           <Link to="/cart">
//             <Button variant="outline" size="icon" className="relative">
//               <ShoppingCart className="h-4 w-4" />
//               {/* Cart count badge - nanti kita tambahkan */}
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 0
//               </span>
//             </Button>
//           </Link>
          
//           {user ? (
//             /* User is logged in */
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="flex items-center gap-2">
//                   <User className="h-4 w-4" />
//                   <span className="hidden sm:inline">{user.name || 'User'}</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-48">
//                 <DropdownMenuItem asChild>
//                   <Link to="/profile" className="cursor-pointer">
//                     <User className="h-4 w-4 mr-2" />
//                     Profile Saya
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link to="/bookings" className="cursor-pointer">
//                     <ShoppingCart className="h-4 w-4 mr-2" />
//                     Riwayat Booking
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem 
//                   onClick={signOut}
//                   className="cursor-pointer text-red-600 hover:text-red-700"
//                 >
//                   <LogOut className="h-4 w-4 mr-2" />
//                   Keluar
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             /* User not logged in */
//             <div className="flex gap-2">
//               <Link to="/auth?mode=login">
//                 <Button variant="outline">
//                   Masuk
//                 </Button>
//               </Link>
//               <Link to="/auth?mode=register">
//                 <Button className="bg-green-600 hover:bg-green-700">
//                   Daftar
//                 </Button>
//               </Link>
//             </div>
//           )}
          
//           {/* Mobile Menu */}
//           <div className="md:hidden">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" size="icon">
//                   <Menu className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-48">
//                 <DropdownMenuItem asChild>
//                   <Link to="/browse" className="cursor-pointer">Browse Equipment</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link to="/packages" className="cursor-pointer">Rental Packages</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link to="/trips" className="cursor-pointer">Open Trip</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link to="/about" className="cursor-pointer">About Us</Link>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Mountain, ShoppingCart } from "lucide-react";

// export const Navbar = () => {
//   return (
//     <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//         {/* ✅ LOGO SIMPLE */}
//         <Link to="/" className="flex items-center gap-2 font-bold text-xl text-green-600 hover:text-green-700">
//           <Mountain className="h-7 w-7" />
//           Kuala Outdoor
//         </Link>
        
//         {/* ✅ NAVIGATION SIMPLE */}
//         <div className="hidden md:flex items-center gap-6">
//           <Link to="/browse">
//             <Button variant="ghost" className="hover:text-green-600">
//               Browse Equipment
//             </Button>
//           </Link>
          
//           <Link to="/packages">
//             <Button variant="ghost" className="hover:text-green-600">
//               Paket Rental
//             </Button>
//           </Link>
          
//           <Link to="/trips">
//             <Button variant="ghost" className="hover:text-green-600">
//               Open Trip
//             </Button>
//           </Link>
          
//           <Link to="/about">
//             <Button variant="ghost" className="hover:text-green-600">
//               Tentang Kami
//             </Button>
//           </Link>
//         </div>
        
        
//         {/* ✅ USER ACTIONS SIMPLE */}
//         <div className="flex items-center gap-3">
//           {/* Cart Icon */}
//           <Link to="/cart">
//             <Button variant="outline" size="icon" className="relative">
//               <ShoppingCart className="h-4 w-4" />
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 0
//               </span>
//             </Button>
//           </Link>
          
//           {/* ✅ SIMPLE AUTH BUTTONS */}
//           <div className="hidden md:flex gap-2">
//             <Link to="/auth">
//               <Button variant="outline">
//                 Masuk
//               </Button>
//             </Link>
//             <a 
//               href="https://wa.me/6289692854470"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Button className="bg-green-600 hover:bg-green-700">
//                 WhatsApp
//               </Button>
//             </a>
//           </div>
          
//           {/* ✅ MOBILE MENU SIMPLE */}
//           <div className="md:hidden">
//             <Link to="/browse">
//               <Button variant="outline" size="sm">
//                 Menu
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };



import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mountain, ShoppingCart, Shield } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* ✅ LOGO SIMPLE */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-green-600 hover:text-green-700">
          <Mountain className="h-7 w-7" />
          Kuala Outdoor
        </Link>
        
        {/* ✅ NAVIGATION SIMPLE */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/browse">
            <Button variant="ghost" className="hover:text-green-600">
              Browse Equipment
            </Button>
          </Link>
          
          <Link to="/packages">
            <Button variant="ghost" className="hover:text-green-600">
              Paket Rental
            </Button>
          </Link>
          
          <Link to="/trips">
            <Button variant="ghost" className="hover:text-green-600">
              Open Trip
            </Button>
          </Link>
          
          <Link to="/about">
            <Button variant="ghost" className="hover:text-green-600">
              Tentang Kami
            </Button>
          </Link>
          
          {/* 🆕 ADMIN LINK */}
          <Link to="/admin/login">
            <Button 
              variant="ghost" 
              className="hover:text-red-600 text-red-500 font-medium"
              title="Admin Portal"
            >
              <Shield className="h-4 w-4 mr-1" />
              Admin
            </Button>
          </Link>
        </div>
        
        {/* ✅ USER ACTIONS SIMPLE */}
        <div className="flex items-center gap-3">
          {/* Cart Icon */}
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
          
          {/* ✅ SIMPLE AUTH BUTTONS */}
          <div className="hidden md:flex gap-2">
            <Link to="/auth">
              <Button variant="outline">
                Masuk
              </Button>
            </Link>
            <a 
              href="https://wa.me/6289692854470"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-600 hover:bg-green-700">
                WhatsApp
              </Button>
            </a>
          </div>
          
          {/* ✅ MOBILE MENU DENGAN ADMIN */}
          <div className="md:hidden">
            <div className="flex gap-1">
              <Link to="/browse">
                <Button variant="outline" size="sm">
                  Menu
                </Button>
              </Link>
              <Link to="/admin/login">
                <Button variant="outline" size="sm" className="text-red-600">
                  <Shield className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
