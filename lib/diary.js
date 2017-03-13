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