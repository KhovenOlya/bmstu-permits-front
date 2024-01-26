import {useDispatch, useSelector} from 'react-redux';
import {
	updateBuildings,
	updateQuery
} from "../../store/buildings/buildingsSlice";
import {api} from "../../utils/api";
import {usePermit} from "../permits/usePermit";
import {useToken} from "../users/useToken";

export function useBuildings() {
	const buildings = useSelector(state => state.buildings.buildings);
	const query = useSelector(state => state.buildings.query);

	const {access_token} = useToken()

	const {setPermitId} = usePermit()

	const dispatch = useDispatch()

	const setBuildings = (value) => {
		dispatch(updateBuildings(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchBuildings = async () => {

		const {data} = await api.get(`buildings/search/`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_permit_id = data["draft_permit_id"]
		setPermitId(draft_permit_id)

		return data["buildings"]
	}

	const deleteBuilding = async (building) => {
		await api.delete(`buildings/${building.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})
	}

	return {
		buildings,
		setBuildings,
		query,
		setQuery,
		searchBuildings,
		deleteBuilding
	};
}