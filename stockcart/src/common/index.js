const backendDomain = "http://localhost/4000";

const SummaryApi = {
  SignUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  Login: {
    url: `${backendDomain}/api/login`,
    method: "post",
  },
};
export default SummaryApi;
