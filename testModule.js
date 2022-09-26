import { ElectricityRatesProvider } from './energy-price-module/src/index.js'

class TestElectricityPricesModule {
  electricityRatesProvider
  constructor () {
    this.electricityRatesProvider = new ElectricityRatesProvider()
    this.showDataFromAllPublicMethods()
  }

  /**
   * This is the test module where you can test all the available methods.  
   * Fell free to change the values in the variables.
   * Just comment out the method you have successfully tested.
   */
  async showDataFromAllPublicMethods() {
    const propanePriceInCrowns = 225
    const propaneKg = 11
    const penniesPerKwhPropane = 159.8
    const zone = 'SE3'
    const watt = 100
    const kilowatt = 5
    const hoursRunning = 24
    const penniesPerKwh = 125.00
    
    console.log ({
    electricityPricesForAllAreas: await this.electricityRatesProvider.getHourlyPricesAllBiddingZones(),
    electricityPricesForSpecificZone: await this.electricityRatesProvider.getHourlyPricesForOneBiddingZone(zone),
    sortHoursAccordingToHighestPrice: await this.electricityRatesProvider.sortHoursPerHighestPrice(zone),
    sortHoursAccordingToLowestPrice: await this.electricityRatesProvider.sortHoursPerLowestPrice(zone),
    propanePricePerKwhInPennies: this.electricityRatesProvider.calculatePropaneKilowattPrice(propanePriceInCrowns, propaneKg),
    hoursPropaneIsCheaperThanElectricity: this.electricityRatesProvider.getHoursWhenPropaneIsCheaper(penniesPerKwhPropane, zone),
    myComputerInKilowattUsage: this.electricityRatesProvider.calculateWattToKilowatt(watt),
    howMuchIsKilowattInMegawatt: this.electricityRatesProvider.calculateKilowattToMegawatt(kilowatt),
    convertedWattToWattHours: this.electricityRatesProvider.calculateConsumedWattToWattHours(watt, hoursRunning),
    myDeviceDailyUsageCostInPennies: this.electricityRatesProvider.calculateConsumtionCostPerDayForProduct(watt, penniesPerKwh, hoursRunning)
    })
  }
}
new TestElectricityPricesModule()
