import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getCookie, setCookies } from 'cookies-next';
import { uuid } from 'uuidv4';
import db from '../../prisma/db';
import magicAdmin from '../utils/magicAdmin';

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  const didToken = getCookie('did-token', opts) as string;

  let user: { email: string | null; id: string };
  try {
    const { email } = (await magicAdmin.users.getMetadataByToken(didToken)) as { email: string };
    const { id } = await db.user.upsert({
      where: {
        email,
      },
      create: {
        email,
      },
      update: {
        email,
      },
    });
    user = { email, id };
  } catch {
    const publicUserId = getCookie('public-user-id', { ...opts }) as string;
    if (publicUserId) {
      user = { email: null, id: publicUserId };
    } else {
      const publicUser = await db.user.create({
        data: {
          id: uuid(),
        },
      });
      user = { email: null, id: publicUser.id };
      setCookies('public-user-id', user.id, { ...opts, httpOnly: true });
    }
  }
  return {
    user,
    req: opts?.req,
    res: opts?.res,
  };
}

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<Context>();
}
