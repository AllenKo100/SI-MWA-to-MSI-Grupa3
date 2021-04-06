# SI-MWA-to-MSI-Grupa3

## Uvod

MWA to Main Server Interface je jedan od modula Monitor Servera, te je njegov zadatak da zapisuje podatke koje prima od Monitor Windows Agenta zapisuje u bazu podataka i spašava na server. Sva komunikacija koja se odvija je sigurna, te se koristi https protokol.

## Članovi tima

* [Fahira Ahmetspahić](https://github.com/fahmetspah1) - Vođa tima
* [Džumhur Paša](https://github.com/PasaDzumhur)
* [Handžić Rijad](https://github.com/rhandzic1)
* [Kovačević Allen](https://github.com/AllenKo100)
* [Kadrić Taida](https://github.com/taidakadric)
* [Tomas Robert](https://github.com/rtomas1)
* [Begović Hamza](https://github.com/hbegovic1)
* [Lipović Amra](https://github.com/alipovic1)
* [Hamidić Kenan](https://github.com/khamidic)

## Uputstva za rad

Sve osobe koje rade na ovom modulu moraju pratiti sljedeće korake prilikom rada na novim itemima:

1. Prilikom rada na novim funkcionalnostima, potrebno je napraviti novi branch, te se na tom branchu isključivo radi razvoj.
2. Nakon što je završen razvoj određenog itema, radite pull request
3. Potrebno je kreirati novi Issue za item koji se trenutno radi, te ga povezujete sa pull requestom.
4. Na kraju se pregleda pull request, te se vrši approve ili reject pull requesta.

## API dokumentacija

Sve rute koje postoje možete pronaći na sljedećoj dokumentaciji: https://si-2021.167.99.244.168.nip.io:3000/api-docs/

## User stories

### Sprint 1
* Kao korisnik monitor aplikacije želim da komunikacija sa serverom bude sigurna zbog ogromne količine podataka koje će primati.
* Kao korisnik monitor aplikacije želim da postoje web servisi koji će primati informacije o aktivnim uređajima zbog praćenja podataka.
* Kao korisnik monitor aplikacije želim da se sve informacije o aktivnim uređajima spremaju kao novi rekordi da bi se mogla pratiti aktivnost željenog uređaja.

### Sprint 2
* Kao korisnik monitor aplikacije želim da se sve greške uređaja spremaju na bazu zbog praćenja protoka podataka.
* Kao korisnik monitor aplikacije želim da se greške sortiraju po nivou ozbiljnosti greške zbog lakšeg pregleda.

### Sprint 3
* Kao korisnik monitor aplikacije želim da se greške prilikom pada aplikacije spremaju u bazu zbog praćenja aplikacije.
* Kao korisnik monitor aplikacije želim da se konfiguracijska datoteka sprema na bazu prije slanja agentu zbog pregleda konfiguracijskih datoteka od svih uređaja.

## Definition of Done

Da bi se određeni user story smatrao završenim, potrebno je da su zadovoljeni sljedeći uslovi:

* Kod napisan
* Kod pregledan od strane kolege
* Ispunjava kriterije prihvatljivosti
* Ispunjava funkcionalne zahtjeve
* Ispunjava nefunkcionalne zahtjeve
* Ispunjava standarde UI/UX
* Urađen je merge na GIT
