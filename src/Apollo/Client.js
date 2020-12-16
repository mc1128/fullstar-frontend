import ApooloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApooloClient({
  uri: "http://localhost:4000",
  clientState: {
    defaults,
    resolvers,
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
