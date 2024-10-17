const str = `Просто, если задана строка из слов, возвращает длину самого короткого слова (ов).
Строка никогда не будет пустой, и вам не нужно учитывать разные типы данных.`

console.log(Math.min(...str.replaceAll(',','').replaceAll('.', '').replaceAll('\n', ' ').split(' ').map(word => word.length)))