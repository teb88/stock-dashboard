export function composeUrl(
  baseUrl: string,
  config: {resource: string; queryParams?: URLSearchParams}
) {
  const url = new URL(baseUrl);

  if (config.resource) {
    url.pathname = config.resource;
  }

  if (config.queryParams) {
    url.search = config.queryParams.toString();
  }

  return url.toString();
}
