import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Google],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      return isLoggedIn;
    },
  },
} satisfies NextAuthConfig;
