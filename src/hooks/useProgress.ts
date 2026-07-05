import { useState, useEffect } from 'react';

export type UserProgress = {
  xp: number;
  level: number;
  streak: number;
  lastPracticeDate: string | null;
  masteredChars: string[];
  charStats: Record<string, { attempts: number; scoreSum: number }>;
  unlockedGroups: string[];
};

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  level: 1,
  streak: 0,
  lastPracticeDate: null,
  masteredChars: [],
  charStats: {},
  unlockedGroups: ['vowels'], // only first group unlocked
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('hiragana_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_PROGRESS;
      }
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    localStorage.setItem('hiragana_progress', JSON.stringify(progress));
  }, [progress]);

  const addScore = (charId: string, score: number, groupId: string, isLastInGroup: boolean) => {
    setProgress((prev) => {
      const stats = prev.charStats[charId] || { attempts: 0, scoreSum: 0 };
      const newStats = {
        attempts: stats.attempts + 1,
        scoreSum: stats.scoreSum + score,
      };

      const newCharStats = { ...prev.charStats, [charId]: newStats };
      
      let newMastered = [...prev.masteredChars];
      if (score >= 90 && !newMastered.includes(charId)) {
        newMastered.push(charId);
      }

      let newUnlocked = [...prev.unlockedGroups];
      // simplified unlock logic: if mastered this char and it's the last one, unlock next
      // (a real app might check if ALL chars in group are mastered)
      // We will do that in the Practice screen instead, this is just recording.

      const today = new Date().toISOString().split('T')[0];
      let newStreak = prev.streak;
      if (prev.lastPracticeDate !== today) {
        if (prev.lastPracticeDate) {
          const lastDate = new Date(prev.lastPracticeDate);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (lastDate.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0]) {
            newStreak += 1;
          } else {
            newStreak = 1;
          }
        } else {
          newStreak = 1;
        }
      }

      const newXp = prev.xp + Math.max(10, Math.floor(score / 5));
      const newLevel = Math.floor(newXp / 100) + 1;

      return {
        ...prev,
        charStats: newCharStats,
        masteredChars: newMastered,
        unlockedGroups: newUnlocked,
        streak: newStreak,
        lastPracticeDate: today,
        xp: newXp,
        level: newLevel,
      };
    });
  };

  const unlockGroup = (groupId: string) => {
    setProgress((prev) => {
      if (prev.unlockedGroups.includes(groupId)) return prev;
      return {
        ...prev,
        unlockedGroups: [...prev.unlockedGroups, groupId],
      };
    });
  };

  const getCharAccuracy = (charId: string) => {
    const stats = progress.charStats[charId];
    if (!stats || stats.attempts === 0) return 0;
    return Math.round(stats.scoreSum / stats.attempts);
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
  }

  return { progress, addScore, unlockGroup, getCharAccuracy, resetProgress };
}
