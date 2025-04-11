// src/components/DotCursor.js - With enhanced hover detection
import { useState, useEffect, useRef, useCallback } from 'react';

const NeonPulseCursor = () => {
  const cursorRef = useRef(null);
  const pulseRef = useRef(null);
  const outerRingRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef([]);
  const isHoveringRef = useRef(false);
  const isLinkRef = useRef(false);
  const visibleRef = useRef(false);
  const requestRef = useRef(null);
  const trailCanvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Animation loop for smooth motion
  const animate = useCallback(() => {
    if (!visibleRef.current) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }
    
    const { x, y } = positionRef.current;
    
    // Update main cursor
    if (cursorRef.current) {
      const scale = isHoveringRef.current ? 1.5 : 1;
      cursorRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;
      
      // Changing color based on link hover
      const baseColor = isLinkRef.current ? '#FF008C' : '#d900ff';
      cursorRef.current.style.backgroundColor = baseColor;
      cursorRef.current.style.boxShadow = `0 0 15px ${baseColor}, 0 0 5px ${baseColor}`;
    }
    
    // Update pulse effect
    if (pulseRef.current) {
      pulseRef.current.style.left = `${x}px`;
      pulseRef.current.style.top = `${y}px`;
      
      // Changing color based on link hover
      const pulseColor = isLinkRef.current ? '#FF008C' : '#d900ff';
      pulseRef.current.style.borderColor = pulseColor;
      pulseRef.current.style.boxShadow = `0 0 10px ${pulseColor}`;
    }
    
    // Update outer ring
    if (outerRingRef.current) {
      outerRingRef.current.style.left = `${x}px`;
      outerRingRef.current.style.top = `${y}px`;
      
      // Changing color based on link hover
      const ringColor = isLinkRef.current ? '#FF008C' : '#d900ff';
      outerRingRef.current.style.borderColor = ringColor;
    }
    
    // Update trail on canvas
    updateTrail(x, y);
    
    requestRef.current = requestAnimationFrame(animate);
  }, []);
  
  // Update the neon trail effect
  const updateTrail = (x, y) => {
    const canvas = trailCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Add new point to trail
    trailRef.current.push({ x, y, opacity: 1 });
    
    // Limit trail length
    if (trailRef.current.length > 30) {
      trailRef.current.shift();
    }
    
    // Fade existing points
    trailRef.current.forEach(point => {
      point.opacity -= 0.03;
      if (point.opacity < 0) point.opacity = 0;
    });
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw trail
    if (trailRef.current.length >= 2) {
      // Draw connecting lines
      for (let i = 0; i < trailRef.current.length - 1; i++) {
        const point = trailRef.current[i];
        const nextPoint = trailRef.current[i + 1];
        
        if (point.opacity <= 0) continue;
        
        // Create gradient for each line segment
        const gradient = ctx.createLinearGradient(point.x, point.y, nextPoint.x, nextPoint.y);
        
        const baseColor = isLinkRef.current ? 'rgba(255, 0, 140,' : 'rgba(217, 0, 255,';
        gradient.addColorStop(0, `${baseColor}${point.opacity * 0.5})`);
        gradient.addColorStop(1, `${baseColor}${nextPoint.opacity * 0.5})`);
        
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(nextPoint.x, nextPoint.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 + (point.opacity * 3); // Line gets thinner as it fades
        ctx.lineCap = 'round';
        ctx.stroke();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = isLinkRef.current ? '#FF008C' : '#d900ff';
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      
      // Add pulsing particles along the trail
      if (Math.random() > 0.7) {
        const randomIndex = Math.floor(Math.random() * (trailRef.current.length - 1));
        const point = trailRef.current[randomIndex];
        
        if (point.opacity > 0.2) {
          // Create particle effect
          const particle = document.createElement('div');
          particle.className = 'neon-particle';
          particle.style.position = 'fixed';
          particle.style.left = `${point.x}px`;
          particle.style.top = `${point.y}px`;
          particle.style.width = `${Math.random() * 3 + 2}px`;
          particle.style.height = `${Math.random() * 3 + 2}px`;
          particle.style.backgroundColor = isLinkRef.current ? '#FF008C' : '#d900ff';
          particle.style.boxShadow = `0 0 5px ${isLinkRef.current ? '#FF008C' : '#d900ff'}`;
          particle.style.borderRadius = '50%';
          particle.style.opacity = Math.random() * 0.5 + 0.3;
          particle.style.transform = 'translate(-50%, -50%)';
          particle.style.pointerEvents = 'none';
          particle.style.zIndex = '9996';
          particle.style.animation = `neonParticle ${Math.random() * 0.5 + 0.5}s ease-out forwards`;
          
          document.body.appendChild(particle);
          
          // Remove after animation
          setTimeout(() => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }, 1000);
        }
      }
    }
  };
  
  // Check if the mouse is over an element that should trigger hover effects
  const checkElementHover = useCallback((x, y) => {
    // Get element at current cursor position
    const element = document.elementFromPoint(x, y);
    if (!element) return false;
    
    // Check if it's a hoverable element or within one
    const isHoverable = (el) => {
      if (!el) return false;
      
      // Check direct class matches
      if (el.classList.contains('interactive-card') || 
          el.classList.contains('certificate-container') ||
          el.classList.contains('bg-white') ||
          el.classList.contains('dark:bg-gray-800') ||
          el.classList.contains('cursor-pointer') ||
          el.classList.contains('rounded-lg')) {
        return true;
      }
      
      // Check tag matches
      if (el.tagName === 'BUTTON' || 
          el.tagName === 'A' || 
          el.tagName === 'INPUT' ||
          el.getAttribute('role') === 'button') {
        return true;
      }
      
      // Check if it's within a card (check parents up to 5 levels)
      let parent = el.parentElement;
      let depth = 0;
      while (parent && depth < 5) {
        if (parent.classList.contains('bg-white') || 
            parent.classList.contains('dark:bg-gray-800') ||
            parent.classList.contains('shadow-lg') ||
            parent.classList.contains('rounded-lg') ||
            parent.classList.contains('interactive-card') ||
            parent.classList.contains('certificate-container')) {
          return true;
        }
        parent = parent.parentElement;
        depth++;
      }
      
      return false;
    };
    
    // Check if it's a link
    const isLink = (el) => {
      if (!el) return false;
      
      // Check direct tag
      if (el.tagName === 'A') return true;
      
      // Check parent (might be a link with nested elements)
      let parent = el.parentElement;
      let depth = 0;
      while (parent && depth < 3) {
        if (parent.tagName === 'A') return true;
        parent = parent.parentElement;
        depth++;
      }
      
      return false;
    };
    
    // Set hover states
    isHoveringRef.current = isHoverable(element);
    isLinkRef.current = isLink(element);
    
    return isHoveringRef.current;
  }, []);
  
  const handleMouseMove = useCallback((e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    positionRef.current = { x, y };
    
    // Check for hoverable elements directly
    checkElementHover(x, y);
    
    if (!visibleRef.current) {
      visibleRef.current = true;
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
      if (pulseRef.current) pulseRef.current.style.opacity = '1';
      if (outerRingRef.current) outerRingRef.current.style.opacity = '0.6';
      if (trailCanvasRef.current) trailCanvasRef.current.style.opacity = '1';
    }
  }, [checkElementHover]);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(hover: none)').matches ||
        window.innerWidth <= 768
      );
      setIsMobile(isTouchDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    if (isMobile) return;
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Create canvas for trail
    const canvas = document.createElement('canvas');
    canvas.className = 'fixed inset-0 pointer-events-none z-40';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.opacity = '0';
    canvas.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(canvas);
    trailCanvasRef.current = canvas;
    
    // Handle resize for canvas
    const handleResize = () => {
      if (trailCanvasRef.current) {
        trailCanvasRef.current.width = window.innerWidth;
        trailCanvasRef.current.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Create main cursor
    const cursor = document.createElement('div');
    cursor.className = 'fixed pointer-events-none z-50 mix-blend-screen';
    cursor.style.width = '14px';
    cursor.style.height = '14px';
    cursor.style.backgroundColor = '#d900ff';
    cursor.style.boxShadow = '0 0 15px #d900ff, 0 0 5px #d900ff';
    cursor.style.borderRadius = '50%';
    cursor.style.opacity = '0';
    cursor.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(cursor);
    cursorRef.current = cursor;
    
    // Create pulse effect
    const pulse = document.createElement('div');
    pulse.className = 'fixed pointer-events-none z-49';
    pulse.style.width = '40px';
    pulse.style.height = '40px';
    pulse.style.border = '2px solid #d900ff';
    pulse.style.borderRadius = '50%';
    pulse.style.opacity = '0';
    pulse.style.transform = 'translate(-50%, -50%)';
    pulse.style.animation = 'neonPulse 1.5s ease-in-out infinite';
    pulse.style.boxShadow = '0 0 10px #d900ff';
    document.body.appendChild(pulse);
    pulseRef.current = pulse;
    
    // Create outer ring
    const outerRing = document.createElement('div');
    outerRing.className = 'fixed pointer-events-none z-48';
    outerRing.style.width = '70px';
    outerRing.style.height = '70px';
    outerRing.style.border = '1px solid #d900ff';
    outerRing.style.borderRadius = '50%';
    outerRing.style.opacity = '0';
    outerRing.style.transform = 'translate(-50%, -50%)';
    outerRing.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(outerRing);
    outerRingRef.current = outerRing;
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', () => {
      visibleRef.current = false;
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
      if (pulseRef.current) pulseRef.current.style.opacity = '0';
      if (outerRingRef.current) outerRingRef.current.style.opacity = '0';
      if (trailCanvasRef.current) trailCanvasRef.current.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      visibleRef.current = true;
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
      if (pulseRef.current) pulseRef.current.style.opacity = '1';
      if (outerRingRef.current) outerRingRef.current.style.opacity = '0.6';
      if (trailCanvasRef.current) trailCanvasRef.current.style.opacity = '1';
    });
    
    // Click feedback effect
    document.addEventListener('mousedown', () => {
      if (pulseRef.current) {
        pulseRef.current.style.animation = 'neonPulseClick 0.5s ease-out forwards';
        setTimeout(() => {
          if (pulseRef.current && visibleRef.current) {
            pulseRef.current.style.animation = 'neonPulse 1.5s ease-in-out infinite';
          }
        }, 500);
      }
    });
    
    // Add keyframes for animations
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
      
      @media (hover: none) {
        * {
          cursor: auto !important;
        }
      }
      
      @keyframes neonPulse {
        0% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.8; }
        50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.4; }
        100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.8; }
      }
      
      @keyframes neonPulseClick {
        0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.8; width: 40px; height: 40px; }
        100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; width: 60px; height: 60px; }
      }
      
      @keyframes neonParticle {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
        100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    // Start animation loop
    requestRef.current = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      document.body.style.cursor = '';
      
      window.removeEventListener('resize', handleResize);
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', () => {
        visibleRef.current = false;
      });
      document.removeEventListener('mouseenter', () => {
        visibleRef.current = true;
      });
      document.removeEventListener('mousedown', () => {});
      
      // Remove cursor elements
      [cursorRef.current, pulseRef.current, outerRingRef.current, trailCanvasRef.current].forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      
      // Remove particles
      document.querySelectorAll('.neon-particle').forEach(el => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      
      // Remove the style element
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [handleMouseMove, animate, isMobile]);
  
  // Don't render anything for mobile
  if (isMobile) return null;
  
  // The actual elements are created via JavaScript in the useEffect
  return null;
};

export default NeonPulseCursor;