var time = moment();

$('document').ready(function() {
    var sum = 0;
    $('td#snacks-total.total-calories').on('click', function(){
      $('td.food-calories').each(function(){
        sum += Number($(this).val());
        console.log(sum);
      });
    });
    $('td#snacks-total.total-calories').html(sum);
});

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