class LendingCalculator {
  constructor(interestPercent = 5.4) {
    this.amount = 0;
    this.years = 0;
    this.interestPercent = interestPercent;
  }

  updateYears(years) {
    this.years = years;
    this.outputResult();
  }

  updateAmount(amount) {
    this.amount = amount;
    this.outputResult();
  }

  getMonthInterest(n) {
    const lendingLeft = this.amount - (this.amount / this.years / 12) * n;
    return (lendingLeft * this.interestPercent) / 100 / 12;
  }
  getTotalInterest() {
    let totalInterest = 0;
    for (let i = 1; i < this.years * 12; i++) {
      totalInterest += this.getMonthInterest(i);
    }

    return totalInterest;
  }

  outputResult() {
    document.querySelector("#cost-total").innerHTML =
      parseInt(this.amount) + parseInt(this.getTotalInterest(this.years * 12));

    document.querySelector("#interest-total").innerHTML = parseInt(
      this.getTotalInterest(this.years * 12)
    );

    document.querySelector("#cost-month").innerHTML = Math.round(this.amount / this.years / 12);
    const canvas = document.getElementById("canvas").getContext("2d");

    let box = document.querySelector(".result-lending");
    let width = box.offsetWidth - 40;

    document.getElementById("canvas").width = width;

    const totalInterest = parseInt(this.getTotalInterest(this.years * 12));
    const total = parseInt(this.amount) + parseInt(totalInterest);

    const wAmortization = Math.round((width / total) * this.amount);
    const wInterest = Math.round((width / total) * totalInterest);

    canvas.fillStyle = "green";
    canvas.fillRect(0, 0, wAmortization, 50);
    canvas.fillStyle = "red";
    canvas.fillRect(wAmortization, 0, wInterest, 50);
  }
}
let loanCalc = new LendingCalculator();
const updateYears = (val) => {
  document.querySelector("#year-text-input").value = val;
  loanCalc.updateYears(val);
};

const updateAmount = (val) => {
  document.querySelector("#amount-text-input").value = val;
  loanCalc.updateAmount(val);
};

window.onload = () => {
  const lending = document.querySelector("#lending-amount").value;
  const years = document.querySelector("#lending-years").value;

  loanCalc.updateAmount(lending);
  loanCalc.updateYears(years);
  loanCalc.outputResult();
};
