import { EventEmitter } from 'events';

class On5Store extends EventEmitter {
	private state = false; // Initial state: 'NEE'

	getState() {
		return this.state;
	}

	toggle() {
		this.state = !this.state;
		this.emit('change', this.state);
		return this.state;
	}
}

// Export a singleton instance that can be shared across the server
export const on5Store = new On5Store();