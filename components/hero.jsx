"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Finance-related images from Unsplash
  const financeImages = [
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1280&h=720&fit=crop", // Finance workspace
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1280&h=720&fit=crop", // Charts and graphs
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1280&h=720&fit=crop", // Financial data
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&h=720&fit=crop", // Analytics dashboard
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&h=720&fit=crop", // Business charts
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1280&h=720&fit=crop", // Currency notes
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1280&h=720&fit=crop", // Math and finance
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1280&h=720&fit=crop", // Laptop with charts
    "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1280&h=720&fit=crop", // Crypto finance
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1280&h=720&fit=crop", // Stock market
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1280&h=720&fit=crop&sat=-100", // Monochrome data
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1280&h=720&fit=crop", // Office workspace
    "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1280&h=720&fit=crop", // Investment concept
    "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?w=1280&h=720&fit=crop", // Budget planning
    "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=1280&h=720&fit=crop", // Calculator finance
    "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=1280&h=720&fit=crop", // Digital banking
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1280&h=720&fit=crop", // Savings concept
    "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1280&h=720&fit=crop", // Goal setting
    "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=1280&h=720&fit=crop", // Business notebook
    "https://images.unsplash.com/photo-1559526324-593bc073d938?w=1280&h=720&fit=crop", // Finance meeting
    "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=1280&h=720&fit=crop", // Finance app
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1280&h=720&fit=crop&sat=-50", // Bills variant
    "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1280&h=720&fit=crop", // Fintech
    "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=1280&h=720&fit=crop", // Money growth
    "https://images.unsplash.com/photo-1616077167555-51f6bc516dfa?w=1280&h=720&fit=crop", // Investment growth
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === financeImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [financeImages.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0 w-full h-full">
        {financeImages.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentImageIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={src}
              fill
              alt={`Finance background ${index + 1}`}
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 text-center relative z-10 py-20">
        <div className="p-8 md:p-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[105px] pb-6 font-extrabold tracking-tighter text-white [text-shadow:_0_4px_12px_rgb(0_0_0_/_80%),_0_2px_4px_rgb(0_0_0_/_100%)]">
            Manage Your Finances <br /> with Intelligence
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white mb-10 max-w-3xl mx-auto [text-shadow:_0_2px_8px_rgb(0_0_0_/_80%)] leading-relaxed">
            An AI-powered financial management platform that helps you track,
            analyze, and optimize your spending with real-time insights.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="px-10 py-6 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 border-0"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {financeImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-white w-8 h-2"
                : "bg-white/50 hover:bg-white/75 w-2 h-2"
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() =>
          setCurrentImageIndex((prev) =>
            prev === 0 ? financeImages.length - 1 : prev - 1
          )
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 group"
        aria-label="Previous image"
      >
        <svg
          className="w-6 h-6 group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={() =>
          setCurrentImageIndex((prev) =>
            prev === financeImages.length - 1 ? 0 : prev + 1
          )
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 group"
        aria-label="Next image"
      >
        <svg
          className="w-6 h-6 group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </section>
  );
};

export default HeroSection;
