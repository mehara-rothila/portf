import React, { useState, useEffect, useCallback, useMemo } from 'react';

const RandomParticleBackground = ({ 
  particleCount = 20,
  colorScheme = 'default',
}) => {
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: null, y: null });

  const colorSchemes = useMemo(() => ({
    default: {
      gradient: 'from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10',
      particleColors: ['bg-violet-500/20', 'bg-cyan-500/20']
    },
    cosmic: {
      gradient: 'from-purple-500/10 via-pink-500/10 to-indigo-500/10',
      particleColors: ['bg-purple-500/20', 'bg-indigo-500/20']
    },
    aurora: {
      gradient: 'from-green-500/10 via-teal-500/10 to-blue-500/10',
      particleColors: ['bg-green-500/20', 'bg-blue-500/20']
    }
  }), []);

  // Initialize particles
  useEffect(() => {
    const initialParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20,
      vx: (Math.random() - 0.5) * 0.8, // Increased random velocity
      vy: (Math.random() - 0.5) * 0.8,
      shape: Math.random() > 0.5 ? 'circle' : 'square',
      colorIndex: Math.floor(Math.random() * colorSchemes[colorScheme].particleColors.length),
      changeDirectionCounter: Math.random() * 100 // Random initial counter
    }));
    setParticles(initialParticles);
  }, [particleCount, colorScheme, colorSchemes]);

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let { x, y, vx, vy, changeDirectionCounter } = particle;
          
          // Random direction change
          changeDirectionCounter--;
          if (changeDirectionCounter <= 0) {
            vx = (Math.random() - 0.5) * 0.8;
            vy = (Math.random() - 0.5) * 0.8;
            changeDirectionCounter = Math.random() * 100 + 50; // Reset counter
          }

          // Mouse repulsion
          if (mousePos.x !== null) {
            const dx = mousePos.x - x;
            const dy = mousePos.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 20) {
              vx -= dx * 0.02;
              vy -= dy * 0.02;
            }
          }

          // Update position
          x += vx;
          y += vy;

          // Wrap around edges
          if (x < 0) x = 100;
          if (x > 100) x = 0;
          if (y < 0) y = 100;
          if (y > 100) y = 0;

          return {
            ...particle,
            x,
            y,
            vx,
            vy,
            changeDirectionCounter
          };
        })
      );
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: null, y: null });
  }, []);

  const { gradient, particleColors } = colorSchemes[colorScheme];

  return (
    <div 
      className={`absolute inset-0 overflow-hidden bg-gradient-to-br ${gradient}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute transform-gpu 
            ${particleColors[particle.colorIndex]}
            ${particle.shape === 'circle' ? 'rounded-full' : 'rounded-lg'}
            backdrop-blur-sm`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: 'translate(-50%, -50%)',
            willChange: 'transform, left, top'
          }}
        />
      ))}
    </div>
  );
};

export default RandomParticleBackground;
