import { default as NextHead } from "next/head";
import { FC } from "react";

type Props = {
	title?: string;
	description?: string;
	keywords?: string;
};

const Head: FC<Props> = ({ title, description, keywords }: Props) => {
	return (
		<NextHead>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
		</NextHead>
	);
};

export default Head;

Head.defaultProps = {
	title: "Chaaat",
	description: "Chat App",
	keywords: "Chat, ScoketIO",
};
