# 📝 BlogSpace

**BlogSpace** is a full-stack blog application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to register, log in securely, create, edit, delete, and explore blog posts categorized by topics. It also features a responsive design and intuitive search functionality for a seamless blogging experience.
> ⚠️ Note: All the posts you see in the screenshots are from **different users**, but were created by **me (the developer)** for demo/testing purposes to showcase the multi-user functionality of the platform.

---

## 🚀 Features

- 🔐 **User Authentication** – Sign up and login securely using JWT tokens.
- 📝 **Blog Post Management** – Create, edit, and delete blog posts.
- 🏷️ **Categorization** – Posts are organized by categories/tags (e.g., Design, Product, Software Engineering).
- 🔎 **Search Functionality** – Real-time search bar to filter posts.
- 📱 **Responsive Design** – Fully responsive and mobile-friendly interface.
- ⚙️ **Protected Routes** – Users can only edit or delete their own posts.

---

## 🛠️ Tech Stack

| Frontend        | Backend           | Database     | Authentication |
|----------------|-------------------|--------------|----------------|
| React.js        | Node.js           | MongoDB      | JWT            |
| Vite + CSS      | Express.js        | Mongoose     | Bcrypt         |

---

## 📸 Screenshots
### 1. 🔐 Home Page (Not Logged In)
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/0cd08da4-9fa6-41bc-a1ba-c8904a3755b2" />

---

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/11147a80-954e-44bf-8248-16e89c17fa80" />
Landing page view for visitors not logged into the platform.

---

### 2. 🔑 Login Page
<img width="1313" height="739" alt="Image" src="https://github.com/user-attachments/assets/2e1e5abd-2a77-49da-93be-89dcca3a62be" />
Simple and secure sign-in page for existing users.

---

### 3. 🆕 Register Page
<img width="1128" height="864" alt="Image" src="https://github.com/user-attachments/assets/c932d18b-5e41-482b-8a77-97b43a011ce8" />
Sign up by providing your full name, email address, and password.

---

### 4. 🔓 Home Page (Logged In)
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/09f013b2-c9e6-4ea8-8758-391190df8ba6" />
After login, users see extra controls like "My Posts", "Create Post", and Logout.

---

### 5. 🧿 Post Creation
<img width="1920" height="872" alt="Image" src="https://github.com/user-attachments/assets/c408b4ff-fc25-4b84-99fe-6e92206aac0f" />
The create post modal with all required fields and image upload.

---

### 6. 🧾 Blog Post Display Card
<img width="1920" height="869" alt="Image" src="https://github.com/user-attachments/assets/054f6c44-3297-4657-a0c5-0d08fb928a80" />
A responsive blog post card showing title, category, tags, and content preview.

---

### 7. 📄 My Posts Modal View
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/aaceb8f9-bbe9-4113-9d2f-42e3002abd09" />
Logged-in users can view and manage only their own posts from this modal.

---

### 8. 📝 Edit Post Modal
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/ff476076-6be1-493b-a812-1d886e085222" />
Update post title, image, category, tags, and content through a modal editor.

---

### 9. Post Deletion Confirmation Modal
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/ece961a2-ae3e-4302-8990-c24f0354e84d" />
A confirmation popup appears before deleting a post to prevent accidental deletions.

---

### 10. 🔍 Search Functionality
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/f2fac322-bc3f-4c72-bfed-2ffe42deddb4" />
Search and filter blog posts by title using the search bar.

---

### 11. 🗂️ Category Filter: Product
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/120cd2e3-4e17-401d-907c-434bbd134371" />
View posts filtered by category – "Product" is selected in this view.


---
---

## 🧪 How to Run Locally

```bash
1. Clone this repo
git clone https://github.com/Himanshu-n17/BlogSpace-Resources-and-Insights.git
cd BlogSpace-Resources-and-Insights

2. Install frontend dependencies
cd frontend
npm install
npm run dev

3. Install backend dependencies by opening another new terminal
cd backend
npm install
nodemon server.js
