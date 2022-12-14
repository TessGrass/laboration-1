
export class ValidateInputHandler {
  #zonesEnum
  constructor () {
    this.#zonesEnum = Object.freeze({
      zone1: 'SE1',
      zone2: 'SE2',
      zone3: 'SE3',
      zone4: 'SE4'
    })
  }


/**
 * Check if the user's chosen zone is valid.
 *
 * @param {string} biddingZone - A possible zone.
 */
validateBiddingZone (biddingZone) {
  const zone = biddingZone.toUpperCase()
  if (Object.values(this.#zonesEnum).includes(zone)) {
    return
  }
  throw new Error('In validateBiddingZone method: The selected zone does not exist')
}

/**
 * Checks for datatype number.
 *
 * @param {Array} arrData - an array of values.
 */
validateIfNumber (arrData) {
  arrData.forEach(element => {
    if (typeof element === 'number') {
      return
    }
    throw new Error('In ValidateIfNumber method: The value needs to be of type number')
  })
}
}
