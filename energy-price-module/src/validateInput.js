

export function validateIfNumber(array) {
  array.forEach(element => {
     if (typeof element !== 'number') {
        throw new Error('The value needs to be of type number')
     }
    return array
})  
}