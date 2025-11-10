import type { WeatherService } from "./../../types/weatherTypes";

export class WeatherAlertService {
    constructor(private weatherService: WeatherService) {}

    async shouldSendAlert(location: string): Promise<string | null> {
        const weather = await this.weatherService.getCurrentWeather(location);

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
}