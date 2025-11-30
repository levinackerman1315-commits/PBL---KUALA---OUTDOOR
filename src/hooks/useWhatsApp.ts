export const useWhatsApp = () => {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '6281234567890';

  const sendBookingConfirmation = (bookingCode: string, customerName?: string) => {
    const message = `Halo Kuala Outdoor,\n\nSaya ${customerName || 'customer'} sudah membuat booking dengan kode: *${bookingCode}*\n\nMohon konfirmasi ketersediaan dan detail pembayaran.\n\nTerima kasih!`;
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const sendTripInquiry = (tripTitle: string, tripDate?: string) => {
    const message = `Halo Kuala Outdoor,\n\nSaya tertarik dengan trip: *${tripTitle}*${tripDate ? `\nTanggal: ${tripDate}` : ''}\n\nMohon info lebih lanjut tentang trip ini.\n\nTerima kasih!`;
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const sendInquiry = (message: string) => {
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  return { 
    sendBookingConfirmation,
    sendTripInquiry,
    sendInquiry,
    phoneNumber 
  };
};