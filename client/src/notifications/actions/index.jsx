export const sendNotification = (type, message) => {
  const id = Math.random();
  const date = new Date();

  return { type: 'ADD_NOTIFICATION', payload: { type, message, id, date } };
};

export const removeNotification = id => {
  return { type: 'REMOVE_NOTIFICATION', payload: { id } };
};
