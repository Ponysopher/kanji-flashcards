// prisma/seed.cjs
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const { parse } = require('papaparse');

const prisma = new PrismaClient();

async function main() {
  try {
    const filePath = path.join(__dirname, '../data/kanji.csv');
    console.log(`Attempting to read CSV from: ${filePath}`);

    if (!fs.existsSync(filePath)) {
      throw new Error(`CSV file not found at: ${filePath}`);
    }

    const file = fs.readFileSync(filePath, 'utf-8');
    console.log(`CSV content (first 100 chars): ${file.slice(0, 100)}...`);

    const { data, errors } = parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
    });

    if (errors.length > 0) {
      throw new Error(`CSV parsing errors: ${JSON.stringify(errors)}`);
    }

    console.log(`Parsed ${data.length} rows:`, data.slice(0, 5));

    if (data.length === 0) {
      throw new Error('No data parsed from CSV');
    }

    for (const row of data) {
      if (!row.kanji || !row.yomikata) {
        console.warn(`Skipping invalid row:`, row);
        continue;
      }
      await prisma.kanji.create({
        data: {
          kanji: row.kanji.trim(),
          yomikata: row.yomikata.trim(),
        },
      });
    }

    console.log(`Seeded ${data.length} kanji`);
  } catch (error) {
    console.error('Seeding error:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });