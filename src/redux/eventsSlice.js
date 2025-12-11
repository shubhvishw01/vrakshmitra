import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔥 Fetch Both Previous + Upcoming Events
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async () => {
    const [pastRes, upcomingRes] = await Promise.all([
      fetch("http://localhost:5000/api/admin/previous"),
      fetch("http://localhost:5000/api/admin/upcoming"),
    ]);

    const pastData = await pastRes.json();
    const upcomingData = await upcomingRes.json();

    return {
      past: Array.isArray(pastData) ? pastData : [],
      upcoming: Array.isArray(upcomingData) ? upcomingData : [],
    };
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    past: [],
    upcoming: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.past = action.payload.past;
        state.upcoming = action.payload.upcoming;
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch events";
      });
  },
});

export default eventsSlice.reducer;
