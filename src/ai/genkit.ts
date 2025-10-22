import {genkit, ai} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

ai.configure({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
