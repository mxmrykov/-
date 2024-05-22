const d = document;
let activeMenuItem = localStorage.getItem("activeMenuItem");

const questions = {
  "test": 
  {

  },
  "theory":
  [
      {
          "text": "Базовый размер стека горутины на языке Go зависит от разрядности операционной системы. На 32-битных машинах базовый размер равен 2Кб, на 64-битных - 4Кб соответственно.",
          "key": "Размер стека"
      },
      {
          "text": "Для очистки мусора используется алгоритм Mark & Sweep, он же трехцветный. Основан на алгоритме Дийкстры, в результате работы которого остаются только \"черные\" и \"белые\" элементы. Белые удаляются сборщиком мусора, черные остаются в памяти программы. Процесс отсановки программы для запуска подсчета объектов в рантайме называется STW (Stop The World) и занимает примерно 25% ресурсов процессора.",
          "key": "Сборщик мусора"
      },
      {
        "text": "Сборщик мусора первично запускается через 2 минуты после начала работы программы. Далее каждый раз, когда размер кучи (heap) превышает свой предыдущий размер в 2 раза.",
        "key": "Запуск сборщика мусора"
      },
      {
        "text": "Сборщик мусора первично запускается через 2 минуты после начала работы программы. Далее каждый раз, когда размер кучи (heap) превышает свой предыдущий размер в 2 раза.",
        "key": "Запуск сборщика мусора"
      },
      {
        "text": "Сборщик мусора первично запускается через 2 минуты после начала работы программы. Далее каждый раз, когда размер кучи (heap) превышает свой предыдущий размер в 2 раза.",
        "key": "Запуск сборщика мусора"
      }
  ]
}

const qLen = questions?.theory?.length

const Golangify = () => {

  const sectionGlobal = d.createElement("section")
  const sectionRoot = d.createElement("section")
  const headerMain = d.createElement("header")
  const eduTypeSelector = d.createElement("article")
  const eduTypeSelectorDiv = d.createElement("div")
  
  
  const listsEduType = [
    d.createElement("li"),
    d.createElement("li")
  ];
  
  listsEduType[0].setAttribute("id", "menuItem_TypeTest")
  listsEduType[0].setAttribute("onclick", "setMenuItem('TEST')")
  listsEduType[1].setAttribute("id", "menuItem_TypeTheory")
  listsEduType[1].setAttribute("onclick", "setMenuItem('THEORY')")
  
  listsEduType[0].innerHTML = "Тест"
  listsEduType[1].innerHTML = "Теория"
  
  eduTypeSelectorDiv.appendChild(listsEduType[0])
  eduTypeSelectorDiv.appendChild(listsEduType[1])
  
  sectionGlobal.setAttribute("class", "background")
  sectionGlobal.setAttribute("id", "background")
  sectionRoot.setAttribute("class", "root")
  sectionRoot.setAttribute("id", "root")
  eduTypeSelector.setAttribute("class", "edu-type-selector")
  
  const h = d.createElement("h1")
  h.innerHTML = "Golangify"
  
  const p = d.createElement("p")
  p.innerHTML = "Сайт для изучения внутренего устройства языка GO"
  
  const hType = d.createElement("h1")
  hType.innerHTML = "Тип обучения"
  
  
  headerMain.appendChild(h)
  headerMain.appendChild(p)
  eduTypeSelector.appendChild(hType)
  eduTypeSelector.appendChild(eduTypeSelectorDiv)
  
  sectionRoot.appendChild(headerMain)
  sectionRoot.appendChild(eduTypeSelector)

  d.body.appendChild(sectionGlobal)
  d.body.appendChild(sectionRoot)
  let root = d.getElementById("root")
  let theoryParent = d.getElementById("theory-all")

  if (activeMenuItem === null) {
    localStorage.setItem("activeMenuItem", "THEORY");
    activeMenuItem = "THEORY"
  } else {
    if (!["THEORY", "TEST"].includes(activeMenuItem)) {
      localStorage.setItem("activeMenuItem", "THEORY");
      activeMenuItem = "THEORY"
    }
  }

  switch (activeMenuItem) {
    case "THEORY":
      d.getElementById("menuItem_TypeTest").classList.remove("active_menuitem")
      d.getElementById("menuItem_TypeTheory").classList.add("active_menuitem")
      root.innerHTML += `<div class="theory-all" id="theory-all"></div>`
      fillTheoryBlock()
      break
    case "TEST":
      d.getElementById("menuItem_TypeTheory").classList.remove("active_menuitem")
      d.getElementById("menuItem_TypeTest").classList.add("active_menuitem")
      root.innerHTML += `<div class="test-all" id="test-all"></div>`
      break
  }

  fillBgElems(5, 5)

  d.addEventListener("mousemove", e => {
    let bg = d.getElementById("background");
    const xTranslate = Math.round((e.clientX / window.screen.availWidth) * 100) / 100;
    const yTranslate = Math.round((e.clientY / window.screen.availHeight) * 100) / 100;

    let elems = bg.querySelectorAll(".bg-row");
    let index = 0, length = elems.length;

    for ( ; index < length; index++) {
      if (index % 2 == 0) {
        elems[index].style.transform = `translate(${-10 + xTranslate*20}px, ${-10 + yTranslate*20}px)`;
      } else {
        elems[index].style.transform = `translate(${-5 + xTranslate*10}px, ${-5 + yTranslate*10}px)`;
      }
  }
  })
}

