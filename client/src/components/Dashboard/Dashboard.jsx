import { BotConfiguration } from "../BotConfiguration/BotConfiguration";
import { SubscribedUsers } from "../SubscribedUsers/SubcribedUsers";

export const Dashboard = () => {
    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-inner-wrapper">
                <BotConfiguration />
                <p className="h-12"></p>
                <SubscribedUsers />
            </div>
        </div>
    );
}