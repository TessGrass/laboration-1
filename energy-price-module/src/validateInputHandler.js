
const zonesEnum = Object.freeze({
  zone1: 'SE1',
  zone2: 'SE2',
  zone3: 'SE3',
  zone4: 'SE4'
})
/**
 * Check if the user's chosen zone is valid.
 *
 * @param {string} biddingZone - A possible zone.
 */
export function validateIfValidZone (biddingZone) {
  const zone = biddingZone.toUpperCase()
  if (Object.values(zonesEnum).includes(zone)) {
    return
  }
  throw new Error('The selected zone does not exist')
}

/**
 * Checks for datatype number.
 *
 * @param {*} arrData - an array of values.
 */
export function validateIfNumber (arrData) {
  arrData.forEach(element => {
    if (typeof element === 'number') {
      return
    }
    throw new Error('The value needs to be of type number')
  })
}
