import "./BuildingEditPage.sass"
import {useParams, useNavigate} from "react-router-dom";
import {useBuilding} from "../../hooks/buildings/useBuilding";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const BuildingEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const { id } = useParams<{id: string}>();

    const {
        building,
        fetchBuilding,
        setName,
        setAddress,
        setOpenHours,
        setCloseHours,
        setImage
    } = useBuilding()

    useEffect(() => {
        id && fetchBuilding(id)
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setImage(URL.createObjectURL(img))
        }
    }

    const saveBuilding = async() => {
        let form_data = new FormData()

        form_data.append('name', building.name)
        form_data.append('location', building.location)
        form_data.append('open_hours', building.open_hours)
        form_data.append('close_hours', building.close_hours)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`buildings/${building.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/buildings/")
        }
    }

    const deleteBuilding = async () => {

        const response = await api.delete(`buildings/${building.id}/delete/`, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/buildings/")
        }

    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (building == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={building.image} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={building.name} setValue={setName} />

                    <CustomTextarea placeholder="Адрес" value={building.location} setValue={setAddress} />

                    <CustomInput placeholder="Часы открытия" value={building.open_hours} setValue={setOpenHours} />
                    
                    <CustomInput placeholder="Часы закрытия" value={building.close_hours} setValue={setCloseHours} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={saveBuilding}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={deleteBuilding}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default BuildingEditPage