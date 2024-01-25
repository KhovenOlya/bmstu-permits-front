import "./BuildingPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iBuildingsMock, requestTime} from "../../Consts";
import {Building} from "../../Types";
import mockImage from "/src/assets/mock.png"

const BuildingPage = ({ selectedBuilding, setSelectedBuilding }: { selectedBuilding:Building | undefined, setSelectedBuilding: Dispatch<Building| undefined>}) => {

    const { id } = useParams<{id: string}>();

    if (id == undefined){
        return;
    }

    const [isMock, setIsMock] = useState<boolean>(false);

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8001/api/buildings/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const building: Building = await response.json()

            setSelectedBuilding(building)

            setIsMock(false)
            
        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedBuilding(iBuildingsMock.find((building:Building) => building?.id == parseInt(id)))
        setIsMock(true)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : selectedBuilding?.image} />

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{selectedBuilding?.name}</h2> <br/>

                    <span>Адрес: {selectedBuilding?.location}</span><br/>

                    <span>Режим работы: С {selectedBuilding?.open_hours} до {selectedBuilding?.close_hours}</span>

                </div>

            </div>

        </div>
    )
}

export default BuildingPage;