import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

function App() {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true); // For blinking cursor
  const fullText = "Gareth Wiebe\nSoftware Developer";
  const typingSpeed = 150; // Speed of typing effect (in milliseconds)

  // Typing effect logic
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.substring(0, index)); // Update the text using substring
        index++;
      } else {
        clearInterval(interval); // Stop when all characters are displayed
      }
    }, typingSpeed);

    return () => clearInterval(interval); // Clean up on component unmount
  }, [fullText]);

  // Blinking cursor logic
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500); // Cursor blinks every 500ms

    return () => clearInterval(cursorInterval); // Clean up on component unmount
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <Canvas>
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[5, -2, 3]} intensity={1} />

        {/* Cube as Monitor */}
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
          {/* Monitor body */}
          <boxGeometry args={[2, 1, 1]} />
          <meshStandardMaterial color="grey" roughness={0.5} metalness={0.2} />

          {/* Screen */}
          <mesh position={[0, 0, 0.51]}>
            <planeGeometry args={[1.8, 0.9]} />
            <meshStandardMaterial color="black" emissive="black" roughness={0.3} />
          </mesh>

          {/* Text on the screen */}
          <Text
            position={[-0.8, -0.4, 0.52]} // Position the text on the screen
            fontSize={0.1} // Font size
            color="lime" // Text color
            anchorX="left" // Align text from the left
            anchorY="bottom" // Keep the text bottom-aligned
            outlineWidth={0.004} // Optional: Retro glow effect
            outlineColor="green" // Optional: Glow color
          >
            {`${text}${showCursor ? '_' : ''}`} {/* Add blinking cursor */}
          </Text>
        </mesh>

        {/* Keyboard */}
        <mesh position={[0.4, -0.7, .4]} rotation={[Math.PI / 8, Math.PI / 4, -Math.PI / 11]}>
          {/* Keyboard base */}
          <boxGeometry args={[1.5, 0.1, 0.8]} />
          <meshStandardMaterial color="darkgrey" roughness={0.5} metalness={0.3} />

          {/* Keyboard keys */}
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[1.4, 0.05, 0.7]} />
            <meshStandardMaterial color="black" />
          </mesh>
        </mesh>

        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
