import fetch from 'node-fetch'

export class SpotPriceApi {
  /**
   * The constructor for SpotPriceApi class.
   */
  constructor () {
    this.tomorrowsDate = this.#getTomorrowsDate()
  }

  /**
   * Gets tomorrows data from NordPool.
   *
   * @returns {Array} tomorrows data.
   */
  async getTomorrowsElectricityData () {
    return await this.#getDayAheadData()
  }

  /**
   * Gets tomorrows date.
   *
   * @returns {string} - The date needed to send the request.
   */
  #getTomorrowsDate () {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    return this.#convertToCorrectDateFormat(tomorrow)
  }

  /**
   * Converts the date to the format needed in the api request.
   *
   * @param {string} tomorrowsDate  - Tomorrows date.
   * @returns {string} - Tomorrows date in correct format.
   */
  #convertToCorrectDateFormat (tomorrowsDate) {
    const date = tomorrowsDate.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    return date.replaceAll('/', '-')
  }

  /**
   * Gets tomorrows data from NordPool.
   *
   * @returns {Array} - The hourly prices for all bidding zones.
   */
  async #getDayAheadData () {
    const response = await fetch(`http://www.nordpoolspot.com/api/marketdata/page/29?currency=SEK,SEK,SEK&endDate=${this.tomorrowsDate}`)
    if (response.status === 200) {
      const unfilteredData = await response.json()
      const filteredElectricityData = unfilteredData.data.Rows
      return this.#extractElectricityPricesAndZones(filteredElectricityData)
    } else {
      throw new Error('Something went wrong with the request')
    }
  }

  /**
   * Extracts information from the response.
   *
   * @param {Array} electricityData - The array with the unfiltered response data.
   * @returns {Array} - The filtered data contains hourly prices and zones.
   */
  #extractElectricityPricesAndZones (electricityData) {
    const dayAheadPricesAndZones = electricityData.filter(row => !row.IsExtraRow).map((row) => {
      return {
        startTime: row.StartTime,
        areas: row.Columns.filter(element => element.GroupHeader != null).map(element => {
          const stringSekMWh = element.Value.replaceAll(' ', '').replaceAll(',', '.')
          const sekMWh = this.#convertStringToNumber(stringSekMWh)
          const sekKWh = this.#divideNumberWithTen(sekMWh)
          const penniesKWh = this.#roundDecimalsInNumber(sekKWh) || 0.00
          return {
            pricePerKwh: penniesKWh,
            zone: element.Name
          }
        })
      }
    })
    return dayAheadPricesAndZones
  }

  #convertStringToNumber (stringOfNumbers) {
    return Number(stringOfNumbers)
  }

  #roundDecimalsInNumber (value) {
    return Math.round(value * 100) / 100
  }

  #divideNumberWithTen (number) {
    return (number / 10)
  }
}
