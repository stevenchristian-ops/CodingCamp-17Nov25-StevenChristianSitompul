document.addEventListener("DOMContentLoaded", () => {

  const orderResult = document.getElementById("orderResult");
  const paymentForm = document.getElementById("paymentForm");

  const orderData = JSON.parse(localStorage.getItem("orderData"));

  if (!orderData || !orderData.items || orderData.items.length === 0){
    orderResult.innerHTML = "<p class='text-red-500 font-bold'>Tidak ada pesanan.</p>";
    return;
  }

  // TAMPILKAN PESANAN
  let html = `
    <h2 class="text-xl font-bold mb-3 text-pink-600">Pesanan Kamu</h2>
    <ul>
  `;

  orderData.items.forEach(item => {
    html += `
      <li class="mb-4 flex gap-4 bg-pink-50 p-3 rounded-xl shadow">
        <img src="${item.img}" class="w-20 h-20 rounded-lg border border-pink-200 object-cover">

        <div>
          <p class="font-bold">${item.nama}</p>
          <p>Qty: ${item.qty}</p>
          <p>Harga: Rp ${(item.harga * item.qty).toLocaleString()}</p>
          ${item.request ? `<p class="italic text-gray-600">Request: ${item.request}</p>` : ""}
        </div>
      </li>`;
  });

  html += `
    </ul>
    <p class="text-xl font-bold mt-3">Total: Rp ${orderData.total.toLocaleString()}</p>
  `;

  orderResult.innerHTML = html;

  // PROSES PEMBAYARAN
  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const metode = document.querySelector('input[name="pembayaran"]:checked');
    if (!metode){
      alert("Pilih metode pembayaran terlebih dahulu!");
      return;
    }

    localStorage.setItem("lastPayment", JSON.stringify({
      total: orderData.total,
      metode: metode.value
    }));

    window.location.href = "./Terimakasih.html";
  });

});
