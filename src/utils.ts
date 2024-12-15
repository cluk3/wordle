import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Hint = {
  letter: string;
  inWord: boolean;
  inPosition: boolean;
}[];

function removeCharAtIndex(str: string, index: number) {
  return str.substring(0, index) + str.substring(index + 1);
}

const EMPTY_STRING = "";

export function buildHint(_word: string, guess: string[]): Hint {
  // first find the one in position (green)
  let word = _word + EMPTY_STRING;
  const hint = guess.map((letter, i) => {
    return {
      letter,
      inPosition: letter === word[i],
      inWord: false,
    };
  });

  // remove the letters in position from the word
  word = word
    .split(EMPTY_STRING)
    .filter((letter, i) => !hint[i].inPosition)
    .join(EMPTY_STRING);

  // if the letter is in the word, mark it as inWord(yellow),
  // then remove it from the word
  hint.forEach((hint, i) => {
    if (!hint.inPosition) {
      hint.inWord = !!hint.letter && word.includes(hint.letter);
      if (hint.inWord) {
        word = removeCharAtIndex(word, word.indexOf(hint.letter));
      }
    }
  });

  return hint;
}

export function encodeWord(word: string): string {
  if (word.length !== 5) {
    throw new Error("Word must be exactly 5 letters");
  }

  const shift = 7; // arbitrary shift value
  const encoded: string[] = [];

  for (const char of word.toLowerCase()) {
    if (!/[a-z]/.test(char)) {
      throw new Error("Word must contain only letters");
    }

    // Convert to 1-26 range, apply shift
    let num = (char.charCodeAt(0) - "a".charCodeAt(0) + 1 + shift) % 26 || 26;
    // Convert to base 36 (will use 0-9 and a-z)
    encoded.push(num.toString(36));
  }

  return encoded.join("");
}

export function decodeWord(encoded: string): string {
  if (encoded.length !== 5) {
    throw new Error("Encoded string must be 5 characters");
  }

  const shift = 7; // same shift value as encode function
  const decoded: string[] = [];

  for (const char of encoded) {
    // Convert from base 36 back to number
    const num = parseInt(char, 36);
    // Reverse the shift and convert back to letter
    const letterCode = ((num - shift - 1 + 26) % 26) + "a".charCodeAt(0);
    decoded.push(String.fromCharCode(letterCode));
  }

  return decoded.join("");
}
