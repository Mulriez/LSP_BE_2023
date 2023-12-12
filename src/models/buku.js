'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class buku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      buku.belongsTo(models.penerbit, {
        as: "pt1",
        foreignKey: "penerbit",
      });
    }
  }
  buku.init({
    idBuku: DataTypes.STRING,
    kategori: DataTypes.STRING,
    namaBuku: DataTypes.STRING,
    harga: DataTypes.FLOAT,
    stok: DataTypes.INTEGER,
    penerbit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'buku',
  });
  return buku;
};