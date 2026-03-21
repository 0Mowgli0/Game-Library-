export function formatReleaseYear(dateString) {
  if (!dateString) return "Okänt år";

  const date = new Date(dateString);
  if (isNaN(date)) return "Okänt år";

  return date.getFullYear();
}