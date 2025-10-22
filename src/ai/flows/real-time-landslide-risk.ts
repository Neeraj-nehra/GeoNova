'use server';
/**
 * @fileOverview A real-time landslide risk assessment AI agent.
 *
 * - assessLandslideRisk - A function that handles the landslide risk assessment process.
 * - LandslideRiskInput - The input type for the assessLandslideRisk function.
 * - LandslideRiskOutput - The return type for the assessLandslideRisk function.
 */

import {ai} from 'genkit';
import {z} from 'genkit';

const LandslideRiskInputSchema = z.object({
  latitude: z.number().describe('The latitude of the location to assess.'),
  longitude: z.number().describe('The longitude of the location to assess.'),
});
export type LandslideRiskInput = z.infer<typeof LandslideRiskInputSchema>;

const LandslideRiskOutputSchema = z.object({
  riskLevel: z.string().describe('The risk level of landslide at the given location (low, medium, high).'),
  description: z.string().describe('A detailed description of the factors contributing to the risk level, including NDVI trends, recent rainfall, and historical alerts.'),
  recommendations: z.string().describe('Recommendations for safety measures based on the risk assessment.'),
});
export type LandslideRiskOutput = z.infer<typeof LandslideRiskOutputSchema>;

export async function assessLandslideRisk(input: LandslideRiskInput): Promise<LandslideRiskOutput> {
  return assessLandslideRiskFlow(input);
}

const assessLandslideRiskPrompt = ai.prompt({
  name: 'assessLandslideRiskPrompt',
  input: {schema: LandslideRiskInputSchema},
  output: {schema: LandslideRiskOutputSchema},
  prompt: `You are an expert in landslide risk assessment, specializing in the Uttarakhand region.

Based on the provided location (latitude: {{{latitude}}}, longitude: {{{longitude}}}), you will analyze various factors including NDVI trends, recent rainfall data, historical landslide alerts, and machine learning analysis of satellite data to determine the real-time landslide risk.

Provide a risk assessment with the following details:
- riskLevel: Categorize the risk as low, medium, or high.
- description: Explain the factors contributing to the risk level, such as recent heavy rainfall, low NDVI indicating reduced vegetation cover, or proximity to areas with a history of landslides.
- recommendations: Suggest appropriate safety measures based on the risk level, such as evacuation advice for high-risk zones or monitoring guidelines for medium-risk areas.

Consider the following:
- Historical landslide data for the Uttarakhand region.
- The impact of recent weather patterns on soil stability.
- The role of vegetation cover in preventing landslides.

Ensure that the assessment is clear, concise, and actionable for users seeking to understand and mitigate landslide risks in their current location.

Output in JSON format.`, // Ensure output is in JSON format for structured parsing
});

const assessLandslideRiskFlow = ai.flow(
  {
    name: 'assessLandslideRiskFlow',
    inputSchema: LandslideRiskInputSchema,
    outputSchema: LandslideRiskOutputSchema,
  },
  async input => {
    const {output} = await assessLandslideRiskPrompt(input);
    return output!;
  }
);
