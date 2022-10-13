import { SpotPriceApi } from './spotPriceApi.js'
import { ValidateInputHandler } from './validateInputHandler.js'

export class ElectricityRatesProvider {
  #spotPriceApi

  /**
   * Constructor for ElectricityRatesProvider.
   */
  constructor () {
    this.#spotPriceApi = new SpotPriceApi()
    this.validator = new ValidateInputHandler()
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
   * @returns {object} - Containing tomorrows price (in Swedish ören) for a specific zone.
   */
  async getHourlyPricesForOneBiddingZone (selectedZone) {
    this.validator.validateBiddingZone(selectedZone)
    const hourlyPricesForBiddingZones = await this.getHourlyPricesAllBiddingZones()
    const hourlyPricesForZone = []

    for (const element of hourlyPricesForBiddingZones) {
      const startTime = this.#extractStartTimeFromDate(element)
      let pricePerKwh = 0
      let zone = ''
      for (const value of Object.values(element.areas)) {
        if (value.zone === selectedZone) {
          pricePerKwh = value.pricePerKwh
          zone = value.zone
        }
      }
      hourlyPricesForZone.push({ startTime, pricePerKwh, zone })
    }
    return hourlyPricesForZone
  }

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
    this.validator.validateBiddingZone(zone)
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
    this.validator.validateBiddingZone(zone)
    const hourlyPricesForBiddingZone = await this.getHourlyPricesForOneBiddingZone(zone)
    return hourlyPricesForBiddingZone.sort((a, b) => a.pricePerKwh - b.pricePerKwh)
  }
}
