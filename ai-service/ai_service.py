import os
from openai import OpenAI
from dotenv import load_dotenv
import json

load_dotenv()

class AIService:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self.model = "gpt-4"
        self.language = "ar"  # Arabic

    def generate_exam_questions(self, topic, level, count=5, question_type="multiple"):
        """
        توليد أسئلة اختبارات
        
        Args:
            topic: موضوع الأسئلة
            level: مستوى الصعوبة (سهل، متوسط، صعب)
            count: عدد الأسئلة
            question_type: نوع السؤال (multiple, true_false, essay)
        """
        prompt = f"""
        أنت معلم متخصص في إنشاء أسئلة اختبارات تربوية احترافية.
        
        قم بإنشاء {count} أسئلة حول موضوع: {topic}
        مستوى الصعوبة: {level}
        نوع السؤال: {question_type}
        
        الرجاء تنسيق الإجابة كـ JSON بالصيغة التالية:
        {{
            "questions": [
                {{
                    "id": 1,
                    "question": "السؤال",
                    "type": "{question_type}",
                    "options": ["خيار 1", "خيار 2", "خيار 3", "خيار 4"],
                    "correct_answer": "الإجابة الصحيحة",
                    "explanation": "شرح الإجابة"
                }}
            ]
        }}
        
        أكد على الجودة التربوية والوضوح في الصياغة.
        """
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "أنت معلم متخصص ومبدع في إنشاء محتوى تعليمي احترافي"},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=2000
            )
            
            content = response.choices[0].message.content
            # Try to parse JSON from response
            try:
                return json.loads(content)
            except:
                return {"questions": [], "raw_content": content}
        except Exception as e:
            return {"error": str(e)}

    def generate_lesson_content(self, title, objectives, duration, grade_level=""):
        """
        توليد محتوى درس كامل
        
        Args:
            title: عنوان الدرس
            objectives: أهداف التعلم
            duration: مدة الدرس بالدقائق
            grade_level: المستوى التعليمي
        """
        objectives_str = "\n".join(objectives) if isinstance(objectives, list) else objectives
        
        prompt = f"""
        أنت معلم متخصص وذو خبرة في تطوير محتوى تعليمي.
        
        قم بإنشاء محتوى درس شامل:
        عنوان الدرس: {title}
        المستوى التعليمي: {grade_level}
        المدة: {duration} دقيقة
        
        أهداف التعلم:
        {objectives_str}
        
        الرجاء تقديم الإجابة بصيغة JSON:
        {{
            "title": "عنوان الدرس",
            "overview": "نظرة عامة على الدرس",
            "main_points": ["النقطة الأولى", "النقطة الثانية", ...],
            "introduction": "مقدمة الدرس",
            "body": "محتوى الدرس الرئيسي",
            "conclusion": "خاتمة الدرس",
            "activities": ["نشاط تعليمي 1", "نشاط تعليمي 2"],
            "assessment": "طرق التقييم",
            "resources": ["مورد 1", "مورد 2"],
            "homework": "الواجب المنزلي"
        }}
        
        تأكد من أن المحتوى:
        - منظم وسهل الفهم
        - يتضمن أمثلة عملية
        - يناسب المستوى التعليمي
        - يتضمن أنشطة تفاعلية
        """
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "أنت معلم متخصص وخبير في تطوير المناهج التعليمية"},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=3000
            )
            
            content = response.choices[0].message.content
            try:
                return json.loads(content)
            except:
                return {"content": content}
        except Exception as e:
            return {"error": str(e)}

    def generate_quiz(self, lesson_title, topics, difficulty="متوسط"):
        """
        توليد اختبار قصير
        """
        topics_str = "\n".join(topics) if isinstance(topics, list) else topics
        
        prompt = f"""
        قم بإنشاء اختبار قصير متعدد الخيارات:
        عنوان الدرس: {lesson_title}
        المواضيع: {topics_str}
        مستوى الصعوبة: {difficulty}
        عدد الأسئلة: 5
        
        صيغة JSON:
        {{
            "quiz_title": "عنوان الاختبار",
            "questions": [...]
        }}
        """
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "أنت معلم متخصص في إنشاء اختبارات تربوية"},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=2000
            )
            
            content = response.choices[0].message.content
            try:
                return json.loads(content)
            except:
                return {"quiz": content}
        except Exception as e:
            return {"error": str(e)}

    def chat_with_karobot(self, message, context=""):
        """
        الحوار مع روبوت KaroBot المساعد
        
        Args:
            message: رسالة المستخدم
            context: السياق السابق للحوار
        """
        system_prompt = """
        أنت KaroBot، روبوت مساعد ذكي للمعلمين.
        دورك هو:
        1. مساعدة المعلمين في إعداد الدروس
        2. تقديم نصائح تعليمية
        3. الإجابة على الأسئلة التعليمية
        4. تقديم اقتراحات لتحسين المحتوى التعليمي
        5. توفير أفكار إبداعية للأنشطة الصفية
        
        كن ودوداً وملهماً وساعد المعلم بكفاءة عالية.
        استخدم اللغة العربية الفصحى مع إمكانية استخدام بعض الكلمات العامية المفهومة.
        """
        
        try:
            messages = [{"role": "system", "content": system_prompt}]
            
            if context:
                messages.append({"role": "user", "content": context})
            
            messages.append({"role": "user", "content": message})
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.8,
                max_tokens=1000
            )
            
            return {
                "response": response.choices[0].message.content,
                "usage": {
                    "prompt_tokens": response.usage.prompt_tokens,
                    "completion_tokens": response.usage.completion_tokens,
                    "total_tokens": response.usage.total_tokens
                }
            }
        except Exception as e:
            return {"error": str(e)}

    def generate_teaching_ideas(self, topic, grade_level, duration=45):
        """
        توليد أفكار تعليمية إبداعية
        """
        prompt = f"""
        أنت مرشد تربوي خلاق.
        
        قم بتقديم أفكار تعليمية إبداعية للموضوع:
        الموضوع: {topic}
        المستوى التعليمي: {grade_level}
        المدة: {duration} دقيقة
        
        صيغة JSON:
        {{
            "topic": "{topic}",
            "ideas": [
                {{
                    "title": "عنوان الفكرة",
                    "description": "وصف مفصل",
                    "materials": ["المواد المطلوبة"],
                    "steps": ["الخطوة 1", "الخطوة 2"],
                    "duration": "المدة",
                    "benefits": "الفوائد التعليمية"
                }}
            ]
        }}
        
        قدم 3-5 أفكار مختلفة ومبتكرة.
        """
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "أنت مرشد تربوي مبدع وخبير في الطرق الحديثة للتعليم"},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.9,
                max_tokens=2500
            )
            
            content = response.choices[0].message.content
            try:
                return json.loads(content)
            except:
                return {"ideas": content}
        except Exception as e:
            return {"error": str(e)}
