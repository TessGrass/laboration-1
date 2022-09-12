import { DayAheadElectricityPrices } from './src/energy-price-module/index.js'

class TestElectricityPricesModule {
  #dayAheadElectricityPrices
  constructor () {
    this.#dayAheadElectricityPrices = new DayAheadElectricityPrices()
    this.getPricesForSpecificArea()
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
    const kiloWatt = this.#dayAheadElectricityPrices.convertWattToKilowatt(300)
  }
}

new TestElectricityPricesModule()
