# راهنمای Deploy پروژه Aula

## ✅ Build موفق

خطاهای ESLint رفع شدند. حالا پروژه را Deploy کنید:

## 🚀 روش 1: با Git و Vercel (پیشنهادی)

### 1. Push کردن به GitHub

```bash
git init
git add .
git commit -m "Fix ESLint errors - Ready for deploy"

# اگر اولین بار است:
git remote add origin https://github.com/YOUR_USERNAME/aula-browser.git
git push -u origin main

# اگر قبلاً remote داشته‌اید:
git push
```

### 2. Deploy روی Vercel

1. برو به **vercel.com**
2. Sign in با GitHub
3. روی **"Add New Project"** کلیک کن
4. Repository پروژه را انتخاب کن
5. تنظیمات پیش‌فرض را بگذار (بدون تغییر)
6. روی **"Deploy"** کلیک کن

✅ آماده است! بعد از 2 دقیقه سایت شما روی آدرس `https://your-project.vercel.app` خواهد بود

---

## 🌐 روش 2: با Netlify

### 1. Push کردن به GitHub

```bash
git init
git add .
git commit -m "Fix ESLint errors - Ready for deploy"
git remote add origin https://github.com/YOUR_USERNAME/aula-browser.git
git push -u origin main
```

### 2. Deploy روی Netlify

1. برو به **netlify.com**
2. Sign in با GitHub
3. روی **"Add new site"** کلیک کن
4. **"Import an existing project"** را انتخاب کن
5. Repository پروژه را انتخاب کن
6. تنظیمات Build:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
7. روی **"Deploy site"** کلیک کن

✅ آماده است!

---

## 📝 نکات مهم

- پروژه شما **ready to deploy** است
- همه خطاهای ESLint رفع شدند
- API با 3 کلید rotation کار می‌کند
- UI زیبا با glassmorphism آماده است

## 🎉 موفق باشید!

