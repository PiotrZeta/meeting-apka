# Meeting App – Dokumentacja i Instrukcja Użytkowania

**Opis ogólny:**
Meeting App to prosta aplikacja stworzona w React + TypeScript z wykorzystaniem Vite oraz Material-UI. Umożliwia rejestrację/logowanie (backend: json-server-auth) i zarządzanie spotkaniami (lista, tworzenie, edycja, usuwanie). Zastosowano również react-calendar do wyboru daty w formularzu.

---

## 2. Struktura Repozytorium

/
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ db.json
├─ README.md
└─ src/
├─ main.tsx
├─ routes/
│ ├─ AppRoutes.tsx
│ └─ RequireAuth.tsx
├─ contexts/
│ └─ AuthContext.tsx
├─ components/
│ └─ Layout.tsx
├─ api/
│ └─ meetings.ts
├─ pages/
│ ├─ LoginPage.tsx
│ ├─ Dashboard.tsx
│ ├─ MeetingList.tsx
│ └─ MeetingForm.tsx
└─ styles/ (opcjonalne: globalne CSS / motywy)

yaml
Kopiuj
Edytuj

---

## 3. Wymagania

1. **Node.js** ≥ 16.x  
2. **npm** ≥ 8.x  

---

## 4. Instalacja i Uruchomienie

1. **Sklonuj lub wypakuj** repozytorium do dowolnego folderu.  
2. Otwórz terminal w katalogu głównym projektu (tam, gdzie leży `package.json`).  
3. Wykonaj komendę:
   ```bash
   npm install