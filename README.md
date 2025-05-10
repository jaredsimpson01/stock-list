# 📈 Grandslam Stocks

Grandslam Stocks is a minimal, dark-themed React app that allows users to view real-time stock prices, save favorites, and manage a local portfolio. Built with Vite, React, and Alpha Vantage API for live financial data.

## 🚀 Features

- 🔍 View a live list of stocks (with fallback demo data if API is unavailable)
- ❤️ Save and unsave favorite stocks
- 💸 Buy stocks and track your portfolio
- 💰 Sell stocks from your portfolio
- 🔁 Seamless page transitions and modals
- ⚠️ Gracefully falls back to demo data when API limits are exceeded

## 🛠️ Tech Stack

- React
- Vite
- Alpha Vantage API
- Framer Motion (for animations)
- React Toastify (for notifications)

## 📦 Installation & Setup

```bash
git clone https://github.com/jaredsimpson01/stock-list.git
cd stock-list
npm install
```

## 🔑 API Integration (Alpha Vantage)

This project uses the **Alpha Vantage** API to fetch live stock prices. If you do not input an API key, a default stock list will be used.

### 📍 Step-by-Step to Enable:

1. Go to [https://www.alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key)
2. Sign up and copy your free API key.
3. In the project root, create a `.env` file and add the key:

```env
VITE_API_KEY=your_api_key_here
```

4. Start the development server

```bash
npm run dev
```

✅ The app will now fetch real-time prices from Alpha Vantage.
✅ If the API key is missing or the rate limit is exceeded, it will fallback to demo data.

---

## 🧱 Project Structure

```bash
📦 stock-list/
├── 📁 public/
├── 📁 src/
│ ├── components/
│ ├── contexts/
│ ├── pages/
│ ├── css/
│ └── App.jsx
├── .env # (DO NOT COMMIT THIS!)
├── .gitignore
├── package.json
├── vite.config.js
```

## ⚙️ Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start the dev server     |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

---

## ⚠️ Notes

- The free tier of Alpha Vantage has limits: **5 API calls/minute and 500/day**
- If the API limit is exceeded or the key is missing, the app falls back to offline demo stocks
- Make sure `.env` is excluded in `.gitignore` (✅ already handled)

---

## 🧠 Future Enhancements

- 📈 Add line charts per stock
- 🔐 Add user authentication with Firebase/Auth0
- 🌐 Store user portfolio remotely

---

## 📄 License

MIT © [Your Name or GitHub Username]
