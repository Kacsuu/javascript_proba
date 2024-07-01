
# Funkcionális specifikáció

## 1. Bevezetés
Ez a dokumentum a JavaScript-alapú szimulációs program funkcionális specifikációját tartalmazza. A program célja, hogy vizuális formában szemléltessen egy egyszerű ökológiai szimulációt, amelyben növények, növényevők és ragadozók véletlenszerűen mozognak, interakcióba lépnek egymással és új egyedeket hoznak létre találkozáskor. A felhasználók gombok segítségével további növényeket és állatokat adhatnak hozzá a szimulációhoz.

## 2. Funkciók
Az alkalmazásnak a következő funkciókkal kell rendelkeznie:

### Felhasználói felület
- **Felhasználóbarát felület:** Az alkalmazásnak intuitív, könnyen kezelhető és esztétikus felülettel kell rendelkeznie.
- **Interaktív elemek:** A felhasználók gombok segítségével növényeket, növényevőket és ragadozókat adhatnak hozzá a szimulációhoz.

### Feladatok kezelése
- **Növények kezelése:** Növények véletlenszerűen jelennek meg a képernyőn, és statikus pozícióban maradnak.
- **Növényevők kezelése:** A növényevők véletlenszerűen mozognak a képernyőn. Amikor egy növényevő növényre talál, megeszi azt, és a növény eltűnik.
- **Ragadozók kezelése:** A ragadozók véletlenszerűen mozognak a képernyőn. Amikor egy ragadozó növényevőre talál, megeszi azt, és a növényevő eltűnik.
- **Új egyedek létrehozása:** Amikor két azonos típusú állat (két növényevő vagy két ragadozó) találkozik, egy újabb állat jön létre.
- **Gombok:** A felhasználók gombok segítségével új növényeket, növényevőket és ragadozókat adhatnak hozzá.

## 3. Funkcionális követelmények
Az egyes funkciókhoz tartozó funkcionális követelmények a következők:

### Felhasználói felület
- **Felhasználóbarát tervezés:** Az alkalmazásnak olyan felhasználói felülettel kell rendelkeznie, amely lehetővé teszi a felhasználók számára a könnyű és intuitív navigációt.
- **Interaktív gombok:** Az alkalmazás főképernyőjén gombokat kell elhelyezni, amelyekkel a felhasználók új növényeket, növényevőket és ragadozókat adhatnak hozzá.

### Növények kezelése
- **Növények megjelenítése:** Az alkalmazásnak lehetővé kell tennie a véletlenszerűen elhelyezett növények megjelenítését a képernyőn.
- **Statikus pozíció:** A növények nem mozognak a képernyőn.

### Növényevők kezelése
- **Mozgás:** A növényevők véletlenszerű irányban mozognak a képernyőn.
- **Növények elfogyasztása:** Amikor egy növényevő növénnyel találkozik, megeszi azt, és a növény eltűnik a képernyőről.
- **Új növényevők létrehozása:** Amikor két növényevő találkozik, egy új növényevő jön létre.

### Ragadozók kezelése
- **Mozgás:** A ragadozók véletlenszerű irányban mozognak a képernyőn.
- **Növényevők elfogyasztása:** Amikor egy ragadozó növényevővel találkozik, megeszi azt, és a növényevő eltűnik a képernyőről.
- **Új ragadozók létrehozása:** Amikor két ragadozó találkozik, egy új ragadozó jön létre.

### Gombok
- **Növény hozzáadása:** A felhasználók egy gomb segítségével új növényeket adhatnak hozzá a szimulációhoz.
- **Növényevő hozzáadása:** A felhasználók egy gomb segítségével új növényevőket adhatnak hozzá a szimulációhoz.
- **Ragadozó hozzáadása:** A felhasználók egy gomb segítségével új ragadozókat adhatnak hozzá a szimulációhoz.

## 4. Felhasználói interakciók
- **Gombnyomás:** A felhasználók az interaktív gombokkal növényeket, növényevőket és ragadozókat adhatnak hozzá a szimulációhoz.
- **Megfigyelés:** A felhasználók megfigyelhetik az állatok és növények közötti interakciókat a képernyőn.

## 5. Technikai követelmények
- **JavaScript:** A program JavaScript nyelven íródik.
- **HTML5 Canvas:** A vizuális megjelenítéshez HTML5 Canvas elem használata szükséges.
- **CSS:** Az esztétikus megjelenítéshez CSS-t használunk.

## 6. Tesztelés
- **Funkcionális tesztelés:** A különböző funkciók megfelelő működésének ellenőrzése (pl. gombok, állatok mozgása, interakciók).
- **Felhasználói élmény tesztelése:** A felhasználói felület könnyű kezelhetőségének és esztétikus megjelenésének ellenőrzése.

## 7. Verziókövetés és dokumentáció
- **Verziókövetés:** A fejlesztési folyamat során a változtatásokat verziókövetéssel kell dokumentálni.
- **Dokumentáció:** Az alkalmazás funkcióit és használatát részletes dokumentációban kell rögzíteni.

Ez a funkcionális specifikáció alapvető iránymutatást ad a szimulációs program fejlesztéséhez, biztosítva, hogy az alkalmazás megfeleljen a felhasználói igényeknek és a műszaki követelményeknek.
