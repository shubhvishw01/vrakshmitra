import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔥 Async Thunk: Fetch Events
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async () => {
    const res = await fetch("/events.json");  // 👉 API URL
    const data = await res.json();
    return data;
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
        state.past = action.payload.pastEvents;
        state.upcoming = action.payload.upcomingEvents;
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch events";
      });
  },
});

export default eventsSlice.reducer;
