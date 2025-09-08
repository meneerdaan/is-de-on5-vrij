import { on5Store } from '$lib/server/state';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ request }) => {
	const stream = new ReadableStream({
		start(controller) {
			const sendState = (state: boolean) => {
				// SSE data format is `data: <json_string>\n\n`
				controller.enqueue(`data: ${JSON.stringify({ isVrij: state })}\\n\\n`);
			};

			// Send the initial state immediately on connection
			sendState(on5Store.getState());

			// Listen for state changes and push them to the client
			const changeListener = (newState: boolean) => {
				sendState(newState);
			};
			on5Store.on('change', changeListener);

			// Clean up when the client disconnects
			request.signal.addEventListener('abort', () => {
				on5Store.off('change', changeListener);
			});
		}
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive'
		}
	});
};