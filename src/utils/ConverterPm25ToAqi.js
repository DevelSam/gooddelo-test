const ConverterPm25ToAqi = (pm25) => {
  if (pm25 == null) return null

  if (pm25 >= 0 && pm25 <= 12.0) {
    return Math.round(((50 - 0) / (12.0 - 0)) * (pm25 - 0) + 0)
  }
  if (pm25 >= 12.1 && pm25 <= 35.4) {
    return Math.round(((100 - 51) / (35.4 - 12.1)) * (pm25 - 12.1) + 51)
  }
  if (pm25 >= 35.5 && pm25 <= 55.4) {
    return Math.round(((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5) + 101)
  }
  return 151
}

export default ConverterPm25ToAqi
