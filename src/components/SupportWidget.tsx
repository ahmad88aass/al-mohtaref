import React, { useState } from 'react';
import { Headphones, X } from 'lucide-react';

export const SupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 left-4 sm:left-6 z-50 flex flex-col items-center">
      {/* القائمة المنبثقة للأيقونات */}
      <div
        className={
          'flex flex-col-reverse items-center gap-3 mb-3 transition-all duration-300 ' +
          (isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-75 translate-y-6 pointer-events-none')
        }
      >
        {/* 1. واتساب */}
        <a
          href="https://wa.me/963984335910"
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp"
          className="w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95 bg-[#25D366] hover:bg-[#20ba59] shadow-md shadow-emerald-500/25"
        >
          <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.36 7.34 9.09 7.41 8.86 7.65C8.63 7.9 7.99 8.5 7.99 9.72C7.99 10.94 8.88 12.12 9 12.28C9.13 12.45 10.77 14.97 13.27 16.05C13.86 16.31 14.33 16.46 14.69 16.58C15.29 16.77 15.83 16.74 16.26 16.68C16.74 16.61 17.74 16.08 17.95 15.49C18.16 14.9 18.16 14.39 18.1 14.29C18.03 14.19 17.86 14.12 17.61 14C17.36 13.88 16.12 13.27 15.89 13.18C15.66 13.1 15.5 13.06 15.33 13.31C15.17 13.56 14.69 14.12 14.54 14.29C14.39 14.46 14.24 14.48 13.99 14.36C13.74 14.24 12.94 13.97 11.99 13.13C11.25 12.47 10.74 11.66 10.6 11.41C10.45 11.16 10.58 11.03 10.71 10.9C10.82 10.79 10.96 10.61 11.08 10.46C11.21 10.31 11.25 10.21 11.33 10.04C11.41 9.87 11.37 9.73 11.31 9.61C11.25 9.48 10.77 8.31 10.57 7.82C10.37 7.35 10.17 7.41 10.02 7.41C9.88 7.4 9.71 7.34 9.53 7.34Z" />
          </svg>
        </a>

        {/* 2. تيليجرام */}
        <a
          href="https://t.me/ahmad88_a"
          target="_blank"
          rel="noopener noreferrer"
          title="Telegram"
          className="w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95 bg-[#229ED9] hover:bg-[#1e8ec3] shadow-md shadow-sky-500/25 text-white"
        >
          <svg className="w-5 h-5 fill-current -translate-x-0.5" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
          </svg>
        </a>

        {/* 3. انستغرام */}
        <a
          href="https://instagram.com/a.u._7"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
          className="w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 shadow-md shadow-pink-500/25 text-white">
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </a>

        {/* 4. تويتر / X */}
        <a
          href="https://x.com/abo123hmed"
          target="_blank"
          rel="noopener noreferrer"
          title="X (Twitter)"
          className="w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95 bg-black hover:bg-neutral-800 border border-neutral-700 shadow-md text-white"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>

      {/* الزر الرئيسي للدعم الفني */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 p-3.5 shadow-lg shadow-amber-500/30 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="الدعم الفني"
      >
        {isOpen ? (
          <X className="w-6 h-6 stroke-[2.5]" />
        ) : (
          <Headphones className="w-6 h-6 stroke-[2.5]" />
        )}
      </button>
    </div>
  );
};
