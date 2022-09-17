import { SpotPriceApi } from './spotPriceApi.js'
import { validateIfNumber, validateIfValidZone } from './validateInputHandler.js'

export class ElectricityRatesProvider {
  #spotPriceApi
  constructor () {
    this.#spotPriceApi = new SpotPriceApi()
  }

  /**
   * Get's day-ahead prices for Sweden's all four bidding zones.
   *
   * @returns {object} - Containing tomorrow's hourly prices (in pennies).
   */
  async getHourlyPricesAllBiddingZones () {
    return await this.#spotPriceApi.getTomorrowsElectricityData()
  }

  /**
   * Gets day-ahead prices for a specific zone.
   *
   * @param {string} selectedZone - the chosen zone.
   * @returns {object} - Containing tomorrows price (in pennies) for a specific zone.
   */
  async getHourlyPricesForOneBiddingZone (selectedZone) {
    validateIfValidZone(selectedZone)
    const hourlyPricesForBiddingZones = await this.getHourlyPricesAllBiddingZones()
/*     const biddingZone = selectedZone */
    const hourlyPricesForZone = []

    for (const element of hourlyPricesForBiddingZones) {
      const startTime = this.#extractStartTimeFromDate(element)
      let pricePerKwh = 0
      let zone = ''
      for (const [key, value] of Object.entries(element.areas)) {
        if (value.zone === selectedZone) {
          pricePerKwh = value.pricePerKwh
          zone = value.zone
        }
      }
      hourlyPricesForZone.push({ startTime, pricePerKwh, zone })
    }
    return hourlyPricesForZone
  }

