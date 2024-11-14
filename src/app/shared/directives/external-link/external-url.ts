function getHostFromUrl(url: string): string {
  return new URL(url).hostname.replace('www.', '');
}

export function isAbsoluteUrl(url: string): boolean {
  const formatedUrl = url.toLowerCase();
  return formatedUrl.startsWith('http') || formatedUrl.startsWith('https');
}

export function isUrlExternal(
  url: string,
  host = window.location.hostname,
): boolean {
  if (!isAbsoluteUrl(url)) {
    return false;
  }
  const providedHost = getHostFromUrl(url);
  return providedHost !== host;
}
