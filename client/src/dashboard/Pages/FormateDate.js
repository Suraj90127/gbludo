export  const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Format date to "10/10/2024 17:59:06" format in Kolkata time zone
  return date.toLocaleString('en-GB', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).replace(',', '');
  };