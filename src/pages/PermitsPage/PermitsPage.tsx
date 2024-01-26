import PermitsTable from "./PermitsTable/PermitsTable";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const PermitsPage = () => {    

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/buildings")
        }
    }, [])

    return (
        <div>
            <PermitsTable />
        </div>
    )
}

export default PermitsPage;

