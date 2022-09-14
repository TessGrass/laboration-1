import { DayAheadElectricityPrices } from './energy-price-module/src/index.js'

class TestElectricityPricesModule {
  #dayAheadElectricityPrices
  constructor () {
    this.#dayAheadElectricityPrices = new DayAheadElectricityPrices()
    this.getDataFromAllPublicMethods()
  }

  async getDataFromAllPublicMethods() {
    const zone = 'SE3'
    console.log ({
    /* myComputerInKilowattUsage: this.#dayAheadElectricityPrices.convertWattToKilowatt('300'),  */
    /* electricityPricesForAllAreas: await this.#dayAheadElectricityPrices.getHourlyPricesAllBiddingZones(), */
    /* electricityPricesForSpecificZone: await this.#dayAheadElectricityPrices.getHourlyPricesForOneBiddingZone('SE1') */
    /* sortHoursAccordingToHighestPrice: await this.#dayAheadElectricityPrices.sortHoursPerHighestPrice(zone) */
    /* getWattHours: this.#dayAheadElectricityPrices.calculateConsumedWattToWattHours(300, 5) */
        getTheDailySekCostForMyProduct: this.#dayAheadElectricityPrices.calculateCostPerDayForProduct(200, 5, 3) 
      
    })
  }
}
new TestElectricityPricesModule()
