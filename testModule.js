import { DayAheadElectricityPrices } from './energy-price-module/src/index.js'

class TestElectricityPricesModule {
  #dayAheadElectricityPrices
  constructor () {
    this.#dayAheadElectricityPrices = new DayAheadElectricityPrices()
    this.getDataFromAllPublicMethods()
  }

  async getDataFromAllPublicMethods() {
    const zone = 'SE4'
    const watt = 100
    const kiloWatt = 500
    const hoursRunning = 24
    const pricePerKiloWatt = 1.25
    console.log ({
      /* myComputerInKilowattUsage: this.#dayAheadElectricityPrices.calculateWattToKilowatt(watt),  */
        /* howMuchIsKiloWattInMegaWatt: this.#dayAheadElectricityPrices.calculateKiloWattToMegaWatt(kiloWatt),  */
/*         howMuchElectricityDoMyProductUse: this.#dayAheadElectricityPrices.calculateConsumedWattToWattHours(watt, hours), */
/*   getTheDailySekCostForMyProduct: this.#dayAheadElectricityPrices.calculateCostPerDayForProduct(watt, pricePerKiloWatt, hoursRunning) */
    /* electricityPricesForAllAreas: await this.#dayAheadElectricityPrices.getHourlyPricesAllBiddingZones(), */
    electricityPricesForSpecificZone: await this.#dayAheadElectricityPrices.getHourlyPricesForOneBiddingZone(zone)
    /* sortHoursAccordingToHighestPrice: await this.#dayAheadElectricityPrices.sortHoursPerHighestPrice(zone) */
   /*  sortHoursAccordingToLowestPrice: await this.#dayAheadElectricityPrices.sortHoursPerLowestPrice(zone) */
      
    })
  }
}
new TestElectricityPricesModule()
