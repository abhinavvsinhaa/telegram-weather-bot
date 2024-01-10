import { useNavigate } from "react-router-dom";
import { BotConfiguration } from "../BotConfiguration/BotConfiguration";
import { SubscribedUsers } from "../SubscribedUsers/SubcribedUsers";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../App";

export const Dashboard = () => {
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (token === '') navigate('/login')
    }, [])

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-inner-wrapper">
                <h2 className="text-3xl font-extrabold">Dashboard</h2>
                <p className="h-12"></p>
                <BotConfiguration />
                <p className="h-12"></p>
                <SubscribedUsers />
            </div>
        </div>
    );
}