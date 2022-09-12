import { DayAheadElectricityPrices } from './src/energy-price-module/index.js'


class TestElectricityPricesModule {
    #dayAheadElectricityPrices
    constructor () {
        this.#dayAheadElectricityPrices = new DayAheadElectricityPrices()
        this.getPricesAllAreas()
    }

    async getPricesAllAreas() {
        const day = await this.#dayAheadElectricityPrices.getPricesAllAreas()
        console.log('day ' + day[4].startTime)
    }
  }

  new TestElectricityPricesModule()