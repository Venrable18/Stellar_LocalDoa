#  Stellar LocalDAO

LocalDAO is a neighborhood investment and governance platform built on the Stellar network using Soroban smart contracts (Rust), enabling on-chain proposals, voting, and treasury coordination.

---

## 🧱 Structure

```
stellar-localdao/
├── frontend/      # React + Vite user interface
├── contract/      # Soroban smart contracts (Rust)
├── backend/       # Optional Node.js API layer
├── WHITEPAPER.md  # Canonical whitepaper
└── README.md
```

---

## 📄 Whitepaper

* Repo copy: `WHITEPAPER.md`
* App-readable page: `/whitepaper.html` (served from `frontend/public/whitepaper.html`)

---

## ⚙️ Tech Stack

* **Frontend:** React + Vite
* **Smart Contracts:** Rust (Soroban SDK)
* **Backend (optional):** Node.js + Express
* **Blockchain:** Stellar

---

## ▶️ Run Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🏗️ Build Frontend

```bash
cd frontend
npm run build
```

---

## 🦀 Run Contracts

```bash
cd contract
cargo build
cargo test
```

---

## 🔄 Application Flow

```mermaid
flowchart TB
    subgraph Factory["LocalDAOFactory (Soroban)"]
        IMPL["DAO Implementation"]
        CREATE["create_dao()"]
        REGISTRY["DAO Registry & Metadata"]
        IMPL --> CREATE
        CREATE --> REGISTRY
    end

    subgraph DAOs["Location DAOs (Instances)"]
        D1["DAO A"]
        D2["DAO B"]
        D3["..."]
    end

    subgraph Roles["Roles"]
        C["Creator"]
        A["Admins"]
        F["Finance Managers"]
        M["Verified Members"]
        C --> A
        C --> F
        A --> M
    end

    subgraph Investments["Investment Lifecycle"]
        I1["Create Proposal"]
        I2["Vote"]
        I3["Activate or Incomplete"]
        I4["Deposit Yield"]
        I5["Claim Yield"]
        I6["Close / Sweep"]
        I1 --> I2 --> I3 --> I4 --> I5 --> I6
    end

    Factory --> DAOs
    DAOs --> Roles
    DAOs --> Investments
```

---

## 🧠 Investment Lifecycle (State Machine)

```mermaid
stateDiagram-v2
    [*] --> PENDING: create_investment()

    PENDING --> ACTIVE: activate_investment()
    PENDING --> INCOMPLETE: mark_incomplete()

    INCOMPLETE --> [*]: withdraw_stake()

    ACTIVE --> ACTIVE: deposit_yield()
    ACTIVE --> ENDED: close_investment()

    ENDED --> [*]: sweep_unclaimed()
```

---

## 🔐 Governance Permissions

```mermaid
flowchart LR
    subgraph Who["Who"]
        Creator["Creator"]
        Admin["Admin"]
        Finance["Finance Manager"]
        Member["Member"]
    end

    subgraph CanDo["Can Do"]
        Pause["Pause / Unpause"]
        AddAdmin["Manage Admins"]
        AddFinance["Manage Finance Roles"]
        AddMember["Manage Members"]
        CreateInv["Create Proposals"]
        Activate["Activate / Mark Incomplete"]
        Extend["Extend Deadline"]
        DepositYield["Deposit Yield"]
        CloseInv["Close Investment"]
        Sweep["Sweep Unclaimed"]
        Vote["Vote"]
        Claim["Claim / Withdraw"]
    end

    Creator --> Pause
    Creator --> AddAdmin
    Creator --> AddFinance
    Admin --> AddMember
    Admin --> CreateInv
    Admin --> Activate
    Admin --> CloseInv
    Admin --> Sweep
    Finance --> Extend
    Finance --> DepositYield
    Member --> Vote
    Member --> Claim
```

---

## 🔁 End-to-End Interaction Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant C as Contract
    participant S as Stellar

    U->>F: Trigger action
    F->>C: Submit transaction
    C->>S: Execute logic
    S-->>C: Confirm state
    C-->>F: Return result
    F-->>U: Update UI
```

---

## 🚧 Roadmap

* [ ] Proposal creation & voting
* [ ] Wallet integration
* [ ] Treasury execution
* [ ] Token-based governance
* [ ] DAO factory deployment

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

## 📜 License

MIT
