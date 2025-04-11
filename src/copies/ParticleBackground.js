import React, { useEffect, useRef, useState } from 'react';

const NetworkBackground = ({ 
  nodeCount = 60,
  colorScheme = 'default',
  maxConnections = 5,
  interactive = true,
  speed = 1.5
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

    // Listen for resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      // Increased DPI for mobile to improve line quality
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      // Normalize coordinate system to use css pixels
      ctx.scale(dpr, dpr);
    };
    
    setCanvasSize();

    // Color schemes
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
    
    // Calculate adjusted node count - improved for mobile
    const getAdjustedNodeCount = () => {
      // Base on actual screen area
      const area = dimensions.width * dimensions.height;
      
      if (isMobile) {
        // Increased node density for mobile
        return Math.max(40, Math.floor(nodeCount * 0.75));
      } else if (area < 500000) { // Small screens
        return Math.max(35, Math.floor(nodeCount * 0.7));
      } else if (area < 800000) { // Medium screens
        return Math.max(45, Math.floor(nodeCount * 0.85));
      } else {
        return nodeCount; // Large screens get the full count
      }
    };

    // Calculate max connections per node
    const connectionsPerNode = isMobile ? 4 : maxConnections;
    
    // Node class
    class Node {
      constructor() {
        this.radius = Math.random() * 1.8 + (isMobile ? 0.7 : 0.8); // Slightly smaller on mobile for increased density
        this.x = Math.random() * dimensions.width;
        this.y = Math.random() * dimensions.height;
        
        // Adjust speed based on screen size
        const speedMultiplier = speed * (isMobile ? 0.7 : 1);
        this.vx = (Math.random() - 0.5) * 0.6 * speedMultiplier;
        this.vy = (Math.random() - 0.5) * 0.6 * speedMultiplier;
        
        // Use the connectionsPerNode variable
        this.maxConnections = connectionsPerNode;
        this.connections = 0;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.03 + 0.02;
        this.pulseMagnitude = Math.random() * 0.5 + 0.5;
        
        // Random color
        this.color = Math.random() > 0.75 ? colors.accentColor : colors.nodeColor;
        this.glow = Math.random() > 0.75 ? colors.mouseGlow : colors.nodeGlow;
      }
      
      update(deltaTime) {
        // Pulse effect
        this.pulsePhase += this.pulseSpeed * deltaTime;
        const pulse = Math.sin(this.pulsePhase) * this.pulseMagnitude + 1;
        
        // Move
        this.x += this.vx * deltaTime * 60;
        this.y += this.vy * deltaTime * 60;
        
        // Bounce off edges
        if (this.x < 0 || this.x > dimensions.width) {
          this.vx *= -1;
          // Add slight randomness
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
        
        // Add glow - improved for mobile
        ctx.shadowBlur = isMobile ? 3 : 10;
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
    
    // Mouse/touch events
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
    
    // Simplified event listeners that work on mobile and desktop
    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('touchmove', handlePointerMove);
    canvas.addEventListener('mouseleave', handlePointerLeave);
    canvas.addEventListener('touchend', handlePointerLeave);
    
    // Animation loop
    const animate = (timestamp) => {
      // Calculate delta time
      if (!lastTime) lastTime = timestamp;
      const deltaTime = Math.min(0.1, (timestamp - lastTime) / 1000); // Cap at 0.1s
      lastTime = timestamp;
      
      // Clear canvas
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      
      // Mouse effect
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
        
        // Update node velocities based on mouse position
        nodes.forEach(node => {
          const dx = mousePos.x - node.x;
          const dy = mousePos.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const force = (120 - distance) / 10000 * speed;
            node.vx += dx * force * deltaTime * 60;
            node.vy += dy * force * deltaTime * 60;
            
            // Limit speed
            const nodeSpeed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
            const maxSpeed = isMobile ? 1.8 : 2.5; // Increased for mobile
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
      // Determine max connection distance based on screen size - increased for mobile
      const maxDistance = isMobile 
        ? Math.min(dimensions.width * 0.2, 160) 
        : Math.min(150, dimensions.width * 0.15);
      
      // Improved line rendering
      ctx.lineCap = 'round';
      
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        if (nodeA.connections >= connectionsPerNode) continue;
        
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          if (nodeB.connections >= connectionsPerNode) continue;
          
          const distance = nodeA.distanceTo(nodeB);
          if (distance < maxDistance) {
            // Draw line with opacity based on distance
            const opacity = (1 - (distance / maxDistance)).toFixed(2);
            
            // Improved line quality for mobile
            let lineWidth = Math.max(0.7, 1.5 * (1 - distance / maxDistance));
            if (isMobile) lineWidth = Math.max(0.85, lineWidth);
            
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            
            // Convert opacity to hex
            const opacityHex = Math.floor(parseFloat(opacity) * 255).toString(16).padStart(2, '0');
            ctx.strokeStyle = `${colors.lineColor}${opacityHex}`;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            
            // Add glow to lines - improved for mobile
            ctx.shadowBlur = isMobile ? 2 : 3;
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
  }, [dimensions, isMobile, nodeCount, colorScheme, maxConnections, interactive, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ display: 'block' }}
    />
  );
};

export default NetworkBackground;