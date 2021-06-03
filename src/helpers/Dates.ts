export const getDate = () => {
  const [month, day, year] = new Date().toLocaleDateString('en-US').split('/');
  //const [hour, minute] = new Date().toLocaleTimeString('en-US').split(/:| /);
  const date = `${day}/${month}`;

  return date;
};
