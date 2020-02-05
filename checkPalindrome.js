function revereString(sbstr){
    return(sbstr.split('').reverse().join(''));
}
function isPrime(n){
    // console.log(n)
    let isPrimeNum = false;
    if (n <= 1) {
        isPrimeNum = false;
    } else{
        for (let i = 2; i < n; i++) {
            if (Math.abs(n % i) == 0) {
                // console.log('n:'+n+' '+'i'+i)
                isPrimeNum = false;
                break;
            } else{
                isPrimeNum = true;
            }
                 
        }
    } 
    return isPrimeNum;
}
function checkPalindrome(S){
    let strLen= S.length,palindromeLength=-1;
    for(let i=0;i<strLen-1;i++){
        for(let j=strLen;j>i;j--){
            // console.log('i:'+i+' '+'j:'+j)
            let subStr = S.slice(i,j)
            // console.log(subStr);
            if(subStr === revereString(subStr)){
                let subStrLen = subStr.length;
                if(subStrLen > palindromeLength){
                    palindromeLength = subStr.length;
                }
            }
        }
    }
    if(palindromeLength!=-1){
        return (isPrime(palindromeLength))?(palindromeLength):0
    } else{
        return 0;
    }
    
}
console.log(checkPalindrome('banana'));
