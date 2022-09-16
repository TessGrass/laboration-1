import { ElectricityRatesProvider } from './energy-price-module/src/index.js'

class TestElectricityPricesModule {
  electricityRatesProvider
  constructor () {
    this.electricityRatesProvider = new ElectricityRatesProvider()
    this.getDataFromAllPublicMethods()
  }

  async getDataFromAllPublicMethods() {
    const zone = 'SE4'
    const watt = 100
    const kilowatt = 500
    const hoursRunning = 24
    const penniesPerKilowatt = 125.00
  
    console.log ({
/*       myComputerInKilowattUsage: this.electricityRatesProvider.calculateWattToKilowatt(watt), */
/* howMuchIsKilowattInMegawatt: this.electricityRatesProvider.calculateKilowattToMegawatt(kilowatt) */
/*  howMuchElectricityDoMyProductUse: this.electricityRatesProvider.calculateConsumedWattToWattHours(watt, hoursRunning), */
/* myDeviceDailyUsageCostInPennies: this.electricityRatesProvider.calculateCostPerDayForProduct(watt, penniesPerKilowatt, hoursRunning) */
/*       electricityPricesForAllAreas: await this.electricityRatesProvider.getHourlyPricesAllBiddingZones(), */
      electricityPricesForSpecificZone: await this.electricityRatesProvider.getHourlyPricesForOneBiddingZone(zone),
/*       sortHoursAccordingToHighestPrice: await this.electricityRatesProvider.sortHoursPerHighestPrice(zone),*/
/* sortHoursAccordingToLowestPrice: await this.electricityRatesProvider.sortHoursPerLowestPrice(zone) */
    })
  }
}
new TestElectricityPricesModule()
