// following are related to plotly and jest
// https://stackoverflow.com/questions/48828759/unit-test-raises-error-because-of-getcontext-is-not-implemented
// https://github.com/plotly/react-plotly.js/issues/115
window.URL.createObjectURL = function createObjectURL() {};

HTMLCanvasElement.prototype.getContext = () => {
  // return whatever getContext has to return
};
