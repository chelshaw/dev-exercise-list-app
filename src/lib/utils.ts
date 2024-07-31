export const pluralize = (count: number, singular: string, plural: string): string => {
  return count === 1 ? singular : plural
}

export const formatErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  } else return 'An unknown error occured, please try again or contact support.'
}