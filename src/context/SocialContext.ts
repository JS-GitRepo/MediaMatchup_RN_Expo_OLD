//^^ Needs to change pending android build.gradle.
import { User } from "firebase/auth";
import { createContext } from "react";

export interface SocialContextModel {
  user: User | null;
}
const defaultValue: SocialContextModel = {
  user: null,
};
const SocialContext = createContext(defaultValue);
export default SocialContext;

// Entire context is incomplete.
