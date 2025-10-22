"use server";

import { assessLandslideRisk } from "@/ai/flows/real-time-landslide-risk";
import type { LandslideRiskInput, LandslideRiskOutput } from "@/ai/flows/real-time-landslide-risk";

export async function getLandslideRiskAssessment(
  input: LandslideRiskInput
): Promise<{ data: LandslideRiskOutput | null; error: string | null }> {
  try {
    const result = await assessLandslideRisk(input);
    return { data: result, error: null };
  } catch (e: any) {
    console.error("Error in getLandslideRiskAssessment action:", e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { data: null, error: `Failed to get risk assessment: ${errorMessage}` };
  }
}
