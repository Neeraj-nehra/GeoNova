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
  summary: z.string().describe('A brief summary of the news article (1-2 sentences).'),
  body: z.string().describe('The full content of the news article (3-4 paragraphs).'),
  publishedAt: z.string().describe('How long ago the article was published, e.g., "2 hours ago", "1 day ago".'),
  imageUrl: z.string().url().describe('A relevant image URL for the article.'),
  url: z.string().url().describe('The URL to the full article.'),
});

const LandslideNewsOutputSchema = z.object({
  articles: z.array(NewsArticleSchema),
});

export type LandslideNewsOutput = z.infer<typeof LandslideNewsOutputSchema>;
export type NewsArticle = z.infer<typeof NewsArticleSchema>;


export async function getLandslideNews(): Promise<LandslideNewsOutput> {
  return getLandslideNewsFlow();
}

const prompt = ai.definePrompt({
  name: 'landslideNewsPrompt',
  output: {schema: LandslideNewsOutputSchema},
  prompt: `You are a news editor for a major publication, tasked with creating a news feed about landslide activity in the Uttarakhand region of India. Generate a list of 5 recent, realistic but fictional news articles.

For each article, provide the following in a journalistic style:
- A compelling and specific headline.
- A plausible news source (e.g., "Times of India", "Hindustan Times", "Local Press").
- A concise one-paragraph summary that grabs the reader's attention.
- A full article body of at least 4-5 detailed paragraphs. The body should read like a real news report, including fictional quotes from officials, experts, or affected residents to add authenticity.
- A relative published time (e.g., "3 hours ago", "1 day ago").
- A relevant placeholder image URL from 'https://picsum.photos/seed/{seed}/600/400' where {seed} is a random number.
- A valid, placeholder URL for the article link (e.g., "https://example.com/news/123").

Ensure the stories are varied and feel authentic, covering different locations within Uttarakhand and different aspects of the landslide issue (e.g., recent events, government response, scientific analysis, human impact).`,
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
