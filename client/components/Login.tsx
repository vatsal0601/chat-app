import { FC } from "react";

type Props = {
	name: string;
	setName: (user: string) => void;
	room: string;
	setRoom: (room: string) => void;
	handleSubmit: () => void;
};

const Login: FC<Props> = ({ name, setName, room, setRoom, handleSubmit }: Props) => {
	return (
		<div className="container pt-24 lg:pt-32">
			<div className="mx-auto space-y-3 rounded-lg border-2 border-zinc-100 p-3 text-zinc-600 md:w-4/5 lg:w-2/5 lg:space-y-5 lg:p-5">
				<h1 className="text-center text-3xl font-bold tracking-tight text-zinc-900 lg:text-4xl">
					Login
				</h1>
				<form
					onClick={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
					className="space-y-3 lg:space-y-5">
					<div>
						<label htmlFor="name" className="block text-sm font-semibold lg:text-base">
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full rounded-lg border border-zinc-300 p-3 text-sm placeholder-zinc-400 focus:outline-none lg:text-base"
						/>
					</div>
					<div>
						<label htmlFor="room" className="block text-sm font-semibold lg:text-base">
							Room
						</label>
						<input
							type="text"
							id="room"
							name="room"
							placeholder="Room"
							value={room}
							onChange={(e) => setRoom(e.target.value)}
							className="w-full rounded-lg border border-zinc-300 p-3 text-sm placeholder-zinc-400 focus:outline-none lg:text-base"
						/>
					</div>
					<div>
						<button className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors active:bg-blue-700 lg:text-base">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
