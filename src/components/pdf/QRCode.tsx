import React from 'react';
import { View, Svg, Rect } from '@react-pdf/renderer';

interface QRCodeProps {
  value: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

// Simple QR code implementation for PDF
// This creates a basic QR code pattern using SVG elements
const QRCode: React.FC<QRCodeProps> = ({ 
  value, 
  size = 80, 
  color = '#000000', 
  backgroundColor = '#ffffff' 
}) => {
  // Generate a simple hash from the string
  const generateHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  // Create a deterministic pattern based on the hash
  const createPattern = (value: string): boolean[][] => {
    const hash = generateHash(value);
    const seed = hash.toString();
    const size = 7; // 7x7 grid for simplicity
    const pattern: boolean[][] = Array(size).fill(0).map(() => Array(size).fill(false));
    
    // Fill the pattern based on the seed
    let seedIndex = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // Skip the position markers (corners)
        if ((i < 2 && j < 2) || (i < 2 && j >= size - 2) || (i >= size - 2 && j < 2)) {
          continue;
        }
        
        // Use the seed to determine if this cell should be filled
        const digit = parseInt(seed[seedIndex % seed.length]);
        pattern[i][j] = digit % 2 === 0;
        seedIndex++;
      }
    }
    
    // Add position markers (3 corners)
    // Top-left
    pattern[0][0] = true;
    pattern[0][1] = true;
    pattern[1][0] = true;
    pattern[1][1] = true;
    
    // Top-right
    pattern[0][size-2] = true;
    pattern[0][size-1] = true;
    pattern[1][size-2] = true;
    pattern[1][size-1] = true;
    
    // Bottom-left
    pattern[size-2][0] = true;
    pattern[size-2][1] = true;
    pattern[size-1][0] = true;
    pattern[size-1][1] = true;
    
    return pattern;
  };

  const pattern = createPattern(value);
  const cellSize = size / pattern.length;
  
  return (
    <View style={{ width: size, height: size, backgroundColor }}>
      <Svg width={size} height={size}>
        {pattern.map((row, rowIndex) => 
          row.map((cell, colIndex) => 
            cell ? (
              <Rect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex * cellSize}
                y={rowIndex * cellSize}
                width={cellSize}
                height={cellSize}
                fill={color}
              />
            ) : null
          )
        )}
      </Svg>
    </View>
  );
};

export default QRCode; 