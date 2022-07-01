export interface Location {
  id?: number;
  lng?: number;
  lat?: number;
  postcode?: string | null;
  city?: string | null;
  district?: string | null;
  state?: string | null;
  country?: string | null;
  place_name?: string;
}
