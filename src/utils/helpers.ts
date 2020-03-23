export const randomFromArray = (array: any[]) => {
    return array[Math.floor(Math.random() * (array.length - 1))]
}
