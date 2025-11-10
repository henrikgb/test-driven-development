import { WeatherAlertService } from '../../../src/services/weather/weatherAlertService';
import type { WeatherService, Condition } from '../../types/weatherTypes'; 
import { WeatherData } from '../../types/weatherTypes'; 

class WeatherServiceStub implements WeatherService {
    private temperature: number = 20;
    private conditions: Condition = "sunny";

    // Not part of the interface.  Used in testing to stub out the results
    // of getCurrentWeather
    setWeather(temperature: number, conditions: Condition) {
        this.temperature = temperature;
        this.conditions = conditions;
    }

    async getCurrentWeather(_location: string): Promise<WeatherData> {
        return {
            temperature: this.temperature,
            conditions: this.conditions
        };
    }
}

describe('WeatherAlertService', () => {
    let weatherService: WeatherServiceStub;
    let alertService: WeatherAlertService;

    beforeEach(() => {
        weatherService = new WeatherServiceStub();
        alertService = new WeatherAlertService(weatherService);
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
