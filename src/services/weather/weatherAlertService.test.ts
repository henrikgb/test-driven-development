import { createWeatherAlertService } from '../../../src/services/weather/weatherAlertService';
import { WeatherData, WeatherService, Condition } from '../../../src/services/weather/weatherAlertService';

function createWeatherServiceStub(): WeatherService & { setWeather: (temperature: number, conditions: Condition) => void } {
    let temperature: number = 20;
    let conditions: Condition = "sunny";

    return {
        // Not part of the interface.  Used in testing to stub out the results
        // of getCurrentWeather
        setWeather(temp: number, cond: Condition) {
            temperature = temp;
            conditions = cond;
        },

        async getCurrentWeather(_location: string): Promise<WeatherData> {
            return {
                temperature,
                conditions
            };
        }
    };
}

describe('WeatherAlertService', () => {
    let weatherService: ReturnType<typeof createWeatherServiceStub>;
    let alertService: ReturnType<typeof createWeatherAlertService>;

    beforeEach(() => {
        weatherService = createWeatherServiceStub();
        alertService = createWeatherAlertService(weatherService);
    });

    it('should return heat warning when temperature is above 35', async () => {
        // Arrange
        weatherService.setWeather(36, "sunny");

        // Act
        const result = await alertService.shouldSendAlert("London");

        // Assert
        expect(result).toBe("Extreme heat warning. Stay hydrated!");
    });

    it('should return freezing warning when temperature is below 0', async () => {
        // Arrange
        weatherService.setWeather(-2, "clear");

        // Act
        const alert = await alertService.shouldSendAlert("London");

        // Assert
        expect(alert).toBe("Freezing conditions. Watch for ice!");
    });

    it('should return storm warning when conditions include storm', async () => {
        // Arrange
        weatherService.setWeather(20, "thunderstorm");

        // Act
        const alert = await alertService.shouldSendAlert("London");

        // Assert
        expect(alert).toBe("Storm warning. Stay indoors if possible!");
    });
    
    it('should return null for normal weather conditions', async () => {
        // Arrange
        weatherService.setWeather(20, "sunny");

        // Act
        const alert = await alertService.shouldSendAlert("London");

        // Assert
        expect(alert).toBeNull();
    });
});
