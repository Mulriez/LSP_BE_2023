const express = require("express");
const router = express.Router();
const { getBuku, getDetail, createBuku, updateBuku, deleteBuku } = require("../controllers/bukuController");
const { getPb, createPb } = require("../controllers/penerbitController");

//pb
router.get("/penerbit/list", getPb);
router.post("/penerbit/create", createPb);

//buku
router.get("/buku/list", getBuku);
router.get("/buku/detail/:id", getDetail);
router.post("/buku/create",createBuku);
router.put("/buku/update/:id",  updateBuku);
router.delete("/buku/delete/:id", deleteBuku);

module.exports = router