// Número do WhatsApp que recebe as respostas (com 55 + DDD, só números)
var WHATSAPP = "5517991638842";
var EVENT = new Date(2026, 11, 18, 19, 0, 0);

// céu: estrelas e nuvens (geradas com sementes fixas, sempre iguais)
var seed = 7;
function rnd(){ seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
(function(){
  var s = document.getElementById("stars"), h = "";
  for (var i = 0; i < 70; i++){
    var z = 1 + Math.round(rnd() * 2);
    h += '<i class="star' + (i % 4 === 0 ? ' t' : '') + '" style="left:' + (rnd() * 100).toFixed(1) + '%;top:' + (rnd() * 55).toFixed(1) + '%;width:' + z + 'px;height:' + z + 'px;animation-delay:-' + (rnd() * 3).toFixed(1) + 's"></i>';
  }
  s.innerHTML = h;
  var NS = "http://www.w3.org/2000/svg", c = document.getElementById("clouds");
  [[120, 16, "#c9d6f2", 45, 85], [165, 14, "#e6ecfa", 50, 90], [215, 14, "#ffffff", 55, 95], [262, 12, "#f4f1ff", 60, 100]].forEach(function(r){
    for (var i = 0; i < r[1]; i++){
      var e = document.createElementNS(NS, "circle");
      e.setAttribute("cx", (i * 1440 / (r[1] - 1) + (rnd() - .5) * 50).toFixed(0));
      e.setAttribute("cy", (r[0] + rnd() * 28).toFixed(0));
      e.setAttribute("r", (r[3] + rnd() * (r[4] - r[3])).toFixed(0));
      e.setAttribute("fill", r[2]);
      c.appendChild(e);
    }
  });
})();

// nuvens que passam pelo céu (ficam atrás do castelo)
(function(){
  var st = document.querySelector(".stage"), cs = document.querySelector(".castle");
  for (var i = 0; i < 8; i++){
    var e = document.createElement("i");
    e.className = "drift";
    var sc = 0.6 + rnd() * 0.9;
    e.style.cssText = "top:" + (4 + rnd() * 48).toFixed(0) + "%;animation-duration:" + (60 + rnd() * 70).toFixed(0) + "s;animation-delay:-" + (rnd() * 120).toFixed(0) + "s;transform:scale(" + sc.toFixed(2) + ");opacity:" + (0.45 + rnd() * 0.45).toFixed(2);
    st.insertBefore(e, cs);
  }
})();

var v1 = document.getElementById("v-convite"), v2 = document.getElementById("v-presente");
function route(){
  var gift = location.hash === "#presente";
  v1.hidden = gift; v2.hidden = !gift;
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route); route();

(function(){
  var c = document.getElementById("count");
  var days = Math.ceil((EVENT - new Date()) / 86400000);
  if (days > 1) c.textContent = "Faltam " + days + " dias para a festa";
  else if (days === 1) c.textContent = "A festa é amanhã!";
  else if (days === 0) c.textContent = "A festa é hoje!";
})();

var dlg = document.getElementById("dlg"), mode = "yes";
var nm = document.getElementById("nm"), gs = document.getElementById("gs"), send = document.getElementById("send");
function link(){
  var n = nm.value.trim() || "Convidado";
  var msg = mode === "yes"
    ? "Olá! Aqui é " + n + ". Confirmo presença no primeiro aninho do Ravi (18/12, às 19h, Vila Castelline) com " + (gs.value || 1) + " pessoa(s). 👑"
    : "Olá! Aqui é " + n + ". Infelizmente não poderei ir ao primeiro aninho do Ravi, mas mando um beijo enorme! 💙";
  send.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);
}
document.querySelectorAll("[data-rsvp]").forEach(function(b){
  b.addEventListener("click", function(){
    mode = b.dataset.rsvp;
    document.getElementById("dt").textContent = mode === "yes" ? "Que alegria!" : "Vamos sentir sua falta";
    document.getElementById("dp").textContent = mode === "yes" ? "Conte para a família que você vem." : "Avise a família para organizarmos tudo.";
    document.getElementById("gw").style.display = mode === "yes" ? "" : "none";
    link(); dlg.showModal(); nm.focus();
  });
});
nm.addEventListener("input", link); gs.addEventListener("input", link);
document.getElementById("close").addEventListener("click", function(){ dlg.close(); });
dlg.addEventListener("click", function(e){ if (e.target === dlg) dlg.close(); });
