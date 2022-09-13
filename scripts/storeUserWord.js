/**BELOW --- STORAGE OF USER WORD*/
const $saveUserWord_btn = document.querySelector("#save-user-word-btn");
const $textArea = document.querySelector("#user-word-input"); //objeto

function saveUserWord() {
  let permittedCaracs = /^[A-Z]{3,8}$/;
  let textAreaValue = $textArea.value.toUpperCase(); // valor
  if (textAreaValue.match(permittedCaracs)) {
    sessionStorage.setItem("userWord", textAreaValue);
  } else {
    $saveUserWord_btn.href = "storeUserWord.html";
  }
}

$saveUserWord_btn.addEventListener("click", saveUserWord);
/**ABOVE --- STORAGE OF USER WORD*/