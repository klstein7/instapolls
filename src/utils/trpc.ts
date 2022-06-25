import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '../pages/api/trpc/[trpc]';

export const { useMutation, useQuery, useContext } = createReactQueryHooks<AppRouter>();
