import fetch from 'node-fetch'
import { EnergyData } from './energyData.js'

export class DayAheadElectricityPrices {
  #energyData
  constructor () {
    this.tomorrowsDate = this.#getTomorrowsDate()
    this.#energyData = new EnergyData()
  }

  #getTomorrowsDate () {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    return this.#convertToCorrectDateFormat(tomorrow)
  }

  #convertToCorrectDateFormat (tomorrowsDate) {
    const date = tomorrowsDate.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    return date.replaceAll('/', '-')
  }

  async #getTomorrowsElectricityData () {
    const response = await fetch(`http://www.nordpoolspot.com/api/marketdata/page/29?currency=SEK,SEK,SEK&endDate=${this.tomorrowsDate}`) // new method, change to get
    const unfilteredData = await response.json()
    const filteredElectricityData = unfilteredData.data.Rows
    return this.#extractElectricityPricesAndZones(filteredElectricityData)
  }

  #extractElectricityPricesAndZones (electricityData) {
    const dayAheadPricesAndZones = electricityData.filter(row => !row.IsExtraRow).map((row) => {
      return {
        startTime: row.StartTime,
        areas: row.Columns.filter(element => element.GroupHeader != null).map(element => {
          return {
            value: element.Value,
            zone: element.Name
          }
        })
      }
    })
    return dayAheadPricesAndZones
  }

  async getHourlyPricesAllBiddingZones () {
    return await this.#getTomorrowsElectricityData()
  }

  async getHourlyPricesForOneBiddingZone (theZone) {
    const hourlyPricesForBiddingZones = await this.#getTomorrowsElectricityData()
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
}
