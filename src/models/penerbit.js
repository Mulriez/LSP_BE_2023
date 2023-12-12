'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class penerbit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  penerbit.init({
    idPenerbit: DataTypes.STRING,
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    kota: DataTypes.STRING,
    telepon: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'penerbit',
  });
  return penerbit;
};