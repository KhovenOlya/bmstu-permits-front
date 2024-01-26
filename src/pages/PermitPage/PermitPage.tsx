import {useEffect} from "react";
import {usePermit} from "../../hooks/permits/usePermit";
import {useNavigate, useParams} from "react-router-dom"
import BuildingCard from "../../components/BuildingCard/BuildingCard";
import "./PermitPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import CustomTimePicker from "../../components/CustomTimePicker/CustomTimePicker";

const PermitPage = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {permit, passege_date, passege_time, person_count, setPassegeTime, setPassegeDate, setPersonCount, fetchPermit, savePermit, sendPermit, deletePermit, setPermit, setPermitId} = usePermit()

    useEffect(() => {

        if (!id || !is_authenticated) {
            navigate("/")
        }

        setPermitId(id)
        fetchPermit(id)

        return () => {
            setPermit(undefined)
            setPersonCount(undefined)
            setPassegeDate(undefined)
            setPassegeTime(undefined)
        };
    }, [])

    if (permit == undefined)
    {
        return (
            <div className="permit-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendPermit = async() => {
        await savePermit()
        await sendPermit()
        navigate("/permits")
    }

    const onDeletePermit = async () => {
        await deletePermit()
        navigate("/buildings")
    }

    const cards = permit.buildings.map(building  => (
        <BuildingCard building={building} key={building.id} />
    ))


    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={savePermit} bg={variables.green}>Сохранить</CustomButton>

                <CustomButton onClick={onSendPermit} bg={variables.primary}>Отправить</CustomButton>

                <CustomButton onClick={onDeletePermit} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = permit.status == 1

    const completed = [3, 4].includes(permit.status)

    return (
        <div className="permit-page-wrapper">

            <div className="permit-buildings-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новый пропуск" :  "Пропуск №" + permit.id}</h3>
                </div>

                <div className="permit-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == permit.status).name}</span>
                    {[2, 3, 4].includes(permit.status) && <span>Кол-во посетителей: {permit.person_count}</span> }
                    {[2, 3, 4].includes(permit.status) && <span>Дата прохождения: {moment(permit.passege_date).locale(ru()).format("D MMMM HH:mm")}</span> }
                    <span>Дата создания: {moment(permit.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(permit.status) && <span>Дата формирования: {moment(permit.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(permit.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                </div>

                <div className="inputs-container">

                    <CustomDatePicker placeholder="Дата прохождения" value={passege_date} setValue={setPassegeDate} disabled={!is_draft}  />
                    <CustomTimePicker placeholder="Время прохождения" value={passege_time} setValue={setPassegeTime} disabled={!is_draft}  />
                    <CustomInput placeholder="Кол-во посетителей" value={person_count} setValue={setPersonCount} disabled={!is_draft}  />

                </div>

                <div className="title">
                    <h3>Корпуса</h3>
                </div>

                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default PermitPage