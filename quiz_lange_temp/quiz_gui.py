import json
import tkinter as tk
from tkinter import messagebox

# Questions et réponses stockées dans un fichier texte (questions.json)
quiz_data = {
    "questions": [
        {
            "question": "Qui est le personnage principal de 'Dracula'?",
            "options": ["A) Jonathan Harker", "B) Mina Murray", "C) Count Dracula"],
            "answer": "C"
        },
        {
            "question": "Quel est le pays d'origine de Dracula?",
            "options": ["A) Roumanie", "B) Hongrie", "C) Bulgarie"],
            "answer": "A"
        },
        {
            "question": "Comment Jonathan Harker est-il lié à Dracula?",
            "options": ["A) Ami", "B) Avocat", "C) Journaliste"],
            "answer": "B"
        }
    ]
}

# Sauvegarde du quiz_data dans un fichier JSON
with open('questions.json', 'w') as f:
    json.dump(quiz_data, f)

# Chargement des questions
def load_quiz():
    with open('questions.json', 'r') as f:
        return json.load(f)

# Classe principale pour le quiz
class QuizApp:
    def __init__(self, master):
        self.master = master
        self.master.title("Quiz Dracula")
        self.initialize_quiz()

    def initialize_quiz(self):
        self.questions = load_quiz()['questions']
        self.current_question = 0
        self.score = 0
        self.response_given = False

        self.question_label = tk.Label(self.master, text="", wraplength=400)
        self.question_label.pack(pady=20)

        self.options_var = tk.StringVar()
        self.option_buttons = []
        for i in range(3):
            btn = tk.Radiobutton(self.master, text="", variable=self.options_var, value="")
            btn.pack(anchor='w')
            self.option_buttons.append(btn)

        self.submit_button = tk.Button(self.master, text="Soumettre", command=self.submit_answer)
        self.submit_button.pack(pady=10)

        self.timer_label = tk.Label(self.master, text="")
        self.timer_label.pack(pady=10)

        self.load_question()
        self.start_timer(10)

    def load_question(self):
        if self.current_question < len(self.questions):
            q = self.questions[self.current_question]
            self.question_label.config(text=q['question'])
            for i, option in enumerate(q['options']):
                self.option_buttons[i].config(text=option, value=option[0])
            self.options_var.set("")
            self.response_given = False
            self.timer_label.config(text="Temps restant: 10 secondes")
        else:
            self.show_score()
            self.create_restart_button()

    def submit_answer(self):
        if not self.response_given:
            self.response_given = True
            selected_answer = self.options_var.get()
            correct_answer = self.questions[self.current_question]['answer']

            if selected_answer == correct_answer:
                self.score += 1
                messagebox.showinfo("Résultat", "Correct!")
            else:
                messagebox.showerror("Résultat", f"Incorrect. La bonne réponse est {correct_answer}.")

            self.current_question += 1
            self.load_question()
            self.start_timer(10)

    def start_timer(self, duration):
        self.timer_seconds = duration
        self.update_timer()

    def update_timer(self):
        if self.timer_seconds > 0 and not self.response_given:
            self.timer_label.config(text=f"Temps restant: {self.timer_seconds} secondes")
            self.timer_seconds -= 1
            self.master.after(1000, self.update_timer)
        else:
            if not self.response_given:
                messagebox.showwarning("Temps écoulé", "Vous n'avez pas répondu à temps.")
                self.current_question += 1
                self.load_question()
                self.start_timer(10)

    def show_score(self):
        messagebox.showinfo("Score Total", f"Votre score est: {self.score}/{len(self.questions)}")

    def create_restart_button(self):
        self.restart_button = tk.Button(self.master, text="Rejouer", command=self.restart_quiz)
        self.restart_button.pack(pady=20)

    def restart_quiz(self):
        self.restart_button.destroy()  # Supprime le bouton de rejouer
        self.initialize_quiz()  # Réinitialise le quiz

# Exécution de l'application
if __name__ == "__main__":
    root = tk.Tk()
    quiz_app = QuizApp(root)
    root.mainloop()