'use client';

import React, { useState, useRef, useEffect } from 'react';

interface NoteTakingProps {
  initialContent?: string;
  documentId?: string;
}

const NoteTaking: React.FC<NoteTakingProps> = ({ 
  initialContent = '',
  documentId
}) => {
  const [mode, setMode] = useState<'text' | 'handwriting' | 'recording'>('text');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [notes, setNotes] = useState(initialContent);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize canvas for handwriting
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      canvas.style.width = `${canvas.offsetWidth}px`;
      canvas.style.height = `${canvas.offsetHeight}px`;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.scale(2, 2);
        context.lineCap = 'round';
        context.strokeStyle = color;
        context.lineWidth = brushSize;
        contextRef.current = context;
      }
    }
  }, [color, brushSize]);
  
  // Handle recording timer
  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
    
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording]);
  
  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (contextRef.current) {
      const { offsetX, offsetY } = e.nativeEvent;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };
  
  const finishDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
      setIsDrawing(false);
    }
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;
    
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };
  
  // Format recording time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Toggle recording
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording logic would go here
      setIsRecording(false);
    } else {
      // Start recording logic would go here
      setIsRecording(true);
      setRecordingTime(0);
    }
  };
  
  // Clear canvas
  const clearCanvas = () => {
    if (contextRef.current && canvasRef.current) {
      contextRef.current.clearRect(
        0, 
        0, 
        canvasRef.current.width, 
        canvasRef.current.height
      );
    }
  };
  
  // Convert handwriting to text (placeholder)
  const convertToText = () => {
    // In a real implementation, this would send the canvas image to an API
    // for handwriting recognition
    alert('Handwriting recognition would be implemented here');
  };
  
  return (
    <div className="flex flex-col h-full border border-gray-300 rounded-lg bg-white">
      <div className="bg-gray-100 p-2 border-b border-gray-300 flex items-center justify-between">
        <div className="flex space-x-2">
          <button 
            className={`p-2 rounded ${mode === 'text' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-200'}`}
            onClick={() => setMode('text')}
            title="Text Mode"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 7 4 4 20 4 20 7" />
              <line x1="9" y1="20" x2="15" y2="20" />
              <line x1="12" y1="4" x2="12" y2="20" />
            </svg>
          </button>
          <button 
            className={`p-2 rounded ${mode === 'handwriting' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-200'}`}
            onClick={() => setMode('handwriting')}
            title="Handwriting Mode"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19l7-7 3 3-7 7-3-3z" />
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
              <path d="M2 2l7.586 7.586" />
              <circle cx="11" cy="11" r="2" />
            </svg>
          </button>
          <button 
            className={`p-2 rounded ${mode === 'recording' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-200'}`}
            onClick={() => setMode('recording')}
            title="Audio Recording Mode"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
        </div>
        
        {mode === 'handwriting' && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="color-picker" className="text-sm text-gray-600">Color:</label>
              <input 
                type="color" 
                id="color-picker" 
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-6 h-6 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="brush-size" className="text-sm text-gray-600">Size:</label>
              <input 
                type="range" 
                id="brush-size" 
                min="1" 
                max="10" 
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-24"
              />
            </div>
            <button 
              onClick={clearCanvas}
              className="p-1 text-sm text-gray-600 hover:text-red-600"
            >
              Clear
            </button>
            <button 
              onClick={convertToText}
              className="p-1 text-sm text-indigo-600 hover:text-indigo-800"
            >
              Convert to Text
            </button>
          </div>
        )}
        
        {mode === 'recording' && (
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleRecording}
              className={`flex items-center space-x-2 px-3 py-1 rounded ${
                isRecording 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              }`}
            >
              {isRecording ? (
                <>
                  <span className="inline-block w-3 h-3 bg-red-600 rounded-sm"></span>
                  <span>Stop Recording</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>Start Recording</span>
                </>
              )}
            </button>
            {isRecording && (
              <span className="text-red-600 font-mono">{formatTime(recordingTime)}</span>
            )}
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-auto">
        {mode === 'text' && (
          <textarea
            className="w-full h-full p-4 resize-none focus:outline-none"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Start typing your notes here..."
          />
        )}
        
        {mode === 'handwriting' && (
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            className="w-full h-full bg-white cursor-crosshair"
          />
        )}
        
        {mode === 'recording' && (
          <div className="p-4">
            <div className="mb-4">
              {isRecording ? (
                <div className="flex items-center space-x-2 text-red-600">
                  <span className="inline-block w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
                  <span>Recording in progress...</span>
                </div>
              ) : (
                <p className="text-gray-500">Press the Start Recording button to begin capturing audio.</p>
              )}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium text-gray-700 mb-2">Recording History</h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded border border-gray-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Recording 1</span>
                    <span className="text-xs text-gray-500">03:24</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 rounded-full hover:bg-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </button>
                    <div className="flex-1 h-1 bg-gray-300 rounded-full">
                      <div className="w-1/3 h-1 bg-indigo-600 rounded-full"></div>
                    </div>
                    <button className="text-xs text-indigo-600 hover:text-indigo-800">
                      Transcribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-gray-100 p-2 border-t border-gray-300 flex justify-between">
        <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Save Notes
        </button>
        <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
          Generate Study Materials
        </button>
      </div>
    </div>
  );
};

export default NoteTaking;
