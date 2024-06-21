export type Hint = {
  letter: string;
  inWord: boolean;
  inPosition: boolean;
}[];

function isInWord(hint: Hint, word: string, letter: string) {
  const occurrences = word.split(letter).length - 1;
  const occurencesInHint = hint.reduce(
    (acc, curr) => acc + (curr.letter === letter ? 1 : 0),
    0
  );
  return occurrences > occurencesInHint;
}

export function buildHint(word: string, guess: string[]): Hint {
  const hint = [];
  for (let i = 0; i < word.length; i++) {
    const letter = guess[i];
    const inWord = isInWord(hint, word, letter);
    hint.push({ letter, inWord, inPosition: inWord && guess[i] === word[i] });
  }
  return hint;
}
