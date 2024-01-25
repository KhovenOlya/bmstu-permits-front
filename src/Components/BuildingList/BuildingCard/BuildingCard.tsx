import "./BuildingCard.sass"
import {Building} from "../../../Types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.png"

const BuildingCard = ({ building, isMock }: {building:Building, isMock:boolean }) => {

    const img = `http://127.0.0.1:8001/api/buildings/${building.id}/image/`

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : img} />
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {building.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/buildings/${building.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default BuildingCard;