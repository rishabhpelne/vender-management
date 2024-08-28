import {Route, Routes} from "react-router-dom"
import Login from "./components/login/Login";
import { Registration } from "./components/registration/Registration";
import ServiceRequest from "./components/service-request/ServiceRequest";
import { ServiceRequestItem } from "./components/service-request/service-request-item/service-request-item";
import { NotFound } from "./components/not-found/not-found";
import {Layout} from "./components/layout/layout"
import { NoAccess } from "./components/no-access/no-access";

export function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} ></Route>
            <Route path="/registration" element={
                <Layout>
                    <Registration />
                </Layout>
            } ></Route>
            <Route path="/service-requests" element={
                <Layout>
                    <ServiceRequest />
                </Layout>
            }  ></Route>
            <Route path="/service-request/:id" element={
                <Layout>
                    <ServiceRequestItem />
                </Layout>
            }  ></Route>
            <Route path="/dashboard" element={<Layout />}  ></Route>
            <Route path="/no-access" element={<NoAccess />}  ></Route>
            <Route path="/" element={<Login />} ></Route>
            <Route path="*" element={<NotFound />} ></Route>
        </Routes>
    )
}