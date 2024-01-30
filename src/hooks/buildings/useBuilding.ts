import {useDispatch, useSelector} from 'react-redux';
import {
	updateBuilding,
	updateName,
	updateAddress,
	updateOpenHours,
	updateImage, updateCloseHours
} from "../../store/buildings/buildingSlice";
import {api} from "../../utils/api";

export function useBuilding() {
	const building = useSelector(state => state.building.building);

	const dispatch = useDispatch()

	const setBuilding = (value) => {
		dispatch(updateBuilding(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setAddress = (value) => {
		dispatch(updateAddress(value))
	}

	const setOpenHours = (value) => {
		dispatch(updateOpenHours(value))
	}

	const setCloseHours = (value) => {
		dispatch(updateCloseHours(value))
	}

	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const fetchBuilding = async (id) => {

		const {data} = await api.get(`buildings/${id}`);

		setBuilding(data)

	};

	return {
		building,
		setBuilding,
		fetchBuilding,
		setName,
		setAddress,
		setOpenHours,
		setCloseHours,
		setImage
	};
}