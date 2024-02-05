// inputsData.ts
import userImg from "../assets/person.svg";
import passwordImg from "../assets/lock-closed.svg";

export const getInputsData = (setUsername: any, setPassword: any) => [
	{
		img: userImg,
		setValue: setUsername,
		htmlFor: "username",
		type: "text",
		textLabel: "Имя пользователя",
	},
	{
		img: passwordImg,
		setValue: setPassword,
		htmlFor: "password",
		type: "password",
		textLabel: "Пароль",
	},
];
