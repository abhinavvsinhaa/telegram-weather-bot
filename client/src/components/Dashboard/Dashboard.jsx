import { BotConfiguration } from "../BotConfiguration/BotConfiguration";
import { SubscribedUsers } from "../SubscribedUsers/SubcribedUsers";

export const Dashboard = () => {
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