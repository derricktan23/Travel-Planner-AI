import axios from 'axios';

export interface PlannerResponse {
  itinerary?: string;
  weather?: string;
  activities?: string;
  packing_list?: string[];
  food?: string;
  links?: string[];
  error?: string;
}

export async function getItinerary(
  destination: string,
  days: number,
  preferences: string[]
): Promise<PlannerResponse> {
  try {
    const response = await axios.post<PlannerResponse>('http://localhost:8000/itinerary', {
      destination,
      days,
      preferences,
    });
    return response.data;
  } catch (error: any) {
    return { error: error.message || 'Unknown error occurred' };
  }
}