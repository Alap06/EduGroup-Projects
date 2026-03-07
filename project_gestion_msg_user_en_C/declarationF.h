#ifndef USER_MANAGEMENT_H
#define USER_MANAGEMENT_H

#define MAX_USERNAME_LENGTH 500
#define MAX_PASSWORD_LENGTH 50
#define MAX_EMAIL_LENGTH 100
#define MAX_PHONE_LENGTH 15
#define MAX_SUBJECT_LENGTH 1000
#define MAX_MESSAGE_LENGTH 5000

typedef struct User {
    char username[MAX_USERNAME_LENGTH];
    char password[MAX_PASSWORD_LENGTH];
    char email[MAX_EMAIL_LENGTH];
    char phone[MAX_PHONE_LENGTH];
    struct User *next;
} User;
typedef struct Message {
    char subject[MAX_SUBJECT_LENGTH];
    char sender[MAX_USERNAME_LENGTH];
    char recipient[MAX_USERNAME_LENGTH];
    char message[MAX_MESSAGE_LENGTH];
    struct Message *next;
} Message;

User *createUser(char *username, char *password, char *email, char *phone);
void addUser(User **userList, char *username, char *password, char *email, char *phone);
User *findUser(User *userList, char *username);
void modifyAccount(User *userList, char *username);
void deleteAuthenticatedAccount(User **userList, char *username);
int authenticate(User *userList, char *username, char *password);
void sendMessage(User *userList, Message **messageList, char *sender, char *recipient);
void addMessage(Message **messageList, char *subject, char *sender, char *recipient, char *message);
void viewInbox(Message *messageList, char *username);
void deleteInbox(Message **messageList, char *username);
#endif 
