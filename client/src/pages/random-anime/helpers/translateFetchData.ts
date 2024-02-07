export const translateStatus = (statusAnime: string) => {
	const statuses: { [key: string]: string } = {
		released: "Вышел",
		ongoing: "Онгоинг",
	};

	return statuses[statusAnime] || statusAnime;
};
