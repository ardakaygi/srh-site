import { WhatsAppButton } from "@/components/WhatsAppButton";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5.06-1.33A10 10 0 1012 2zm0 18a8 8 0 01-4.08-1.12l-.29-.17-3.02.79.8-2.94-.19-.3A8 8 0 1112 20zm4.4-5.9c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}

/**
 * Floating WhatsApp bubble, bottom-right - desktop/tablet only. Mobile
 * already has an equivalent WhatsApp action in StickyMobileBar's bottom
 * bar, so this would double up (and visually collide) below md.
 */
export function WhatsAppFloatingButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      <WhatsAppButton
        message="Merhaba, robot süpürgem için servis talebinde bulunmak istiyorum."
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
      >
        <span className="sr-only">WhatsApp ile iletişime geç</span>
        <WhatsAppIcon />
      </WhatsAppButton>
    </div>
  );
}
