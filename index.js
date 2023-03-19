/* Change input range */
$('#length').on('input', function() {
    const value = this.value;
    const percent = (value - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
    const background_size = percent * 100 + '% 100%';

    $(this).css('background-size', background_size);
  });