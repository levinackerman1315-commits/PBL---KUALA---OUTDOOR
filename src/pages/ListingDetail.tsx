import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Calendar, Mail, User } from "lucide-react";
import { format } from "date-fns";

interface ListingDetail {
  id: string;
  title: string;
  description: string;
  price: number | null;
  category: string;
  condition: string;
  image_url: string | null;
  location: string | null;
  created_at: string;
  user_id: string;
  profiles: {
    full_name: string | null;
    location: string | null;
  };
}

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchListing();
    }
  }, [id]);

  const fetchListing = async () => {
    try {
      const { data, error } = await supabase
        .from("listings")
        .select(`
          *,
          profiles (
            full_name,
            location
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      setListing(data);
    } catch (error: any) {
      toast({
        title: "Error loading listing",
        description: error.message,
        variant: "destructive",
      });
      navigate("/browse");
    } finally {
      setLoading(false);
    }
  };

  const handleContactSeller = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to contact sellers",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    toast({
      title: "Contact feature",
      description: "Direct messaging will be implemented in a future update!",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return null;
  }

  const isOwner = user?.id === listing.user_id;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Button variant="ghost" onClick={() => navigate("/browse")} className="mb-4">
          ← Back to Browse
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div>
            {listing.image_url ? (
              <img
                src={listing.image_url}
                alt={listing.title}
                className="w-full aspect-square object-cover rounded-lg"
              />
            ) : (
              <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">No image</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold">{listing.title}</h1>
                {listing.price && (
                  <Badge className="text-xl px-4 py-2">${listing.price}</Badge>
                )}
              </div>
              
              <div className="flex gap-2 mb-4">
                <Badge variant="secondary">{listing.category}</Badge>
                <Badge variant="outline">{listing.condition}</Badge>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {listing.description}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Seller: {listing.profiles.full_name || "Anonymous"}</span>
                </div>
                
                {listing.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{listing.location}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Listed {format(new Date(listing.created_at), "MMM d, yyyy")}</span>
                </div>
              </CardContent>
            </Card>

            {!isOwner && (
              <Button
                onClick={handleContactSeller}
                className="w-full"
                size="lg"
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Seller
              </Button>
            )}

            {isOwner && (
              <Button
                variant="outline"
                onClick={() => navigate("/my-listings")}
                className="w-full"
              >
                View My Listings
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
