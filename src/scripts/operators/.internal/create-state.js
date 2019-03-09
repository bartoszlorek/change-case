const createState = method => string => ({
  method: method || null,
  source: string,
  result: string
});

export default createState;
