document.addEventListener("DOMContentLoaded", () => {

  /* DROPDOWN MENU FIX */
  const btnMenu = document.getElementById("btnMenu");
  const dropdownMenu = document.getElementById("dropdownMenu");
  if (btnMenu && dropdownMenu) {
    dropdownMenu.style.position = "absolute";
    dropdownMenu.style.top = "100%";
    dropdownMenu.style.left = "0";
    dropdownMenu.classList.add("hidden");

    btnMenu.addEventListener("click", e => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", e => {
      if (!dropdownMenu.contains(e.target) && !btnMenu.contains(e.target)) {
        dropdownMenu.classList.add("hidden");
      }
    });
  }

  /* DATA MENU */
  const menuFood = {
    kwetiaw: { img:"Assets/kwetiaw_goreng_medan.jfif", harga:28000, nama:"Kwetiaw Medan Original" },
    teri: { img:"Assets/kwetiaw_goreng_medan_teri.jpg", harga:30000, nama:"Kwetiaw Teri Medan" },
    seafood: { img:"Assets/kwetiaw_goreng_medan_seafood.jfif", harga:32000, nama:"Kwetiaw Seafood" },
    teriyaki: { img:"Assets/rice_bowl_teriyaki.jfif", harga:27000, nama:"Rice Bowl Teriyaki" },
    katsu: { img:"Assets/rice_bowl_chicken_katsu_kari.jfif", harga:29000, nama:"Rice Bowl Katsu Kari" },
    nasigoreng: { img:"Assets/rice_bowl_nasi_goreng.jfif", harga:25000, nama:"Rice Bowl Nasi Goreng" }
  };

  const menuDrink = {
    esteh: { img:"Assets/es_teh.jfif", harga:5000, nama:"Es Teh Manis" },
    americano: { img:"Assets/es_kopi_americano.jpeg", harga:12000, nama:"Es Kopi Americano" },
    kopisusu: { img:"Assets/es_kopi_susu.jfif", harga:15000, nama:"Kopi Susu" }
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  const menuDisplay = document.getElementById("menuDisplay");
  const orderList = document.getElementById("orderList");
  const totalHarga = document.getElementById("totalHarga");

  updateOrderList();

  /* TAMPILKAN KATEGORI */
  window.showCategory = function(type) {
    menuDisplay.innerHTML = "";
    const data = type === "food" ? menuFood : menuDrink;
    Object.keys(data).forEach(key => {
      const item = data[key];
      menuDisplay.innerHTML += `
        <div onclick="selectItem('${key}','${type}')"
          class="cursor-pointer bg-white p-4 rounded-2xl shadow mb-4 border hover:bg-pink-50">
          <p class="font-bold">${item.nama}</p>
          <p class="text-gray-600">Rp ${item.harga.toLocaleString()}</p>
        </div>`;
    });
  };

  /* PILIH ITEM */
  window.selectItem = function(key,type) {
    const item = type === "food" ? menuFood[key] : menuDrink[key];
    menuDisplay.innerHTML = `
      <h2 class="text-2xl font-bold text-pink-600 mb-4">${item.nama}</h2>
      <img src="${item.img}" class="w-60 mx-auto rounded-2xl shadow-xl border-4 border-pink-300 mb-5">
      <p class="text-xl font-semibold mb-3">Harga: Rp ${item.harga.toLocaleString()}</p>

      <label class="font-semibold">Qty:</label>
      <input id="qtyInput" type="number" min="1" value="1" class="border rounded-xl p-2 w-20 text-center">

      <label class="font-semibold mt-4 block">Request Konsumen:</label>
      <input id="requestInput" class="border rounded-xl p-2 w-full">

      <button onclick="submitOrder('${key}','${type}')"
        class="bg-pink-500 text-white px-6 py-2 rounded-xl font-bold shadow mt-4">
        Tambah ke Order
      </button>
    `;
  };

  /* SUBMIT ORDER */
  window.submitOrder = function(key,type) {
    const item = type === "food" ? menuFood[key] : menuDrink[key];
    const qty = parseInt(document.getElementById("qtyInput").value);
    const request = document.getElementById("requestInput").value;

    orders.push({
      nama: item.nama,
      harga: item.harga,
      qty,
      request,
      img: item.img  // FIX — langsung pakai path asli
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    updateOrderList();
    alert("Berhasil ditambahkan ke order!");
  };

  /* UPDATE ORDER LIST */
  function updateOrderList() {
    orderList.innerHTML = "";
    let total = 0;

    orders.forEach((o,i)=>{
      total += o.harga * o.qty;
      orderList.innerHTML += `
        <div class="flex justify-between items-center bg-white p-3 rounded-xl shadow border border-pink-200 mb-2">
          <div>
            <p class="font-bold">${o.nama}</p>
            ${o.request ? `<p class="italic text-gray-500">Request: ${o.request}</p>` : ""}
            <p>Qty: ${o.qty}</p>
            <p>Rp ${(o.harga * o.qty).toLocaleString()}</p>
          </div>
          <button onclick="removeOrder(${i})" class="text-red-500 text-xl font-bold">×</button>
        </div>`;
    });

    totalHarga.textContent = total.toLocaleString();
  }

  /* HAPUS ORDER */
  window.removeOrder = function(i) {
    orders.splice(i,1);
    localStorage.setItem("orders", JSON.stringify(orders));
    updateOrderList();
  };

  /* CHECKOUT */
  window.checkout = function() {
    if (orders.length === 0){
      alert("Pesanan masih kosong!");
      return;
    }

    const total = orders.reduce((sum,o)=> sum + o.harga * o.qty, 0);

    localStorage.setItem("orderData", JSON.stringify({
      items: orders,
      total
    }));

    localStorage.removeItem("orders");

    window.location.href = "./Link/Pembayaran.html";
  };

});
