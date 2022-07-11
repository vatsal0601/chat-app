import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import { User } from "./users.js";

const port = 5000;
const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
	},
});

const UserInstance = new User();
io.on("connection", (socket) => {
	console.log(`User connected with id ${socket.id}`);

	socket.on("join", ({ name, room }, cb) => {
		const { error, user } = UserInstance.addUser({ id: socket.id, name, room });
		if (error) return cb(error);

		socket.join(user.room);
		console.log(`User ${user.name} with id ${socket.id} joined room ${user.room}`);

		socket
			.to(user.room)
			.emit("room:users", { room: user.room, users: UserInstance.getUsersInRoom(user.room) });

		cb();
	});

	socket.on("message:send", ({ message }, cb) => {
		const user = UserInstance.getUser(socket.id);
		socket.to(user.room).emit("message:receive", { message });
		cb();
	});

	socket.on("user:sendTyping", ({ name, room }, cb) => {
		socket.to(room).emit("user:receiveTyping", { name, room });
		cb();
	});

	socket.on("disconnect", () => {
		const user = UserInstance.removeUser(socket.id);
		if (user) {
			console.log(`User ${user.name} with id ${socket.id} removed`);
			socket.to(user.room).emit("room:users", {
				room: user.room,
				users: UserInstance.getUsersInRoom(user.room),
			});
		}
	});
});

server.listen(port, () => console.log(`Server is running at port ${port}`));
