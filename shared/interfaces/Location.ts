export interface Location {
  id?: number;
  lng: number;
  lat: number;
  postCode?: string | null;
  city?: string | null;
  district?: string | null;
  state?: string | null;
  country?: string | null;
  placeName: string;
}
