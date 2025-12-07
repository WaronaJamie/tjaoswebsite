// components/header.tsx
'use client';

import { Button } from "@/components/ui/button";
import { DiscoveryCallModal } from "@/components/discovery-call-modal";
import { useState } from "react";
import Link from "next/link";
import { X, Instagram, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";
import { imagePaths } from "@/utils/image";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 sm:py-4">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          
           {/* Logo - Responsive switching */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            {/* Logo with text - visible on small/medium screens */}
            <div className="lg:hidden">
              <div className="relative w-32 h-8">
                <Image 
                  src={imagePaths.logo.withText}
                  alt="TJAO Architects"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 128px, 0px"
                  priority
                />
              </div>
            </div>
            
            {/* Logo without text - visible on large screens */}
            <div className="hidden lg:block">
              <div className="relative w-12 h-12">
                <Image 
                  src={imagePaths.logo.withoutText}
                  alt="TJAO Architects"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 48px, 0px"
                  priority
                />
              </div>
            </div>
          </Link>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Menu Button */}
            <Button 
              variant="ghost" 
              onClick={() => setIsNavOpen(true)}
              className="text-slate-900 hover:bg-slate-100 font-light text-sm sm:text-base px-3 sm:px-4 py-2 h-auto"
            >
              Menu
            </Button>
            
            {/* CTA Button - Changed to black */}
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-black text-white hover:bg-slate-800 font-light text-sm sm:text-base px-3 sm:px-4 py-2 h-auto whitespace-nowrap"
            >
              Book a Discovery Call
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Modal - White Background with Black Text */}
      {isNavOpen && (
        <div className="fixed inset-0 z-100 bg-white flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side - Navigation Links */}
              <div className="space-y-4 md:space-y-6">
                <Link 
                  href="/about" 
                  className="block text-4xl md:text-5xl lg:text-6xl font-bold text-black hover:text-slate-600 transition-colors py-2"
                  onClick={() => setIsNavOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/services" 
                  className="block text-4xl md:text-5xl lg:text-6xl font-bold text-black hover:text-slate-600 transition-colors py-2"
                  onClick={() => setIsNavOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  href="/projects" 
                  className="block text-4xl md:text-5xl lg:text-6xl font-bold text-black hover:text-slate-600 transition-colors py-2"
                  onClick={() => setIsNavOpen(false)}
                >
                  Projects
                </Link>
                <Link 
                  href="/contact" 
                  className="block text-4xl md:text-5xl lg:text-6xl font-bold text-black hover:text-slate-600 transition-colors py-2"
                  onClick={() => setIsNavOpen(false)}
                >
                  Contact
                </Link>
              </div>

              {/* Right Side - Image and Social */}
              <div className="flex flex-col items-center lg:items-end space-y-8">
                {/* Updated Image with hero-card-image */}
                <div className="w-full max-w-md h-64 md:h-80 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                  <Image 
                    src="/images/hero/hero-card-image.webp"
                    alt="Architectural project showcase"
                    width={400}
                    height={320}
                    className="w-full h-full object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                  />
                </div>
                <div className="flex space-x-6">
                  <Instagram className="w-6 h-6 cursor-pointer text-black hover:text-slate-600 transition-colors" />
                  <Facebook className="w-6 h-6 cursor-pointer text-black hover:text-slate-600 transition-colors" />
                  <Linkedin className="w-6 h-6 cursor-pointer text-black hover:text-slate-600 transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Close Button - Top Right */}
          <button 
            onClick={() => setIsNavOpen(false)}
            className="absolute top-6 right-6 p-3 hover:bg-slate-100 rounded-full transition-colors text-black"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      <DiscoveryCallModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}