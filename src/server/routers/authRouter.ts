import { getCookie, removeCookies, setCookies } from 'cookies-next';
import { z } from 'zod';
import magicAdmin from '../../utils/magicAdmin';
import { createRouter } from '../context';

const authRouter = createRouter()
  .query('currentUser', {
    resolve({ ctx }) {
      if (!ctx.user.email) {
        return null;
      }
      return ctx.user;
    },
  })
  .mutation('signIn', {
    input: z.object({
      didToken: z.string().min(1),
    }),
    resolve({ input: { didToken }, ctx }) {
      setCookies('did-token', didToken, { req: ctx.req, res: ctx.res, httpOnly: true });
    },
  })
  .mutation('signOut', {
    resolve: async ({ ctx }) => {
      const didToken = getCookie('did-token', { req: ctx.req, res: ctx.res }) as string;
      await magicAdmin.users.logoutByToken(didToken);
      removeCookies('did-token', { req: ctx.req, res: ctx.res });
    },
  });

export default authRouter;
