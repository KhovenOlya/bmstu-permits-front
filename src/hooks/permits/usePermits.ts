import {useDispatch, useSelector} from 'react-redux';
import {
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/permits/permitsSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function usePermits() {
	const status = useSelector(state => state.permits.status)
	const date_start = useSelector(state => state.permits.date_start)
	const date_end = useSelector(state => state.permits.date_end)
	const user = useSelector(state => state.permits.user)

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setDateStart = (value) => {
		dispatch(updateDateStart(value))
	}

	const setDateEnd = (value) => {
		dispatch(updateDateEnd(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const searchPermits = async () => {

		const {data} = await api.get(`permits/search/`, {
			params: {
				status: status,
				date_start: new Date(date_start),
				date_end: new Date(date_end)
			},
			headers: {
				'authorization': access_token
			}
		})

		return data.filter(permit => permit.owner.name.includes(user))

	}

	return {
		status,
		date_start,
		date_end,
		setStatus,
		searchPermits,
		setDateStart,
		setDateEnd,
		setUser
	};
}