'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-4 bg-transparent z-50">
      {/* Logo Renault */}
      <div className="flex-shrink-0"><a href="./">
        <Image
          src="/assets/logo.svg"
          alt="Renault"
          width={0}
          height={0}
          className="h-[60px] w-auto"
          priority
        /></a>
      </div>

      {/* Logo da campanha */}
      <div className="flex-shrink-0">
        <a href="./">
        <Image
          src="/assets/invejaboa.svg"
          alt="Inveja Boa"
          width={0}
          height={0}
          className="h-[40px] w-auto"
          priority
        /></a>
      </div>

      {/* Botão hambúrguer */}
      <button
        className="flex flex-col justify-center items-center space-y-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menu"
      >
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
      </button>
    </header>
  );
}