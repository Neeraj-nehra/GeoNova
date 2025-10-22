'use server';
/**
 * @fileOverview Generates a list of recent news articles about landslides in Uttarakhand.
 *
 * - getLandslideNews - A function that returns a list of news articles.
 * - LandslideNewsOutput - The return type for the getLandslideNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NewsArticleSchema = z.object({
  title: z.string().describe('The headline of the news article.'),
  source: z.string().describe('The news source, e.g., "Times of India".'),
  summary: z.string().describe('A brief summary of the news article.'),
  publishedAt: z.string().describe('How long ago the article was published, e.g., "2 hours ago", "1 day ago".'),
  imageUrl: z.string().url().describe('A relevant image URL for the article.'),
  url: z.string().url().describe('The URL to the full article.'),
});

const LandslideNewsOutputSchema = z.object({
  articles: z.array(NewsArticleSchema),
});

export type LandslideNewsOutput = z.infer<typeof LandslideNewsOutputSchema>;

export async function getLandslideNews(): Promise<LandslideNewsOutput> {
  return getLandslideNewsFlow();
}

const prompt = ai.definePrompt({
  name: 'landslideNewsPrompt',
  output: {schema: LandslideNewsOutputSchema},
  prompt: `You are a news aggregator specializing in geological events. Generate a list of 5 recent, realistic but fictional news headlines and summaries about landslide events or risks in the Uttarakhand region of India.

For each article, provide:
- A compelling title.
- A plausible news source (e.g., "Times of India", "Hindustan Times", "Local Press").
- A concise summary (1-2 sentences).
- A relative published time (e.g., "3 hours ago", "1 day ago").
- A relevant placeholder image URL from 'https://picsum.photos/seed/{seed}/600/400' where {seed} is a random number.
- A valid, placeholder URL for the article link (e.g., "https://example.com/news/123").

Ensure the stories are varied, covering different locations within Uttarakhand and different aspects of the landslide issue (e.g., warnings, recent events, government response).`,
});

const getLandslideNewsFlow = ai.defineFlow(
  {
    name: 'getLandslideNewsFlow',
    outputSchema: LandslideNewsOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
