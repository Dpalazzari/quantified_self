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
    time = time.add(-1, 'day');
    displayDate();
  });
}

function displayDate() {
  $('.current-day section').html(time.format("dddd, MMMM Do YYYY"));
}

function getDay() {
  var time = moment();
  $('.current-day section').html(time.day(1).format("dddd, MMMM Do YYYY"));

  $('.current-day section').on('click', function() {
    $('.current-day section').html(time.day(1).format("dddd, MMMM Do YYYY"));
  });
  $('button#forward').on('click', function() {
    $('.current-day section').html(time.day(2).format("dddd, MMMM Do YYYY"));
  });
  $('button#back').on('click', function() {
    $('.current-day section').html(time.day(0).format("dddd, MMMM Do YYYY"));
  });
}