import { EnergyData } from './energyData.js'
import { validateIfNumber } from './validateInput.js'

export class DayAheadElectricityPrices {
  #energyData
  constructor () {
    this.#energyData = new EnergyData()
  }

  convertWattToKilowatt (watt) {
    const arrWatt = [watt]
    validateIfNumber(arrWatt)
    const kiloWatt = (watt / 1000)
    return kiloWatt
  }

  convertKilowattToMegawatt (kilowatt) {
    const arrKilowatt = [kilowatt]
    validateIfNumber(arrKilowatt)
    return (kilowatt * 1000)
  }

  calculateConsumedWattToWattHours (watt, hour) {
    const value = [watt, hour]
    validateIfNumber(value)
    return (watt * hour)
  }

  calculateWattUsageOverAMonth (watthour, ) {
    // Wh per day X days, return watt per month
  }

  
  calculateCostPerDayForProduct (productWatt, priceOneKwh, hoursPerDay) {
    const value = [productWatt, priceOneKwh, hoursPerDay]
    validateIfNumber(value)
    const kwh = this.convertWattToKilowatt (productWatt)
    return (kwh * priceOneKwh * hoursPerDay)

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
          pricePerKwh = value.value.replaceAll(' ','')
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

  async sortHoursPerHighestPrice(zone) {
    const hourlyPricesForBiddingZone = await this.getHourlyPricesForOneBiddingZone(zone)
    console.log(hourlyPricesForBiddingZone.sort((b, a) => parseFloat(a.pricePerKwh) - parseFloat(b.pricePerKwh)))
  }
}


  /*   hourlyPricesForBiddingZones.sort((a, b) => {
      console.log(a.areas)
 console.log(a.pricePerKwh - b.pricePerKwh) 
 hourlyPricesForBiddingZones.sort( sortHoursPerHighestPrice ); 
    }) */

