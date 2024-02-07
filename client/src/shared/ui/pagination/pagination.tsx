import { FC, useState } from "react";
import styles from "./styles.module.scss";

interface IPaginationProps {
	animesPerPage: number;
	totalAnimes: number;
	paginate: (pageNumber: number) => void;
}

export const Pagination: FC<IPaginationProps> = ({ animesPerPage, totalAnimes, paginate }) => {
	const [currentPage, setCurrentPage] = useState<number>(1);

	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalAnimes / animesPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<>
			<ul className={styles.pagination__container}>
				{
					pageNumbers.map(number => (
						<li key={number}>
							<a href="#"
								className={`${styles.page__element} ${currentPage === number ? styles.active : ""}`}
								onClick={() => {
									paginate(number);
									setCurrentPage(number)
								}}
							>
								{number}
							</a>
						</li>
					))
				}
			</ul>
		</>
	);
};
