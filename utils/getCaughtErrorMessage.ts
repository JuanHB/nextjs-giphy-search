/**
 * Auxiliar method to extract the error message from throwns.
 * @param error
 */
export function getCaughtErrorMessage(error: any): string {
  let message = 'Unknown Error';
  if (error instanceof Error) message = error.message;
  return message;
}
