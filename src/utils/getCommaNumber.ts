export default function convertToComma(_input: string) {
  let input = noExponents(_input)
  if (input.length > 13 && window.sessionStorage.getItem('stretchText') === 'normal') {
    window.sessionStorage.setItem('stretchText', 'stretch')
  }

  // if(input.length > 11) input = Number.parseFloat(input).toExponential();
  if (Number(input) < 1 && Number(input) > 0.000001 && input.length > 10) {
    input = input.substr(0, 10)
  } else if (Number(input) <= 0.000001) {
    let index = 2
    while (input[index] === '0' && input.length > index) index++
    input = input.substr(0, index + 3)
  }
  const inputArray = input.split('.')
  const formattedArray = new Array<string>()
  while (true) {
    if (inputArray[0].length > 3) {
      const each = inputArray[0].slice(-3)
      inputArray[0] = inputArray[0].slice(0, -3)
      formattedArray.unshift(`,${each}`)
    } else {
      if (inputArray[0].length) formattedArray.unshift(inputArray[0])
      break
    }
  }
  let formattedInteger = formattedArray.join('')
  if (inputArray.length > 1) formattedInteger = formattedInteger.concat('.', inputArray[1])
  return formattedInteger
}

function noExponents(input: string) {
  const data = input.split(/[eE]/)
  if (data.length === 1) return data[0]

  let z = ''
  const sign = Number(input) < 0 ? '-' : ''
  const str = data[0].replace('.', '')
  let mag = Number(data[1]) + 1

  if (mag < 0) {
    z = sign.concat('0.')
    while (mag++) z += '0'
    return z + str.replace(/^-/, '')
  }
  mag -= str.length
  while (mag--) z += '0'
  return str + z
}
