import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/api/api_URL';


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('X-Requested-With', 'XMLHttpRequest');
      headers.set('Authorization', 'Basic ' + btoa(`gulshan:1234`));
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLocations: builder.query<Location[], void>({
      query: () => '/api/locations',
    }),
    addLocation: builder.mutation<Location, Location>({
      query: (newLocation) => ({
        url: '/api/locations',
        method: 'POST',
        body: newLocation,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const { useGetLocationsQuery, useAddLocationMutation } = apiSlice;