describe('#create-form', function() {
  var $;

  before(function(){
    $ = document.getElementById('index-frame').contentWindow.$;
  });

  context('the four meal tables display on the page', function(){
    it('displays all of the meal tables', function(){
      var breakfastTable = $('#breakfast-table')
      var lunchTable = $('#lunch-table')
      var dinnerTable = $('#dinner-table')
      var snackTable = $('#snack-table')

      assert.isObject(breakfastTable, 'is a table')
      assert.isObject(lunchTable, 'is a table')
      assert.isObject(dinnerTable, 'is a table')
      assert.isObject(snackTable, 'is a table')
    });
  });

  context('you can add foods to a meal table', function(){
    it('can add checked food to meal table', function(){
      var foodTable = $('#all-food-table');
      var breakfastTable = $('#breakfast-table');
      $('.all-food-table').find('#food-row input').click();
      prependCheckedFood('button#add-breakfast', breakfastTable, 400);
    
      assert.include(breakfastTable, '');
    });
  });

  context('deleting foods from table', function() {
    xit('with one food, it will delete the food row', function() {
      $('#name-field input').val('Banana');
      $('#calories-field input').val('105');
      $('#add-food').click();
      var foodData = "banana105-"

      var tableData = $("tbody").text();
      assert.equal(tableData, foodData);

      $('#delete-food').click();

      var tableData = $("tbody").html();

      assert.equal(tableData, "");
    });

    xit('with many foods, it will delete the first food row', function() {
       var foodData = "pineapple452-banana105-"

      var tableData = $("tbody").text();
      assert.equal(tableData, foodData);

      $('#delete-food').click();

      var tableData = $("tbody").text();

      assert.equal(tableData, "banana105-");
    });
  });

  context('foods added to localStorage exist in all-food-table', function(){
    it('previously added foods will be loaded from localStorage', function(){
      var persistedFoods = localStorage.getItem('foods');

      assert.isString(persistedFoods, 'localStorage is a string of values');
      assert.include(persistedFoods, 'Pizza Slice', 'array contains value');
      assert.include(persistedFoods, 'Banana', 'array contains value');
      assert.include(persistedFoods, '452', 'array contains value');
    });
  });

  context('index.js functions', function(){
    it('knows about our functions', function(){
     assert.isFunction(addFoodToMealTable, 'this will add foods to meal tables')
     assert.isFunction(calculateAllTotals, 'this calculates total calories')
     assert.isFunction(calculateAllMealCalories, 'this calculates meal calories')
     assert.isFunction(calculateGrandTotal, 'this calculates the calories for a whole day')
     assert.isFunction(calculateRemainingCalories, 'this calculates remaining calories')
     assert.isFunction(displayDate, 'this displays the date')
     assert.isFunction(getDay, 'this calculates the date')
    });
  });
});