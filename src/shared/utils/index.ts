export const buildGithubIssuesQueryString = (queryParams): string => {
  const searchParams = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          searchParams.append(key, value.join(","));
        }
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  return searchParams.toString();
};
