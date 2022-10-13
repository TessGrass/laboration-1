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
   * @returns {object} - Containing tomorrows price (in pennies) for a specific zone.
   */
  async getHourlyPricesForOneBiddingZone (selectedZone) {
    this.validator.validateIfValidZone(selectedZone) // skapa ett zonobjekt? Ev. skriva i kommentarerna. Prio 3.
    // Namnbyte: "throwexceptionifinvalidzone alt validateZone"
    const hourlyPricesForBiddingZones = await this.getHourlyPricesAllBiddingZones()
    const hourlyPricesForZone = []

    for (const element of hourlyPricesForBiddingZones) { // bryt ner till en funktion, returnera hourlyPricesForZone. Prio 1.
      const startTime = this.#extractStartTimeFromDate(element)
      let pricePerKwh = 0
      let zone = ''
      for (const [key, value] of Object.entries(element.areas)) {
        if (value.zone === selectedZone) { // skapa en funktion isSelectedZone, returnera boolean. Prio 2.
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
    this.validator.validateIfValidZone(zone)
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
    this.validator.validateIfValidZone(zone)
    const hourlyPricesForBiddingZone = await this.getHourlyPricesForOneBiddingZone(zone)
    return hourlyPricesForBiddingZone.sort((a, b) => a.pricePerKwh - b.pricePerKwh)
  }

  /**
   * Calculates the kilowatt price for Propane.
   *
   * @param {number} propanePrice - The price purchased for the propane.
   * @param {number} propaneKg - The weight of the purchased propane.
   *
   * @returns {number} - The calculated kwh price, in pennies, for propane.
   */
  calculatePropaneKilowattPrice (propanePrice, propaneKg) {
    const propaneData = [propanePrice, propaneKg]
    this.validator.validateIfNumber(propaneData)
    const propaneKwhPerKg = 12.8
    const propanePricePerKg = this.#dividePropanePriceWithKilogram(propanePrice, propaneKg)
    const propanePricePerKgInPennies = this.#calculateCrownsToPennies(propanePricePerKg)
    const nonRoundedKgPrice = (propanePricePerKgInPennies / propaneKwhPerKg)
    const roundedKgPrice = this.#roundsDecimalsInNumber(nonRoundedKgPrice)
    return roundedKgPrice
  }

  /**
   * Gets the propane kilogram price.
   *
   * @param {number} price - The price for the propane.
   * @param {number} kilogram  - the weight of the propane.
   * @returns {number} - The kilogram price.
   */
  #dividePropanePriceWithKilogram (price, kilogram) {
    return (price / kilogram)
  }

  /**
   * Calculates crowns to pennies.
   *
   * @param {number} crowns - The value in crowns.
   * @returns {number} - The value converted to pennies.
   */
  #calculateCrownsToPennies (crowns) {
    return (crowns * 100)
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
    this.validator.validateIfNumber(arrPropanePrice)
    this.validator.validateIfValidZone(selectedZone)
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
        } else {
          return ('No hourly prices are higher than the propane price')
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
    this.validator.validateIfNumber(arrWatt)
    return (watt / 1000)
  }

  /**
   * Converts kilowatt to megawatt.
   *
   * @param {number} kilowatt - The kilowatt value.
   * @returns {number} - Containing the calculated megawatt.
   */
  calculateKilowattToMegawatt (kilowatt) {
    const arrKilowatt = [kilowatt]
    this.validator.validateIfNumber(arrKilowatt)
    return (kilowatt / 1000)
  }

  /**
   * Calulcates watt to watt hours.
   *
   * @param {number} watt - The watt value.
   * @param {number} hoursRunning - Hours the device is running.
   * @returns {number} - Containing the calculated watt hours.
   */
  calculateConsumedWattToWattHours (watt, hoursRunning) {
    const value = [watt, hoursRunning]
    this.validator.validateIfNumber(value)
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
    this.validator.validateIfNumber(value)
    const kwh = this.calculateWattToKilowatt(deviceWatt)
    const costPerDay = (kwh * hoursRunningPerDay * penniesPerKwh)
    return this.#roundsDecimalsInNumber(costPerDay)
  }

  #roundsDecimalsInNumber (value) {
    return Math.round(value * 100) / 100
  }
}
