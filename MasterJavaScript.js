let givenPattran = [];
let RandomPattran = () => {
    for (let i = 0; i < 4; i++) {
        givenPattran[i] = randomRange(0, 5);
    }
}
function randomRange(myMin, myMax) {
    let rangeVal = Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;
    return rangeVal;
}
RandomPattran();
function hideUnhide() {
    let x = document.getElementById("infoHidden");
    if (x.style.display == "none") {
        x.style.display = "block";
        document.getElementById("showHide").innerHTML = "Hide rules";
    }
    else {
        x.style.display = "none";
        document.getElementById("showHide").innerHTML = "Show rules";

    }
}

// const collection = document.getElementsByClassName("peg");
// collection.style.opacity = "50%";

// The 'previousVal' would have been storing the previous value of the input radio button.
let previousVal = "0";
let currentVal = "0";
function giveValue(peg_id) {
    currentVal = document.getElementById(peg_id).value;
    let element = document.getElementById("right");
    element.getElementsByTagName("span")[currentVal].classList.add("selected");
    if (currentVal !== previousVal) {
        element.getElementsByTagName("span")[previousVal].classList.remove("selected");
    }
    previousVal = currentVal;
}

let ourPattran = ["-1", "-1", "-1", "-1"];
let forCheckBtn = {};
let pegDecodeColor = 0;
let confirmCheckHide = 3;

function putColor(pegVal) {
    let pegValToInt = parseInt(pegVal);
    let element = document.getElementById("left-side");
    // Here, we've two solutions, we can use a 'SWITCH' OR 'IF ELSE'.
    switch (currentVal) {
        case "0":
            element.getElementsByTagName("span")[pegValToInt + pegDecodeColor].classList = "peg zero";
            ourPattran[pegVal] = currentVal;
            break;
        case "1":
            element.getElementsByTagName("span")[pegValToInt + pegDecodeColor].classList = "peg one";
            ourPattran[pegVal] = currentVal;
            break;
        case "2":
            element.getElementsByTagName("span")[pegValToInt + pegDecodeColor].classList = "peg two";
            ourPattran[pegVal] = currentVal;
            break;
        case "3":
            element.getElementsByTagName("span")[pegValToInt + pegDecodeColor].classList = "peg three";
            ourPattran[pegVal] = currentVal;
            break;
        case "4":
            element.getElementsByTagName("span")[pegValToInt + pegDecodeColor].classList = "peg four";
            ourPattran[pegVal] = currentVal;
            break;
        case "5":
            element.getElementsByTagName("span")[pegValToInt + pegDecodeColor].classList = "peg five";
            ourPattran[pegVal] = currentVal;
            break;
    }

    // if (currentVal == 0)
    // {
    //     element.getElementsByTagName("span")[pegVal].classList = "peg zero";
    // }else if (currentVal == 1)
    // {
    //     element.getElementsByTagName("span")[pegVal].classList = "peg one";
    // }
    // else if (currentVal == 2)
    // {
    //     element.getElementsByTagName("span")[pegVal].classList = "peg two";
    // }
    // else if (currentVal == 3)
    // {
    //     element.getElementsByTagName("span")[pegVal].classList = "peg three";
    // }
    // else if (currentVal == 4)
    // {
    //     element.getElementsByTagName("span")[pegVal].classList = "peg four";
    // }else
    // {
    //     element.getElementsByTagName("span")[pegVal].classList = "peg five";
    // }

    //Don't disturb it...
    // forCheckBtn = document.getElementById("left-side");
    // let temp = forCheckBtn.getElementsByTagName("div")[0].getElementsByTagName("div")[2].style.display = "block";
    // console.log(temp);

    function greaterThen(greater) {
        return greater > -1;
    }
    if (ourPattran.every(greaterThen)) {
        document.getElementById("left-side").getElementsByTagName("div")[confirmCheckHide].style.display = "block";

    }
}
// let givenPattranTemp = [];
// let ourPattranTemp = [];
// Confirm the Pattran
function checkConfirm() {
    pegDecodeColor += 8;
    confirmCheckHide += 6;

    let wrongCount = 4;
    let correctCount = 0;
    let colorAtWrongPattran = 0;
    let givenPattranTemp = [...givenPattran];
    let ourPattranTemp = [...ourPattran];
    let tempArr = [];
    let tempVar = 0;
    if (givenPattran[0] == ourPattran[0] && givenPattran[1] == ourPattran[1] && givenPattran[2] == ourPattran[2] && givenPattran[3] == ourPattran[3]) {
        myFunction(wrongCount, correctCount, colorAtWrongPattran, 4);

    } else {
        for (let i = 0; i < 4; i++) {
            if (givenPattran[i] == ourPattran[i]) {
                correctCount++;
            }
        }
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (ourPattranTemp[i] == givenPattranTemp[j]) {
                    tempArr[tempVar] = (ourPattranTemp.splice(i, 1, "matchConfirm"));
                    givenPattranTemp.splice(j, 1, "match");
                    tempVar++;
                }
            }
        }
        colorAtWrongPattran = tempArr.length - correctCount;
        wrongCount -= correctCount;
        console.log("Failure!, Correct Position + Correct color = " + correctCount + " Wrong position + wrong color = " + wrongCount + " correct colors at wrong position = " + colorAtWrongPattran);

        myFunction(wrongCount, correctCount, colorAtWrongPattran);
    }
}

