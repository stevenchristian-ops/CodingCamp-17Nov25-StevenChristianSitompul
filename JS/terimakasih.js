document.addEventListener("DOMContentLoaded", () => {
  // Ambil data pembayaran terakhir dari localStorage
  const lastPayment = JSON.parse(localStorage.getItem("lastPayment"));

  // Ambil elemen untuk menampilkan total dan metode pembayaran
  const totalPaymentEl = document.getElementById("totalPayment");
  const paymentMethodEl = document.getElementById("paymentMethod");

  if (lastPayment) {
    totalPaymentEl.textContent =
      `Total Pembayaran Diterima: Rp ${lastPayment.total.toLocaleString()}`;
    paymentMethodEl.textContent =
      `Metode Pembayaran: ${lastPayment.metode}`;
  } else {
    totalPaymentEl.textContent = "Total Pembayaran Diterima: Rp 0";
    paymentMethodEl.textContent = "";
  }

  // Hapus data order agar tidak muncul lagi saat reload
  localStorage.removeItem("orderData");
  localStorage.removeItem("lastPayment");
});
