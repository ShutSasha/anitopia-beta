export const toUrlEncoded = (name_title: string): string => {
   return name_title.split(' ').join('%20')
}