let tenTurns = 0;
let hintsColor = -4;
let borderRemUnRemove = 0;
let myFunction = (WC, CC, CAWP, Win) => {
    hintsColor += 8;
    borderRemUnRemove += 6;
    tenTurns++;
    let element = document.getElementById("left-side");

    if (Win == 4) {
        for (let i = hintsColor; i < hintsColor + 4; i++) {
            element.getElementsByTagName("span")[i].classList = "hint correctColorCorrectPosition";
            element.getElementsByTagName("div")[borderRemUnRemove - 3].style.display = "none";
        }
        document.getElementById("endgame win").style.display = "block";
        getLowOpacity();
    } else if (tenTurns == 10) {
        getLowOpacity();
        for (let i = hintsColor; i < hintsColor + 4; i++) {
            if (CC > 0) {
                element.getElementsByTagName("span")[i].classList = "hint correctColorCorrectPosition";
                CC--;

            } else if (CAWP > 0) {
                element.getElementsByTagName("span")[i].classList = "hint correctColorWrongPosition";
                CAWP--;
            } else {
                element.getElementsByTagName("span")[i].classList = "hint none-matches";
                WC--;
            }
        }
        document.getElementById("endgame failure").style.display = "block";
        element.getElementsByTagName("div")[borderRemUnRemove - 6].classList = "row";
        element.getElementsByTagName("div")[borderRemUnRemove - 3].style.display = "none";
    }//else {
    //     if (tenTurns == 10)
    //     {
    //         document.getElementById("endgame failure").style.display = "block";            
    //     }
    else {
        for (let i = hintsColor; i < hintsColor + 4; i++) {
            if (CC > 0) {
                element.getElementsByTagName("span")[i].classList = "hint correctColorCorrectPosition";
                CC--;

            } else if (CAWP > 0) {
                element.getElementsByTagName("span")[i].classList = "hint correctColorWrongPosition";
                CAWP--;
            } else {
                element.getElementsByTagName("span")[i].classList = "hint none-matches";
                WC--;
            }
        }
        element.getElementsByTagName("div")[borderRemUnRemove].classList = "row current";
        element.getElementsByTagName("div")[borderRemUnRemove - 6].classList = "row";
        element.getElementsByTagName("div")[borderRemUnRemove - 3].style.display = "none";
        getLowOpacity();
        ourPattran = ["-1", "-1", "-1", "-1"];
    }
}

let getLowOpacity = () => {
    let element = document.getElementById("left-side");
    let j = 0;

    for (let i = pegDecodeColor; i < pegDecodeColor + 4; i++) {
        element.getElementsByTagName("span")[i - 8].classList.add("lowOpacity");
        document.getElementById(`peg-${tenTurns}-${j}`).disabled = "true";
        if (tenTurns != 10) {

            document.getElementById(`peg-${tenTurns + 1}-${j}`).disabled = false;
        }
        j++;
    }
}

let refreshPage = () => {
    window.location.reload();
}
