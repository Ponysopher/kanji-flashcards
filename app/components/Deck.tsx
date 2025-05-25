// nextjs/app/components/Deck.tsx
"use client";
import { useState } from "react";
import Flashcard from "./Flashcard";
import { iKanji } from "~/models/kanji";

const Deck = ({ kanjiCards }: { kanjiCards: iKanji[] }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  if (kanjiCards.length === 0) {
    return <div>No kanji cards available.</div>;
  }

  const currentKanji = kanjiCards[currentIndex];

  const handleClick = () => {
    setIsRevealed(true);
  };

  const handleNext = () => {
    setIsRevealed(false);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex < kanjiCards.length ? nextIndex : 0;
    });
  };

  return (
    <div className="max-w-xs mx-auto my-0 p-5">
      <Flashcard
        yomikata={currentKanji.yomikata}
        kanji={currentKanji.kanji}
        isRevealed={isRevealed}
        onClick={handleClick}
      />
      {isRevealed && (
        <button
          className="mt-5 bg-blue-500 text-white px-4 py-2 text-base"
          onClick={handleNext}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Deck;