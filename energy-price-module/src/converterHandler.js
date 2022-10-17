import { ValidateInputHandler } from './validateInputHandler.js'

export class ConverterHandler {
  #validator

  constructor () {
    this.#validator = new ValidateInputHandler()
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
    this.#validator.validateIfNumber(propaneData)
    const propaneKwhPerKg = 12.8
    const propanePricePerKg = this.#dividePropanePriceWithKilogram(propanePrice, propaneKg)
    const propanePricePerKgInPennies = this.#calculateCrownsToPennies(propanePricePerKg)
    const nonRoundedKwhPrice = (propanePricePerKgInPennies / propaneKwhPerKg)
    const propaneKwhPrice = this.#roundsDecimalsInNumber(nonRoundedKwhPrice)
    
    return propaneKwhPrice
  }

  #dividePropanePriceWithKilogram (price, kilogram) {
    return (price / kilogram)
  }

  #calculateCrownsToPennies (crowns) {
    return (crowns * 100)
  }

  /**
   * Converts watt to kilowatt.
   *
   * @param {number} watt - The watt value.
   * @returns {number} - Containing the calucated kilowatt.
   */
  calculateWattToKilowatt (watt) {
    const arrWatt = [watt]
    this.#validator.validateIfNumber(arrWatt)
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
    this.#validator.validateIfNumber(arrKilowatt)
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
    this.#validator.validateIfNumber(value)
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
    this.#validator.validateIfNumber(value)
    const kwh = this.calculateWattToKilowatt(deviceWatt)
    const costPerDay = (kwh * hoursRunningPerDay * penniesPerKwh)

    return this.#roundsDecimalsInNumber(costPerDay)
  }

  #roundsDecimalsInNumber (value) {
    return Math.round(value * 100) / 100
  }
}
