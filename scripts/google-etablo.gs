// kanadayagidiyoruz: görüşme formu başvurularını bu E-Tablo'ya yazar.
// E-Tablo > Uzantılar > Apps Script'e yapıştırın, sonra Dağıt > Yeni dağıtım > Web uygulaması.

const BASLIKLAR = ["Tarih", "Ad Soyad", "Telefon", "E-posta", "Kim için", "Program", "Sınıf", "Uygun zaman", "Not", "KVKK onayı"];

function doPost(e) {
  const sayfa = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sayfa.getLastRow() === 0) sayfa.appendRow(BASLIKLAR);
  const v = JSON.parse(e.postData.contents);
  sayfa.appendRow([
    v.gonderim ? new Date(v.gonderim) : new Date(),
    v.adSoyad || "",
    "'" + (v.telefon || ""),
    v.eposta || "",
    v.kimIcin || "",
    v.program || "",
    v.sinif || "",
    v.zaman || "",
    v.not || "",
    v.kvkk ? "Evet" : "Hayır",
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
