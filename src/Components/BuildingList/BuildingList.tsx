import "./BuildingList.sass"
import SearchBar from "../SearchBar/SearchBar";
import React, {useEffect, useState} from "react";
import BuildingCard from "./BuildingCard/BuildingCard";
import {iBuildingsMock, requestTime} from "../../Consts";
import {Building} from "../../Types";

const BuildingList = () => {

    const [buildings, setBuildings] = useState<Building[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchBuildings = async () => {

        try {

            const response = await fetch(`http://127.0.0.1:8001/api/buildings/search/?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const raw = await response.json()
            const buildings = raw["buildings"]

            setBuildings(buildings)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setBuildings(iBuildingsMock.filter(building => building.name.toLowerCase().includes(query.toLowerCase())))

    }

    useEffect(() => {
        searchBuildings()
    }, [])

    const cards = buildings.map(building  => (
        <BuildingCard building={building} key={building.id} isMock={isMock}/>
    ))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await searchBuildings()
    }

    return (
        <div className="cards-list-wrapper">

            <form className="top" onSubmit={handleSubmit}>

                <h2>Корпуса МГТУ им.Н.Э.Баумана</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </form>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default BuildingList;