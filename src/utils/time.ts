export const dateParser = {
  toMMDDYYY: (dateString: string) => {
    try {
      const date = new Date(dateString);
      return Intl.DateTimeFormat('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
        .format(date)
        .replace('/', '-');
    } catch (error) {
      console.error(error);
    }
  },
};
