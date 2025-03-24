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
    
    // Calculate adjusted node count - further enhanced for mobile
    const getAdjustedNodeCount = () => {
      // Base on actual screen area
      const area = dimensions.width * dimensions.height;
      
      if (isMobile) {
        // Significantly increased node density for mobile
        return Math.max(50, Math.floor(nodeCount * 0.9));
      } else if (area < 500000) { // Small screens
        return Math.max(40, Math.floor(nodeCount * 0.75));
      } else if (area < 800000) { // Medium screens
        return Math.max(50, Math.floor(nodeCount * 0.9));
      } else {
        return nodeCount; // Large screens get the full count
      }
    };
    
    // Node class
    class Node {
      constructor() {
        // Smaller nodes on mobile for better performance with higher density
        this.radius = Math.random() * 1.6 + (isMobile ? 0.6 : 0.8); 
        
        // Distribute nodes more evenly
        if (Math.random() > 0.8) {
          // Some nodes at random positions
          this.x = Math.random() * dimensions.width;
          this.y = Math.random() * dimensions.height;
        } else {
          // Most nodes in a grid-like pattern with randomness
          const gridSize = isMobile ? 
            Math.sqrt(getAdjustedNodeCount()) * 1.5 : 
            Math.sqrt(getAdjustedNodeCount()) * 1.2;
            
          const cellWidth = dimensions.width / gridSize;
          const cellHeight = dimensions.height / gridSize;
          
          const gridX = Math.floor(Math.random() * gridSize);
          const gridY = Math.floor(Math.random() * gridSize);
          
          // Add randomness to grid positions
          this.x = (gridX * cellWidth) + (Math.random() * cellWidth);
          this.y = (gridY * cellHeight) + (Math.random() * cellHeight);
        }
        
        // Adjust speed based on screen size
        const speedMultiplier = speed * (isMobile ? 0.65 : 1);
        this.vx = (Math.random() - 0.5) * 0.6 * speedMultiplier;
        this.vy = (Math.random() - 0.5) * 0.6 * speedMultiplier;
        
        // Increased max connections for denser mesh
        this.maxConnections = isMobile ? Math.ceil(maxConnections * 1.5) : maxConnections;
        this.connections = 0;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.03 + 0.02;
        this.pulseMagnitude = Math.random() * 0.5 + 0.5;
        
        // More varied colors
        const colorRoll = Math.random();
        if (colorRoll > 0.85) {
          this.color = colors.accentColor;
          this.glow = colors.mouseGlow;
        } else if (colorRoll > 0.7) {
          this.color = colors.mouseGlow;
          this.glow = colors.accentColor;
        } else {
          this.color = colors.nodeColor;
          this.glow = colors.nodeGlow;
        }
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
    
    // Enhanced mouse/touch events
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
    
    // Add touch start handler for better mobile interaction
    const handleTouchStart = (e) => {
      if (!interactive) return;
      
      const touch = e.touches[0];
      if (touch) {
        const rect = canvas.getBoundingClientRect();
        mousePos = {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top
        };
        
        // Prevent scrolling when interacting with canvas
        if (e.target === canvas) {
          e.preventDefault();
        }
      }
    };
    
    const handlePointerLeave = () => {
      // On mobile, keep the last position for a short time before clearing
      if (isMobile) {
        setTimeout(() => {
          mousePos = { x: null, y: null };
        }, 500);
      } else {
        mousePos = { x: null, y: null };
      }
    };
    
    // Enhanced event listeners for better interactivity
    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('touchmove', handlePointerMove, { passive: false });
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('mouseleave', handlePointerLeave);
    canvas.addEventListener('touchend', handlePointerLeave);
    
    // Add periodic simulation of interaction on mobile for increased visual interest
    let simulationTimer = null;
    if (isMobile) {
      const simulateInteraction = () => {
        if (mousePos.x === null && mousePos.y === null && Math.random() > 0.7) {
          // Simulate a touch at a random position
          mousePos = {
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height
          };
          
          // Clear it after a short time
          setTimeout(() => {
            mousePos = { x: null, y: null };
          }, 1500 + Math.random() * 1000);
        }
      };
      
      // Run simulation every few seconds
      simulationTimer = setInterval(simulateInteraction, 5000);
    }
    
    // Animation loop
    const animate = (timestamp) => {
      // Calculate delta time
      if (!lastTime) lastTime = timestamp;
      const deltaTime = Math.min(0.1, (timestamp - lastTime) / 1000); // Cap at 0.1s
      lastTime = timestamp;
      
      // Clear canvas
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      
      // Enhanced mouse/touch effect
      if (mousePos.x !== null && mousePos.y !== null) {
        // Main glow effect
        const interactionRadius = isMobile ? 140 : 120;
        const gradient = ctx.createRadialGradient(
          mousePos.x, mousePos.y, 0,
          mousePos.x, mousePos.y, interactionRadius
        );
        gradient.addColorStop(0, `${colors.mouseGlow}40`); // More intense glow
        gradient.addColorStop(0.5, `${colors.mouseGlow}20`);
        gradient.addColorStop(1, `${colors.mouseGlow}00`);
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(mousePos.x, mousePos.y, interactionRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Additional pulse effect (subtle rings)
        if (!isMobile || Math.random() > 0.7) { // Less frequent on mobile for performance
          const pulseTime = timestamp % 3000 / 3000;
          const pulseSize = isMobile ? 
                          interactionRadius * 0.5 + interactionRadius * pulseTime : 
                          interactionRadius * 0.3 + interactionRadius * pulseTime;
          
          const pulseOpacity = (1 - pulseTime) * 0.2;
          const pulseGradient = ctx.createRadialGradient(
            mousePos.x, mousePos.y, pulseSize * 0.8,
            mousePos.x, mousePos.y, pulseSize
          );
          
          pulseGradient.addColorStop(0, `${colors.accentColor}${Math.floor(pulseOpacity * 255).toString(16).padStart(2, '0')}`);
          pulseGradient.addColorStop(1, `${colors.accentColor}00`);
          
          ctx.beginPath();
          ctx.strokeStyle = pulseGradient;
          ctx.lineWidth = 1.5;
          ctx.arc(mousePos.x, mousePos.y, pulseSize, 0, Math.PI * 2);
          ctx.stroke();
        }
        
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
      // Determine max connection distance based on screen size - significantly increased for mobile
      const maxDistance = isMobile 
        ? Math.min(dimensions.width * 0.25, 180) 
        : Math.min(150, dimensions.width * 0.15);
        
      const connectionsPerNode = isMobile ? 5 : maxConnections;
      
      // Add occasional longer connections for visual interest
      const longConnectionChance = isMobile ? 0.15 : 0.1;
      const longDistanceMultiplier = 1.5;
      
      // Improved line rendering
      ctx.lineCap = 'round';
      
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        if (nodeA.connections >= nodeA.maxConnections) continue;
        
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          if (nodeB.connections >= nodeB.maxConnections) continue;
          
          const distance = nodeA.distanceTo(nodeB);
          const checkDistance = Math.random() < longConnectionChance ? 
                               maxDistance * longDistanceMultiplier : 
                               maxDistance;
          
          if (distance < checkDistance) {
            // Draw line with opacity based on distance
            const baseMaxDistance = Math.random() < longConnectionChance ? 
                                   maxDistance * longDistanceMultiplier : 
                                   maxDistance;
            const opacity = (1 - (distance / baseMaxDistance)).toFixed(2);
            
            // Improved line quality with dynamic width
            let lineWidth = Math.max(0.7, 1.5 * (1 - distance / baseMaxDistance));
            
            // Better line quality for mobile
            if (isMobile) {
              // Different line widths create more visual texture
              if (Math.random() > 0.7) {
                lineWidth = Math.max(1, lineWidth * 1.3);
              } else {
                lineWidth = Math.max(0.85, lineWidth);
              }
            }
            
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            
            // Convert opacity to hex
            const opacityHex = Math.floor(parseFloat(opacity) * 255).toString(16).padStart(2, '0');
            
            // Slightly randomize colors for visual interest
            const lineColorBase = Math.random() > 0.9 ? colors.accentColor : colors.lineColor;
            ctx.strokeStyle = `${lineColorBase}${opacityHex}`;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            
            // Add glow to lines - enhanced for all devices
            ctx.shadowBlur = isMobile ? 2.5 : 3;
            ctx.shadowColor = lineColorBase;
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
      
      if (simulationTimer) {
        clearInterval(simulationTimer);
      }
      
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('touchmove', handlePointerMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
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