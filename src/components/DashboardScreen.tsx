import React from 'react';
import { HIRAGANA_GROUPS } from '../data/hiragana';
import { UserProgress } from '../hooks/useProgress';
import { Card } from './Card';
import { Button } from './Button';
import { Play, Lock, Trophy, Flame, Star, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils';

interface DashboardScreenProps {
  progress: UserProgress;
  onSelectGroup: (groupId: string) => void;
  getCharAccuracy: (charId: string) => number;
}

export function DashboardScreen({ progress, onSelectGroup, getCharAccuracy }: DashboardScreenProps) {
  
  const totalChars = HIRAGANA_GROUPS.reduce((acc, g) => acc + g.chars.length, 0);
  const masteredCount = progress.masteredChars.length;
  const progressPercent = Math.round((masteredCount / totalChars) * 100);

  // Calculate overall accuracy
  let totalAttempts = 0;
  let totalScoreSum = 0;
  let hardestCharId = '';
  let lowestAccuracy = 100;

  Object.entries(progress.charStats).forEach(([charId, stats]) => {
    totalAttempts += stats.attempts;
    totalScoreSum += stats.scoreSum;
    const accuracy = Math.round(stats.scoreSum / stats.attempts);
    if (accuracy < lowestAccuracy && stats.attempts > 1) {
      lowestAccuracy = accuracy;
      hardestCharId = charId;
    }
  });

  const overallAccuracy = totalAttempts > 0 ? Math.round(totalScoreSum / totalAttempts) : 0;
  
  let hardestCharDisplay = '-';
  if (hardestCharId) {
    for (const group of HIRAGANA_GROUPS) {
      const char = group.chars.find(c => c.id === hardestCharId);
      if (char) {
        hardestCharDisplay = char.char;
        break;
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-12">
      {/* Header section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2"
          >
            N5 Hiragana
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-400 text-lg"
          >
            Master the foundation of Japanese.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4"
        >
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="bg-[#E53935]/20 p-2 rounded-xl">
              <Flame className="text-[#E53935]" size={20} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Streak</div>
              <div className="text-xl font-bold text-white leading-none">{progress.streak} <span className="text-[10px] font-normal text-white/40">days</span></div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="bg-white/10 p-2 rounded-xl border border-white/10">
              <Star className="text-white" size={20} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Level {progress.level}</div>
              <div className="text-xl font-bold text-[#E53935] leading-none">{progress.xp} <span className="text-[10px] font-normal text-white/40">XP</span></div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Course Progress & Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-[#E53935] opacity-[0.03] blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          
          <div className="flex-1 w-full space-y-4 relative z-10">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-xl font-semibold text-white">Course Mastery</h2>
                <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{masteredCount} of {totalChars} characters mastered</p>
              </div>
              <div className="text-3xl font-mono text-white">{progressPercent}%</div>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden w-full">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-[#E53935] shadow-[0_0_10px_#E53935]"
              />
            </div>
          </div>
        </Card>

        {/* Statistics Card */}
        <Card className="flex flex-col justify-center">
          <h3 className="text-[10px] text-white/40 uppercase tracking-widest mb-4">Daily Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Accuracy</p>
              <p className="text-lg font-bold text-white">{overallAccuracy}%</p>
            </div>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Attempts</p>
              <p className="text-lg font-bold text-white">{totalAttempts}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/5 col-span-2 flex items-center justify-between">
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Hardest Character</span>
              <span className="text-xl font-bold text-[#E53935]">{hardestCharDisplay}</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Curriculum Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Curriculum</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HIRAGANA_GROUPS.map((group, index) => {
            const isUnlocked = progress.unlockedGroups.includes(group.id);
            const groupMasteredCount = group.chars.filter(c => progress.masteredChars.includes(c.id)).length;
            const isComplete = groupMasteredCount === group.chars.length;
            
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className={cn(
                    "h-full flex flex-col justify-between transition-all duration-300",
                    isUnlocked ? "hover:border-neutral-600 hover:bg-[#1A1A1A]" : "opacity-50 grayscale"
                  )}
                >
                  <div className="mb-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-xl text-white font-serif shadow-inner">
                        {group.chars[0].char}
                      </div>
                      {!isUnlocked ? (
                        <Lock className="text-white/30" size={20} />
                      ) : isComplete ? (
                        <Trophy className="text-[#E53935]" size={20} />
                      ) : null}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{group.name}</h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">
                      {group.chars.map(c => c.romaji).join(', ')}
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    {isUnlocked ? (
                      <div className="space-y-4">
                        <div className="flex gap-1 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          {group.chars.map((char) => (
                            <div 
                              key={char.id} 
                              className={cn(
                                "flex-1 rounded-full",
                                progress.masteredChars.includes(char.id) ? "bg-[#E53935] shadow-[0_0_10px_#E53935]" : "bg-transparent"
                              )}
                            />
                          ))}
                        </div>
                        <Button 
                          className="w-full text-sm py-2" 
                          variant={isComplete ? "secondary" : "primary"}
                          onClick={() => onSelectGroup(group.id)}
                          icon={<Play size={16} fill="currentColor" />}
                        >
                          {isComplete ? "Review" : "Practice"}
                        </Button>
                      </div>
                    ) : (
                      <Button className="w-full text-sm py-2" variant="ghost" disabled>
                        Locked
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
