const Golangify = () => {

  const d = document;
  let activeMenuItem = localStorage.getItem("activeMenuItem");
  let testScore = 0;
  let testQNum = 1;

  const questions = {
    test:
      [
        {
          "question": "Какой базовый размер стека горутины на языке Go?",
          "answer": "2Кб и 4Кб на x32 и x64 машинах соответственно",
          "fake1": "4Кб и 8Кб на x32 и x64 машинах соответственно",
          "fake2": "8Кб и 16Кб на x32 и x64 машинах соответственно",
          "fake3": "Размер не определен изначально",
        },
        {
          "question": "Перечислите основные примитивы синхронизации на Go (3):",
          "answer": ["mutex", "atomic", "waitgroup"]
        },
        {
          "question": "В чем различие Mutex и RWMutex?",
          "fake1": "Неблокируемая запись",
          "fake2": "Оба варианта",
          "answer": "Неблокируемое чтение",
          "fake3": "Нету верного ответа"
        },
        {
          "question": "Какой максимальный размер heap на x32 и x64 машинах соответственно?",
          "fake1": "256Мб и 512Мб",
          "fake2": "Размер ограничен объемом памяти машины",
          "fake3": "32Гб и 64Гб",
          "answer": "256Мб и 1Гб",
        },
        {
          "question": "В какой момент первично запускается сборщик мусора, и сколько ресурсов процессора потребляет STW?",
          "fake1": "Сразу, 50%",
          "answer": "Через 2 минуты после запуска программы, 25%",
          "fake2": "Через 10 минут после запуска программы, 25%",
          "fake3": "Пока рантайм его не вызовет, 50%",

        },
        {
          "question": "Что такое STW? Где используется?",
          "answer": "Stop The World, сборщик мусора",
          "fake1": "Show The Will, рантайм",
          "fake2": "Sql Time Warning, базы данных",
          "fake3": "Swing Technology Wrapper, Java-swing приложения",

        },
        {
          "question": "Что произойдет при попытке чтения из пустого канала?",
          "answer": "Deadlock",
          "fake1": "Перезапуск операционной системы",
          "fake2": "Завершение программы",
          "fake3": "Будет полученио нулевое значение для типа канала"
        },
        {
          "question": "Что произойдет при попытке чтения из закрытого канала?",
          "answer": "Будет полученио нулевое значение для типа канала",
          "fake1": "Deadlock",
          "fake2": "Panic",
          "fake3": "Взрыв"
        },
        {
          "question": "Какой тип конкурентности в Go?",
          "answer": "Кооперативно-вытесняющая",
          "fake1": "Кооперативная",
          "fake2": "Вытесняющая",
          "fake3": "Никакая"
        },
        {
          "question": "Назовите два типа каналов в go",
          "answer": ["буферезированные", "небуферезированные"]
        }
      ],
    "theory":
      [
        {
          "text": "Базовый размер стека горутины на языке Go зависит от разрядности операционной системы. На 32-битных машинах базовый размер равен 2Кб, на 64-битных - 4Кб соответственно."
        },
        {
          "text": "Для очистки мусора используется алгоритм Mark & Sweep, он же трехцветный. Основан на алгоритме Дийкстры, в результате работы которого остаются только \"черные\" и \"белые\" элементы. Белые удаляются сборщиком мусора, черные остаются в памяти программы. Процесс отсановки программы для запуска подсчета объектов в рантайме называется STW (Stop The World) и занимает примерно 25% ресурсов процессора."
        },
        {
          "text": "Сборщик мусора первично запускается через 2 минуты после начала работы программы. Далее каждый раз, когда размер кучи (heap) превышает свой предыдущий размер в 2 раза."
        },
        {
          "text": "Атомики в Go являются самым меньшим, 'атомарным' примитивом синхронизации. Они работают на самом низком уровне, за счет сброса кэша уровня L2 процессора. Служат для самых базовых синхронных операций. На них построены такие синхронизаторы, как: Mutex (RWMutex), WaitGroup, и все вытекающие. К синхронизации так же можно отнести каналы."
        },
        {
          "text": "Различие между Mutex и RWMutex заключается в неблокируемом чтении блока памяти при стековом чтении. Иначе говоря, при обычном Mutex, чтение с блока памяти будет блокировать все остальные ресурсы, так же как и запись. Это сильно задерживает работу системы. RWMutex решает этот вопрос: сначала идет стековая запись, потом стековое параллельное чтение."
        },
        {
          "text": "Слайс де-факто представляет собой обычный массив, в структуре которого появляется capacity. Если базовый массив имеет лишь указатель на первый его элемент и длину самого массива, то слайс обладает свойством динамического массива за счет аллокации новой памяти при первышении длины его вместимости. В обычных случаях реаллокация памяти происходит по формуле capacity = length * 2, однако если длина превысила 256 - аллокация проходит по формуле newcap += (newcap + 3*threshold) >> 2. То есть увеличение в 1.25x раза."
        },
        {
          "text": "Вся память в Go делиться на 2 группы: стек и куча (heap). По факту стек тоже хранится в куче, однако он является выделенной под особые нужды памятью. В основном стек используется для работы с функциями: передача и возврат значений, инициализация по эклемпляру внутри функциии. Куча по факту объясняет свое название: в ней данные хранятся до начала работы сборщика мусора. Макс. размер кучи - 256Мб и 1Гб для x32 и x64 разрядных систем соответственно."
        },
        {
          "text": "Если вы попытаетесь считать данные из канала, но в канале будут отсутствовать данные, планировщик заблокирует текущую горутину и разблокирует другую в надежде, что какая-либо горутина передаст данные в канал. То же самое произойдет в случае отправки данных: планировщик заблокирует передающую горутину, пока другая не считает данные из канала."
        },
        {
          "text": "Канал — это объект связи, с помощью которого горутины обмениваются данными. Технически это конвейер (или труба), откуда можно считывать или помещать данные. То есть одна горутина может отправить данные в канал, а другая — считать помещенные в этот канал данные. При попытке чтения из закрытого канала будет возвращаться нулевое значение типа, который используется в канале."
        },
        {
          "text": "В Go существуют два типа каналов: буферизированные (buffered) и небуферизированные (unbuffered). Каналы реализованы как структуры, содержащие кольцевой буфер, указатели на отправителей и получателей, а также мьютексы для синхронизации доступа. Каналы используются для безопасного обмена данными между горутинами."
        }
      ]
  }

  const qLen = questions?.theory?.length
  const copyArr = [...questions.test];
  for (let i = copyArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
  }

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
      fillTestBlock()
      break
  }

  fillBgElems(5, 5)

  d.addEventListener("mousemove", e => {
    let bg = d.getElementById("background");
    const xTranslate = Math.round((e.clientX / window.screen.availWidth) * 100) / 100;
    const yTranslate = Math.round((e.clientY / window.screen.availHeight) * 100) / 100;

    let elems = bg.querySelectorAll(".bg-row");
    let index = 0, length = elems.length;

    for (; index < length; index++) {
      if (index % 2 == 0) {
        elems[index].style.transform = `translate(${-10 + xTranslate * 20}px, ${-10 + yTranslate * 20}px)`;
      } else {
        elems[index].style.transform = `translate(${-5 + xTranslate * 10}px, ${-5 + yTranslate * 10}px)`;
      }
    }
  })

  function fillTestBlock() {
    const startTestButton = d.createElement("button")
    startTestButton.setAttribute("class", "startTestBtn")
    startTestButton.setAttribute("id", "startTestBtn")
    startTestButton.setAttribute("onclick", "startTest();")
    startTestButton.innerHTML = "Начать тест"
    d.getElementById("test-all").appendChild(startTestButton)
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
        row.innerHTML += `<img src='images/bg-elem.png' style='max-width:${100 / c}%'/>`;
      }
    }
  }

  window.setMenuItem = function (type) {
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
          fillTestBlock()
          break
      }
    }
  }

  function fillTheoryBlock() {
    const theoryParent = d.getElementById("theory-all")
    const questionsParent = d.createElement("div")
    const nextPrevParent = d.createElement("div")
    const buttons = [
      d.createElement("button"),
      d.createElement("button")
    ]

    nextPrevParent.setAttribute("class", "next-prev-parent")
    buttons[0].setAttribute("onclick", "prevCard();")
    buttons[0].innerHTML = "&lt; Назад"
    buttons[1].setAttribute("onclick", "nextCard();")
    buttons[1].innerHTML = "Вперед &gt;"

    nextPrevParent.appendChild(buttons[0])
    nextPrevParent.appendChild(buttons[1])

    questionsParent.setAttribute("class", "questions")
    questionsParent.setAttribute("id", "questions")

    questions?.theory?.map((val, id) => {
      const question = d.createElement("article")
      question.setAttribute("class", "question")
      question.setAttribute("id", `q-${id}`)

      const innerQuestionH = d.createElement("h4")
      innerQuestionH.innerHTML = val.text

      question.appendChild(innerQuestionH)
      questionsParent.append(question)
    })
    theoryParent.appendChild(questionsParent)
    theoryParent.appendChild(nextPrevParent)
  }

  window.nextCard = function () {
    const currentCard = d.querySelectorAll(".question")[0];
    const copyCurrent = currentCard;
    const quests = d.getElementById("questions")
    currentCard.classList.toggle("animateNext")
    setTimeout(() => {
      quests.removeChild(currentCard)
      copyCurrent.classList.toggle("animateNext")
      quests.appendChild(copyCurrent)
    }, 550);
  }

  window.prevCard = function () {
    const currentCard = d.querySelectorAll(".question")[qLen - 1];
    const quests = d.getElementById("questions")
    currentCard.classList.toggle("animatePrev")
    setTimeout(() => {
      quests.prepend(currentCard)
      currentCard.classList.toggle("animatePrev")
    }, 1000);
  }

  window.startTest = function () {
    const content = d.getElementById("test-all")
    const btn = d.getElementById("startTestBtn")
    const backTimer = d.createElement("h1")
    backTimer.setAttribute("class", "fadeInBeginPos")
    backTimer.style.fontSize = "2.0rem"
    backTimer.innerHTML = "3"
    btn.classList.toggle("fadeOut")

    const testQuestionsParent = d.createElement("section")
    testQuestionsParent.setAttribute("class", "testQuestionsParent")
    testQuestionsParent.setAttribute("id", "testQuestionsParent")

    let testVars = [];

    setTimeout(() => {
      content.removeChild(btn)
    }, 1000);

    content.appendChild(backTimer);

    function animateText(text) {
      return new Promise((resolve) => {
        backTimer.innerHTML = text;
        backTimer.classList.add("fadeIn");
        setTimeout(() => {
          backTimer.classList.remove("fadeIn");
          backTimer.classList.add("fadeOut");
          setTimeout(() => {
            backTimer.classList.remove("fadeOut");
            resolve();
          }, 1000);
        }, 1000);
      });
    }

    async function runAnimations() {
      await animateText("3");
      await animateText("2");
      await animateText("1");
      await animateText("БЭЭ!");
      content.removeChild(backTimer)

      const contest = d.createElement("section")
      contest.setAttribute("class", "test-field")

      let testVars = copyArr

      for (q in testVars) {
        const questionEl = d.createElement("article")
        questionEl.setAttribute("class", "question_el")

        const questionQ = d.createElement("h3")
        questionQ.innerHTML = testVars[q]?.question

        let questionAnswerType = typeof testVars[q]?.answer === "string" ? "div" : "textarea"

        const answers = d.createElement(questionAnswerType)

        if (questionAnswerType === "div") {
          const answerFull = d.createElement("span")
          const radio = d.createElement("input")
          radio.setAttribute("type", "radio")
          radio.setAttribute("id", `radio_answer_${q}_0`)
          radio.setAttribute("name", `radio_answer_${q}`)
          radio.value = testVars[q]?.answer

          const labelAnswer = d.createElement("label")
          labelAnswer.setAttribute("for", `radio_answer_${q}_0`)
          labelAnswer.innerHTML = testVars[q]?.answer

          for (let i = 1; i <= 3; i++) {
            let randId = getRandomInt(0, 2)

            const af = d.createElement("span")
            const rad = d.createElement("input")

            rad.setAttribute("type", "radio")
            rad.setAttribute("name", `radio_answer_${q}`)
            rad.setAttribute("id", `radio_answer_${q}_${i}`)
            rad.value = testVars[q][`fake${i}`]

            const lab = d.createElement("label")
            lab.setAttribute("for", `radio_answer_${q}_${i}`)
            lab.innerHTML = testVars[q][`fake${i}`]

            af.appendChild(rad)
            af.appendChild(lab)

            randId % 2 === 0 ? answers.appendChild(af) : answers.prepend(af)
          }

          answerFull.appendChild(radio)
          answerFull.appendChild(labelAnswer)

          answers.appendChild(answerFull)
        }

        if (questionAnswerType === "textarea") {
          answers.setAttribute("rows", "1")
          answers.setAttribute("cols", "50")

          answers.setAttribute("name", `text_answer_${q}`)
          answers.setAttribute("placeholder", "Через пробел, без знаков")
        }

        questionEl.appendChild(questionQ)
        questionEl.appendChild(answers)

        const buttonNextQ = d.createElement("button")
        buttonNextQ.innerHTML = "Далее"
        buttonNextQ.setAttribute("id", `next_q_${q}`)
        buttonNextQ.setAttribute("onclick", `nextQuestion();`)

        questionEl.appendChild(buttonNextQ)

        testQuestionsParent.appendChild(questionEl)
      }

      content.appendChild(testQuestionsParent)

    }
    setTimeout(runAnimations, 1000);
  }

  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  window.nextQuestion = function () {
    const slider = d.getElementById("testQuestionsParent")
    if (testQNum < 11) {
      testQNum += 1
    }

    let correct = false

    if (typeof getLastSelectedValue() === "object") {
      console.log(getLastSelectedValue(), copyArr[testQNum - 2].answer)
      if (arraysEqual(getLastSelectedValue(), copyArr[testQNum - 2].answer)) {
        correct = true
        testScore += 1
      }
    } else {
      if (getLastSelectedValue() === copyArr[testQNum - 2].answer) {
        correct = true
        testScore += 1
      }
    }

    const curBtn = d.getElementById(`next_q_${testQNum - 2}`)

    if (correct) {

      curBtn.innerHTML = "Верно!"
      curBtn.classList.toggle("buttonCorrect")

    } else {

      curBtn.innerHTML = "Неверно"
      curBtn.classList.toggle("buttonIncorrect")

    }

    if (testQNum === 11) {
      const testPrevContent = d.getElementById("testQuestionsParent")
      const testPrevContentParent = d.getElementById("test-all")
      testPrevContent.classList.toggle("fadeOut")
      setTimeout(() => {
        testPrevContentParent.removeChild(testPrevContent)

        const resultTestChild = d.createElement("article")
        resultTestChild.setAttribute("id", "")
        const resultTestScoreLabel = d.createElement("h2")
        const resultTestScoreLabelBottom = d.createElement("h3")
        resultTestScoreLabel.innerHTML = `Ваш результат: ${testScore}/10`
        let mark = 0;
        if (testScore < 5) mark = 2
        else if (testScore < 7 && testScore >= 5) mark = 3
        else if (testScore < 9 && testScore >= 7) mark = 4
        else if (9 <= testScore) mark = 5

        resultTestScoreLabelBottom.innerHTML = `Оценка: ${mark}`

        resultTestChild.appendChild(resultTestScoreLabel)
        resultTestChild.appendChild(resultTestScoreLabelBottom)

        testPrevContentParent.appendChild(resultTestChild)

        testPrevContentParent.classList.toggle("fadeIn")
      }, 1000);
    }

    setTimeout(() => {
      slider.scrollTo({
        left: 550 * (testQNum - 1),
        behavior: "smooth"
      })
    }, 2000);
  }

  function getLastSelectedValue() {
    if (typeof copyArr[testQNum - 2].answer === "object") {
      return d.getElementsByName(`text_answer_${testQNum - 2}`)[0].value.split(" ")
    }

    let elements = d.getElementsByName(`radio_answer_${testQNum - 2}`);
    let selectedValue;

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].checked) {
        selectedValue = elements[i].value;
        break;
      }
    }

    return selectedValue;
  }

  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    for (let i = 0; i < arr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
      }
    }

    return true;
  }
}