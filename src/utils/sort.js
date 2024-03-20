export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray) {
    return []
  } else {
    const clonedArray = [...originalArray]
    const orderedArray = clonedArray.sort((a, b) => {
      console.log(orderArray.indexOf(a[key]))
      console.log(orderArray.indexOf(b[key]))
      return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
    })

    return orderedArray
  }
}

