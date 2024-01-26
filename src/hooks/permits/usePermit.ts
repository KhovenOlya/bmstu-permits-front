import {useDispatch, useSelector} from 'react-redux';
import {
	updatePermit,
	updatePermitId,
	updatePassegeDate,
	updatePersonCount, updatePassegeTime
} from "../../store/permits/permitSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";
import {useNavigate} from "react-router-dom"

export function usePermit() {

	const {access_token} = useToken()

	const permit = useSelector(state => state.permit.permit)
	const permit_id = useSelector(state => state.permit.permit_id)
	const passege_date = useSelector(state => state.permit.passege_date)
	const passege_time = useSelector(state => state.permit.passege_time)
	const person_count = useSelector(state => state.permit.person_count)

	const navigate = useNavigate()

	const is_draft = permit?.status == 1

	const dispatch = useDispatch()

	const setPermit = (value) => {
		dispatch(updatePermit(value))
	}

	const setPassegeDate = (value) => {
		dispatch(updatePassegeDate(value))
	}

	const setPassegeTime = (value) => {
		dispatch(updatePassegeTime(value))
	}

	const setPersonCount = (value) => {
		dispatch(updatePersonCount(value))
	}

	const setPermitId = (value) => {
		dispatch(updatePermitId(value))
	}

	const sendPermit = async () => {

		const response = await api.put(`permits/${permit.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setPermit(undefined)
			setPersonCount(undefined)
			setPassegeDate(undefined)
			setPassegeTime(undefined)
		}
	}

	const deletePermit = async () => {

		const response = await api.delete(`permits/${permit.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setPermit(undefined)
			setPersonCount(undefined)
			setPassegeDate(undefined)
			setPassegeTime(undefined)
		}

	}

	const savePermit = async () => {

		const form_data = new FormData()

		if (passege_date && passege_time) {
			form_data.append('passege_date', passege_date + " " + passege_time)
		}

		form_data.append('person_count', person_count)

		await api.put(`permits/${permit.id}/update/`, form_data, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchPermit = async (permit_id) => {

		const {data} = await api.get(`permits/${permit_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setPermit(data)
		setPersonCount(data["person_count"])
		setPassegeDate(data["passege_date"].split("T")[0])
		setPassegeTime(data["passege_date"].split("T")[1].split("+")[0])
	}

	const addBuildingToPermit = async (building) => {
		await api.post(`buildings/${building.id}/add_to_permit/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const deleteBuildingFromPermit = async (building) => {
		const response = await api.delete(`permits/${permit.id}/delete_building/${building.id}/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200) {
			await fetchPermit(permit_id)
		} else if (response.status == 201) {
			navigate("/")
		}
	}

	return {
		permit,
		permit_id,
		is_draft,
		passege_date,
		passege_time,
		person_count,
		setPermit,
		setPassegeDate,
		setPassegeTime,
		setPersonCount,
		savePermit,
		sendPermit,
		deletePermit,
		fetchPermit,
		addBuildingToPermit,
		deleteBuildingFromPermit,
		setPermitId
	};
}