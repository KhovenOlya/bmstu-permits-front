import "./BuildingCard.sass"
import {Building} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {usePermit} from "../../hooks/permits/usePermit";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";
import {useBuildings} from "../../hooks/buildings/useBuildings";

const BuildingCard = ({ building, refetch }: {building:Building}) => {

    const {is_authenticated, is_moderator} = useAuth()

    const {is_draft, addBuildingToPermit, deleteBuildingFromPermit} = usePermit()

    const {deleteBuilding} = useBuildings()

    const handleAddBuilding = async (e) => {
        e.preventDefault()
        await addBuildingToPermit(building)
        refetch()
    }

    const handleDeleteBuildingFromPermit = async (e) => {
        e.preventDefault()
        await deleteBuildingFromPermit(building)
    }

    const handleDeleteBuilding = async (e) => {
        e.preventDefault()
        await deleteBuilding(building)
        refetch()
    }

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={building.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {building.name} </h3>

                </div>

                <div className="content-bottom">

                    {!is_moderator &&
                        <Link to={`/buildings/${building.id}`}>
                            <CustomButton bg={variables.primary}>
                                Подробнее
                            </CustomButton>
                        </Link>
                    }
                    
                    {is_authenticated && !is_moderator && location.pathname.includes("buildings") &&
                        <CustomButton onClick={handleAddBuilding} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("permits") &&
                        <CustomButton onClick={handleDeleteBuildingFromPermit} bg={variables.red}>Удалить</CustomButton>
                    }

                    {is_authenticated && is_moderator && location.pathname.includes("buildings") &&
                        <Link to={`/buildings/${building.id}/edit`}>
                            <CustomButton bg={variables.primary}>Редактировать</CustomButton>
                        </Link>
                    }

                    {is_authenticated && is_moderator && location.pathname.includes("buildings") &&
                        <CustomButton onClick={handleDeleteBuilding} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default BuildingCard;