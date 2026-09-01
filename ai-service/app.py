from flask import Flask, request, jsonify
from ai_service import AIService
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
ai_service = AIService()

# CORS headers
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "OK", "message": "AI Service is running"})

@app.route('/api/ai/generate-exam-questions', methods=['POST'])
def generate_exam_questions():
    try:
        data = request.json
        topic = data.get('topic')
        level = data.get('level', 'متوسط')
        count = data.get('count', 5)
        question_type = data.get('question_type', 'multiple')
        
        if not topic:
            return jsonify({"error": "Topic is required"}), 400
        
        result = ai_service.generate_exam_questions(
            topic=topic,
            level=level,
            count=count,
            question_type=question_type
        )
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/ai/generate-lesson-content', methods=['POST'])
def generate_lesson_content():
    try:
        data = request.json
        title = data.get('title')
        objectives = data.get('objectives', [])
        duration = data.get('duration', 45)
        grade_level = data.get('grade_level', '')
        
        if not title:
            return jsonify({"error": "Title is required"}), 400
        
        result = ai_service.generate_lesson_content(
            title=title,
            objectives=objectives,
            duration=duration,
            grade_level=grade_level
        )
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/ai/generate-quiz', methods=['POST'])
def generate_quiz():
    try:
        data = request.json
        lesson_title = data.get('lesson_title')
        topics = data.get('topics', [])
        difficulty = data.get('difficulty', 'متوسط')
        
        if not lesson_title or not topics:
            return jsonify({"error": "Lesson title and topics are required"}), 400
        
        result = ai_service.generate_quiz(
            lesson_title=lesson_title,
            topics=topics,
            difficulty=difficulty
        )
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/ai/karobot-chat', methods=['POST'])
def karobot_chat():
    try:
        data = request.json
        message = data.get('message')
        context = data.get('context', '')
        
        if not message:
            return jsonify({"error": "Message is required"}), 400
        
        result = ai_service.chat_with_karobot(
            message=message,
            context=context
        )
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/ai/teaching-ideas', methods=['POST'])
def teaching_ideas():
    try:
        data = request.json
        topic = data.get('topic')
        grade_level = data.get('grade_level')
        duration = data.get('duration', 45)
        
        if not topic or not grade_level:
            return jsonify({"error": "Topic and grade_level are required"}), 400
        
        result = ai_service.generate_teaching_ideas(
            topic=topic,
            grade_level=grade_level,
            duration=duration
        )
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('AI_SERVICE_PORT', 5001))
    app.run(debug=True, host='0.0.0.0', port=port)
