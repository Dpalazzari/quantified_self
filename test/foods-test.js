describe('#create-form', function() {
  var $;

  before(function(){
    $ = document.getElementById('foods-frame').contentWindow.$;
  });

  beforeEach(function() {
    //Clear out all the things
    $('#food-list tbody').html('');
    $('#create-form input').val('');
    $('.validation-error').html('');
  });

  context('validations', function() {

    it('will tell me if I fail to enter a name', function() {
      $('#calories-field input').val('105');
      $('#add-food').click();
      var nameValidationContent = $("#name-field .validation-error").text();
      assert.equal(nameValidationContent, "Please Enter a Name");
    });

    it('will tell me if I fail to enter calories', function() {
      $('#name-field input').val('Banana');
      $('#add-food').click();
      var caloriesValidationContent = $("#calories-field .validation-error").text();
      assert.equal(caloriesValidationContent, "Please Enter Calories");
    });

    it('will be nice to me if I do everything correctly', function() {
      $('#name-field input').val('Banana');
      $('#calories-field input').val('105');
      $('#add-food').click();

      var nameValidationContent = $("#name-field .validation-error").text();
      assert.equal(nameValidationContent, "");

      var caloriesValidationContent = $("#calories-field .validation-error").text();
      assert.equal(caloriesValidationContent, "");
    });
  });

  context('deleting', function() {

    it('with one food, it will delete the food row', function() {
      $('#name-field input').val('Banana');
      $('#calories-field input').val('105');
      $('#add-food').click();
      var foodData = "banana105-"
      // "<tr id='food-row'><td class='food-name'>Banana</td><td class='food-calories'>105</td><td class='food-delete'><button id='delete-food'>-</button></td></tr>"

      var tableData = $("tbody").text();
      assert.equal(tableData, foodData)

      $('#delete-food').click();

      var tableData = $("tbody").html();

      assert.equal(tableData, "");
    });

    it('with many foods, it will delete the first food row', function() {
      $('#name-field input').val('Banana');
      $('#calories-field input').val('105');
      $('#add-food').click();
      $('#name-field input').val('Pineapple');
      $('#calories-field input').val('452');
      $('#add-food').click();

       var foodData = "pineapple452-banana105-"
      // "<tr id='food-row'><td class='food-name'>Banana</td><td class='food-calories'>105</td><td class='food-delete'><button id='delete-food'>-</button></td></tr>"

      var tableData = $("tbody").text();
      assert.equal(tableData, foodData)

      $('#delete-food').click();

      var tableData = $("tbody").text();

      assert.equal(tableData, "banana105-");
    });
  });

  context('updating food name or calories', function(){
    it('can change the name of a food when table row is clicked', function(){
      $('#name-field input').val('Pizza Slice');
      $('#calories-field input').val('325');
      $('#add-food').click();
      var foodData = "pizza slice325-"

      var tableData = $('tbody').text();
      assert.equal(tableData, foodData)

      $('#food-row td#food-name').click();
      $('input').val('chocolate cake')
      $('h1').click();
      var tableData = $('tbody').text();

      assert.equal(tableData, "chocolate cake325-");
    });
  });

  context('foods added to localStorage persist', function(){
    it('previously added foods will persist after page refresh', function(){
      $('#name-field input').val('Pizza Slice');
      $('#calories-field input').val('325');
      $('#add-food').click();
      $('#name-field input').val('Banana');
      $('#calories-field input').val('105');
      $('#add-food').click();
      $('#name-field input').val('Pineapple');
      $('#calories-field input').val('452');
      $('#add-food').click();

      var persistedFoods = localStorage.getItem('foods');

      assert.isString(persistedFoods, 'localStorage is a string of values')
      assert.include(persistedFoods, 'Pizza Slice', 'array contains value');
      assert.include(persistedFoods, 'Banana', 'array contains value');
      assert.include(persistedFoods, '452', 'array contains value');
    });
  });
});
