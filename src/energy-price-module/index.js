import { EnergyData } from './energyData.js'

export class DayAheadElectricityPrices {
  #energyData
  constructor () {
    this.#energyData = new EnergyData()
  }

  convertWattToKilowatt (watt) {
    const kiloWatt = (watt / 1000)
    return kiloWatt
  }

  convertKilowattToMegawatt (kilowatt) {

  }

  calculateConsumedWattToHours (watt) {
    // W x h = wattHours
  }

  calculateUsageOverAMonth (wattPerDay) {
    // Wh per day X days, return watt per month
  }

  roundOffFetchedValueToPennies (value) {
    // the hourly values being fetched can be round off to pennies
  }

  roundOffFetchedValuesToSEK (kiloWatt, value) {
    // the hourly values being fetched can be round off to pennies
  }

  async getHourlyPricesAllBiddingZones () {
    return await this.#energyData.getTomorrowsElectricityData()
  }

  async getHourlyPricesForOneBiddingZone (theZone) {
    const hourlyPricesForBiddingZones = await this.getHourlyPricesAllBiddingZones()
    const biddingZone = theZone
    const hourlyPricesForZone = []

    for (const element of hourlyPricesForBiddingZones) {
      const startTime = this.extractStartTimeFromDate(element)
      let pricePerKwh = 0
      let zone = ''
      for (const [key, value] of Object.entries(element.areas)) {
        if (value.zone === biddingZone) {
          pricePerKwh = value.value
          zone = value.zone
        }
      }
      hourlyPricesForZone.push({ startTime, pricePerKwh, zone })
    }
    return hourlyPricesForZone
  }

  extractStartTimeFromDate (element) {
    return element.startTime.slice(11)
  }
}
