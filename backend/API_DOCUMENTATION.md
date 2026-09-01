# TeacherAI API Documentation

## المصادقة (Authentication)

### تسجيل مستخدم جديد
```
POST /api/auth/register

Body:
{
  "fullName": "أحمد محمد",
  "email": "ahmed@example.com",
  "password": "password123"
}
```

### تسجيل الدخول
```
POST /api/auth/login

Body:
{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

## الدروس (Lessons)

### إنشاء درس جديد
```
POST /api/lessons
Authorization: Bearer <token>

Body:
{
  "title": "الدرس الأول - الرياضيات",
  "subject": "الرياضيات",
  "grade": "الأول ابتدائي",
  "duration": 45,
  "objectives": "أهداف التعلم",
  "content": "محتوى الدرس"
}
```

### الحصول على جميع الدروس
```
GET /api/lessons
Authorization: Bearer <token>
```

### الحصول على درس محدد
```
GET /api/lessons/:id
Authorization: Bearer <token>
```
