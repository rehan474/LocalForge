'use client';

import React, { useEffect } from 'react';

export default function DynamicFavicon({ isProcessing = false }: { isProcessing?: boolean }) {
  useEffect(() => {
    // Generate an animated or colored SVG favicon dynamically in browser memory
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = (pulse: boolean) => {
      ctx.clearRect(0, 0, 64, 64);
      
      // Rounded background box
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.roundRect(4, 4, 56, 56, 14);
      ctx.fill();

      // Glowing border accent
      ctx.strokeStyle = pulse ? '#6366f1' : '#4f46e5';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Inner forge hammer / lightning icon shape
      ctx.fillStyle = pulse ? '#34d399' : '#818cf8';
      ctx.beginPath();
      ctx.moveTo(22, 16);
      ctx.lineTo(42, 32);
      ctx.lineTo(22, 48);
      ctx.closePath();
      ctx.fill();

      let link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = canvas.toDataURL('image/x-icon');
      document.getElementsByTagName('head')[0].appendChild(link);
    };

    draw(isProcessing);

    if (isProcessing) {
      let active = true;
      let state = false;
      const interval = setInterval(() => {
        if (!active) return;
        state = !state;
        draw(state);
      }, 500);
      return () => {
        active = false;
        clearInterval(interval);
      };
    }
  }, [isProcessing]);

  return null;
}
