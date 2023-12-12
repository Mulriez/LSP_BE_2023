const pbModel = require("../models").penerbit;
const { Op, where } = require("sequelize");
const checkQuery = require("../utils/queryString");

async function getPb(req, res) {
  const { page, offset, pageSize, keyword } = req.query;
  try {
    const penerbit = await pbModel.findAndCountAll({
      where: {
        ...(checkQuery(keyword) && {
          [Op.or]: [
            {
              nama: { [Op.substring]: keyword },
            },
          ],
        }),
      },
      attributes: ["id", "idpenerbit", "nama", "alamat", "kota", "telepon"],
      offset: offset,
      limit: pageSize,
    });

    res.json({
      status: "success",
      msg: "penerbit Ditemukan",
      data: penerbit.rows,
      pagination: {
        page: page,
        pageSize: pageSize,
        total: penerbit.count,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      msg: "Ada kesalahan",
    });
  }
}
async function createPb(req, res) {
    try {
      const payload = req.body;
      let { idpenerbit, nama, alamat, kota, telepon } = payload;
      const pb = await pbModel.create({
        idpenerbit, nama, alamat, kota, telepon
      });
      console.log(pb instanceof pbModel);
  
      res.status(201).json({
        status: "Success",
        message: "penerbit berhasil dibuat",
        data: pb,
      });
    } catch (error) {
      console.log(error);
      console.log("this", req.file);
      res.status(500).json({
        status: "Fail",
        message: "Ada kesalahan",
        error: error,
      });
    }
  }

module.exports = {
  getPb,
  createPb
};
