
# Követelmény specifikáció

## 1. Áttekintés
Ez a dokumentum a JavaScript-alapú szimulációs program követelmény specifikációját tartalmazza. A program célja, hogy vizuális formában szemléltessen egy egyszerű ökológiai szimulációt, amelyben növények, növényevők és ragadozók véletlenszerűen mozognak, interakcióba lépnek egymással és új egyedeket hoznak létre találkozáskor. A felhasználók gombok segítségével további növényeket és állatokat adhatnak hozzá a szimulációhoz.

## 2. A jelenlegi helyzet leírása
A jelenlegi oktatási és szórakoztató programok gyakran statikusak és kevés interaktivitást kínálnak a felhasználóknak. Az ökológiai rendszerek dinamikájának szemléltetése különösen nehéz vizuális és interaktív eszközök nélkül. Jelenleg nincs olyan elérhető alkalmazás, amely egyszerű és intuitív módon, valós idejű szimulációval mutatná be az ökológiai rendszerek működését.

## 3. Vágyálomrendszer
A szimulációs program nem csak egy passzív megfigyelési eszköz, hanem egy interaktív alkalmazás, amely lehetővé teszi a felhasználók számára, hogy aktívan részt vegyenek a szimuláció alakításában. A felhasználók hozzáadhatnak új növényeket, növényevőket és ragadozókat, és figyelhetik, hogyan változnak az ökoszisztémában az interakciók hatására. A cél, hogy a felhasználók szórakoztató és oktató módon ismerhessék meg az ökológiai rendszerek alapvető működését.

## 4. Jelenlegi üzleti folyamatok modellje
Ismeretlen

## 5. Igényelt üzleti folyamatok modellje
### 5.1. Szimuláció indítása és kezelése
Felelős: Felhasználó
Folyamat: A felhasználók elindítják a szimulációt, és figyelik az ökoszisztéma működését. Interaktív gombok segítségével növényeket, növényevőket és ragadozókat adhatnak hozzá.

### 5.2. Növények és állatok kezelése
Felelős: Algoritmusok
Folyamat: Az alkalmazás véletlenszerűen elhelyezi a növényeket és állatokat a képernyőn. Az állatok mozognak, interakcióba lépnek egymással és a növényekkel, és új egyedeket hoznak létre találkozáskor.

### 5.3. Interakciók és szaporodás
Felelős: Algoritmusok
Folyamat: A növényevők megeszik a növényeket, amikor találkoznak velük. A ragadozók megeszik a növényevőket. Két azonos típusú állat találkozásakor új egyed jön létre meghatározott számú találkozás után.

### 5.4. Felhasználói visszajelzések és testreszabás
Felelős: Felhasználó
Folyamat: A felhasználók visszajelzést adhatnak az alkalmazásról, testreszabhatják a szimulációs beállításokat, például a növények és állatok számát, valamint a szaporodási szabályokat.

## 6. Követelménylista

| Id  | Modul        | Név                    | Leírás                                                                                                                               |
| --- | ------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| M1  | Felület      | Comment                | A felhasználók megoszthatják gondolataikat és visszajelzéseiket a szimulációval kapcsolatban.                                        |
| M2  | Szimuláció   | Szimuláció indítása    | A felhasználók elindíthatják a szimulációt, és figyelhetik az ökoszisztéma működését.                                                |
| M3  | Szimuláció   | Növény hozzáadása      | A felhasználók gomb segítségével új növényeket adhatnak hozzá a szimulációhoz.                                                       |
| M4  | Szimuláció   | Növényevő hozzáadása   | A felhasználók gomb segítségével új növényevőket adhatnak hozzá a szimulációhoz.                                                     |
| M5  | Szimuláció   | Ragadozó hozzáadása    | A felhasználók gomb segítségével új ragadozókat adhatnak hozzá a szimulációhoz.                                                      |
| M6  | Algoritmusok | Véletlenszerű mozgás   | Az állatok véletlenszerűen mozognak a képernyőn.                                                                                     |
| M7  | Algoritmusok | Interakciók kezelése   | Az állatok és növények találkozásakor az alkalmazás megfelelően kezeli az interakciókat (pl. növények elfogyasztása, szaporodás).    |
| M8  | Testreszabás | Szimuláció beállításai | A felhasználók testreszabhatják a szimuláció beállításait, például a növények és állatok számát, valamint a szaporodási szabályokat. |

## 7. Fogalomtár
- **Reszponzív felület**: Mobilon, tableten, PC-n igazodik a képernyőhöz a felület mérete, azaz több eszközön is probléma nélkül üzemelhet.
- **Comment**: Rövid írásos kifejezés, amelyet egy személy vagy több személy ír, mond vagy oszt meg egy online vagy offline közegben, hogy kifejezze véleményét, észrevételeit vagy gondolatait egy adott témával, cikkel, poszttal vagy eseménnyel kapcsolatban.
