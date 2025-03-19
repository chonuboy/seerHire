import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchQueries } from "@/lib/models/candidate";

const initialState: SearchQueries = {
  techRole: null,
  minExperience: null,
  maxExperience: null,
  currentLocation: null,
  minSalary: null,
  maxSalary: null,
  noticePeriod: null,
  preferredJobType: null,
  highestEducation: null,
  preferredLocation: null,
  domain: null,
  mustHaveTechnologies: null,
  goodToHaveTechnologies: null,
  companies: null,
}


const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<SearchQueries>) => {
      Object.assign(state, action.payload); // Ensure state is properly updated
    },
    clearSearchQuery: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setSearchQuery, clearSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;