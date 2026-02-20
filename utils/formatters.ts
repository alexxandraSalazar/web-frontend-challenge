/**
 * @param dateStr ISO date string
 * @returns Formatted date "14/Nov/2021"
 */
export const formatDate = (dateStr?: string): string => {
    if (!dateStr) return '---'
    const date = new Date(dateStr)
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    const day = date.getDate().toString().padStart(2, '0')
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
}

/**
 * @param value Numeric amount
 * @returns Formatted currency "1,000.00"
 */
export const formatCurrency = (value?: number): string => {
    if (value === undefined || value === null) return '0.00'
    return value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}