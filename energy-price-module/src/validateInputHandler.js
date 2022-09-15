
const zonesEnum = Object.freeze({
  zone1: 'SE1',
  zone2: 'SE2',
  zone3: 'SE3',
  zone4: 'SE4'
})

export function validateIfValidZone (string) {
  const zone = string.toUpperCase()
  if (Object.values(zonesEnum).includes(zone)) {
    return
  }
  throw new Error('The entered zone is incorrect')
}

export function validateIfNumber (array) {
  array.forEach(element => {
    if (typeof element === 'number') {
      return
    }
    throw new Error('The value needs to be of type number')
  })
}
