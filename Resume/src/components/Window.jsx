import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Minus } from 'lucide-react';

const Window = ({
  id,
  title,
  children,
  onClose,
  onMinimize,
  isDarkMode,
  zIndex,
  onFocus,
}) => {
  const [position, setPosition] = useState({
    x: Math.random() * 300 + 100,
    y: Math.random() * 200 + 100,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.closest('[data-no-drag]')) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus(id);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 20 }}
      transition={{ duration: 0.2 }}
      className={`fixed rounded-xl shadow-2xl overflow-hidden border transition-all ${
        isDarkMode
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-200'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '650px',
        height: '550px',
        zIndex,
      }}
      onClick={() => onFocus(id)}
    >
      <div
        onMouseDown={handleMouseDown}
        className="h-11 bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-between px-4 cursor-move select-none"
      >
        <span className="text-white font-semibold text-sm">{title}</span>
        <div className="flex gap-1.5" data-no-drag>
          <button
            onClick={() => onMinimize(id)}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1.5 rounded transition-colors"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={() => onClose(id)}
            className="text-white hover:bg-red-600 p-1.5 rounded transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div
        className={`h-[calc(100%-2.75rem)] overflow-auto ${
          isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
};
export default Window;
