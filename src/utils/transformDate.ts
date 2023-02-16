const transformDate = (dateStr: string | undefined): string => {
  if (dateStr) {
    const date = new Date(dateStr)
    const timeFormat: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }

    return date.toLocaleDateString('en-US', timeFormat)
  }
  return 'Invalid Date'
}

export { transformDate }
