import fetch from 'node-fetch'

export class DayAheadElectricityPrices {
  constructor () {
    this.extractElectricityData = ''
    this.tomorrowsDate = this.#getTomorrowsDate()
  }

  async getPricesAllAreas () {
    const dayAheadPrices = await this.#getDayAheadElectricityData()
    return dayAheadPrices
  }

  async getPricesForSpecificBiddingZone (zoneValue) {
    const dayAheadPricesForBiddingZones = await this.#getDayAheadElectricityData()
    const biddingZoneWithPrices = []
    const biddingZone = zoneValue

      for (const element of dayAheadPricesForBiddingZones) {
        const startTime = element.startTime.slice(11)
        let pricePerKwh = 0
        let zone = ''
        for (const [key, value] of Object.entries(element.areas)) {
          if (value.area === biddingZone) {
            pricePerKwh = value.value
            zone = value.area
          }
        }
        biddingZoneWithPrices.push({ startTime, pricePerKwh, zone })
      }

      console.log(biddingZoneWithPrices)

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



  #getTomorrowsDate () {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const correctDate = this.#convertToCorrectDateFormat(tomorrow)
    return correctDate
  }

  #convertToCorrectDateFormat (theDate) {
    const date = theDate.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    const convertedDate = date.replaceAll('/', '-')
    return convertedDate
  }

  async #getDayAheadElectricityData () {
    const response = await fetch(`http://www.nordpoolspot.com/api/marketdata/page/29?currency=SEK,SEK,SEK&endDate=${this.tomorrowsDate}`) // new method, change to get
    const rawData = await response.json()
    this.extractElectricityData = rawData.data.Rows
    const extractedEnergyPrices = this.#getDayAheadElectricityPrices()
    return extractedEnergyPrices
  }

  #getDayAheadElectricityPrices () {
    console.log('extractDayAheadEnergyPrices')
    const dayAheadElectricityPrices = this.extractElectricityData.filter(row => !row.IsExtraRow).map((row) => {
      return {
        startTime: row.StartTime,
        areas: row.Columns.filter(element => element.GroupHeader != null).map(element => {
          return {
            value: element.Value,
            area: element.Name
          }
        })
      }
    })
    return dayAheadElectricityPrices
  }
}
