import { SpotPriceApi } from './spotPriceApi.js'
import { ValidateInputHandler } from './validateInputHandler.js'

export class ElectricityRatesProvider {
  #spotPriceApi
  #validator

  /**
   * Constructor for ElectricityRatesProvider.
   */
  constructor () {
    this.#spotPriceApi = new SpotPriceApi()
    this.#validator = new ValidateInputHandler()
  }

  
  /**
   * Gets day-ahead prices for a specific zone.
   *
   * @param {string} selectedZone - the chosen zone.
   * @returns {object} - Containing tomorrows price (in Swedish ören) for a specific zone.
   */
  async getHourlyPricesForOneBiddingZone (selectedZone) {
    this.#validator.validateBiddingZone(selectedZone)
    const hourlyPricesForBiddingZones = await this.getHourlyPricesAllBiddingZones()
    const hourlyPricesForZone = []
    
    for (const element of hourlyPricesForBiddingZones) {
      const startTime = this.#extractStartTimeFromDate(element)
      for (const value of Object.values(element.areas)) {
        if (value.zone === selectedZone) {
          let pricePerKwh = value.pricePerKwh
          let zone = value.zone
          hourlyPricesForZone.push({ startTime, pricePerKwh, zone })
        }
      }
    }
    return hourlyPricesForZone
  }
  /**
   * Get's day-ahead prices for Sweden's all four bidding zones.
   *
   * @returns {object} - Containing tomorrow's hourly prices (in Swedish ören).
   */
  async getHourlyPricesAllBiddingZones () {
    return await this.#spotPriceApi.getTomorrowsElectricityData()
    
  }
  
  #extractStartTimeFromDate (element) {
    return element.startTime.slice(11)
  }

  /**
   * Sorts the day-ahead prices for a selected zone.
   *
   * @param {string} zone  - The selected zone.
   * @returns {object} - Containing the sorted prices (in Swedish ören), from high too low.
   */
  async sortHoursPerHighestPrice (zone) {
    this.#validator.validateBiddingZone(zone)
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
    this.#validator.validateBiddingZone(zone)
    const hourlyPricesForBiddingZone = await this.getHourlyPricesForOneBiddingZone(zone)
    return hourlyPricesForBiddingZone.sort((a, b) => a.pricePerKwh - b.pricePerKwh)
  }

  /**
   * Filters out which hours propane is cheaper to use than electricity.
   *
   * @param {number} propanePricePerKwh  - The price per kWh for propane.
   * @param {string} selectedZone  - The specific zone.
   * @returns {Array} - An array with the hours.
   */
   async getHoursWhenPropaneIsCheaper (propanePricePerKwh, selectedZone) {
    const arrPropanePrice = [propanePricePerKwh]
    this.#validator.validateIfNumber(arrPropanePrice)
    this.#validator.validateBiddingZone(selectedZone)
    const hourlyPricesAllZones = await this.#spotPriceApi.getTomorrowsElectricityData()
    const hoursWithCheaperPropane = []

    for (const el of hourlyPricesAllZones) {
      const startTime = this.#extractStartTimeFromDate(el)

      for (const value of Object.values(el.areas)) {
        if (value.zone === selectedZone && value.pricePerKwh > propanePricePerKwh) {
          let pricePerKwh = value.pricePerKwh
          let zone = value.zone
          let propanePerKwh = propanePricePerKwh
          hoursWithCheaperPropane.push({ startTime, pricePerKwh, zone, propanePerKwh })
        } 
      }
    }
    return hoursWithCheaperPropane
  }
}
