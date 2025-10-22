// LocationBasedRiskAssessment
'use server';
/**
 * @fileOverview Assesses landslide risk for a given location based on NDVI trends, recent rainfall, historical alerts, and machine learning analysis of satellite data.
 *
 * - assessLandslideRisk - A function that accepts a location (latitude and longitude) and returns a landslide risk assessment.
 * - LocationBasedRiskAssessmentInput - The input type for the assessLandslideRisk function.
 * - LocationBasedRiskAssessmentOutput - The return type for the assessLandslideRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LocationBasedRiskAssessmentInputSchema = z.object({
  latitude: z.number().describe('Latitude of the location to assess.'),
  longitude: z.number().describe('Longitude of the location to assess.'),
});
export type LocationBasedRiskAssessmentInput = z.infer<typeof LocationBasedRiskAssessmentInputSchema>;

const LocationBasedRiskAssessmentOutputSchema = z.object({
  riskLevel: z.string().describe('The risk level of landslide at the given location (Low, Medium, High).'),
  analysis: z.string().describe('Detailed analysis of the factors contributing to the risk level.'),
});
export type LocationBasedRiskAssessmentOutput = z.infer<typeof LocationBasedRiskAssessmentOutputSchema>;

export async function assessLandslideRisk(input: LocationBasedRiskAssessmentInput): Promise<LocationBasedRiskAssessmentOutput> {
  return locationBasedRiskAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'locationBasedRiskAssessmentPrompt',
  input: {schema: LocationBasedRiskAssessmentInputSchema},
  output: {schema: LocationBasedRiskAssessmentOutputSchema},
  prompt: `You are an expert in landslide risk assessment, specializing in the Uttarakhand region. Given the location (latitude: {{{latitude}}}, longitude: {{{longitude}}}), analyze the landslide risk based on the following factors:

- NDVI trends: Analyze recent vegetation health trends.
- Recent rainfall: Assess the impact of recent precipitation.
- Historical alerts: Consider past landslide events in the area.
- Machine learning analysis of satellite data: Use available satellite data and machine learning models to predict the risk.

Based on your analysis, determine the risk level (Low, Medium, High) and provide a detailed explanation of the factors contributing to the risk.

Your assessment should be concise and easy to understand by a general audience.

Risk Level:
Analysis: `,
});

const locationBasedRiskAssessmentFlow = ai.defineFlow(
  {
    name: 'locationBasedRiskAssessmentFlow',
    inputSchema: LocationBasedRiskAssessmentInputSchema,
    outputSchema: LocationBasedRiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
