/**
 * Shim so `import type { UrlObject } from 'url'` (used by next/link) does not
 * resolve to a parent-folder polyfill at ~/node_modules/url that has no types.
 */
export interface UrlObject {
  auth?: string | null | undefined;
  hash?: string | null | undefined;
  host?: string | null | undefined;
  hostname?: string | null | undefined;
  href?: string | null | undefined;
  pathname?: string | null | undefined;
  protocol?: string | null | undefined;
  search?: string | null | undefined;
  slashes?: boolean | null | undefined;
  port?: string | number | null | undefined;
  query?: string | null | NodeJS.Dict<string | string[]> | undefined;
}

export type URLFormatOptions = {
  auth?: boolean | undefined;
  fragment?: boolean | undefined;
  search?: boolean | undefined;
  unicode?: boolean | undefined;
};

declare const url: {
  parse(urlStr: string, parseQueryString?: boolean, slashesDenoteHost?: boolean): UrlObject;
  format(urlObject: UrlObject | string | URL, options?: URLFormatOptions): string;
  resolve(from: string, to: string): string;
  URL: typeof URL;
  URLSearchParams: typeof URLSearchParams;
};

export default url;
