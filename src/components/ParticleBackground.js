// src/components/ParticleBackground.js - With higher quality performance mode
import React, { useEffect, useRef, useState } from 'react';

const NetworkBackground = ({ 
  nodeCount = 60,
  colorScheme = 'default',
  maxConnections = 5,
  interactive = true,
  speed = 1.5,
  performanceMode = false // Performance mode flag with higher quality settings
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      // Simple width-based detection that's reliable across devices
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initial check
    checkMobile();

    // Listen for resize with slight performance optimization
    const handleResize = performanceMode 
      ? () => {
          // Slightly debounced resize for performance mode
          if (!window.resizeTimeout) {
            window.resizeTimeout = setTimeout(() => {
              window.resizeTimeout = null;
              checkMobile();
            }, 100); // Reduced from 200ms to 100ms for more responsive resizing
          }
        }
      : checkMobile; // Original behavior for regular mode
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.resizeTimeout) {
        clearTimeout(window.resizeTimeout);
      }
    };
  }, [performanceMode]);

  useEffect(() => {
    // Skip if no canvas element is available
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get context
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const width = dimensions.width;
      const height = dimensions.height;
      
      // Set display size (css pixels)
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      
      // Set actual size in memory (scaled for retina/high-DPI displays)
      const dpr = window.devicePixelRatio || 1;
      
      // In performance mode, use slightly lower resolution (but higher than before)
      const scaleFactor = performanceMode ? (isMobile ? 0.9 : 0.95) : 1.0;
      canvas.width = width * dpr * scaleFactor;
      canvas.height = height * dpr * scaleFactor;
      
      // Normalize coordinate system to use css pixels
      ctx.scale(dpr * scaleFactor, dpr * scaleFactor);
    };
    
    setCanvasSize();

    // Color schemes - same as original
    const colorSchemes = {
      default: {
        background: '#0f172a', // dark blue
        nodeColor: '#6366f1', // indigo
        nodeGlow: '#818cf8', // lighter indigo
        lineColor: '#3b82f6', // blue
        accentColor: '#8b5cf6', // violet
        mouseGlow: '#d946ef' // fuchsia
      },
      cyberpunk: {
        background: '#09090b', // black
        nodeColor: '#facc15', // yellow
        nodeGlow: '#fbbf24', // amber
        lineColor: '#10b981', // emerald
        accentColor: '#ec4899', // pink
        mouseGlow: '#f43f5e' // rose
      },
      aurora: {
        background: '#042f2e', // dark teal
        nodeColor: '#2dd4bf', // teal
        nodeGlow: '#5eead4', // lighter teal
        lineColor: '#22d3ee', // cyan
        accentColor: '#34d399', // emerald
        mouseGlow: '#4ade80' // green
      },
      midnight: {
        background: '#020617', // very dark blue
        nodeColor: '#7c3aed', // violet
        nodeGlow: '#8b5cf6', // lighter violet
        lineColor: '#6366f1', // indigo
        accentColor: '#4f46e5', // darker indigo
        mouseGlow: '#c084fc' // purple
      }
    };
    
    const colors = colorSchemes[colorScheme] || colorSchemes.default;
    
    // Variables for animation
    let nodes = [];
    let mousePos = { x: null, y: null };
    let lastTime = 0;
    
    // Calculate adjusted node count - with very minimal reduction in performance mode
    const getAdjustedNodeCount = () => {
      // Base on actual screen area
      const area = dimensions.width * dimensions.height;
      
      if (isMobile) {
        // Mobile optimization with minimal reduction
        return Math.max(40, Math.floor(nodeCount * (performanceMode ? 0.7 : 0.75)));
      } else if (area < 500000) { // Small screens
        return Math.max(35, Math.floor(nodeCount * (performanceMode ? 0.68 : 0.7)));
      } else if (area < 800000) { // Medium screens
        return Math.max(45, Math.floor(nodeCount * (performanceMode ? 0.82 : 0.85)));
      } else {
        // Large screens - very slight reduction in performance mode
        return performanceMode ? Math.floor(nodeCount * 0.95) : nodeCount;
      }
    };

    // Calculate max connections per node - same as original, minimal reduction in performance mode
    const connectionsPerNode = isMobile 
      ? 4 
      : (performanceMode ? maxConnections : maxConnections);
    
    // Node class - nearly identical to original
    class Node {
      constructor() {
        this.radius = Math.random() * 1.8 + (isMobile ? 0.7 : 0.8);
        this.x = Math.random() * dimensions.width;
        this.y = Math.random() * dimensions.height;
        
        // Adjust speed based on screen size - keeping original speed
        const speedMultiplier = speed * (isMobile ? 0.7 : 1);
        this.vx = (Math.random() - 0.5) * 0.6 * speedMultiplier;
        this.vy = (Math.random() - 0.5) * 0.6 * speedMultiplier;
        
        this.maxConnections = connectionsPerNode;
        this.connections = 0;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.03 + 0.02;
        this.pulseMagnitude = Math.random() * 0.5 + 0.5;
        
        // Random color - original values
        this.color = Math.random() > 0.75 ? colors.accentColor : colors.nodeColor;
        this.glow = Math.random() > 0.75 ? colors.mouseGlow : colors.nodeGlow;
      }
      
      update(deltaTime) {
        // Pulse effect - original behavior
        this.pulsePhase += this.pulseSpeed * deltaTime;
        const pulse = Math.sin(this.pulsePhase) * this.pulseMagnitude + 1;
        
        // Move - same speed as original
        this.x += this.vx * deltaTime * 60;
        this.y += this.vy * deltaTime * 60;
        
        // Bounce off edges - original behavior
        if (this.x < 0 || this.x > dimensions.width) {
          this.vx *= -1;
          // Add slight randomness - original behavior
          this.vx += (Math.random() - 0.5) * 0.1;
        }
        if (this.y < 0 || this.y > dimensions.height) {
          this.vy *= -1;
          this.vy += (Math.random() - 0.5) * 0.1;
        }
        
        // Draw
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add glow - almost identical to original with minimal reduction in performance mode
        ctx.shadowBlur = isMobile 
          ? (performanceMode ? 2.5 : 3) 
          : (performanceMode ? 9 : 10);
        ctx.shadowColor = this.glow;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Reset connections
        this.connections = 0;
      }
      
      distanceTo(node) {
        const dx = this.x - node.x;
        const dy = this.y - node.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
    }
    
    // Initialize nodes
    const initNodes = () => {
      nodes = [];
      const nodeTotal = getAdjustedNodeCount();
      for (let i = 0; i < nodeTotal; i++) {
        nodes.push(new Node());
      }
    };
    
    // Initialize
    initNodes();
    
    // Mouse/touch events - optimized event handler
    const handlePointerMove = (e) => {
      if (!interactive) return;
      
      const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : null);
      const y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : null);
      
      if (x !== null && y !== null) {
        const rect = canvas.getBoundingClientRect();
        mousePos = {
          x: x - rect.left,
          y: y - rect.top
        };
      }
    };
    
    const handlePointerLeave = () => {
      mousePos = { x: null, y: null };
    };
    
    // Event listeners - slight optimization with passive flag in performance mode
    const eventOptions = performanceMode ? { passive: true } : undefined;
    canvas.addEventListener('mousemove', handlePointerMove, eventOptions);
    canvas.addEventListener('touchmove', handlePointerMove, eventOptions);
    canvas.addEventListener('mouseleave', handlePointerLeave);
    canvas.addEventListener('touchend', handlePointerLeave);
    
    // Animation loop - nearly identical to original
    const animate = (timestamp) => {
      // Calculate delta time
      if (!lastTime) lastTime = timestamp;
      const deltaTime = Math.min(0.1, (timestamp - lastTime) / 1000); // Cap at 0.1s
      lastTime = timestamp;
      
      // Clear canvas
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      
      // Mouse effect - nearly identical to original
      if (mousePos.x !== null && mousePos.y !== null) {
        const gradient = ctx.createRadialGradient(
          mousePos.x, mousePos.y, 0,
          mousePos.x, mousePos.y, 120
        );
        gradient.addColorStop(0, `${colors.mouseGlow}30`);
        gradient.addColorStop(1, `${colors.mouseGlow}00`);
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(mousePos.x, mousePos.y, 120, 0, Math.PI * 2);
        ctx.fill();
        
        // Update node velocities - minimal optimization in performance mode
        nodes.forEach(node => {
          const dx = mousePos.x - node.x;
          const dy = mousePos.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const force = (120 - distance) / 10000 * speed;
            node.vx += dx * force * deltaTime * 60;
            node.vy += dy * force * deltaTime * 60;
            
            // Limit speed - original values
            const nodeSpeed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
            const maxSpeed = isMobile ? 1.8 : 2.5;
            if (nodeSpeed > maxSpeed) {
              node.vx = (node.vx / nodeSpeed) * maxSpeed;
              node.vy = (node.vy / nodeSpeed) * maxSpeed;
            }
          }
        });
      }
      
      // Update and draw nodes
      nodes.forEach(node => node.update(deltaTime));
      
      // Draw connections
      // Determine max connection distance - original values
      const maxDistance = isMobile 
        ? Math.min(dimensions.width * 0.2, 160) 
        : Math.min(150, dimensions.width * 0.15);
      
      // Improved line rendering
      ctx.lineCap = 'round';
      
      // Only using minimal connection optimization in performance mode for very large node counts
      const connectionSkip = performanceMode && nodes.length > 100 ? 2 : 1;
      
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        if (nodeA.connections >= connectionsPerNode) continue;
        
        for (let j = i + 1; j < nodes.length; j += connectionSkip) {
          const nodeB = nodes[j];
          if (nodeB.connections >= connectionsPerNode) continue;
          
          const distance = nodeA.distanceTo(nodeB);
          if (distance < maxDistance) {
            // Draw line with opacity based on distance - original calculation
            const opacity = (1 - (distance / maxDistance)).toFixed(2);
            
            // Line width - original values
            let lineWidth = Math.max(0.7, 1.5 * (1 - distance / maxDistance));
            if (isMobile) lineWidth = Math.max(0.85, lineWidth);
            
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            
            // Convert opacity to hex - original calculation
            const opacityHex = Math.floor(parseFloat(opacity) * 255).toString(16).padStart(2, '0');
            ctx.strokeStyle = `${colors.lineColor}${opacityHex}`;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            
            // Add glow to lines - minimally reduced in performance mode
            ctx.shadowBlur = isMobile 
              ? performanceMode ? 1.8 : 2 
              : performanceMode ? 2.5 : 3;
            ctx.shadowColor = colors.lineColor;
            ctx.stroke();
            ctx.shadowBlur = 0;
            
            // Count connections
            nodeA.connections++;
            nodeB.connections++;
          }
        }
      }
      
      // Request next frame
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('touchmove', handlePointerMove);
      canvas.removeEventListener('mouseleave', handlePointerLeave);
      canvas.removeEventListener('touchend', handlePointerLeave);
    };
  }, [dimensions, isMobile, nodeCount, colorScheme, maxConnections, interactive, speed, performanceMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ display: 'block' }}
    />
  );
};

export default NetworkBackground;