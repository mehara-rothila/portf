import React, { useEffect, useRef } from 'react';

const NetworkBackground = ({ 
  nodeCount = 60,
  colorScheme = 'default',
  maxConnections = 5,
  interactive = true
}) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mousePosition = { x: null, y: null };
    let needsResize = true;
    
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
    
    // Set up nodes
    class Node {
      constructor() {
        this.radius = Math.random() * 2 + 1;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.connections = 0;
        this.lastConnections = []; // Track last connected nodes
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseMagnitude = Math.random() * 0.5 + 0.5;
        
        // Random color selection between node and accent color
        this.color = Math.random() > 0.8 ? colors.accentColor : colors.nodeColor;
        this.glow = Math.random() > 0.8 ? colors.mouseGlow : colors.nodeGlow;
      }
      
      update() {
        // Add pulse effect
        this.pulsePhase += this.pulseSpeed;
        const pulse = Math.sin(this.pulsePhase) * this.pulseMagnitude + 1;
        
        // Move the node
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        // Draw node
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.glow;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Reset connections counter for next frame
        this.connections = 0;
        this.lastConnections = [];
      }
      
      // Calculate distance to another node or point
      distanceTo(point) {
        const dx = this.x - point.x;
        const dy = this.y - point.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
    }
    
    // Create nodes
    let nodes = [];
    
    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
      }
    };
    
    // Handle resize
    const handleResize = () => {
      needsResize = true;
    };
    
    // Handle mouse movement
    const handleMouseMove = (e) => {
      if (!interactive) return;
      
      const rect = canvas.getBoundingClientRect();
      mousePosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    const handleMouseLeave = () => {
      mousePosition = { x: null, y: null };
    };
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // Animation loop
    const animate = () => {
      // Handle resize if needed
      if (needsResize) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
        ctx.scale(dpr, dpr);
        needsResize = false;
        initNodes();
      }
      
      // Clear canvas
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw mouse influence area if mouse is active
      if (mousePosition.x !== null && interactive) {
        const gradient = ctx.createRadialGradient(
          mousePosition.x, mousePosition.y, 0,
          mousePosition.x, mousePosition.y, 150
        );
        gradient.addColorStop(0, `${colors.mouseGlow}30`); // 30 is hex for 19% opacity
        gradient.addColorStop(1, `${colors.mouseGlow}00`); // 00 is hex for 0% opacity
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(mousePosition.x, mousePosition.y, 150, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Update nodes and connect them
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Mouse attraction/repulsion
        if (mousePosition.x !== null && interactive) {
          const dx = mousePosition.x - node.x;
          const dy = mousePosition.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            // Create attraction effect
            const force = (150 - distance) / 15000; // Gentle force
            node.vx += dx * force;
            node.vy += dy * force;
            
            // Speed limiting
            const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
            if (speed > 2) {
              node.vx = (node.vx / speed) * 2;
              node.vy = (node.vy / speed) * 2;
            }
          }
        }
        
        // Update and draw the node
        node.update();
        
        // Find connections
        for (let j = i + 1; j < nodes.length; j++) {
          if (node.connections >= maxConnections) break;
          
          const otherNode = nodes[j];
          if (otherNode.connections >= maxConnections) continue;
          
          const distance = node.distanceTo(otherNode);
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            // Set line style based on distance
            const opacity = Math.max(0, (1 - distance / maxDistance)).toFixed(2);
            const width = Math.max(0.5, 2 * (1 - distance / maxDistance));
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `${colors.lineColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = width;
            ctx.stroke();
            
            // Add glow to lines
            ctx.shadowBlur = 5;
            ctx.shadowColor = colors.lineColor;
            ctx.stroke();
            ctx.shadowBlur = 0;
            
            // Count the connection
            node.connections++;
            otherNode.connections++;
            
            // Store connected nodes
            node.lastConnections.push(j);
            otherNode.lastConnections.push(i);
          }
        }
      }
      
      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize and start
    handleResize();
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [nodeCount, colorScheme, maxConnections, interactive]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ display: 'block' }}
    />
  );
};

export default NetworkBackground;