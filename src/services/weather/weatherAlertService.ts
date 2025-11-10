export type Condition = "sunny" | "clear" | "thunderstorm";

export interface WeatherData {
    temperature: number;
    conditions: Condition;
}

export interface WeatherService {
    getCurrentWeather(location: string): Promise<WeatherData>;
}

export function createWeatherAlertService(weatherService: WeatherService) {
    return {
        async shouldSendAlert(location: string): Promise<string | null> {
            const weather = await weatherService.getCurrentWeather(location);

            if (weather.temperature > 35) {
                return "Extreme heat warning. Stay hydrated!";
            }

            if (weather.temperature < 0) {
                return "Freezing conditions. Watch for ice!";
            }

            if (weather.conditions.toLowerCase().includes("storm")) {
                return "Storm warning. Stay indoors if possible!";
            }

            return null;
        }
    };
}