// 705.484.450-52 070.987.720-03

/*
7x  0x  5x  4x  8x  4x  4x  5x  0x  - 9 primeiros digitos 
10  9   8   7   6   5   4   3   2
70  0   40  28  48  20  16  15  0  = 237

11 - (237 % 11) = 5 (Primeiros digitos)
Se o número digito for maior do que 9, consideramos 0

7x  0x  5x  4x  8x  4x  4x  5x  0x 5x - 10 primeiros digitos 
11  10  9   8   7   6   5   4   3  2  
77  0   45  32  56  24  20  20  0  10

11 - (284 % 11) = 2 (Segundo digito)
Se o numero digito for maior do que 9, consideramos 0. 

*/

// Removendo tudo o que nao é um numero do cpf

// const cpf = "705.484.450-52";
// const cleanCPF = cpf.replace(/\D+/g, "").split("").map(Number);
// const arrayCPF = Array.from(cleanCPF);

// console.log(arrayCPF.reduce((ac, val) => ac + Number(val), 0));

// for (let i = 0; i <= 8; i++) {
//   arrayCPF[i] * (10 - i);
// }

function ValidateCPF(cpfEnviado) {
  Object.defineProperty(this, "cleanCPF", {
    enumerable: true,
    get: function () {
      return cpfEnviado.replace(/\D+/g, "");
    },
  });
}

ValidateCPF.prototype.validate = function () {
  if (typeof this.cleanCPF === "undefined") return false;
  if (this.cleanCPF.length !== 11) return false;
  if (this.isSequence()) return false;

  const cpfParcial = this.cleanCPF.slice(0, -2);
  const digit1 = this.createDigit(cpfParcial);
  const digit2 = this.createDigit(cpfParcial + digit1);

  const newCPF = cpfParcial + digit1 + digit2;
  return newCPF === this.cleanCPF;
};

ValidateCPF.prototype.createDigit = function (cpfParcial) {
  const cpfArray = Array.from(cpfParcial);

  let regressive = cpfArray.length + 1;
  const total = cpfArray.reduce((ac, val) => {
    ac += regressive * Number(val);
    regressive--;
    return ac;
  }, 0);

  const digito = 11 - (total % 11);

  return digito > 9 ? "0" : String(digito);
};

ValidateCPF.prototype.isSequence = function () {
  return this.cleanCPF[0].repeat(this.cleanCPF.length) === this.cleanCPF;
};

const cpf = new ValidateCPF("705.484.450-52");
console.log(cpf.validate());
// cpf.valida();
