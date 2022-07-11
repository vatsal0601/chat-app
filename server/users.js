export class User {
	constructor() {
		this.users = [];
	}

	addUser = ({ id, name, room }) => {
		name = name.trim().toLowerCase();
		room = room.trim().toLowerCase();

		if (!name || !room) return { error: "Missing username or room" };

		if (this.users.find((user) => user.name === name && user.room === room))
			return { error: "Username taken" };

		const user = { id, name, room };
		this.users.push(user);
		return { user };
	};

	removeUser = (id) => {
		const index = this.users.findIndex((user) => user.id === id);
		if (index !== -1) return this.users.splice(index, 1)[0];
	};

	getUser = (id) => {
		return this.users.find((user) => user.id === id);
	};

	getUsersInRoom = (room) => {
		return this.users.find((user) => user.room === room);
	};
}
