import { createSlice, createSelector } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

const initData = [
  {
    id: "id-1",
    name: "Rosie Simpson",
    number: "459-12-56",
  },
  {
    id: "id-2",
    name: "Hermione Kline",
    number: "443-89-12",
  },
  {
    id: "id-3",
    name: "Eden Clements",
    number: "645-17-79",
  },
  {
    id: "id-4",
    name: "Annie Copeland",
    number: "227-91-26",
  },
];

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: initData,
    loading: false,
    error: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addContact.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        state.loading = false;
      })
      .addCase(deleteContact.rejected, (state) => {
        state.error = true;
        state.loading = false;
      }),
  reducers: null,
});

export const selectContacts = (s) => s.contacts.items;
export const selectLoading = (s) => s.contacts.loading;
export const selectError = (s) => s.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, valueFilter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(valueFilter.toLowerCase())
    );
  }
);

export const contactsReducer = contactsSlice.reducer;
