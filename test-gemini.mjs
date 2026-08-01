import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// 1. Vérification de la clé API
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('[X] ERREUR : La clé GEMINI_API_KEY est introuvable dans le fichier .env !');
  process.exit(1);
}

// 2. Initialisation avec le modèle stable
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function run() {
  try {
    const result = await model.generateContent(
      'Give me 3 catchy title ideas for a blog post about working online.'
    );
    console.log('\n--- Gemini Response ---');
    console.log(result.response.text());
  } catch (error) {
    console.error('\n[X] Execution failed:');
    console.error(error);
  }
}

run();