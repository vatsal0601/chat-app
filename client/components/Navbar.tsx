import { FC } from "react";

const Navbar: FC = () => {
	return (
		<>
			<header className="fixed top-0 z-50 w-full border-b-2 border-zinc-100 bg-white py-1 lg:py-3">
				<nav className="container">
					<h1 className="text-3xl font-bold tracking-tight text-zinc-900 transition-colors lg:text-4xl">
						Chaaat
					</h1>
				</nav>
			</header>
		</>
	);
};

export default Navbar;
