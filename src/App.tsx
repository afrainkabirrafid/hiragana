/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useProgress } from './hooks/useProgress';
import { DashboardScreen } from './components/DashboardScreen';
import { PracticeScreen } from './components/PracticeScreen';
import { HIRAGANA_GROUPS } from './data/hiragana';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { progress, addScore, unlockGroup, getCharAccuracy } = useProgress();
  
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [activeCharIndex, setActiveCharIndex] = useState<number>(0);

  const activeGroup = HIRAGANA_GROUPS.find(g => g.id === activeGroupId);
  const activeChar = activeGroup ? activeGroup.chars[activeCharIndex] : null;

  const handleSelectGroup = (groupId: string) => {
    setActiveGroupId(groupId);
    setActiveCharIndex(0);
  };

  const handleBackToDashboard = () => {
    setActiveGroupId(null);
  };

  const handleNextChar = () => {
    if (!activeGroup) return;
    
    if (activeCharIndex < activeGroup.chars.length - 1) {
      setActiveCharIndex(activeCharIndex + 1);
    } else {
      // Finished group! Unlock the next one.
      const currentGroupIndex = HIRAGANA_GROUPS.findIndex(g => g.id === activeGroup.id);
      if (currentGroupIndex >= 0 && currentGroupIndex < HIRAGANA_GROUPS.length - 1) {
        unlockGroup(HIRAGANA_GROUPS[currentGroupIndex + 1].id);
      }
      setActiveGroupId(null);
    }
  };

  const handleScore = (score: number) => {
    if (!activeChar || !activeGroup) return;
    const isLast = activeCharIndex === activeGroup.chars.length - 1;
    addScore(activeChar.id, score, activeGroup.id, isLast);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#E53935]/30">
      <AnimatePresence mode="wait">
        {!activeGroupId ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <DashboardScreen 
              progress={progress} 
              onSelectGroup={handleSelectGroup}
              getCharAccuracy={getCharAccuracy}
            />
          </motion.div>
        ) : (
          <motion.div
            key="practice"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-screen flex flex-col"
          >
            {activeChar && activeGroup && (
              <PracticeScreen 
                char={activeChar}
                onNext={handleNextChar}
                onBack={handleBackToDashboard}
                onScore={handleScore}
                isLastInGroup={activeCharIndex === activeGroup.chars.length - 1}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

