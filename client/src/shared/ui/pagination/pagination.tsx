import { FC } from 'react'
import styles from './styles.module.scss'
import { observer } from 'mobx-react-lite'

interface IPaginationProps {
   animesPerPage: number
   totalAnimes: number
   paginate: (pageNumber: number) => void
   currentPage: number
}

export const Pagination: FC<IPaginationProps> = observer(({ animesPerPage, totalAnimes, paginate, currentPage }) => {
   const maxPagesToShow = 5
   const totalPages = Math.ceil(totalAnimes / animesPerPage) - 1

   let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
   let endPage = Math.min(totalPages, currentPage + Math.floor(maxPagesToShow / 2))

   if (endPage - startPage + 1 < maxPagesToShow) {
      if (startPage === 1) {
         endPage = Math.min(totalPages, maxPagesToShow)
      } else if (endPage === totalPages) {
         startPage = Math.max(1, totalPages - maxPagesToShow + 1)
      }
   }

   function range(start: number, end: number): number[] {
      const length = end - start + 1
      return Array.from({ length }, (_, idx) => idx + start)
   }

   const pages = range(startPage, endPage).map((number) => {
      return (
         <li key={number}>
            <a
               href='#'
               className={`${styles.page__element} ${currentPage === number ? styles.active : ''}`}
               onClick={(e) => {
                  e.preventDefault()
                  paginate(number)
                  //setCurrentPage(number);
               }}
            >
               {number}
            </a>
         </li>
      )
   })

   return (
      <>
         <ul className={styles.pagination__container}>
            {currentPage !== 1 && totalPages > 10 && (
               <li>
                  <a
                     href='#'
                     className={styles.page__element}
                     onClick={(e) => {
                        e.preventDefault()
                        paginate(currentPage - 1)
                        //setCurrentPage(currentPage - 1);
                     }}
                  >
                     Предыдущая
                  </a>
               </li>
            )}
            {startPage > 1 && (
               <li>
                  <a
                     href='#'
                     className={styles.page__element}
                     onClick={(e) => {
                        e.preventDefault()
                        paginate(1)
                        //setCurrentPage(1);
                     }}
                  >
                     1
                  </a>
               </li>
            )}
            {startPage > 2 && (
               <li className={styles.border}>
                  <span className={styles.border__span}>...</span>
               </li>
            )}
            {pages}
            {endPage < totalPages && (
               <li className={styles.border}>
                  <span className={styles.border__span}>...</span>
               </li>
            )}
            {endPage < totalPages && (
               <li>
                  <a
                     href='#'
                     className={styles.page__element}
                     onClick={(e) => {
                        e.preventDefault()
                        paginate(totalPages)
                        //setCurrentPage(totalPages);
                     }}
                  >
                     {totalPages}
                  </a>
               </li>
            )}
            {currentPage !== totalPages && totalAnimes > 10 && (
               <li>
                  <a
                     href='#'
                     className={styles.page__element}
                     onClick={(e) => {
                        e.preventDefault()
                        paginate(currentPage + 1)
                        //setCurrentPage(currentPage + 1);
                     }}
                  >
                     Следующая
                  </a>
               </li>
            )}
         </ul>
      </>
   )
})
