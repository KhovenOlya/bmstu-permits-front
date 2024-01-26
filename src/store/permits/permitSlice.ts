import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	permit: undefined,
	permit_id: undefined,
	passege_date: undefined,
	passege_time: undefined,
	person_count: undefined
};

const permitSlice = createSlice({
	name: 'permit',
	initialState: initialState,
	reducers: {
		updatePermit(state, action) {
			state.permit = action.payload
		},
		updatePassegeDate(state, action) {
			state.passege_date = action.payload
		},
		updatePassegeTime(state, action) {
			state.passege_time = action.payload
		},
		updatePersonCount(state, action) {
			state.person_count = action.payload
		},
		updatePermitId(state, action) {
			state.permit_id = action.payload
		}
	}
})

export const {
	updatePermit,
	updatePassegeDate,
	updatePassegeTime,
	updatePersonCount,
	updatePermitId
} = permitSlice.actions;

export default permitSlice.reducer;