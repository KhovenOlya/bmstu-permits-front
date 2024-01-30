import {configureStore} from "@reduxjs/toolkit";

import buildingReducer from "./buildings/buildingSlice"
import draftPermitReducer from "./permits/permitSlice"
import authReducer from "./users/authSlice"
import permitsReducer from "./permits/permitsSlice"
import buildingsReducer  from "./buildings/buildingsSlice"

export default configureStore({
	reducer: {
		building: buildingReducer,
		buildings: buildingsReducer,
		permit: draftPermitReducer,
		permits: permitsReducer,
		user: authReducer
	}
});