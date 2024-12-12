import apiClient from "./index";
import axios, { AxiosResponse } from "axios";
// Define Types for Responses
type FacilitySchema = {
  id: number;
  large_class_name: string;
  middle_class_name: string;
  facility_name: string;
  telephone: string;
  homepage: string;
  additional_description: string;
  address: {
    address: string;
    city_name: string;
    district_name: string;
    latitude: number;
    longitude: number;
    distance_km: number;
  };
};

interface Address {
  address: string;
  district_name: string;
  latitude: number;
  longitude: number;
  distance_km: number;
}

// Event Schema
interface EventSchema {
  id: number;
  class_name: string;
  event_name: string;
  start_date: string; // Use Date if you want to parse it into a JavaScript Date object
  end_date: string; // Use Date if you want to parse it into a JavaScript Date object
  organizer: string;
  price: number | null;
  description: string | null;
  homepage: string | null;
  additional_description: string | null;
  address: Address;
}

type APIError = {
  detail: string;
};

// Define API Request Functions

export const fetchFacilitiesNearby = async (
  lat?: number,
  lon?: number,
  city?: string,
  district?: string,
  offset: number = 10
): Promise<FacilitySchema[]> => {
  try {
    const response: AxiosResponse<FacilitySchema[]> = await apiClient.get(
      `/facilities-nearby`,
      {
        params: {
          lat,
          lon,
          city,
          district,
          offset,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error:", error.response.data as APIError);
    } else {
      console.error("Unknown Error:", error);
    }
    throw error;
  }
};

export const fetchEventsNearby = async (
  lat: number,
  lon: number,
  offset: number = 10
): Promise<EventSchema[]> => {
  try {
    const response: AxiosResponse<EventSchema[]> = await apiClient.get(
      `/events-nearby`,
      {
        params: {
          lat,
          lon,
          offset,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error:", error.response.data as APIError);
    } else {
      console.error("Unknown Error:", error);
    }
    throw error;
  }
};
