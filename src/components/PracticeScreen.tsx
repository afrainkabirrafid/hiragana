import React, { useState, useEffect } from 'react';
import { HiraganaChar } from '../data/hiragana';
import { DrawingCanvas } from './DrawingCanvas';
import { Button } from './Button';
import { Card } from './Card';
import { assessDrawing, AssessmentResult } from '../utils/aiMock';
import { Volume2, ArrowRight, ArrowLeft, Play, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface PracticeScreenProps {
  char: HiraganaChar;
  onNext: () => void;
  onBack: () => void;
  onScore: (score: number) => void;
  isLastInGroup: boolean;
}

export function PracticeScreen({ char, onNext, onBack, onScore, isLastInGroup }: PracticeScreenProps) {
  const [strokes, setStrokes] = useState<any[]>([]);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  // Reset state when character changes
  useEffect(() => {
    setStrokes([]);
    setAssessment(null);
    setShowInfo(false);
  }, [char]);

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(char.char);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
  };

  const handleDrawEnd = (newStrokes: any[]) => {
    setStrokes(newStrokes);
  };

  const submitDrawing = () => {
    if (strokes.length === 0) return;
    const result = assessDrawing(char, strokes);
    setAssessment(result);
    onScore(result.score);

    if (result.score >= 90) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E53935', '#ffffff', '#FFC107']
      });
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" onClick={onBack} icon={<ArrowLeft size={20} />}>
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="secondary" size="icon" onClick={() => setShowInfo(!showInfo)}>
            <Info size={20} />
          </Button>
          <Button variant="secondary" size="icon" onClick={playAudio}>
            <Volume2 size={20} />
          </Button>
        </div>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-8 items-start">
        {/* Left Col: Info */}
        <div className="flex flex-col gap-6">
          <Card className="text-center py-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-[#E53935]/10 to-transparent pointer-events-none" />
            <motion.div 
              key={char.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-8xl md:text-[120px] font-sans font-light text-white mb-2 leading-none relative z-10 filter drop-shadow-[0_0_15px_rgba(229,57,53,0.3)]"
            >
              {char.char}
            </motion.div>
            <div className="text-2xl text-white/40 font-mono tracking-widest uppercase relative z-10">
              {char.romaji}
            </div>
            
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden relative z-10"
                >
                  <div className="pt-8 mt-8 border-t border-white/10 text-left space-y-4">
                    <div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Strokes</div>
                      <div className="text-white text-sm font-medium">{char.strokeCount}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Example</div>
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <p className="text-lg mb-0.5">{char.exampleWord} <span className="text-white/40 text-xs">({char.exampleRomaji})</span></p>
                        <p className="text-[10px] text-white/50 italic">{char.exampleMeaning}</p>
                      </div>
                    </div>
                    <div className="bg-[#E53935]/10 p-4 rounded-xl border border-[#E53935]/20">
                      <div className="text-[10px] text-[#E53935] uppercase font-bold tracking-tighter mb-1">Coach's Tip</div>
                      <div className="text-white/70 text-[11px] leading-relaxed italic">{char.mistake}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>

        {/* Right Col: Drawing */}
        <div className="flex flex-col items-center">
          <DrawingCanvas 
            onDrawEnd={handleDrawEnd} 
            readOnly={!!assessment}
          />
          
          <div className="mt-8 w-full max-w-[400px]">
            <AnimatePresence mode="wait">
              {!assessment ? (
                <motion.div
                  key="submit"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Button 
                    className="w-full" 
                    size="lg" 
                    disabled={strokes.length === 0}
                    onClick={submitDrawing}
                  >
                    Check My Writing
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <Card glass className="border-t-4" style={{ 
                    borderTopColor: assessment.score >= 90 ? '#4ade80' : assessment.score >= 70 ? '#facc15' : '#f87171'
                  }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">Accuracy</div>
                      <div className="text-3xl font-mono text-white">{assessment.score}%</div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {assessment.message}
                    </p>
                  </Card>
                  
                  <div className="flex gap-4">
                    <Button 
                      variant="secondary" 
                      className="flex-1"
                      onClick={() => { setStrokes([]); setAssessment(null); }}
                    >
                      Try Again
                    </Button>
                    <Button 
                      variant="primary" 
                      className="flex-1"
                      onClick={onNext}
                      icon={<ArrowRight size={18} />}
                    >
                      {isLastInGroup ? "Finish Group" : "Next"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
