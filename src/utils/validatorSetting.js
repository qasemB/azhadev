export const validatorSettings = () => {
  return {
    messages: {
      required: "این فیلد حتما مقداردهی شود",
      email: "فرمت ایمیل صحیح نیست",
      min: "حد اقل 8 کارکتر",
    },
    element: (message) => (
      <div className="col-12 font_0_8 text-center text-danger">{message}</div>
    ),
  };
};