function fillBgElems(r, c) {
  let bg = d.getElementById("background");
  let targetCols = c;
  for (let rows = 0; rows < r; ++rows) {
    bg.innerHTML += `<div class="bg-row" id="bg-row-${rows}"></div>`;
    if (rows % 2 != 0) {
      targetCols -= 1;
    } else {
      targetCols += 1;
    }
    for (let cols = 0; cols < targetCols; ++cols) {
      const row = d.getElementById(`bg-row-${rows}`);
      row.innerHTML += `<img src='images/bg-elem.png' style='max-width:${100/c}%'/>`; 
    }
  }
}

function setMenuItem(type) {
  let root = d.getElementById("root")
  if (["THEORY", "TEST"].includes(type)) {
    localStorage.setItem("activeMenuItem", type);
    activeMenuItem = type;
    switch (activeMenuItem) {
      case "THEORY":
        let testAllBlock = d.getElementById("test-all")
        d.getElementById("menuItem_TypeTest").classList.remove("active_menuitem")
        d.getElementById("menuItem_TypeTheory").classList.add("active_menuitem")
        testAllBlock.parentNode.removeChild(testAllBlock)
        root.innerHTML += `<div class="theory-all" id="theory-all"></div>`
        fillTheoryBlock()
        break
      case "TEST":
        let theoryAllBlock = d.getElementById("theory-all")
        d.getElementById("menuItem_TypeTheory").classList.remove("active_menuitem")
        d.getElementById("menuItem_TypeTest").classList.add("active_menuitem")
        theoryAllBlock.parentNode.removeChild(theoryAllBlock)
        root.innerHTML += `<div class="test-all" id="test-all"></div>`
        break
    }
  }
}

  function fillTheoryBlock() {
    let theoryParent = d.getElementById("theory-all")
    questions?.theory?.map((val, id) => {
    //   style="
    //   transform: rotate(-${id*2}deg); 
    //   opacity: ${id > 3 ? 0 : (100 / (id + 1)) / 100}; 
    //   z-index: ${100-id}; 
    //   top: ${-200*id}px;
    //   ${id + 1 === questions?.theory?.length ? `margin-bottom: -${200*id}px` : null}
    // "
      theoryParent.innerHTML += `<article class="question" id="q-${id}">
      <h4>
      ${val.text}
      </h4>
      </article>`
    })
    theoryParent.innerHTML += `
      <div class="next-prev-parent">
        <button>
        &lt; Назад
        </button>
        <button onclick="nextCard();">
        Вперед &gt;
        </button>
      </div>
    `
  }
  
  function nextCard() {
    let currentCard = d.querySelectorAll(".question")[0];
    let copyCurrent = currentCard;
    currentCard.classList.toggle("animation_changeCard");
  
    setTimeout(() => {
      currentCard.parentNode.removeChild(currentCard);
      for (let i = 0; i < 4; i ++) {
        // d.querySelectorAll(".question")[i].style.transform = `rotate(-${i*2}deg)`;
        // d.querySelectorAll(".question")[i].style.opacity = `${i > 3 ? 0 : (100 / (i + 1)) / 100}`;
        // d.querySelectorAll(".question")[i].style.zIndex = `${100-i}`;
        // d.querySelectorAll(".question")[i].style.top = `${-200*i}px`;
      }
      // copyCurrent.style.transform = `rotate(-${(qLen-1)*2}deg)`;
      // copyCurrent.style.opacity = `${(qLen-1) > 3 ? 0 : (100 / ((qLen-1) + 1)) / 100}`;
      // copyCurrent.style.zIndex = `${100-(qLen-1)}`;
      // copyCurrent.style.top = `${-200*(qLen-1)}px`;
      d.getElementById("theory-all").insertBefore(copyCurrent, d.getElementById("theory-all").childNodes[qLen])
      // d.querySelectorAll(".question")[qLen - 2].style.marginBottom = `0px`;
      // d.querySelectorAll(".question")[qLen - 1].style.marginBottom = `-${200*(qLen - 1)}px`;
      d.querySelectorAll(".question")[qLen - 1].classList.toggle("animation_changeCard");
    }, 600);
  }