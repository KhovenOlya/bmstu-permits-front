import React from "react";
import "./PermitsTable.sass"
import {STATUSES, variables} from "/src/utils/consts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import {usePermits} from "../../../hooks/permits/usePermits";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useNavigate} from "react-router-dom"
import PermitsFilters from "../PermitsFilters/PermitsFilters";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {useAuth} from "../../../hooks/users/useAuth";
import {useToken} from "../../../hooks/users/useToken";
import {api} from "../../../utils/api";

const PermitsTable = () => {

    const {access_token} = useToken()

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const {searchPermits} = usePermits()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
        },
        {
            Header: "Пользователь",
            accessor: "owner",
            Cell: ({ value }) => { return value.name }
        },
        {
            Header: "Дата формирования",
            accessor: "date_formation",
            Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
        }
    ]

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["permits"],
        () => searchPermits(),
        {
            refetchInterval: 2000,
            refetchOnWindowFocus: false,
            cacheTime: 0,
            keepPreviousData: false,
        }
    );

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const handleClick = (permit_id) => {
        navigate(`/permits/${permit_id}`)
    }

    return (
        <div className="permits-table-wrapper">

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={handleClick}
            >
                <PermitsFilters refetch={refetch}/>
            </CustomTable>

        </div>
    )
}

export default PermitsTable