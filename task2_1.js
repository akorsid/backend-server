const str = `Просто, если задана строка из слов, возвращает длину самого короткого слова (ов).
Строка никогда не будет пустой, и вам не нужно учитывать разные типы данных.`

const words = str.replaceAll(',','').replaceAll('.', '').replaceAll('\n', ' ').split(' ')
console.log(words)

const lengthword = []
let min = Infinity
for (let i = 0; i < words.length; i++ ){
    lengthword.push(words[i].length)
    min = Math.min(min,lengthword[i])
}
console.log(lengthword)
console.log(min)

for (const word of words){
    lengthword.push(word.length)
    min = Math.min(min,lengthword[i])
}

words.forEach((word,i) => {
    lengthword.push(word.length)
    min = Math.min(min,lengthword[i])
});