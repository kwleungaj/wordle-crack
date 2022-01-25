let crack = (x) => {
    let key = "wordle";
    let solution = "";
    for(i = 0, j = 0; i < x.length; i++){
        let c = x.charAt(i);
        let remainder = c.toUpperCase().charCodeAt(0) - 65;
        let divider = 26;
        let magicNumber = ("A".charCodeAt(0) + key.toUpperCase().charCodeAt(j) - 130) % divider;
        if(remainder < magicNumber){
            remainder += divider;
        }
        let decryptedCharIndex = remainder - key.toUpperCase().charCodeAt(j) + 130;
        solution += String.fromCharCode(decryptedCharIndex);
        j = ++j%key.length;
    }
    return solution;
}

let getAnswer = () => {
    removeAllChild("answer-container");
    let url = document.getElementById("url-input-field").value;
    let pattern = "word=";
    let encryptedWord = url.substring(url.indexOf(pattern) + pattern.length);
    let answer = crack(encryptedWord);
    for(let i = 0; i < answer.length; i++) {
        let charBox = document.createElement("div");
        charBox.innerHTML = answer[i];
        charBox.className = "answer-value";
        document.getElementById("answer-container").appendChild(charBox);
    }
}

let removeAllChild = (childId) => {
    const node = document.getElementById(childId);
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
}