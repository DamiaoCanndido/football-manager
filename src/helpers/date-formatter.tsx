export function DateFormatter(date: string) {
  const today = new Date(Date.now());
  const gameDate = new Date(date);
  const days = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  const hourSplit = date.split('T')[1].substring(0, 5);

  if (
    today.getFullYear() === gameDate.getFullYear() &&
    today.getMonth() === gameDate.getMonth() &&
    today.getDate() === gameDate.getDate()
  ) {
    return 'Hoje • ' + hourSplit;
  } else if (
    today.getFullYear() === gameDate.getFullYear() &&
    today.getMonth() === gameDate.getMonth() &&
    today.getDate() + 1 === gameDate.getDate()
  ) {
    return 'Amanhã • ' + hourSplit;
  } else {
    const dateSplit = date.split('-');

    const getDay = gameDate.getDay();
    const formatDate =
      dateSplit[2].substring(0, 2) +
      '/' +
      dateSplit[1] +
      ' • ' +
      days[getDay] +
      ' • ' +
      hourSplit;
    return formatDate;
  }
}
