export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray) {
    return []
  } else {
    const clonedArray = [...originalArray]
    const orderedArray = clonedArray.sort((a, b) => {
      return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
    })

    return orderedArray
  }
}

