export function convertColombiaTimeString(timeStr) {
  const [hours, minutes] = timeStr.split(':');
  
  // Crear un objeto Date para la hora en Colombia
  const colombiaDate = new Date();
  colombiaDate.setUTCHours(parseInt(hours, 10) + 5, parseInt(minutes, 10), 0, 0); // UTC-5 para Colombia

  // Formatear la hora en la zona horaria de destino
  const targetFormatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return targetFormatter.format(colombiaDate);
}