$('document').ready(function() {
    var sum = 0;
    $('td#snacks-total.total-calories').on('click', function(){
      $('td.food-calories').each(function(){
        sum += Number($(this).val());
        console.log(sum);
      });
    });
    $('td#snacks-total.total-calories').html(sum);

    displayFoods();
});

function displayFoods(){
  var foods = JSON.parse(localStorage.getItem('foods'));
  if(foods != null){
    foods.forEach(function(element){
      prependFood(element.name, element.calories)
    })
  }
}

function prependFood(name, calories){
  $('#food-table').prepend("<tr id='food-row'><td class='food-name'>" + name.toLowerCase() + 
    "</td><td class='food-calories'>" + calories + "</tr>");
}