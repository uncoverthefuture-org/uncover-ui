export const currencyFormatter = (number: number | string, code?: string): string => {
  const numberString = String(number)
  const newArray: Array<string> = []
  const splitNumberStringArray = numberString.split('.')
  const mainNumber = splitNumberStringArray[0]
  const reversedNumber = mainNumber.split('').reverse()
  reversedNumber.forEach((element, index) => {
    if (index % 3 === 0 && index !== 0) {
      newArray.push(',')
    }
    newArray.push(element)
  })

  newArray.reverse();

  let result = newArray.join('')
  if(splitNumberStringArray.length > 1){
    result = result + '.' + splitNumberStringArray[1]
  }

  return code ? code + result : result;
}


export const IntlAmountFmt = (amount: number = 0, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2, // Ensures at least 2 decimal places
    maximumFractionDigits: 2, // Limits to 2 decimal places
    ...options
  }).format(amount);
}

export const  parseCurrencyAmount = (str: string)  => {
  const cleanedStr = str.replace(/[^\d.-]/g, '');
  const amount = parseFloat(cleanedStr);
  return isNaN(amount) ? null : amount;
}