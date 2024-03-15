let piDigits = '';

document.addEventListener('DOMContentLoaded', function () {
    fetch('Pi10KDP.txt')
        .then(response => response.text())
        .then(text => {
            piDigits = "3." + text;
        });

    document.getElementById('checkButton').onclick = function () {
        checkPi(document.getElementById('numberInput').value, 'piDigits', 'correctPi1');
    };

    document.getElementById('numberInput').onkeypress = function (event) {
        if (event.key === 'Enter') {
            checkPi(document.getElementById('numberInput').value, 'piDigits', 'correctPi1');
        }
    };

    document.getElementById('showBabylon').onclick = function () {
        checkPi('3.125', 'babylonPi', 'correctPi2');
    };

    document.getElementById('showEgypt').onclick = function () {
        checkPi('3.16', 'egyptPi', 'correctPi3');
    };

    document.getElementById('showIndia').onclick = function () {
        var indiaPi = ['3.08831', '3.08833', '3.004', '3', '3.125'];
        checkPi(indiaPi[Math.floor(Math.random() * indiaPi.length)], 'indiaPi', 'correctPi4');
    };

    document.getElementById('showArchimedes').onclick = function () {
        var archimedesPi = ['3.1408', '3.1429 '];
        checkPi(archimedesPi[Math.floor(Math.random() * archimedesPi.length)], 'archimedesPi', 'correctPi5');
    };

    document.getElementById('showPtolemy').onclick = function () {
        checkPi('3.1416', 'ptolemyPi', 'correctPi6');
    };

    document.getElementById('showZu').onclick = function () {
        var zuPi = ['3.1415926', '3.1415927'];
        checkPi(zuPi[Math.floor(Math.random() * zuPi.length)], 'zuPi', 'correctPi7');
    };

    document.getElementById('showAryabhata').onclick = function () {
        checkPi('3.1416', 'aryabhataPi', 'correctPi8');
    };

    document.getElementById('showFibonacci').onclick = function () {
        checkPi('3.1418', 'fibonacciPi', 'correctPi9');
    };

    document.getElementById('showDante').onclick = function () {
        checkPi('3.14142', 'dantePi', 'correctPi10');
    };

    document.getElementById('showKashi').onclick = function () {
        checkPi('3.1415926535897932', 'kashiPi', 'correctPi11');
    };

    document.getElementById('showViète').onclick = function () {
        checkPi('3.141592653', 'viètePi', 'correctPi12');
    };

    document.getElementById('showRoomen').onclick = function () {
        checkPi('3.141592653589793', 'roomenPi', 'correctPi13');
    };

    document.getElementById('showCeulen').onclick = function () {
        checkPi('3.14159265358979323846', 'ceulenPi', 'correctPi14');
    };

    document.getElementById('showSnellius').onclick = function () {
        checkPi('3.1415926535897932384626433832795028', 'snelliusPi', 'correctPi15');
    };

    document.getElementById('showGrienberger').onclick = function () {
        checkPi('3.14159265358979323846264338327950288419', 'grienbergerPi', 'correctPi16');
    };

    document.getElementById('showViète2').onclick = function () {
        checkPi('3.141592653', 'viètePi2', 'correctPi17');
    };

    document.getElementById('showNewton').onclick = function () {
        checkPi('3.141592653589793', 'newtonPi', 'correctPi18');
    }

    document.getElementById('showSharp').onclick = function () {
        checkPi('3.14159265358979323846264338327950288419716939937510582097494459230781640', 'sharpPi', 'correctPi19');
    }

    document.getElementById('showMachin').onclick = function () {
        checkPi('3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679', 'machinPi', 'correctPi20');
    }

    document.getElementById('showDase').onclick = function () {
        checkPi('3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196', 'dasePi', 'correctPi21');
    }

    document.getElementById('showShanks').onclick = function () {
        checkPi('3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074446237996274957673518575272489122793818301194912983367336244193664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807444623798834759567351857527248912279381830119491298336733624193366430860213950160924480772309436285530966202755693979869502224749260749703041236692913332', 'shanksPi', 'correctPi22');
    }

    document.getElementById('showWrench').onclick = function () {
        checkPi(piDigits.slice(0, 1120), 'wrenchPi', 'correctPi23');
    }

    document.getElementById('showReitwiesner').onclick = function () {
        checkPi(piDigits.slice(0, 2037), 'reitwiesnerPi', 'correctPi24');
    }

    document.getElementById('showRitchie').onclick = function () {
        checkPi(piDigits.slice(0, 3089), 'ritchiePi', 'correctPi25');
    }

    document.getElementById('showFelton').onclick = function () {
        checkPi(piDigits.slice(0, 7480), 'feltonPi', 'correctPi26');
    }

    document.getElementById('showGenuys').onclick = function () {
        checkPi(piDigits.slice(0, 10000), 'genuysPi', 'correctPi27');
    }

    document.getElementById('showRanous').onclick = function () {
        const sorryContainer = document.getElementById('sorry');
        sorryContainer.innerHTML = "Sadly I will not be putting 105 trillion digits of pi on this website.";
    }

    document.getElementById('showParker2013').onclick = function () {
        checkPi('3.13834', 'parker2013Pi', 'correctPi28');
    }

    document.getElementById('showParker2015').onclick = function () {
        checkPi('3.1512', 'parker2015Pi', 'correctPi29');
    }

    document.getElementById('showParker2015pt2').onclick = function () {
        checkPi('3.128', 'parker2015pt2Pi', 'correctPi30');
    }

    document.getElementById('showParker2016').onclick = function () {
        checkPi('3.04183997892940221112', 'parker2016Pi', 'correctPi31');
    }

    document.getElementById('showParker2017').onclick = function () {
        checkPi('3.052338478336799', 'parker2017Pi', 'correctPi32');
    }

    document.getElementById('showParker2018').onclick = function () {
        checkPi('3.14159265358979619', 'parker2018Pi', 'correctPi33');
    }

    document.getElementById('showParker2019').onclick = function () {
        checkPi('3.11791', 'parker2019Pi', 'correctPi34');
    }

    document.getElementById('showParker2020').onclick = function () {
        checkPi('3.141591678589793935225', 'parker2020Pi', 'correctPi35');
    }

    document.getElementById('showParker2021').onclick = function () {
        checkPi('3.875', 'parker2021Pi', 'correctPi36');
    }

    document.getElementById('showParker2022').onclick = function () {
        checkPi('3.141592653588682981521466912690267589979514536073517628718757831663502876868927197770971753236', 'parker2022Pi', 'correctPi37');
    }

    document.getElementById('showParker2023').onclick = function () {
        checkPi('3.11712', 'parker2023Pi', 'correctPi38');
    }

    document.getElementById('showParker2024').onclick = function () {
        checkPi('3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223176', 'parker2024Pi', 'correctPi39');
    }

    document.getElementById('showParkerAverage').onclick = function () {
        MPpi = [3.13834, 3.1512, 3.128, 3.052338478336799, 3.14159265358979619, 3.11791, 3.141591678589793935225, 3.875, 3.141592653588682981521466912690267589979514536073517628718757831663502876868927197770971753236, 3.11712, 3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223176];
        average = MPpi.reduce((a, b) => a + b, 0) / MPpi.length;
        checkPi(average.toString(), 'parkerAveragePi', 'correctPi40');
    }

});


function checkPi(piInput, piDigitsDiv, correctPiDiv) {
    pi = piDigits;
    const piDigitsContainer = document.getElementById(piDigitsDiv);
    const correctPiContainer = document.getElementById(correctPiDiv);
    piDigitsContainer.innerHTML = '';
    correctPiContainer.innerHTML = '';

    let wasIncorrect = false;
    const maxLength = Math.min(piInput.length, pi.length);
    for (let i = 0; i < maxLength; i++) {
        const digitSpan = document.createElement('span');
        digitSpan.textContent = piInput[i];

        if (piInput[i] === pi[i]) {
            if (wasIncorrect) {
                digitSpan.className = 'technicallyCorrect';
            } else {
                digitSpan.className = 'correct';
            }
        } else {
            digitSpan.className = 'incorrect';
            wasIncorrect = true;
        }

        piDigitsContainer.appendChild(digitSpan);
    }


    const correctPiSpan = document.createElement('span');
    correctPiSpan.textContent = pi.slice(0, maxLength);
    correctPiContainer.appendChild(correctPiSpan);
}
