// module.export = class UserDto {
//   email;
//   id;
//   isActivated;

//   constructor(model) {
//     this.email = model.email;
//     this.id = model._id;
//     this.isActivated = model.isActivated;
//   }
// };

module.exports = class UserDto {
  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
};
