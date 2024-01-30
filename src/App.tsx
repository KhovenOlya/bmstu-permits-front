import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import {useState} from "react";
import Header from "./Components/Header/Header";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import BuildingList from "./Components/BuildingList/BuildingList";
import BuildingPage from "./Components/BuildingPage/BuildingPage";
import {Building} from "./Types";

function App() {

    const [selectedBuilding, setSelectedBuilding] = useState<Building | undefined>(undefined)

    return (
        <div className="App">

            <div className="wrapper">

                <Header />

                <div className={"content-wrapper"}>

                    <BrowserRouter basename="/bmstu-permits-front">

                        <Breadcrumbs selectedBuilding={selectedBuilding} setSelectedBuilding={setSelectedBuilding}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/buildings" replace />} />

                            <Route path="/buildings" element={<BuildingList />} />

                            <Route path="/buildings/:id" element={<BuildingPage selectedBuilding={selectedBuilding} setSelectedBuilding={setSelectedBuilding} />} />

                        </Routes>

                    </BrowserRouter>

                </div>

            </div>

        </div>
    )
}

export default App
