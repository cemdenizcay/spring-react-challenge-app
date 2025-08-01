# 🏆 ChallengeApp - Full-Stack Aylık Hedef ve Görev Takip Uygulaması

Bu proje, **Spring Boot (Backend)** ve **React (Frontend)** kullanılarak geliştirilmiş tam kapsamlı (full-stack) bir web uygulamasıdır.  
Kullanıcıların aylık hedefler oluşturmasına, bu hedefleri daha küçük ve yönetilebilir alt görevlere bölmesine ve ilerlemelerini görsel bir ilerleme çubuğu ile takip etmesine olanak tanır.  

Uygulama, modern ve güvenli bir web uygulamasının tüm katmanlarını içermekte olup, kullanıcıların sadece kendi verilerini yönetebildiği çok kullanıcılı bir yapıya sahiptir.

---

## 💻 Ekran Görüntüsü

> <img width="1847" height="873" alt="Screenshot_1" src="https://github.com/user-attachments/assets/51261642-470e-4b11-b7af-6c494efcceb1" />

---

## ✨ Özellikler

### 👤 Kullanıcı Yönetimi
- Güvenli şifreleme (BCrypt) ile kullanıcı kaydı
- JWT (JSON Web Token) tabanlı güvenli kimlik doğrulama
- Kullanıcı oturum yönetimi

### 📅 Challenge Yönetimi
- Giriş yapmış kullanıcıya özel **CRUD** işlemleri: Oluşturma, Listeleme, Güncelleme, Silme
- Kullanıcılar yalnızca kendi challenge verilerine erişebilir (Authorization)

### ✅ Alt Görev Yönetimi
- Challenge'lara alt görevler ekleme/silme
- Alt görevleri tamamlandı olarak işaretleme

### 📊 İlerleme Takibi
- Tamamlanan alt görevlere göre dinamik olarak güncellenen **ilerleme çubuğu**

### 🌐 Modern Arayüz
- **React Router** ile tek sayfa uygulaması (SPA)
- **React Context API** ile global kullanıcı durumu yönetimi
- **Axios Interceptor** ile tüm isteklerde otomatik JWT ekleme

---

## 🛠️ Kullanılan Teknolojiler

### Backend
- Java 17  
- Spring Boot 3  
- Spring Security (JWT Authentication & Authorization)  
- Spring Data JPA & Hibernate  
- PostgreSQL  
- Maven  
- RESTful API  

### Frontend
- React  
- JavaScript (ES6+)  
- React Router  
- React Context API  
- Axios  
- Bootstrap & React-Bootstrap  
- HTML5 & CSS3  

---

## 🚀 Kurulum ve Çalıştırma

### 🔧 Ön Gereksinimler
- Java 17 veya üzeri
- Maven
- Node.js ve npm
- PostgreSQL

---

### ▶️ Backend Kurulumu

1. Projeyi klonlayın ve backend dizinine geçin:
   ```
   git clone [repo-url]
   cd backend
   ```
3. src/main/resources/application.properties dosyasını düzenleyin:
   ```
   spring.datasource.url=jdbc:postgresql://localhost:5432/yourdb
   spring.datasource.username=youruser
   spring.datasource.password=yourpass
   ```
4. ```
   mvn spring-boot:run
   ```
Backend: http://localhost:8080

### ▶️ Frontend Kurulumu
1. Frontend dizinine gidin:
   ```
   cd ../frontend
   ```
2. Bağımlılıkları yükleyin:
   ```
   npm install
   ```
3. Uygulamayı başlatın:
   ```
   npm start
   ```
Frontend: http://localhost:3000

📝 Lisans
Bu proje açık kaynaklıdır ve MIT lisansı ile lisanslanmıştır.
   
