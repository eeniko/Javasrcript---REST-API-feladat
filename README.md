# ajax  feladat

1. Feladat

Készítsünk weboldalt, amely segítségével az alábbi linken elérhető API szolgáltatás kezelését tudjuk ellátni:  https://reqres.in/api/users . Az oldalon elérhető szolgáltatások listája, paraméterezése az alábbi dokumentációban érhető el: https://reqres.in/ . A megoldás készítése során használjunk AJAX kéréseket (javasolt a fetch API a használt http metódusok miatt).

2. Feladat

Az oldal indulásakor kérjük le a felhasználók listáját, és jelenítsük meg azt táblázatos formában (jelenjen meg minden adata a felhasználónak, illetve az avatarja). Legyen egy funkciógomb oszlop is, ahonnan tudjuk kezdeményezni a rekordok törlését. Figyeljünk arra, hogy az eredmény több oldalra bontva jelenik meg, így legyen lapozható a listánk. Megoldandó feladat, hogy tudjuk változtatni az egy oldalon megjelenő elemek számát is. Egy-egy felhasználó teljes nevére kattintva a listából jelenjen meg a kiválasztott felhasználó összes adata (egyedi GET kérés alapján) névjegykártya formátumban, kezeljük azt az esetet is, ha már nem létezik a felhasználó. A névjegykártyán legyen két gomb:

Törlés: amely megfelelő paraméterrel meghívja a DELETE metódust, és felugró ablakban tájékoztat a sikeres végrehajtásról. Amennyiben a végrehajtás sikerül töltsük újra a listát.
Frissítés: jelenítsünk meg egy egyszerű űrlapot, ahol a felhasználó tudja szerkeszteni a szerkeszthető adatokat, majd megerősítés után küldjük el a PUT/PATCH kérést. Ha sikerült a frissítés erről előugró ablakban tájékoztassuk a kezelőt, majd töltsük újra a felhasználói listát.
 3. Feladat

Az oldalon legyen lehetőség új felhasználó hozzáadására is, ehhez a táblázat utolsó sora legyen egy megfelelő űrlap (szerkeszthető mezőkkel) és a funkciógombok oszlopában legyen egy mentés gomb, amely beküldi a megfelelő adatokat. Sikeres végrehajtás esetén felugró ablakba írjuk ki a létrehozás idejét és a felhasználó azonosítóját (amiket válaszban kapunk) és töltsük vissza az adatokat. Hiba esetén logoljuk a hibát a konzolra.
