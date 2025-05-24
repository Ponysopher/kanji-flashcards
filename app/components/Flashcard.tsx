interface iFlashCard {
    yomikata: string;
    kanji: string; 
    isRevealed: boolean;
    onClick?: () => void;
}

const Flashcard = ({yomikata, kanji, isRevealed, onClick}: iFlashCard) => {
  return (
    <div
        onClick={onClick}
        className="border p-10 text-center cursor-pointer flex flex-col justify-center min-h-24"
    >
        <div
            className="text-2xl"
        >
            {yomikata}
        </div>
        {isRevealed && (
            <div className="text-5xl mt-3">{kanji}</div>
        )}
    </div>
  )
}

export default Flashcard