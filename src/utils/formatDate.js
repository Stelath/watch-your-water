export function getCurrentDateEN() {
  return new Date().toLocaleDateString('en');
}

export function dateToISOFormat(date) {
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

  return formattedDate;
}
