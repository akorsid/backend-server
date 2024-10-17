const massive1 = [1, 2, 2, 2, 2, 3, 2, 2, 3]
const massive2 = [1, 2, 3, 2, 3]
const result = []
for (let i = 0; i < massive1.length; i++){
    if (massive1[i] != massive1[i + 1]){
        result.push(massive1[i])
    }
    console.log(result)
}
console.log(result)
const isValid = JSON.stringify(result) == JSON.stringify(massive2)
console.log(isValid)