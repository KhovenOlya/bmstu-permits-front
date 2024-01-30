import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	building: undefined,
};

const buildingSlice = createSlice({
	name: 'building',
	initialState: initialState,
	reducers: {
		updateBuilding(state, action) {
			state.building = action.payload
		},
		updateName(state, action) {
			state.building.name = action.payload
		},
		updateAddress(state, action) {
			state.building.location = action.payload
		},
		updateOpenHours(state, action) {
			state.building.open_hours = action.payload
		},
		updateCloseHours(state, action) {
			state.building.close_hours = action.payload
		},
		updateImage(state, action) {
			state.building.image = action.payload
		}
	}
})

export const {
	updateBuilding,
	updateName,
	updateAddress,
	updateOpenHours,
	updateCloseHours,
	updateImage
} = buildingSlice.actions;

export default buildingSlice.reducer;