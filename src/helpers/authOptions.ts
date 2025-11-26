import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing email or password");
          return null;
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!res.ok) {
            console.error("Login failed", await res.text());
            return null;
          }

          const user = await res.json();

          if (user?.id) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.picture,
            };
          }

          return null;
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // ✔ Type-safe
      }
      return token;
    },

  async session({ session, token }) {
  if (session.user) {
    session.user.id = token.id;
  }
  return session;
}
  },

  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
