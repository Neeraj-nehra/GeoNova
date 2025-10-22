'use server';
/**
 * @fileOverview Assesses landslide risk for a given map coordinate.
 * This is a simplified version for on-click map interaction.
 *
 * - assessMapRisk - A function that accepts a location (latitude and longitude) and returns a landslide risk percentage.
 * - MapRiskAssessmentInput - The input type for the assessMapRisk function.
 * - MapRiskAssessmentOutput - The return type for the assessMapRisk function.
 */

import {ai} from 'genkit';
import {z} from 'genkit';

const MapRiskAssessmentInputSchema = z.object({
  latitude: z.number().describe('Latitude of the location to assess.'),
  longitude: z.number().describe('Longitude of the location to assess.'),
});
export type MapRiskAssessmentInput = z.infer<typeof MapRiskAssessmentInputSchema>;

const MapRiskAssessmentOutputSchema = z.object({
  riskPercentage: z.number().min(0).max(100).describe('The percentage risk of a landslide event in the near future (0-100).'),
  analysis: z.string().describe('A brief, one-sentence analysis of the primary factors contributing to the risk level.'),
});
export type MapRiskAssessmentOutput = z.infer<typeof MapRiskAssessmentOutputSchema>;

export async function assessMapRisk(input: MapRiskAssessmentInput): Promise<MapRiskAssessmentOutput> {
  return mapRiskAssessmentFlow(input);
}

const prompt = ai.prompt({
  name: 'mapRiskAssessmentPrompt',
  input: {schema: MapRiskAssessmentInputSchema},
  output: {schema: MapRiskAssessmentOutputSchema},
  prompt: `You are a landslide risk assessment model for the Uttarakhand region. Given the coordinates (latitude: {{{latitude}}}, longitude: {{{longitude}}}), provide a landslide risk percentage for the next 7 days and a very brief, one-sentence analysis.

- The risk percentage should be an integer between 0 and 100.
- The analysis should be a single, concise sentence.
- Base your fictional but realistic assessment on typical factors like slope, recent rainfall, and vegetation cover. For example, a steep, recently deforested area with heavy rain would have a high risk. A flat, forested area would be low risk.

Example Output:
{
  "riskPercentage": 75,
  "analysis": "High risk due to steep slopes and recent heavy precipitation in the area."
}
`,
});

const mapRiskAssessmentFlow = ai.flow(
  {
    name: 'mapRiskAssessmentFlow',
    inputSchema: MapRiskAssessmentInputSchema,
    outputSchema: MapRiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
