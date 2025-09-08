import { on5Store } from '$lib/server/state';
import type { Actions } from './$types';

export const actions: Actions = {
	toggle: async () => {
		on5Store.toggle();
	}
};