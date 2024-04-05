import { ReactNode } from 'react'
import $ from 'jquery'

export class AnitopiaServerError extends Error {
   public readonly code: number
   constructor(
      errorMsg: string,
      errorCode: number = 0,
      public readonly title: string = 'Помилка',
      public readonly name: string = 'Undefined Error',
      public readonly subErrorCode?: number | null,
   ) {
      super(errorMsg)
      this.code = errorCode
   }
   toString() {
      return this.message
   }
}

function checkServerMessageError(error: any) {
   if (error.response && error.response.data) {
      if (error.response.data.errors && error.response.data.errors[0]) return error.response.data.errors[0].msg

      if (error.response.data.message) return error.response.data.message

      return undefined
   }
}

export function handleFetchError(error: any) {
   let ServerMessageError = checkServerMessageError(error)

   //Client error - params/flood/ect.
   // How to use it? Just - throw new AnitopiaServerError("Not found", 404)
   // where first parameter is error message and the second is status code
   if (error instanceof AnitopiaServerError) {
      console.log('handleFetchError:', 1)
      showNotice(error.message, error.title, 'error')
   }
   //check message from server
   else if (ServerMessageError !== undefined) {
      showNotice(ServerMessageError, 'Помилка', 'error')
   }
   // Fetch failed error
   else if (error instanceof TypeError) {
      console.log('handleFetchError:', 2)
      showNotice('Немає доступу до сервера.\nПеревірте інтеренет підключення.', 'Ви офлайн :(', 'error')
   }
   //JSON decode error
   else if (error instanceof SyntaxError) {
      console.log('handleFetchError:', 3)
      showNotice(
         'Невідома помилка сервера...\nСпробуйте ще раз або напишіть нам.',
         'Упс... Щось пішло не так...',
         'error',
      )
   }
   //Maybe some function threw string? (but actually it shouldn't -_-)
   else if (typeof error === 'string') {
      console.log('handleFetchError:', 4)
      showNotice(error, 'Помилка', 'error')
   } else {
      console.log('handleFetchError:', 5)
      showNotice(
         'Відбулась невідома помилка.\nСпробуйте ще раз або напишіть нам.',
         'Опана! Схоже, що я поламався :(  ',
         'error',
      )
   }
   console.error(error.stack || error)
}

export function createElementFromHTML(htmlString: string) {
   const template = document.createElement('template')
   template.innerHTML = htmlString.trim()
   return Array.from(template.content.childNodes)
      .map((node) => node.textContent)
      .filter((text): text is string => text !== null) // remove null values
      .map((text) => <span dangerouslySetInnerHTML={{ __html: text }} />) // create React elements
}

export function showNotice(
   message: string | ReactNode,
   caption: string = 'Нове повідомлення',
   level?: 'error' | '' | 'normal' | 'success',
   isHtml: boolean = false,
   onClick?: () => any,
) {
   if (!message) return

   let last = $('<div>', {
      class: 'notice-slot',
      click: function () {
         if (onClick) onClick()
         $(this).css('transition', 'all .3s').css('max-height', '0').css('opacity', '0').css('margin', '0')
         setTimeout(() => $(this).remove(), 300)
      },
      append: $('<div>', {
         class: `notice-popup ${level || 'normal'}`,
         append: [
            $('<div>', {
               class: 'n-caption',
               html: isHtml ? createElementFromHTML(caption) : caption,
            }),
            $('<div>', {
               class: 'n-body',
               html: isHtml && typeof message === 'string' ? createElementFromHTML(message) : message,
            }),
         ],
      }),
   }).appendTo('.notice-container')

   last
      .css('max-height', last.children().outerHeight() + 'px')
      .delay(6000)
      .queue(function (next) {
         if (parseInt(last.css('opacity')) == 1) {
            last
               .css('pointer-events', 'none')
               .css('opacity', '0')
               .css('margin-bottom', last.children().outerHeight() + 'px')
            next()
         }
      })
      .delay(1000)
      .queue(() => last.remove())
}
;(window as any).showNotice = showNotice
