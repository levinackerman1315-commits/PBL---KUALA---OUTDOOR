import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Mountain, ShoppingCart, User, LogOut, Settings, Menu, X, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-green-600 hover:text-green-700">
          <Mountain className="h-7 w-7" />
          Kelana Outdoor
        </Link>
        
        {/* Navigation Links - Desktop */}
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

          {/* ✅ MENU ADMIN (MERAH) - SELALU TAMPIL */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <Shield className="mr-2 h-4 w-4" />
                Admin
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {user ? (
                // ✅ Jika Admin Sudah Login
                <>
                  <DropdownMenuLabel>Admin Panel</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem asChild>
                    <Link to="/admin/dashboard" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link to="/admin/equipment" className="cursor-pointer">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Kelola Equipment
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link to="/admin/bookings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Kelola Booking
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link to="/admin/customers" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Kelola Customer
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout Admin
                  </DropdownMenuItem>
                </>
              ) : (
                // ✅ Jika Admin Belum Login - ARAHKAN KE /admin/login
                <>
                  <DropdownMenuLabel>Admin Login</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/admin/login" className="cursor-pointer">
                      <Shield className="mr-2 h-4 w-4" />
                      Login sebagai Admin
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* User Actions */}
        <div className="flex items-center gap-3">
          {/* Cart Icon with Realtime Badge */}
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <Badge 
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
          
          {/* ✅ TOMBOL MASUK (UNTUK CUSTOMER) - ARAHKAN KE /customer/login */}
          <div className="hidden md:flex gap-2">
            <Link to="/customer/login">
              <Button variant="outline">
                <User className="mr-2 h-4 w-4" />
                Masuk
              </Button>
            </Link>
            
            {/* WhatsApp Button */}
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
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* ✅ MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link 
              to="/browse" 
              className="block py-2 hover:text-green-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Equipment
            </Link>
            <Link 
              to="/packages" 
              className="block py-2 hover:text-green-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Paket Rental
            </Link>
            <Link 
              to="/trips" 
              className="block py-2 hover:text-green-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Open Trip
            </Link>
            <Link 
              to="/about" 
              className="block py-2 hover:text-green-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tentang Kami
            </Link>

            <div className="border-t pt-3 mt-3">
              {/* ✅ ADMIN MENU - MOBILE */}
              <div className="space-y-2 mb-4">
                <p className="font-semibold text-sm text-red-600 mb-2">Admin</p>
                {user ? (
                  <>
                    <Link 
                      to="/admin/dashboard" 
                      className="block py-2 hover:text-green-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      📊 Dashboard
                    </Link>
                    
                    <Link 
                      to="/admin/equipment" 
                      className="block py-2 hover:text-green-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      🎒 Kelola Equipment
                    </Link>
                    
                    <Link 
                      to="/admin/bookings" 
                      className="block py-2 hover:text-green-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      📋 Kelola Booking
                    </Link>
                    
                    <Link 
                      to="/admin/customers" 
                      className="block py-2 hover:text-green-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      👥 Kelola Customer
                    </Link>
                    
                    <Link 
                      to="/profile" 
                      className="block py-2 hover:text-green-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      👤 Profile
                    </Link>
                    
                    <button 
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-red-600 hover:text-red-700"
                    >
                      🚪 Logout Admin
                    </button>
                  </>
                ) : (
                  // ✅ ARAHKAN KE /admin/login - MOBILE
                  <Link 
                    to="/admin/login" 
                    className="block py-2 text-red-600 hover:text-red-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🔐 Login Admin
                  </Link>
                )}
              </div>

              {/* ✅ CUSTOMER LOGIN - MOBILE - ARAHKAN KE /customer/login */}
              <div className="space-y-2 border-t pt-3">
                <Link to="/customer/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <User className="h-4 w-4" />
                    Masuk (Customer)
                  </Button>
                </Link>
                
                <a 
                  href="https://wa.me/6289692854470"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;