  /**
   * Extract the starting hour from the date.
   *
   * @param {string} element - The date that will be sliced.
   * @returns {string} - A string containing only the start time.
   */
  #extractStartTimeFromDate (element) {
    return element.startTime.slice(11)
  }

  /**
   * Sorts the day-ahead prices for a selected zone.
   *
   * @param {string} zone  - The selected zone.
   * @returns {object} - Containing the sorted prices (in pennies), from high too low.
   */
  async sortHoursPerHighestPrice (zone) {
    validateIfValidZone(zone)
    const hourlyPricesForBiddingZone = await this.getHourlyPricesForOneBiddingZone(zone)
    return hourlyPricesForBiddingZone.sort((b, a) => a.pricePerKwh - b.pricePerKwh)
  }

  /**
   * Sorts the day-ahead prices for a selected zone.
   *
   * @param {string} zone - The selected zone.
   * @returns {object} - Containing the sorted prices (in pennies), from low to high.
   */
  async sortHoursPerLowestPrice (zone) {
    validateIfValidZone(zone)
    const hourlyPricesForBiddingZone = await this.getHourlyPricesForOneBiddingZone(zone)
    return hourlyPricesForBiddingZone.sort((a, b) => a.pricePerKwh - b.pricePerKwh)
  }

  /**
   * Fiters out which hours propane is cheaper to use than electricity.
   *
   * @param {*} propanePrice  - the price per kwh for propane.
   * @param {*} selectedZone  - The specific zone.
   * @returns 
   */
  async getHoursWhenPropaneIsCheaper (propanePricePerKwh, selectedZone) {
    const arrPropanePrice = [propanePricePerKwh]
    validateIfNumber(arrPropanePrice)
    validateIfValidZone(selectedZone)

    const hourlyPricesAllZones = await this.getHourlyPricesAllBiddingZones()
    const hoursWhenPropaneIsCheaper = []

    for (const element of hourlyPricesAllZones) {
      const startTime = this.#extractStartTimeFromDate(element)
      for (const [key, value] of Object.entries(element.areas)) {
        if (value.zone === selectedZone && value.pricePerKwh > propanePricePerKwh) {
          const pricePerKwh = value.pricePerKwh
          const zone = value.zone
          const propanePerKwh = propanePricePerKwh     
          hoursWhenPropaneIsCheaper.push({ startTime, pricePerKwh, zone, propanePerKwh })
        }
      }
    }
    return hoursWhenPropaneIsCheaper
  }

  /**
   * Converts watt to kilowatt.
   *
   * @param {number} watt - The watt value.
   * @returns {number} - Containing the calucated kilowatt.
   */
  calculateWattToKilowatt (watt) {
    const arrWatt = [watt]
    validateIfNumber(arrWatt)
    return (watt / 1000)
  }

  /**
   * Coverts kilowatt to megawatt.
   *
   * @param {number} kilowatt - The kilowatt value.
   * @returns {number} - Containing the calculated megawatt.
   */
  calculateKilowattToMegawatt (kilowatt) {
    const arrKilowatt = [kilowatt]
    validateIfNumber(arrKilowatt)
    return (kilowatt / 1000)
  }

  /**
   * Caclulcates watt to watt hours.
   *
   * @param {number} watt - The watt value.
   * @param {number} hoursRunning - Hours the device is running.
   * @returns {number} - Containing the calculated watt hours.
   */
  calculateConsumedWattToWattHours (watt, hoursRunning) {
    const value = [watt, hoursRunning]
    validateIfNumber(value)
    return (watt * hoursRunning)
  }

  /**
   * Calculates the cost in pennies of running a device X hours / day.
   *
   * @param {number} deviceWatt - The device wattage.
   * @param {number} penniesPerKwh - The price per kilowatt.
   * @param {number} hoursRunningPerDay - Total number of hours the device is running per day.
   *
   * @returns {number} - The calculated cost for the device each day.
   */
  calculateConsumtionCostPerDayForProduct (deviceWatt, penniesPerKwh, hoursRunningPerDay) {
    const value = [deviceWatt, penniesPerKwh, hoursRunningPerDay]
    validateIfNumber(value)
    const kwh = this.calculateWattToKilowatt(deviceWatt)
    const costPerDay = (kwh * hoursRunningPerDay * penniesPerKwh)
    return this.#removeDecimalsInNumber(costPerDay)
  }

  /**
   * Rounds a number to two decimal places.
   *
   * @param {number} value - The number to be rounded.
   * @returns {number} - The rounded number.
   */
  #removeDecimalsInNumber (value) {
    return Math.round(value * 100) / 100
  }

  /**
   * Calculates the kilowatt price for Propane.
   *
   * @param {*} propanePrice - The price purchased for the propane.
   * @param {*} propaneKg - The weight of the purchased propane.
   *
   * @returns {number} - The calculated kwh price, in pennies, for propane.
   */
  calculatePropaneKiloWattPrice (propanePrice, propaneKg) {
    const propaneData = [propanePrice, propaneKg]
    validateIfNumber(propaneData)
    const propaneKwhPerKg = 12.8
    const propanePricePerKg = this.#calcuatePropanePriceKilogram(propanePrice, propaneKg)
    const propanePricePerKgInPennies = this.#convertCrownsToPennies(propanePricePerKg)
    const nonRoundedKgPrice = (propanePricePerKgInPennies / propaneKwhPerKg)
    const roundedKgPrice = this.#removeDecimalsInNumber(nonRoundedKgPrice)
    return roundedKgPrice
  }

  #calcuatePropanePriceKilogram (price, kilogram) {
    return (price / kilogram)
  }

  #convertCrownsToPennies (crowns) {
    return (crowns * 100)
  }

  async getHoursWhenPropaneIsCheaper (propanePrice, selectedZone) {
    const arrPropanePrice = [propanePrice]
    validateIfNumber(arrPropanePrice)
    validateIfValidZone(selectedZone)

    const hourlyPricesAllZones = await this.getHourlyPricesAllBiddingZones()
    const hoursWhenPropaneIsCheaper = []

    for (const element of hourlyPricesAllZones) {
      const startTime = this.#extractStartTimeFromDate(element)
      for (const [key, value] of Object.entries(element.areas)) {
        if (value.zone === selectedZone && value.pricePerKwh > propanePrice) {
          const pricePerKwh = value.pricePerKwh
          const zone = value.zone
          const propanePerKwh = propanePrice      
          hoursWhenPropaneIsCheaper.push({ startTime, pricePerKwh, zone, propanePerKwh })
        }
      }
    }
    return hoursWhenPropaneIsCheaper
  }
}
