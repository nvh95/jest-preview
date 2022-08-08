$('#button').on('click', () => {
  const currentCount = $('#count').text();
  $('#count').text(parseInt(currentCount) + 1);
});
