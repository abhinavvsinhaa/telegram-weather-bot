export const BotConfiguration = () => {
    return (
        <div className="bot-config-wrapper">
            <div className="bot-config-inside-wrapper">
                <h3 className="text-lg font-bold mb-2">Bot configuration</h3>
                <p className="text-gray-500">You can update your API key by creating a new key at 
                    <a href="https://www.weatherapi.com/docs/" className="text-blue-600"> WeatherAPI</a>
                </p>
                <input type="text" name="apikey" id="apikey" placeholder="New Weather API Key" className="mt-2"/>
                <button className="ml-3 update-btn">Update</button>
            </div>
        </div>
    );
}