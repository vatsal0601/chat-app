import Head from "@components/Head";
import Login from "@components/Login";
import Chat from "@components/Chat";
import type { NextPage } from "next";
import { useState } from "react";
import { connect, Socket } from "socket.io-client";

const socket: Socket = connect("ws://localhost:5000");

const Home: NextPage = () => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	const [room, setRoom] = useState<string>("");

	const handleSubmit: () => void = () => {
		if (name === "" || room === "") return;
		socket.emit("join", { name, room }, (error: any) => {
			if (error) console.error(error);
		});
		socket.on("room:users", (data) => {
			console.log(data);
		});
		setIsLoggedIn(true);
	};

	return (
		<>
			<Head />
			<main>
				{isLoggedIn ? (
					<Chat name={name} room={room} socket={socket} />
				) : (
					<Login
						name={name}
						room={room}
						setName={setName}
						setRoom={setRoom}
						handleSubmit={handleSubmit}
					/>
				)}
			</main>
		</>
	);
};

export default Home;
