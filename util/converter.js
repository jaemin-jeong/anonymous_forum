export const convertDateFormat = (time, type = 0) => {
  let dt = time ? new Date(time) : new Date();
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1 > 9 ? (dt.getMonth() + 1) : '0' + (dt.getMonth() + 1);
  const date = dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate();
  const hours = dt.getHours() > 9 ? dt.getHours() : '0' + dt.getHours();
  const minutes = dt.getMinutes() > 9 ? dt.getMinutes() : '0' + dt.getMinutes();
  const seconds = dt.getSeconds() > 9 ? dt.getSeconds() : '0' + dt.getSeconds();

  switch (type) {
    case 0:
      return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;

    case 1:
      return year + '-' + month + '-' + date;
  
    default:
      return year + '-' + month + '-' + date;
  }
}