import "./styles/Main.sass"
import "./styles/Reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import BuildingPage from "./pages/BuildingPage/BuildingPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import PermitConstructor from "./components/PermitConstructor/PermitConstructor";
import PermitPage from "./pages/PermitPage/PermitPage";
import PermitsPage from "./pages/PermitsPage/PermitsPage";
import BuildingsList from "./pages/BuildingsPage/BuildingsList/BuildingsList";


const TopPanelWrapper = () => {

    const {is_authenticated} = useAuth()

    const location = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && location.pathname.endsWith("buildings") && <PermitConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/bmstu">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/buildings" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/buildings" element={<BuildingsList />} />

                                    <Route path="/buildings/:id" element={<BuildingPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/permits/:id" element={<PermitPage />} />

                                    <Route path="/permits" element={<PermitsPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                </Routes>

                            </div>

                        </div>

                    </div>

                </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App
