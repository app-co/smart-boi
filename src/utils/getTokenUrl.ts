
export function getTokenUrl(url: string) {
  const liveMatch = url.match(/\/live\/([^?]+)/);
  if (liveMatch) {
    return liveMatch[1];
  }

  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) {
    return shortMatch[1];
  }

  const urlObj = new URL(url);
  const watchCode = urlObj.searchParams.get('v');
  if (watchCode) {
    return watchCode;
  }

  return null;
}