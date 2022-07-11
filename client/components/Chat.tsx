import { FC, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type Props = {
	name: string;
	room: string;
	socket: Socket;
};

type Message = {
	room: string;
	name: string;
	message: string;
	time: Date;
};

const Chat: FC<Props> = ({ name, room, socket }: Props) => {
	const [messageList, setMessageList] = useState<Message[]>([]);
	const [currentMessage, setCurrentMessage] = useState<string>("");
	const [userTyping, setUserTyping] = useState<string>("");

	useEffect(() => {
		socket.on("message:receive", ({ message }) => {
			setMessageList((messageList) => [...messageList, message]);
		});
		socket.on("user:receiveTyping", ({ name, room }) => {
			setUserTyping(name);
		});
	}, [socket]);

	const sendMessage: () => void = () => {
		if (currentMessage === "") return;
		const message: Message = {
			room,
			name,
			message: currentMessage,
			time: new Date(Date.now()),
		};
		socket.emit("message:send", { message }, () => setCurrentMessage(""));
		setMessageList((messageList) => [...messageList, message]);
	};

	const sendTyping: () => void = () => {
		socket.emit("user:sendTyping", { name, room }, () => setUserTyping(""));
	};

	return (
		<div className="container min-h-screen border-x-2 border-zinc-100">
			<div className="py-24 lg:py-32">
				<div className="flex flex-col space-y-3 lg:space-y-5">
					{messageList.map((message: Message, index: number) => (
						<div key={index} className={message.name === name ? "self-end" : ""}>
							<div
								className={`flex items-center ${
									message.name === name ? "flex-row-reverse" : ""
								} gap-1 lg:gap-3`}>
								<p>
									<span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-10 w-10 rounded-full bg-teal-600 text-[0.5rem] font-semibold text-white lg:h-12 lg:w-12"
											viewBox="0 0 20 20"
											fill="currentColor">
											<text
												textAnchor="middle"
												alignmentBaseline="central"
												y="50%"
												x="50%">
												{message.name.toLowerCase()[0]}
											</text>
										</svg>{" "}
									</span>
								</p>
								<p
									className={`w-max rounded-lg px-2 py-1 text-white lg:px-3 lg:py-2 ${
										message.name === name ? "bg-blue-600" : "bg-green-500"
									}`}>
									{message.message}
								</p>
							</div>
							<p className="text-xs font-light lg:text-sm">
								{new Date(message.time).toLocaleTimeString("en-US", {
									hour: "numeric",
									minute: "numeric",
								})}
							</p>
						</div>
					))}
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						sendMessage();
					}}
					className="lg:sapce-y-3 fixed left-0 bottom-3 w-full space-y-1 px-5 lg:bottom-5 lg:px-10">
					<div className="mx-auto flex max-w-prose items-center gap-3 lg:gap-5">
						<input
							value={currentMessage}
							onChange={(e) => {
								setCurrentMessage(e.target.value);
								sendTyping();
							}}
							type="text"
							placeholder="Message..."
							className="w-4/5 rounded-lg border border-zinc-300 p-3 text-sm placeholder-zinc-400 focus:outline-none lg:text-base"
						/>
						<button className="w-1/5 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors active:bg-blue-700 lg:text-base">
							Send
						</button>
					</div>
					{userTyping && (
						<p className="mx-auto max-w-prose text-center text-sm font-light italic lg:text-base">
							{userTyping} is typing...
						</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default Chat;
