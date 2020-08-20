const Employee = require("../models/Employee");

module.exports = async (req, res, next) => {
  const employee = await Employee.findById(req.userId);

  if (!employee)
    return res.status(401).send({ error: "Usuário não autenticado!" });

  if (employee.profile !== "admin")
    return res
      .status(401)
      .send({ error: "Usuário sem permição para esta operação." });

  return next();
};
