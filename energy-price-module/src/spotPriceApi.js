import fetch from 'node-fetch'

export class SpotPriceApi {
  constructor () {
    this.tomorrowsDate = this.#getTomorrowsDate()
  }

  async getTomorrowsElectricityData () {
    return await this.#getTomorrowsElectricityData()
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
          const stringValue = element.Value.replaceAll(' ', '').replaceAll(',', '.')
          const number = this.#convertStringToNumber(stringValue)
          const value = this.#divideNumberWithTen(number)
          const pennies = this.#removeDecimalsInNumber(value) || 0.00

          return {
            pricePerKwh: pennies,
            zone: element.Name
          }
        })
      }
    })
    return dayAheadPricesAndZones
  }

  #convertStringToNumber (string) {
    return Number(string)
  }

  #removeDecimalsInNumber (value) {
    return Math.round(value * 100) / 100
  }

  #divideNumberWithTen (number) {
    return (number / 10)
  }
}
