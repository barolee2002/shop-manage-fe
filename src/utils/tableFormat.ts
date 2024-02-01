export const tableRows = (array: any[]) => {
  array?.map((row, index) => {
    return {
      ...row,
      key: index + 1,
    };
  });
};
