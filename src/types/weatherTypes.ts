export type Condition = "sunny" | "clear" | "thunderstorm";

export interface WeatherData {
    temperature: number;
    conditions: Condition;
}

export interface WeatherService {
    getCurrentWeather(location: string): Promise<WeatherData>;
}