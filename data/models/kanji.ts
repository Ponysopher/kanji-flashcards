import { z } from "zod";

export const KanjiSchema = z.object({
  id: z.number().int().positive().optional(),
  kanji: z.string().min(1, 'Kanji is required').regex(/^[\u4E00-\u9FFF]+$/, 'Kanji must be a valid kanji character'),
  yomikata: z.string().min(1, 'Yomikata is required').regex(/^[\u3040-\u309F]+$/, 'Yomikata must be a valid hiragana character')
});

export type iKanji = z.infer<typeof KanjiSchema>;