import {useEffect} from "react";
import LocalStorageService from "../../../logic/localStorageAuth.ts";

const BusinessDashBoard = () => {
    const localStorage = LocalStorageService.getInstance()
    useEffect(() => {
        if (!localStorage.readBusinessAdminToken('BusinessToken')) {
            window.location.href = '/auth/create-admin';
        }
    }, [localStorage])

    return (
        <div>
            <h1>Business Dashboard</h1>
        </div>
    );
}


export default BusinessDashBoard;