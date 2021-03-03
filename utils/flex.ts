export const flex = (justify: string, align: string) => {
  return {
    justifyContent: justify || "center",
    alignItems: align || "center",
  };
};
