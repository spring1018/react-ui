import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const fetcher = (url: string): Promise<any> =>
  fetch(url).then((res) => res.json());

export const options: NextAuthOptions = {
  debug: true,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      // メルアド認証処理
      // TODO: パスワードをハッシュ化する
      async authorize(credentials) {
        const users = await fetcher(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/users`,
        );
        // 一時的に password をつけて返す
        const temp = users.map((user) => {
          return {
            ...user,
            password: "password",
          };
        });
        const user = temp.find((user) => user.email === credentials?.email);
        // const user = users.find((user) => user.email === credentials?.email);

        if (user && user?.password === credentials?.password) {
          return {
            id: user.id,
            name: user.name,
            userId: user.userId,
            email: user.email,
            role: user.role,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      if (user) {
        token.user = user;
        const u = user as any;
        token.role = u.role;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: ({ session, token }) => {
      token.accessToken;
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      };
    },
  },
};
