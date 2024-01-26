import "./BuildingPage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useBuilding} from "../../hooks/buildings/useBuilding";

const BuildingPage = () => {

    const { id } = useParams<{id: string}>();
    
    const {building, fetchBuilding, setBuilding} = useBuilding()
    
    useEffect(() => {
        id && fetchBuilding(id)
        return () => {
            setBuilding(undefined)
        }
    }, [])

    if (building == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8001/api/buildings/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">
                    
                    <h2>{building?.name}</h2> <br/>

                    <span>Адрес: {building?.location}</span><br/>

                    <span>Режим работы: С {building?.open_hours} до {building?.close_hours}</span>

                </div>
                
            </div>

        </div>
    )
}

export default BuildingPage;