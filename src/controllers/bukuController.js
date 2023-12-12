const bukuModel = require("../models").buku;
const models = require("../models");
const { Op, where } = require("sequelize");
const checkQuery = require("../utils/queryString");

async function getBuku(req, res) {
  const { page, offset, pageSize, keyword } = req.query;
  try {
    const buku = await bukuModel.findAndCountAll({
      include: [
        {
          model: models.penerbit,
          require: true,
          as: "pt1",
          attributes: ["nama"],
        },
      ],
      where: {
        ...(checkQuery(keyword) && {
          [Op.or]: [
            {
              namaBuku: { [Op.substring]: keyword },
            },
          ],
        }),
      },
      attributes: [
        "id",
        "idBuku",
        "namaBuku",
        "kategori",
        "harga",
        "stok",
        "penerbit",
      ],
      offset: offset,
      limit: pageSize,
    });

    res.json({
      status: "success",
      msg: "buku Ditemukan",
      data: buku.rows,
      pagination: {
        page: page,
        pageSize: pageSize,
        total: buku.count,
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
async function getDetail(req, res) {
  const { id } = req.params;
  try {
    const buku = await bukuModel.findByPk(id);
    if (!buku) {
      return res.status(404).json({
        status: "Fail",
        msg: "buku tidak ditemukan",
      });
    }
    res.json({
      status: "success",
      msg: "buku Ditemukan",
      data: buku,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      msg: "Ada kesalahan",
    });
  }
}
async function createBuku(req, res) {
  try {
    const payload = req.body;
    let { idBuku, namaBuku, kategori, harga, stok, penerbit } = payload;
    const buku = await bukuModel.create({
      idBuku,
      namaBuku,
      kategori,
      harga,
      stok,
      penerbit,
    });
    console.log(buku instanceof bukuModel);

    res.status(201).json({
      status: "Success",
      message: "buku berhasil dibuat",
      data: buku,
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
async function updateBuku(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { idBuku, namaBuku, kategori, harga, stok, penerbit } = payload;
    const buku = await bukuModel.findByPk(id);
    if (buku === null) {
      return res.status(404).json({
        status: "Fail",
        msg: `buku Tidak ditemukan`,
      });
    }
    await bukuModel.update(
      {
        idBuku,
        namaBuku,
        kategori,
        harga,
        stok,
        penerbit,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      msg: "Berhasil memperbarui buku",
      data: buku,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      msg: "Ada kesalahan",
    });
  }
}
async function deleteBuku(req, res) {
  try {
    const { id } = req.params;
    const barang = await bukuModel.findByPk(id);
    if (barang === null) {
      return res.status(404).json({
        status: "Fail",
        msg: "Barang tidak ditemukan",
      });
    }
    await barangModel.destroy({
      where: {
        id: id,
      },
    });

    res.status(201).json({
      status: "Success",
      msg: "Buku dihapus",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      msg: "Ada kesalahan",
    });
  }
}

module.exports = {
  getBuku,
  getDetail,
  createBuku,
  updateBuku,
  deleteBuku,
};
