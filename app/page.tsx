// nextjs/app/page.tsx
import { PrismaClient } from '@prisma/client';
import Deck from './components/Deck';
import { iKanji } from '~/models/kanji';

const prisma = new PrismaClient();

export default async function Home() {
  const kanjiData = await prisma.kanji.findMany();

  if (kanjiData.length === 0) {
    return <div>No kanji data available. Please seed the database.</div>;
  }

  const shuffledKanjiData = kanjiData.sort(() => Math.random() - 0.5);

  return <Deck kanjiCards={shuffledKanjiData as iKanji[]} />;
}