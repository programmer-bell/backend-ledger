# **backend-ledger**

**backend-ledger** is a learning-focused backend project built to understand and implement core backend concepts such as authentication, account management, transactions, and ledger-based accounting systems.

The goal of this project is to practice designing scalable backend architecture using modern JavaScript tools and financial system patterns like **immutable ledgers** and **idempotent transactions**.

---

## 📌 **Purpose**

This project is created to:

* Learn and implement backend development concepts
* Understand authentication and authorization flows
* Design account and transaction systems
* Implement ledger-based accounting
* Practice database modeling with relationships
* Work with email integrations using Gmail APIs
* Apply security best practices (hashing, token blacklisting, immutability)

---

## 🛠️ **Technology Stack**

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **bcryptjs** (password hashing)
* **Nodemailer** (Google Gmail APIs integration)
* **JWT** (authentication)

---

## 🏗️ **Project Architecture Overview**

The system follows a **financial ledger-based architecture**.

### 🔄 Core Workflow

1. A **User** registers and authenticates.
2. A **User** can create one or more **Accounts**.
3. Money transfers happen through **Transactions**.
4. Each transaction generates immutable **Ledger entries** (*CREDIT / DEBIT*).
5. Account balance is dynamically calculated from the ledger.
6. Tokens can be invalidated using **Token Blacklisting**.

---

## 📦 **Data Models**

### 1️⃣ **User Model**

Represents system users.

#### Features:

* Unique email validation
* Password hashing using bcrypt (pre-save hook)
* Secure password comparison method
* Optional system user flag
* Automatic timestamps for auditing

#### 🔐 Security:

* Password is never selected by default
* Passwords are hashed before storage

---

### 2️⃣ **Account Model**

Represents a financial account owned by a user.

#### Fields:

* Associated user
* Status (**ACTIVE**, **FROZEN**, **CLOSED**)
* Currency (default: **INR**)

#### ⭐ Key Feature:

`getBalance()` method dynamically calculates account balance using ledger aggregation:

> **Balance = Total CREDIT − Total DEBIT**

#### Index Optimization:

* Indexed on **User + Status** for faster queries

---

### 3️⃣ **Transaction Model**

Represents money transfer between two accounts.

#### Fields:

* fromAccount
* toAccount
* amount
* status (**PENDING**, **COMPLETED**, **FAILED**, **REVERSED**)
* idempotencyKey (prevents duplicate transactions)

#### 🔑 Key Concepts:

* Idempotency protection
* Transaction lifecycle management
* Indexed account references

---

### 4️⃣ **Ledger Model**

Represents immutable accounting entries.

#### Fields:

* account
* amount
* transaction reference
* type (**CREDIT** or **DEBIT**)

### 🛡️ Important Design Principle

**Ledger entries are immutable.**

All update and delete operations are blocked using Mongoose middleware hooks to ensure accounting integrity.

This ensures:

* Auditability
* Data integrity
* Financial correctness

---

### 5️⃣ **Token Blacklist Model**

Used for secure logout and token invalidation.

#### Features:

* Stores blacklisted tokens
* Automatically expires tokens after **3 days** (TTL index)
* Prevents reuse of invalidated JWTs

---

## 🔐 **Security Practices Implemented**

* Password hashing using bcrypt
* Unique email validation
* Idempotency keys for safe transaction retries
* Immutable ledger system
* Token blacklisting with automatic expiration
* Indexed queries for performance optimization

---

## 📊 **Financial System Design**

This project follows a **ledger-based accounting model**, which means:

* Account balances are **not stored directly**
* Balances are derived from ledger entries
* Every transaction creates equal and opposite ledger records
* Ledger records cannot be modified or deleted

This approach mimics real-world banking systems.

---

## 📧 **Email Integration**

The project integrates **Nodemailer with Google Gmail APIs** to:

* Send account-related emails
* Support authentication workflows
* Enable notification systems

---

## 🎯 **Learning Outcomes**

By building this project, you will understand:

* Backend architecture design
* REST API development
* MongoDB schema design
* Aggregation pipelines
* Data consistency techniques
* Authentication and session handling
* Financial system modeling
* Middleware and hooks in Mongoose
* Idempotent API design

---


## 📜 **License**

This project is built for **learning and educational purposes** and all credits goes to **Sheryians Coding School**. 

---

## 💡 **Final Note**

**backend-ledger** is more than just a backend project — it is a practical implementation of real-world financial backend architecture designed to strengthen system design and backend engineering skills.
