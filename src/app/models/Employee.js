const mongoose = require("../../dabase");
const bcrypt = require("bcryptjs");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  profile: {
    type: String,
    require: true
  },
  address: {
    cep: { type: String },
    logradouro: { type: String },
    number: { type: String },
    complemento: { type: String },
    bairro: { type: String },
    localidade: { type: String },
    uf: { type: String }
  },
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

EmployeeSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

EmployeeSchema.pre("update", async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
