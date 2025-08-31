# 🔌 3D Tulostimen Kustannuslaskuri

Moderni, sisältölähtöinen web-sovellus 3D tulostimien sähkönkulutuksen, filamentin kustannusten ja lisäkustannusten laskemiseen. Täysin uudistettu design ja käyttökokemus vuonna 2024.

## 📋 Sisältö

- [Ominaisuudet](#-ominaisuudet)
- [Käyttö](#-käyttö)
- [Uusi Design](#-uusi-design)
- [Asennus](#️-asennus)
- [Tekniset tiedot](#-tekniset-tiedot)
- [Esimerkkejä](#-esimerkkejä)

## ✨ Ominaisuudet

### 🎨 **Moderni Design System**

- **Glassmorphism-tyyli** - Läpinäkyvät taustat ja blur-efektit
- **Sidebar + Main Content Layout** - Optimaalinen tilan käyttö
- **Sisältölähtöinen** - Ei turhaa venytystä, kompakti ja tehokas
- **CSS Custom Properties** - Yhtenäinen väripaletti ja spacing

### 🖨️ **Valmiit Tulostinmallit**

- **Anycubic Kobra 3 V2** (200W)
- **Prusa MK4** (180W)
- **Creality Ender 3 V3 SE** (220W)
- **Bambu Lab P1P** (250W)
- **Ultimaker S5** (300W)
- **Mukautettu tulostin** - Oma tehonkulutus

### 🧵 **Älykkäät Materiaalilaskelmat**

- **Usean filamentin tuki** - Lisää niin monta kuin tarvitset
- **Reaaliaikainen yhteenveto** - Kokonaismäärä ja -kustannus
- **Kompakti grid-layout** - Tehokas tilan käyttö
- **Helppokäyttöinen** - Poista filamentit yhdellä klikkauksella

### 📊 **Edistyneet Lisäkustannukset**

- **Toggle-kytkin** - Ota käyttöön tai pois tarpeen mukaan
- **Epäonnistuneet tulostukset** - Slider + input synkronoitu
- **Huoltokustannukset** - Kuukausittainen arvio
- **Työmaksu** - Mallin valmistelu ja valvonta
- **Automaattinen tallennus** - Kaikki asetukset muistetaan

### 💾 **Täydellinen Muistitoiminto**

- **LocalStorage-pohjainen** - Toimii offline
- **Kaikki kentät tallentuvat** - Ei menetä tietoja
- **Toggle-tilat muistetaan** - Täydellinen pysyvyys
- **Slider-arvot synkronoitu** - Input ja slider aina yhteneväiset
- **Clear Memory** - Palauta oletusasetukset

### 📱 **Täysin Responsiivinen**

- **Desktop-optimoitu** - Erityisesti 2560x1440p näytöille
- **Mobile-first** - Toimii täydellisesti puhelimessa
- **Tablet-tuki** - Sopeutuu kaikkiin näyttökokoihin
- **Kompakti layout** - Kaikki tiedot näkyvät kerralla

## 🚀 Käyttö

### Perustyönkulku:

1. **Avaa sovellus** - `index.html` selaimessa
2. **Valitse tulostin** - Automaattinen tehonkulutus
3. **Syötä perusasetukset** - Kompaktissa 3-sarake gridissä:
   - Tehonkulutus (W)
   - Sähkön hinta (€/kWh)
   - Tulostusaika (h)
4. **Lisää filamentit** - Niin monta kuin tarvitset
5. **Lisäkustannukset** - Toggle päälle tarpeen mukaan
6. **Katso tulokset** - Reaaliajassa oikealla

### Esimerkki: Anycubic Kobra 3 V2

**Syötteet:**

- Tulostin: Anycubic Kobra 3 V2
- Tehonkulutus: 200W (automaattinen)
- Sähkön hinta: 0,08 €/kWh
- Tulostusaika: 8 tuntia
- Filamentti: 150g PLA, 20€/kg
- Lisäkustannukset: Päällä (5% epäonnistumiset, 5€/kk huolto)

**Tulokset:**

- Sähkönkulutus: 1,60 kWh
- Sähkön kustannukset: 0,13 €
- Filamentin kustannukset: 3,00 €
- Lisäkustannukset: 0,18 €
- **Kokonaiskustannukset: 3,31 €**
- Kustannus/tunti: 0,41 €

## 🎨 Uusi Design

### Layout-filosofia:

```
┌─────────────────────────────────────────────────────┐
│                    HEADER                           │
├─────────────────────────────────┬───────────────────┤
│                                 │                   │
│         MAIN CONTENT            │     SIDEBAR       │
│        (Syötteet)               │    (Tulokset)     │
│                                 │                   │
│  🖨️ Tulostin ja asetukset      │  💰 Peruskulut   │
│  🧵 Materiaalit                │  📊 Lisäkulut    │
│  📊 Lisäkustannukset           │  💎 Yhteenveto   │
│                                 │  ℹ️ Lisätietoja   │
└─────────────────────────────────┴───────────────────┘
```

### Responsiiviset leveydet:

- **Base:** 520px + 420px = 940px
- **1200px+:** 580px + 460px = 1040px
- **1600px+:** 620px + 500px = 1120px
- **Mobile:** 100% (pystysuunta)

### Kompakti form-layout:

- **3-sarake grid** perusasetuksille
- **2-sarake grid** lisäkustannuksille
- **Help-tekstit rinnakkain** - ei turhaa tilaa

## 🛠️ Asennus

### Yksinkertainen käyttö:

```bash
# Lataa tiedostot
git clone [repository-url]
cd 3DPrintCalculator

# Avaa selaimessa
open index.html
```

### Kehitysympäristö:

```bash
# Paikallinen palvelin
python -m http.server 8000
# tai
npx serve .
# tai
php -S localhost:8000
```

**Ei riippuvuuksia!** - Toimii suoraan selaimessa.

## 🔧 Tekniset tiedot

### Teknologiat:

- **HTML5** - Semanttinen, saavutettava rakenne
- **CSS3** - Modern design system, custom properties
- **JavaScript ES6+** - Luokkapohjainen arkkitehtuuri
- **LocalStorage** - Pysyvä tietojen tallennus
- **Responsive Design** - CSS Grid + Flexbox

### Arkkitehtuuri:

```javascript
class PrinterCalculator {
  // Täydellinen muistitoiminto
  saveValues()     // Tallentaa KAIKEN
  loadSavedValues() // Lataa KAIKEN
  clearMemory()    // Resetoi KAIKEN

  // Reaaliaikainen laskenta
  calculate()      // Päivittää tulokset
  updateResults()  // Näyttää tulokset

  // Käyttöliittymä
  setupInteractiveFeatures() // Toggle, slider, esimerkit
  addFilamentEntry()         // Dynaaminen filamenttilista
}
```

### Design System:

```css
:root {
  /* Väripaletti */
  --primary-600: #4f46e5; /* Pääväri */
  --neutral-800: #1e293b; /* Tumma teksti */
  --success-500: #10b981; /* Toggle päällä */
  --warning-500: #f59e0b; /* Valinnainen badge */

  /* Spacing scale */
  --space-4: 1rem; /* Perus padding */
  --space-6: 1.5rem; /* Isompi padding */

  /* Typography */
  --text-sm: 0.875rem; /* Pieni teksti */
  --text-lg: 1.125rem; /* Otsikot */
}
```

### Laskentakaavat:

```
Sähkönkulutus (kWh) = Tehonkulutus (W) × Aika (h) ÷ 1000
Sähkön kustannukset (€) = Sähkönkulutus × Sähkön hinta (€/kWh)
Filamentin kustannukset (€) = Σ(Määrä (g) ÷ 1000 × Hinta (€/kg))

Lisäkustannukset:
- Epäonnistuneet = Filamenttikustannus × (Epäonnistumis-% ÷ 100)
- Huolto = (Huoltokustannus €/kk ÷ 160h/kk) × Tulostusaika
- Työmaksu = Kiinteä summa

Kokonaiskustannukset = Sähkö + Filamentti + Lisäkustannukset
```

## 📊 Esimerkkejä

### Esimerkki 1: Nopea prototyyppi

- **Tulostin:** Bambu Lab P1P (250W)
- **Aika:** 2 tuntia
- **Filamentti:** 50g PLA (20€/kg)
- **Tulos:** ~0,45 € (0,04€ sähkö + 1,00€ filamentti)

### Esimerkki 2: Pitkä tulostus

- **Tulostin:** Prusa MK4 (180W)
- **Aika:** 24 tuntia
- **Filamentit:** 300g PLA + 100g TPU
- **Lisäkustannukset:** 10% epäonnistumiset
- **Tulos:** ~11,50 € (0,35€ sähkö + 10,00€ filamentti + 1,15€ lisäkustannukset)

### Esimerkki 3: Ammattikäyttö

- **Tulostin:** Ultimaker S5 (300W)
- **Aika:** 12 tuntia
- **Filamentti:** 200g PETG (30€/kg)
- **Työmaksu:** 15€ (suunnittelu + valvonta)
- **Tulos:** ~21,29 € (0,29€ sähkö + 6,00€ filamentti + 15€ työmaksu)

## 💡 Vinkkejä optimointiin

### Kustannussäästö:

1. **Käytä Prusa MK4** - Tehokkain tehonkulutus (180W)
2. **Optimoi infill** - Vähemmän materiaalia
3. **Osta filamenttiä irtotavarana** - Parempi hinta/kg
4. **Tulosta yöllä** - Halvempi sähkö
5. **Huolla tulostin** - Parempi tehokkuus

### Laadun säilyttäminen:

1. **Älä säästä liikaa infillissä** - Lujuus kärsii
2. **Käytä laadukasta filamenttiä** - Vähemmän epäonnistumisia
3. **Optimoi lämpötilat** - Parempi tarttuvuus
4. **Kalibroi säännöllisesti** - Tasainen laatu

## 🎯 Tarkkuus ja rajoitukset

### Laskurin tarkkuus:

- **Sähkönkulutus:** ±5-10% (riippuu tulostusasetuksista)
- **Filamentin kulutus:** Tarkka (syötetyn määrän mukaan)
- **Lisäkustannukset:** Arvio (vaihtelee käytännöissä)

### Vaikuttavat tekijät:

- Tulostuslämpötila ja -nopeus
- Ympäristön lämpötila
- Tulostimen ikä ja kunto
- Filamentin laatu ja kosteus
- Mallin monimutkaisuus

## 🔄 Päivityshistoria

### v2.0 (2024) - Täysi uudistus:

- ✅ Uusi glassmorphism design
- ✅ Sidebar + main content layout
- ✅ Kompakti form-grids
- ✅ Täydellinen muistitoiminto
- ✅ Lisäkustannusten toggle
- ✅ Responsiivinen optimointi
- ✅ Koodin siivous ja optimointi

### v1.0 (Aiemmin):

- Perus korttipohjainen layout
- Yksinkertainen laskenta
- Osittainen muistitoiminto

## 📝 Lisenssi

MIT License - Vapaa käyttö ja muokkaus.

## 🤝 Osallistuminen

Tervetuloa mukaan kehittämään!

1. **Fork** projekti
2. **Luo feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** muutokset (`git commit -m 'Add amazing feature'`)
4. **Push** branchiin (`git push origin feature/amazing-feature`)
5. **Avaa Pull Request**

### Kehitysideoita:

- 🌍 Kansainvälistäminen (i18n)
- 📈 Kustannushistoria ja trendit
- 🔌 Energiankulutuksen visualisointi
- 📱 PWA-tuki (offline-käyttö)
- 🎨 Teema-vaihtoehdot
- 📊 CSV/PDF-vienti

---

**💡 Huomio:** Tämä laskuri antaa ohjeellisia arvioita. Tarkat kustannukset riippuvat paikallisista hinnoista, tulostusasetuksista ja käyttötavoista. Käytä työkaluna suunnitteluun ja budjetointiin.

**🚀 Optimoitu erityisesti 2560x1440p näytöille - kaikki tiedot näkyvät kerralla!**
