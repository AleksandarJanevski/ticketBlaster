const initialState = {
  print: {},
};
export const printReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setPrint":
      return {
        ...state,
        print: action.payload,
      };
    default:
      return state;
  }
};
