'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const sampleText = "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do. The best way to predict the future is to invent it.";

export default function TypingTest() {
  const [text, setText] = useState(sampleText);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isTestComplete, setIsTestComplete] = useState(false);

  const calculateWPM = useCallback((timeInSeconds: number) => {
    const words = userInput.trim().split(/\s+/).length;
    const minutes = timeInSeconds / 60;
    return Math.round(words / minutes);
  }, [userInput]);

  const calculateAccuracy = useCallback(() => {
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) {
        correct++;
      }
    }
    return Math.round((correct / userInput.length) * 100);
  }, [userInput, text]);

  useEffect(() => {
    if (startTime && !isTestComplete) {
      const timer = setInterval(() => {
        const currentTime = Date.now();
        const timeElapsed = (currentTime - startTime) / 1000;
        setWpm(calculateWPM(timeElapsed));
        setAccuracy(calculateAccuracy());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startTime, isTestComplete, calculateWPM, calculateAccuracy]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setUserInput(value);

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (value.length === text.length) {
      setIsTestComplete(true);
    }
  };

  const resetTest = () => {
    setUserInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsTestComplete(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">Typing Test</div>
          <div className="flex gap-4">
            <div className="text-lg">
              <span className="font-semibold">WPM:</span> {wpm}
            </div>
            <div className="text-lg">
              <span className="font-semibold">Accuracy:</span> {accuracy}%
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700 leading-relaxed">
            {text.split('').map((char, index) => {
              let color = 'text-gray-700';
              if (index < userInput.length) {
                color = userInput[index] === char ? 'text-green-500' : 'text-red-500';
              }
              return (
                <span key={index} className={color}>
                  {char}
                </span>
              );
            })}
          </p>
        </div>

        <textarea
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Start typing here..."
          disabled={isTestComplete}
        />

        {isTestComplete && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={resetTest}
          >
            Try Again
          </motion.button>
        )}
      </div>
    </div>
  );
} 