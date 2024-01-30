import CustomTable from "../../../../components/CustomTable/CustomTable";
import {useCustomTable} from "../../../../hooks/other/useCustomTable";
import {useNavigate } from "react-router-dom";
import BuildingsFilters from "../../BuildingsFilters/BuildingsFilters";

const BuildingsTable = ({isLoading, data, isSuccess, refetch}) => {

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Название",
            accessor: "name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Часы открытия",
            accessor: "open_hours",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Часы закрытия",
            accessor: "close_hours",
            Cell: ({ value }) => { return value }
        }
    ]

    const navigate = useNavigate()

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

    const openEditCityPage = (building_id) => {
        navigate(`/buildings/${building_id}/edit`)
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openEditCityPage}
            >
                <BuildingsFilters refetch={refetch} />
            </CustomTable>

        </div>

    )
}

export default BuildingsTable