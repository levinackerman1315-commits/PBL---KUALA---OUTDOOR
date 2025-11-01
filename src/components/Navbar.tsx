import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mountain, ShoppingCart, Shield, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
          
          {/* ✅ AUTH BUTTONS & WHATSAPP */}
          <div className="hidden md:flex gap-2 items-center">
            {!user ? (
              <>
                <Link to="/auth">
                  <Button variant="outline">
                    Masuk
                  </Button>
                </Link>
              </>
            ) : (
              <div className="relative">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <User className="h-4 w-4" />
                  {user.name}
                </Button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                    <button
                      onClick={() => {
                        signOut();
                        setDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            )}
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
