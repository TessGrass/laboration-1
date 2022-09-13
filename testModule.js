import { DayAheadElectricityPrices } from './src/energy-price-module/index.js'

class TestElectricityPricesModule {
  #dayAheadElectricityPrices
  constructor () {
    this.#dayAheadElectricityPrices = new DayAheadElectricityPrices()
    this.getDataFromAllPublicMethods()
  }

  async getDataFromAllPublicMethods() {
    console.log ({
      myComputerInKilowattUsage: this.#dayAheadElectricityPrices.convertWattToKilowatt(300),
    electricityPricesForAllAreas: await this.#dayAheadElectricityPrices.getHourlyPricesAllBiddingZones(),
    electricityPricesForSpecificArea: await this.#dayAheadElectricityPrices.getHourlyPricesForOneBiddingZone('SE1')
    })
  }

  async getPricesAllAreas () {
    const pricesAllAreas = await this.#dayAheadElectricityPrices.getPricesAllAreas()
    console.log(pricesAllAreas)
  }

  async getPricesForSpecificArea () {
    const area = 'SE3'
    const pricesSpecificArea = await this.#dayAheadElectricityPrices.getPricesForSpecificArea(area)
    console.table(pricesSpecificArea)
  }

  convertWattToKilowatt () {
    const kiloWatt = this.#dayAheadElectricityPrices.convertWattToKilowatt()
  }
}


new TestElectricityPricesModule()
