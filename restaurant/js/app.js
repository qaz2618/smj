let id;
// 餐厅
function Restaurant(obj) {
  this.cash = cash;
  this.seats = obj.seats;
  this.staffs = obj.staffs;
}

Restaurant.prototype.hire = function (staffs) {
  this.staffs.push(staffs);
}

Restaurant.prototype.fire = function (staffs) {
  this.staffs.forEach((element, index) => {
      if (element.id === staffs.id) {
          this.staffs.splice(index, 1)
      }
  });
}
// 职员
function Staffs(name, salary) {
  id++;
  this.id = id;
  this.name = name;
  this.salary = salary;
}

Staffs.prototype.finish = function () {

}

// 服务员
function Service(name, salary) {
  Staffs.call(this, name, salary);
}
Service.prototype.finish = function (data) {
  if (typeof data === 'ARRAY') {
    this.dishes = data;
  } else {

  }
}
// 厨师
function Cook(name, salary) {
  Staffs.call(this, name, salary);
}
Cook.prototype.finish = function () { }

// 顾客
function Customer() { };
Customer.prototype.order = function () { }
Customer.prototype.eat = function () { }

// 菜品
function Dish(obj) {
  this.name = obj.name;
  this.cost = obj.cost;
  this.price = obj.price;
}



// var ifeRestaurant = new Restaurant({
//   cash: 1000000,
//   seats: 20,
//   staff: []
// });

// var newCook = new Cook("Tony", 10000);
// ifeRestaurant.hire(newCook);

// console.log(ifeRestaurant.staff);

// ifeRestaurant.fire(newCook);
// console.log(ifeRestaurant.staff);