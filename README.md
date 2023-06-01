# Webinar - przykładowa aplikacja Django + DRF

## Fronted
### Wymagania

- Node.js 18.x
- npm 9.6.x

### Setup

1. W konsoli wejdź do katalogu z aplikacją frontendową, np: `cd toys-fe`
2. Zainstaluj zależności: `npm install`

### Uruchomienie

W katalogu z aplikacją frontendową: `npm start`

## Backend
### Wymagania

- Python 3.11.x

### Setup

1. Jeżeli nie utworzyliśmy wirtualnego środowiska np. otwierając projekt w PyCharmie
należy je przygotować. W katalogu z aplikacją backendową: `python -m venv ./venv`

2. Aktywacja środowiska `source ./venv/bin/activate`
3. Instalacja zależnosci: `pip install django djangorestframework django-cors-headers`
4. Wykonanie migracji: `python manage.py migrate`
5. Utworzenie użytkownika panelu administracyjnego: `python manage.py createsuperuser`

### Uruchomienie

W katalogu z aplikacją backendową aktywacja środowiska:`source ./venv/bin/activate`
Uruchomienie serwera deweloperskiego: `python manage.py runserver`

