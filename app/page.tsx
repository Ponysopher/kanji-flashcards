import Deck from "./components/Deck";
import kanjiData from "@/data/kanji.json";

const shuffledKanjiData = kanjiData.sort(() => Math.random() - 0.5);

export default function Home() {
  return (
    <Deck kanjiCards={shuffledKanjiData}/> 
  )
}
