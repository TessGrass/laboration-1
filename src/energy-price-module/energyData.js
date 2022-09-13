
export class EnergyData {
  constructor () {
    this.tomorrowsDate = this.#getTomorrowsDate()
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
}
