var time = moment();

$('document').ready(function() {
    var sum = 0;
    $('td#snacks-total.total-calories').on('click', function(){
      $('td.food-calories').each(function(){
        var value = $(this).text();
        if(!isNan(vale) && value.length != 0) {
          sum += parseFloat(value);
        }
      });
      return sum;
    });
    $('td#snacks-total.total-calories').html(sum);
    displayDate();
    dateButtons();
})

function dateButtons() {
  $('.button#forward').on('click', function(){
    time = time.add(1, 'day');
    displayDate();
  });

  $('.button#back').on('click', function(){
    time = time.add(1, 'day');
    displayDate();
  });
}

function displayDate() {
  $('.current-day section').html(time.format("dddd, MMMM Do YYYY"));
}