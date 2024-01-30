import "./BuildingAddPage.sass"
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import mock from "/src/assets/default.png"
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const BuildingAddPage = () => {

    const {access_token} = useToken()

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [location, setAddress] = useState("")
    const [open_hours, setOpenHours] = useState("")
    const [close_hours, setCloseHours] = useState("")

    const [imgFile, setImgFile] = useState<File | undefined>()
    const [imgURL, setImgURL] = useState<string | undefined>(mock)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImgFile(img)
            setImgURL(URL.createObjectURL(img))
        }
    }

    const addBuilding = async () => {

        const response = await api.post(`buildings/create/`, {}, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200){
            const building_id = response.data["id"]
            await updateBuilding(building_id)
        }

    }

    const updateBuilding = async (building_id) => {

        const form_data = new FormData()

        form_data.append('name', name)
        form_data.append('location', location)
        form_data.append('open_hours', open_hours)
        form_data.append('close_hours', close_hours)

        if (imgFile != undefined) {
            form_data.append('image', imgFile, imgFile.name)
        }

        const response = await api.put(`buildings/${building_id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200){
            navigate("/buildings/")
        }
    }


    return (
        <div className="add-page-wrapper">
            <div className="left">

                <img src={imgURL} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={name} setValue={setName} />

                    <CustomTextarea placeholder="Адрес" value={location} setValue={setAddress} />

                    <CustomInput placeholder="Часы открытия" value={open_hours} setValue={setOpenHours} />

                    <CustomInput placeholder="Часы закрытия" value={close_hours} setValue={setCloseHours} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={addBuilding}>
                            Создать
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default BuildingAddPage