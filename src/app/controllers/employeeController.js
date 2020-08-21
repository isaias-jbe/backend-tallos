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
  const id = req.params.id;

  try {
    await Employee.findByIdAndUpdate(id, req.body);

    res.send({ message: "Dados do funcionário atualizado com sucesso!" });
  } catch (error) {
    return res.status(400).send({ error: "Falha ao atualizar o funcionário!" });
  }
});

router.delete("/employees/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Employee.findByIdAndDelete(id);

    res.send({ message: "Funcionário excluído com sucesso!" });
  } catch (error) {
    return res.status(400).send({ error: "Falha ao excluir o funcionário!" });
  }
});

module.exports = app => app.use("/auth", router);
