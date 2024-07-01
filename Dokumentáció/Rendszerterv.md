
# Rendszerterv

## 1. Bevezetés
Ez a dokumentum a JavaScript-alapú szimulációs program rendszertervét tartalmazza. A rendszerterv célja, hogy részletesen leírja az alkalmazás architektúráját, az egyes modulok működését, a használt technológiákat, valamint a telepítési és karbantartási folyamatokat.

## 2. Rendszer áttekintése
Az alkalmazás célja, hogy egy egyszerű ökológiai szimulációt biztosítson, amelyben növények, növényevők és ragadozók véletlenszerűen mozognak és interakcióba lépnek egymással. A szimuláció valós idejű és interaktív, lehetővé téve a felhasználók számára, hogy új növényeket és állatokat adjanak hozzá.

## 3. Rendszerarchitektúra
Az alkalmazás három fő rétegre osztható:
- **Felhasználói felület (UI) réteg**
- **Logikai (business) réteg**
- **Adatkezelési réteg**

### 3.1. Felhasználói felület (UI) réteg
Ez a réteg felelős a felhasználói interakciók kezeléséért és az adatok vizuális megjelenítéséért. A következő főbb komponensekből áll:
- **HTML5 és CSS3**: A statikus elemek és a stílus meghatározására.
- **JavaScript**: Az interaktív elemek és a szimulációs logika megvalósítására.
- **Canvas API**: A szimuláció grafikus megjelenítéséhez.

### 3.2. Logikai (business) réteg
Ez a réteg tartalmazza az alkalmazás működési logikáját, beleértve az állatok mozgását és az interakciók kezelését. A következő főbb modulokat tartalmazza:
- **Mozgásvezérlő**: Az állatok véletlenszerű mozgásának irányítása.
- **Interakciókezelő**: Az állatok és növények közötti interakciók kezelése (pl. elfogyasztás, szaporodás).
- **Eseménykezelő**: A felhasználói interakciók, például a gombnyomások kezelése.

### 3.3. Adatkezelési réteg
Ez a réteg felelős az adatok kezeléséért és tárolásáért. Mivel a szimulációs program alapvetően kliensoldali alkalmazás, nincs szükség szerveroldali adatkezelésre. Az adatokat JavaScript objektumok és tömbök segítségével tároljuk.

## 4. Komponensdiagramok
### 4.1. Felhasználói felület komponensdiagram
```
+------------------------+
|    Felhasználói felület (UI)    |
+------------------------+
| - HTML5               |
| - CSS3                |
| - JavaScript          |
| - Canvas API          |
+------------------------+
```

### 4.2. Logikai réteg komponensdiagram
```
+------------------------+
|         Logikai réteg         |
+------------------------+
| - Mozgásvezérlő       |
| - Interakciókezelő    |
| - Eseménykezelő       |
+------------------------+
```

### 4.3. Adatkezelési réteg komponensdiagram
```
+------------------------+
|       Adatkezelési réteg       |
+------------------------+
| - JavaScript objektumok |
| - JavaScript tömbök     |
+------------------------+
```

## 5. Adatbázis tervezés
Az alkalmazás kliensoldali, ezért nincs szükség hagyományos adatbázisra. Az adatok JavaScript objektumokban és tömbökben kerülnek tárolásra. Példa a használt adatszerkezetekre:

### 5.1. Növény adatszerkezet
```javascript
let plant = {
  id: 1,
  x: 100,
  y: 150
};
```

### 5.2. Növényevő adatszerkezet
```javascript
let herbivore = {
  id: 1,
  x: 200,
  y: 250,
  energy: 100
};
```

### 5.3. Ragadozó adatszerkezet
```javascript
let predator = {
  id: 1,
  x: 300,
  y: 350,
  energy: 100
};
```

## 6. Telepítési terv
### 6.1. Szükséges eszközök és szoftverek
- Böngésző (Google Chrome, Firefox, stb.)
- Szövegszerkesztő vagy fejlesztői környezet (pl. Visual Studio Code)
- Verziókövető rendszer (Git)

### 6.2. Telepítési lépések
1. **Kód letöltése**: A kód letöltése a verziókövető rendszerből.
2. **Környezet beállítása**: A szükséges eszközök és szoftverek telepítése.
3. **Fájlok elhelyezése**: Az alkalmazás fájljainak elhelyezése a megfelelő könyvtárstruktúrában.
4. **Alkalmazás futtatása**: Az index.html fájl megnyitása a böngészőben.

## 7. Karbantartási terv
### 7.1. Rendszeres frissítések
- A JavaScript és CSS kódok rendszeres frissítése és optimalizálása.
- A böngésző frissítések követése és a kompatibilitás biztosítása.

### 7.2. Hibajavítások
- A felhasználói visszajelzések alapján történő hibajavítások.
- Az interakciók és a mozgás logika rendszeres ellenőrzése és finomítása.

### 7.3. Új funkciók hozzáadása
- Új típusú növények és állatok hozzáadása.
- További interaktív elemek és testreszabási lehetőségek beépítése.

## 8. Biztonsági terv
- Az alkalmazásban nincs érzékeny adatkezelés, de a JavaScript kód védelme érdekében minifikálást és obfuszkációt alkalmazhatunk.
- A felhasználói interakciók és bemenetek ellenőrzése a rosszindulatú tevékenységek elkerülése érdekében.

## 9. Tesztelési terv
### 9.1. Funkcionális tesztelés
- Minden gomb és interaktív elem tesztelése a megfelelő működés biztosítása érdekében.
- Az állatok mozgásának és interakcióinak tesztelése.

### 9.2. Teljesítmény tesztelés
- A szimuláció sebességének és teljesítményének mérése különböző eszközökön és böngészőkben.

### 9.3. Felhasználói élmény tesztelése
- Felhasználói visszajelzések gyűjtése és a felület használhatóságának tesztelése.

Ez a rendszerterv részletesen leírja a JavaScript-alapú szimulációs program architektúráját, az egyes modulok működését, a használt technológiákat, valamint a telepítési és karbantartási folyamatokat.
