const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.json");

const Employee = require("../models/Employee");

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

router.post("/register", async (req, res) => {
  const { email } = req.body;

  try {
    if (await Employee.findOne({ email }))
      return res.status(400).send({ error: "Usuário já existe!" });

    const employee = await Employee.create(req.body);

    employee.password = undefined;

    res.send({ employee, token: generateToken({ id: employee.id }) });
  } catch (error) {
    return res
      .status(400)
      .send({ error: "Falha ao registrar um funcionário!" });
  }
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  const employee = await Employee.findOne({ email }).select("+password");

  if (!employee) return res.status(400).send({ error: "Usuário não existe!" });

  if (!(await bcrypt.compare(password, employee.password)))
    return res.status(400).send({ error: "Senha inválida!" });

  employee.password = undefined;

  res.send({ employee, token: generateToken({ id: employee.id }) });
});

module.exports = app => app.use("/auth", router);
