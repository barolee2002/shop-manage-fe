
const useCellClick = (field: string, onClick: (item: any) => void) => {
  return {
    field,
    onClick,
  };
};

export default useCellClick;
