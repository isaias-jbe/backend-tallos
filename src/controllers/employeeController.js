const express = require("express");

const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

const Employee = require("../models/Employee");

const router = express.Router();

router.use(authMiddleware);

router.get("/employees", async (req, res) => {
  const employeers = await Employee.find();

  res.send(employeers);
});

router.use(isAdminMiddleware);

router.put("/employees/:id", async (req, res) => {
  const _id = { id: req.params.id };
  console.log(_id);
  try {
    const employee = await Employee.updateOne(_id, { $set: { ...req.body } });

    res.send({ employee });
  } catch (error) {
    return res.status(400).send({ error: "Falha ao atualizar o funcionário!" });
  }
});

module.exports = app => app.use("/auth", router);
