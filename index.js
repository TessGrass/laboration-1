import fetch from 'node-fetch'

export class DayAheadEnergyPrices {
  constructor () {
    this.extractFetchedData = ''
    this.dayAheadPrices = ''
  }

  async #fetchDataFromNordPool () {
    console.log('fetchDataNordPool')
    const tomorrowsDate = this.#getTomorrowsDate()
    const response = await fetch(`http://www.nordpoolspot.com/api/marketdata/page/29?currency=SEK,SEK,SEK&endDate=${tomorrowsDate}`)
    const data = await response.json()
    this.extractFetchedData = data.data.Rows
    this.#extractDayAheadEnergyPrices()
    console.log(this.dayAheadPrices)
  }

  #getTomorrowsDate () {
    console.log('getTomorrowsDate')
    const todaysDate = new Date()
    const tomorrowsDate = new Date(todaysDate)
    tomorrowsDate.setDate(todaysDate.getDate() + 1)
    const convertedDate = this.#convertToCorrectDateFormat(tomorrowsDate)
    return convertedDate
  }

  #convertToCorrectDateFormat (theDate) {
    console.log('convertToCorrectDateFormat')
    const date = theDate.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    const correctDateFormat = date.replaceAll('/', '-')
    return correctDateFormat
  }

  #extractDayAheadEnergyPrices () {
    console.log('extractDayAheadEnergyPrices')
    this.dayAheadPrices = this.extractFetchedData.filter(row => !row.IsExtraRow).map((row, index) => {
       /*       if (index === this.extractFetchedData.length - 1) {
        console.log(index)
      } */
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
  }
}
