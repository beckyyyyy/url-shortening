const menuBtn = document.querySelector(".nav-container__navbar__menu")
const nav = document.querySelector(".nav-container__nav")
const inputUrl = document.querySelector(".statistics__input-box__input-url")
const shortenBtn = document.querySelector(".shorten-btn")
const warningText = document.querySelector(
  ".statistics__input-box__warning-text"
)
const resultContainer = document.querySelector(".statistics__result-container")
const baseUrl = "https://api.shrtco.de/v2"
let resultHtml = ``

// 展開menu
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("hidden")
})

// getShortenUrl：串接api，get api response
const getShortenUrl = async (url) => {
  try {
    const res = await axios.get(`${baseUrl}/shorten/?url=${url}`)
    return res
  } catch (err) {
    alert("請確認您輸入的網址是否正確")
  }
}

// 顯示shorten url的box
const displayResult = (originUrl, shortUrl) => {
  resultHtml += `
         <div class="statistics__result-container__result-box">
          <div class="statistics__result-container__result-box__original-url">
            <p>${originUrl}</p>
          </div>
          <div class="statistics__result-container__result-box__shorten-url">
            <p>${shortUrl}</p>
            <button class="square-btn copy">Copy</button>
          </div>
        </div> 
    `
  return (resultContainer.innerHTML = resultHtml)
}

// 點擊shorten it按鈕
const displayShortenUrl = async (input) => {
  let shortUrl
  const originUrl = input.value
  if (originUrl.length === 0) {
    inputUrl.classList.add("warning")
    warningText.classList.remove("d-none")
  } else {
    const res = await getShortenUrl(originUrl)
    shortUrl = res.data.result.short_link
    input.value = ""
    return displayResult(originUrl, shortUrl)
  }
}

shortenBtn.addEventListener("click", () => {
  displayShortenUrl(inputUrl)
})

// 解除input未輸入的警示
inputUrl.addEventListener("input", () => {
  const inputValue = inputUrl.value
  if (inputValue.length === 0) {
    return
  } else {
    inputUrl.classList.remove("warning")
    warningText.classList.add("d-none")
  }
})

// 點擊copy按鈕，可以複製shorten url
resultContainer.addEventListener("click", (event) => {
  const targetEvent = event.target
  if (targetEvent.matches(".copy")) {
    const copyUrl = targetEvent.previousElementSibling.textContent
    navigator.clipboard.writeText(copyUrl)
  }
})
