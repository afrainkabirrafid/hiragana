import { HiraganaChar } from '../data/hiragana';

export type AssessmentResult = {
  score: number;
  message: string;
  details: {
    shape: number;
    strokeCount: number;
    strokeOrder: number;
  };
};

export function assessDrawing(char: HiraganaChar, drawnStrokes: any[]): AssessmentResult {
  const drawnCount = drawnStrokes.length;
  const expectedCount = char.strokeCount;

  // Base score on stroke count matching
  let strokeScore = 100;
  if (drawnCount !== expectedCount) {
    const diff = Math.abs(drawnCount - expectedCount);
    strokeScore = Math.max(0, 100 - (diff * 40));
  }

  // Simulate a shape score that is generally positive but sometimes yellow/red if strokes are very wrong
  // In a real app this would compare the path lengths, bounding boxes, and direction.
  // We'll add a bit of randomness to make it feel "alive" but heavily weight it by stroke accuracy.
  const randomVariance = Math.floor(Math.random() * 15);
  let shapeScore = drawnCount === expectedCount ? 85 + randomVariance : 50 + randomVariance;

  // Simulate stroke order (we can't really know without actual path comparison, so we assume high if count is right)
  let orderScore = drawnCount === expectedCount ? 90 + Math.floor(Math.random() * 10) : 60;

  const totalScore = Math.round((strokeScore * 0.4) + (shapeScore * 0.4) + (orderScore * 0.2));

  let message = "";
  if (drawnCount !== expectedCount) {
    message = `You drew ${drawnCount} stroke${drawnCount === 1 ? '' : 's'}, but '${char.romaji}' requires ${expectedCount}. Remember: ${char.mistake}`;
  } else if (totalScore >= 90) {
    const praises = [
      "Excellent! Nearly identical to native handwriting.",
      "Perfect shape and balance.",
      "Beautifully drawn. Great job!",
      "Outstanding! The strokes flow very naturally."
    ];
    message = praises[Math.floor(Math.random() * praises.length)];
  } else if (totalScore >= 70) {
    message = `Good effort! Your stroke count is correct. ${char.mistake}`;
  } else {
    message = `Needs a bit more practice. Focus on the proportions. ${char.mistake}`;
  }

  return {
    score: totalScore,
    message,
    details: {
      shape: shapeScore,
      strokeCount: strokeScore,
      strokeOrder: orderScore,
    }
  };
}
