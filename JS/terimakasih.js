document.addEventListener("DOMContentLoaded", () => {
  const lastPayment = JSON.parse(localStorage.getItem("lastPayment"));
  const totalPaymentEl = document.getElementById("totalPayment");
  const paymentMethodEl = document.getElementById("paymentMethod");

  if(lastPayment){
    totalPaymentEl.textContent = `Total Pembayaran Diterima: Rp ${lastPayment.total.toLocaleString()}`;
    paymentMethodEl.textContent = `Metode Pembayaran: ${lastPayment.metode}`;
  }else{
    totalPaymentEl.textContent = "Total Pembayaran Diterima: Rp 0";
    paymentMethodEl.textContent = "";
  }

  // Hapus data agar reload tidak menampilkan ulang
  localStorage.removeItem("orderData");
  localStorage.removeItem("lastPayment");
});
