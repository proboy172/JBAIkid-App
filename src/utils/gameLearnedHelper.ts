import { getAllTopics, type Topic, type VocabItem } from "@/data/vocabulary";

export interface LearnedGameData {
  learnedItems: VocabItem[];
  learnedCount: number;
  completedTopics: Topic[];
  inProgressTopics: Topic[];
  nextTopic: Topic;
  hasEnoughForQuiz: boolean;   // >= 3 words
  hasEnoughForMemory: boolean; // >= 3 words
  hasEnoughForMatch: boolean;  // >= 4 words
}

/**
 * Filter vocabulary items to ONLY those the child has actually learned in flashcards
 * and identify the next recommended topic to learn to expand games.
 */
export function getLearnedGameData(learnedWords: Record<string, string[]> = {}): LearnedGameData {
  const allTopics = getAllTopics();
  const learnedItems: VocabItem[] = [];
  const learnedWordSet = new Set<string>();

  const completedTopics: Topic[] = [];
  const inProgressTopics: Topic[] = [];

  // Match items against learnedWords
  allTopics.forEach((topic) => {
    const wordsInTopic = learnedWords[topic.id] || [];
    let countInTopic = 0;

    topic.items.forEach((item) => {
      if (wordsInTopic.includes(item.en)) {
        countInTopic++;
        if (!learnedWordSet.has(item.en.toLowerCase())) {
          learnedWordSet.add(item.en.toLowerCase());
          learnedItems.push(item);
        }
      }
    });

    if (countInTopic >= topic.items.length) {
      completedTopics.push(topic);
    } else if (countInTopic > 0) {
      inProgressTopics.push(topic);
    }
  });

  // Find next topic:
  // 1. Topic in progress (already started but not finished)
  // 2. Or the first topic not started yet
  // 3. Fallback to first topic
  let nextTopic = inProgressTopics[0] || allTopics.find((t) => !(learnedWords[t.id]?.length)) || allTopics[0];

  return {
    learnedItems,
    learnedCount: learnedItems.length,
    completedTopics,
    inProgressTopics,
    nextTopic,
    hasEnoughForQuiz: learnedItems.length >= 3,
    hasEnoughForMemory: learnedItems.length >= 3,
    hasEnoughForMatch: learnedItems.length >= 4,
  };
}
