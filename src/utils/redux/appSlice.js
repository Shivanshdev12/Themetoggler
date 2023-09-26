import {createSlice} from "@reduxjs/toolkit";

const initialState = {theme: "light", tasklist: [], filteredtaskList: []};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    themeToggler: (state, action) => {
      if (action.payload === true) {
        state.theme = "dark";
      } else state.theme = "light";
    },
    addTask: (state, action) => {
      state.tasklist.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasklist.splice(action.payload.index, 1);
    },
    filterTask: (state, action) => {
      if (action.payload === "Completed") {
        state.filteredtaskList = state.tasklist.filter((task) => {
          return task.status === "Completed";
        });
      } else if (action.payload === "Pending") {
        state.filteredtaskList = state.tasklist.filter((task) => {
          return task.status === "Pending";
        });
      } else {
        state.filteredtaskList = state.tasklist;
      }
    },
  },
});

export const appActions = appSlice.actions;

export default appSlice;
