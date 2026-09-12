# CODE BLUE — Emergency Health ID

Polished responsive React/Vite prototype implementing the four priority flows plus the remaining requested prototype flows.

## Priority flows
1. Landing → Sign Up → Patient Dashboard
2. Dashboard → Medical Profile → QR
3. Bystander → Emergency ID/QR → Emergency Profile
4. Hospital Login → Hospital Dashboard → Emergency Summary

Also included:
- Access Logs
- Guardian Notification
- Guardian Approval / Deny
- Guardian Dashboard
- Child Profile
- Emergency Card
- Settings
- 404 page

## Run
```bash
npm install
npm run dev
```

## Important project-layout note
This project intentionally contains **one package.json**. If using the existing SIH project, use this package.json for the **inner Vite app** (`SIH/SIH`) and do not create a second nested package.json.

## Demo
Patient:
- Harsh Mishra
- EHID-20260831-0042

Child:
- Aarav Mishra
- EHID-20260831-0099

Hospital:
- City Hospital / Dr. Sharma

No backend is required. Mock state is held in React context and the patient's editable profile is persisted to localStorage.
