/* Change input range */
$('#length').on('input', function () {
  const value = this.value;
  const percent = (value - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
  const background_size = percent * 100 + '% 100%';

  $(this).css('background-size', background_size);

  const count = $("#count");
  count.text(value);
});

/* Generate password */
function generatePassword() {
  const arrUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const arrLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  const arrNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const arrSymbol = ['!', '@', '#', '$', '%', '?', '-', '+', '=', '~'];

  const compareRandom = () => Math.random() - 0.5;

  const randomInteger = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

  let arr = [];

  if ($("#uppercase").prop("checked")) {
    arr = arr.concat(arrUpper);
  }
  if ($("#lowercase").prop("checked")) {
    arr = arr.concat(arrLower);
  }
  if ($("#numbers").prop("checked")) {
    arr = arr.concat(arrNumber);
  }
  if ($("#symbols").prop("checked")) {
    arr = arr.concat(arrSymbol);
  }
  if (arr.length === 0) {
    $("#password").text("P4$5W0rD!");
    return;
  }

  arr.sort(compareRandom);

  let password = '';
  let passwordLength = $("#length").val();

  for (let i = 0; i < passwordLength; i++) {
    password += arr[randomInteger(0, arr.length - 1)];
  }

  $("#password").text(password);
  $("#password").addClass("card__password_active");
}

/* Set tab colors */
function setColor(tabOneColor, tabTwoColor, tabThreeColor, tabFourColor) {
  const tabOne = $("#tab-one");
  const tabTwo = $("#tab-two");
  const tabThree = $("#tab-three");
  const tabFour = $("#tab-four");

  tabOne.css("background-color", tabOneColor);
  tabTwo.css("background-color", tabTwoColor);
  tabThree.css("background-color", tabThreeColor);
  tabFour.css("background-color", tabFourColor);
}

/* Check password strength*/
function checkPasswordStrength() {
  const passwordLength = $("#length").val();

  const uppercaseChecked = $("#uppercase").prop("checked");
  const lowercaseChecked = $("#lowercase").prop("checked");
  const numbersChecked = $("#numbers").prop("checked");
  const symbolsChecked = $("#symbols").prop("checked");

  if (passwordLength === "" || (!uppercaseChecked && !lowercaseChecked && !numbersChecked && !symbolsChecked)) {
    return "";
  } else if (passwordLength < 1 && (uppercaseChecked || lowercaseChecked || numbersChecked || symbolsChecked)) {
    return "";
  } else if (passwordLength < 4) {
    setColor("red", "transparent", "transparent", "transparent");
    return "very weak";
  } else if (passwordLength < 6) {
    setColor("orange", "orange", "transparent", "transparent");
    return "weak";
  } else if (passwordLength < 8) {
    setColor("yellow", "yellow", "yellow", "transparent");
    return "medium";
  } else if (passwordLength <= 10) {
    setColor("lightgreen", "lightgreen", "lightgreen", "lightgreen");
    return "strong";
  }
}

/* Click button and generate password */
$("#generate").on("click", function () {
  const password = generatePassword();
  const strength = checkPasswordStrength(password);

  $("#strength").text(strength);
});

/* Copy password */
$("#copy").on("click", function () {
  const passwordText = $("#password").text();
  const tempElement = $("<textarea>").val(passwordText).appendTo("body").select();
  document.execCommand("copy");
  tempElement.remove();
});