import { SpotPriceApi } from './spotPriceApi.js'
import { validateIfNumber, validateIfValidZone } from './validateInputHandler.js'

export class ElectricityRatesProvider {
  #spotPriceApi
  constructor () {
    this.#spotPriceApi = new SpotPriceApi()
  }

  /**
   *
   * @returns {object} containing tomorrow's hourly prices (in pennies).
   */
  async getHourlyPricesAllBiddingZones () {
    const test = await this.#spotPriceApi.getTomorrowsElectricityData()
    for (const element of test) {
      console.log(element);
      
    }
  }

  /**
   *
   * @param {string} selectedZone
   * @returns {object} - Containing tomorrows price (in pennies) for a specific zone.
   */
  async getHourlyPricesForOneBiddingZone (selectedZone) {
    validateIfValidZone(selectedZone)
    const hourlyPricesForBiddingZones = await this.#spotPriceApi.getTomorrowsElectricityData()
    const biddingZone = selectedZone
    const hourlyPricesForZone = []

    for (const element of hourlyPricesForBiddingZones) {
      const startTime = this.#extractStartTimeFromDate(element)
      let pricePerKwh = 0
      let zone = ''
      for (const [key, value] of Object.entries(element.areas)) {
        if (value.zone === biddingZone) {
          pricePerKwh = value.pricePerKwh
          zone = value.zone
        }
      }
      hourlyPricesForZone.push({ startTime, pricePerKwh, zone })
    }
    return hourlyPricesForZone
  }

  /**
   *
   * @param {string} element
   * @returns {string} a string containing a timestamp.
   */
  #extractStartTimeFromDate (element) {
    return element.startTime.slice(11)
  }

  /**
   *
   * @param {number} zone
   * @returns {object} - Containing the sorted prices (in pennies), from high to low.
   */
  async sortHoursPerHighestPrice (zone) {
    validateIfValidZone(zone)
    const hourlyPricesForBiddingZone = await this.getHourlyPricesForOneBiddingZone(zone)
    return hourlyPricesForBiddingZone.sort((b, a) => a.pricePerKwh - b.pricePerKwh)
  }

  /**
   *
   * @param {number} zone - the zone being
   * @returns {object} - Containing the sorted prices (in pennies), from low to high.
   */
  async sortHoursPerLowestPrice (zone) {
    validateIfValidZone(zone)
    const hourlyPricesForBiddingZone = await this.getHourlyPricesForOneBiddingZone(zone)
    return hourlyPricesForBiddingZone.sort((a, b) => a.pricePerKwh - b.pricePerKwh)
  }

  /**
   * 
   * @param {number} watt
   * @returns {number} containing kilowatt.
   */
   calculateWattToKilowatt (watt) {
    const arrWatt = [watt]
    validateIfNumber(arrWatt)
    return (watt / 1000)
  }

  /**
   *
   * @param {number} kilowatt
   * @returns {number} containing megawatt.
   */
  calculateKilowattToMegawatt (kilowatt) {
    const arrKilowatt = [kilowatt]
    validateIfNumber(arrKilowatt)
    return (kilowatt / 1000)
  }

  /**
   *
   * @param {number} watt
   * @param {number} hoursRunning
   * @returns {number} containing watt hours.
   */
  calculateConsumedWattToWattHours (watt, hoursRunning) {
    const value = [watt, hoursRunning]
    validateIfNumber(value)
    return (watt * hoursRunning)
  }

  calculateWattUsageOverAMonth (watthour) {
    // Wh per day X days, return watt per month
  }

  /**
   * Calculates the cost in pennies of running a device X hours / day.
   * 
   * @param {number} productWatt
   * @param {number} pricePerKwh
   * @param {number} hoursRunningPerDay
   * 
   * @returns {number} - The cost.
   */
  calculateCostPerDayForProduct (productWatt, penniesPerKwh, hoursRunningPerDay) {
    const value = [productWatt, penniesPerKwh, hoursRunningPerDay]
    validateIfNumber(value)
    const kwh = this.calculateWattToKilowatt(productWatt)
    const costPerDay = (kwh * hoursRunningPerDay * penniesPerKwh)
    return this.#removeDecimalsInNumber(costPerDay)
  }

  /**
   * 
   * @param {number} value
   * @returns {number} number with two decimals.
   */
   #removeDecimalsInNumber (value) {
    return Math.round(value * 100) / 100
  }

  
}