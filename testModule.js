import { ElectricityRatesProvider } from './energy-price-module/src/index.js'
import { ConverterHandler } from './energy-price-module/src/converterHandler.js'

class TestElectricityPricesModule {
  electricityRatesProvider
  ConverterHandler
  constructor () {
    this.electricityRatesProvider = new ElectricityRatesProvider()
    this.converterHandler = new ConverterHandler()
    this.showDataFromAllPublicMethods()
  }

  /**
   * This is the test module where you can test all the available methods.  
   * Feel free to change the values in the variables.
   * Just comment out the method you have successfully tested.
   */
  async showDataFromAllPublicMethods() {
    const propanePriceInCrowns = 225
    const propaneKg = 11
    const penniesPerKwhPropane = 45
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
    propanePricePerKwhInPennies: this.converterHandler.calculatePropaneKilowattPrice(propanePriceInCrowns, propaneKg),
    hoursPropaneIsCheaperThanElectricity: await this.electricityRatesProvider.getHoursWhenPropaneIsCheaper(penniesPerKwhPropane, zone),
    myComputerInKilowattUsage: this.converterHandler.calculateWattToKilowatt(watt),
    howMuchIsKilowattInMegawatt: this.converterHandler.calculateKilowattToMegawatt(kilowatt),
    convertedWattToWattHours: this.converterHandler.calculateConsumedWattToWattHours(watt, hoursRunning),
    myDeviceDailyUsageCostInPennies: this.converterHandler.calculateConsumtionCostPerDayForProduct(watt, penniesPerKwh, hoursRunning)
    })
  }
}
new TestElectricityPricesModule()
