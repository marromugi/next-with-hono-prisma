export const parseNumber = (value: string, fallback: number = 0) => {
    const result = parseInt(value)
    return Number.isNaN(result) ? fallback : result
  }