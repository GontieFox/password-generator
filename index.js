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

$("#generate").on("click", generatePassword);

/* Copy password */
$("#copy").on("click", function() {
  const passwordText = $("#password").text();
  const tempElement = $("<textarea>").val(passwordText).appendTo("body").select();
  document.execCommand("copy");
  tempElement.remove();
});