export const normalizeRecord = (data: any) => {
  return {
    id: data.recordid,
    ...data.fields,
  };
};
