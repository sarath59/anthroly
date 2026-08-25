/**
 * Next 14 passes `params` as a plain object.
 * Next 15 passes `params` as a Promise.
 * `await` is valid for both (awaiting a non-Promise returns the value).
 */
export async function readParams<T>(params: T | Promise<T>): Promise<T> {
  return await params;
}
