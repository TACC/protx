export const initialState = {
  loading: true,
  error: false,
  data: null
};

export default function protx(state = initialState, action) {
  switch (action.type) {
    case 'PROTX_INIT':
      return {
        ...initialState,
        loading: true
      };
    case 'PROTX_SUCCESS':
      return {
        ...state,
        data: { ...action.payload },
        loading: false
      };
    case 'PROTX_FAILURE':
      return {
        ...initialState,
        error: true
      };
    default:
      return state;
  }
}
