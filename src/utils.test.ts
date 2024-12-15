import { buildHint } from "./utils";

import { expect, test } from "vitest";

test("attempt is correct", () => {
  expect(buildHint("guilt", "guilt".split(""))).toStrictEqual([
    {
      letter: "g",
      inWord: false,
      inPosition: true,
    },
    {
      letter: "u",
      inWord: false,
      inPosition: true,
    },
    {
      letter: "i",
      inWord: false,
      inPosition: true,
    },
    {
      letter: "l",
      inWord: false,
      inPosition: true,
    },
    {
      letter: "t",
      inWord: false,
      inPosition: true,
    },
  ]);
});

test("should not mark the first l of hello as inWord", () => {
  expect(buildHint("guilt", "hello".split(""))).toStrictEqual([
    {
      letter: "h",
      inWord: false,
      inPosition: false,
    },
    {
      letter: "e",
      inWord: false,
      inPosition: false,
    },
    {
      letter: "l",
      inWord: false,
      inPosition: false,
    },
    {
      letter: "l",
      inWord: false,
      inPosition: true,
    },
    {
      letter: "o",
      inWord: false,
      inPosition: false,
    },
  ]);
});

test("should work with GUILT and QUELL", () => {
  expect(buildHint("guilt", "quell".split(""))).toStrictEqual([
    {
      letter: "q",
      inWord: false,
      inPosition: false,
    },
    {
      letter: "u",
      inWord: false,
      inPosition: true,
    },
    {
      letter: "e",
      inWord: false,
      inPosition: false,
    },
    {
      letter: "l",
      inWord: false,
      inPosition: true,
    },
    {
      letter: "l",
      inWord: false,
      inPosition: false,
    },
  ]);
});

test("should work with quell hello", () => {
  expect(buildHint("quell", "hello".split(""))).toStrictEqual([
    {
      letter: "h",
      inWord: false,
      inPosition: false,
    },
    {
      letter: "e",
      inWord: true,
      inPosition: false,
    },
    {
      letter: "l",
      inWord: true,
      inPosition: false,
    },
    {
      letter: "l",
      inWord: false,
      inPosition: true,
    },
    {
      letter: "o",
      inWord: false,
      inPosition: false,
    },
  ]);
});

test("should work with quell eerie", () => {
  expect(buildHint("quell", "eerie".split(""))).toStrictEqual([
    {
      letter: "e",
      inWord: true,
      inPosition: false,
    },
    {
      letter: "e",
      inWord: false,
      inPosition: false,
    },
    {
      letter: "r",
      inWord: false,
      inPosition: false,
    },
    {
      letter: "i",
      inWord: false,
      inPosition: false,
    },
    {
      letter: "e",
      inWord: false,
      inPosition: false,
    },
  ]);
});

test("should work with eerie event", () => {
  expect(buildHint("eerie", "event".split(""))).toStrictEqual([
    {
      letter: "e",
      inWord: false,
      inPosition: true,
    },
    {
      letter: "v",
      inWord: false,
      inPosition: false,
    },
    {
      letter: "e",
      inWord: true,
      inPosition: false,
    },
    {
      letter: "n",
      inWord: false,
      inPosition: false,
    },
    {
      letter: "t",
      inWord: false,
      inPosition: false,
    },
  ]);
});

test("should work with array of empty strings", () => {
  expect(buildHint("quell", ["", "", "", "", ""])).toStrictEqual([
    {
      letter: "",
      inWord: false,
      inPosition: false,
    },
    {
      letter: "",
      inWord: false,
      inPosition: false,
    },
    {
      letter: "",
      inWord: false,
      inPosition: false,
    },
    {
      letter: "",
      inWord: false,
      inPosition: false,
    },
    {
      letter: "",
      inWord: false,
      inPosition: false,
    },
  ]);
});

test("should work with rotor", () => {
  expect(buildHint("rotor", ["r", "o", "t", "o", "r"])).toStrictEqual([
    {
      letter: "r",
      inWord: false,
      inPosition: true,
    },
    {
      letter: "o",
      inWord: false,
      inPosition: true,
    },
    {
      letter: "t",
      inWord: false,
      inPosition: true,
    },
    {
      letter: "o",
      inWord: false,
      inPosition: true,
    },
    {
      letter: "r",
      inWord: false,
      inPosition: true,
    },
  ]);
});
