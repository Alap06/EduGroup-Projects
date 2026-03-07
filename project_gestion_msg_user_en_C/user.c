#include "declarationF.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int PasswordValid(char *password) {
    int UC = 0;
    int hd = 0;
    int SC = 0;

    for (int i = 0; password[i] != '\0'; i++) {
        if (isupper(password[i]))
            UC = 1;
        else if (isdigit(password[i]))
            hd = 1;
        else if (!isalnum(password[i]))
            SC = 1;
    }

    return UC && hd && SC;
}
int EmailValid(char *email) {
    int c = 0;
    int t= 0;

    for (int i= 0;email[i]!='\0';i++) {
        if(email[i]=='@'){c++;}
        else if(email[i]=='.'){t++;}
    }
    return (c==1 && t>=1);
}
User *createUser(char *username, char *password, char *email, char *phone) {
    
User *newUser = (User *)malloc(sizeof(User));
    if (newUser == NULL) {
        printf("Erreur lors de l'allocation de mémoire.\n");
        exit(1);
    }
    strcpy(newUser->username, username);
    strcpy(newUser->password, password);
    strcpy(newUser->email, email);
    strcpy(newUser->phone, phone);
    newUser->next = NULL;
    return newUser;
}

void addUser(User **userList, char *username, char *password, char *email, char *phone) {
    User *newUser = createUser(username, password, email, phone);
    if (newUser != NULL) {
        newUser->next = *userList;
        *userList = newUser;
        printf("Compte cree avec succes.\n");
    }
}
User *findUser(User *userList, char *username) {
    User *current = userList;
    while (current != NULL) {
        if (strcmp(current->username, username) == 0) {
            return current;
        }
        current = current->next;
    }
    return NULL;
}
void modifyAccount(User *userList, char *username) {
    User *user = findUser(userList, username);
    if (user != NULL) {
        int choice;
        char newPassword[MAX_PASSWORD_LENGTH];
        char newEmail[MAX_EMAIL_LENGTH];
        char newPhone[MAX_PHONE_LENGTH];

        printf("Que souhaitez-vous modifier ?\n");
        printf("1 - Mot de passe\n");
        printf("2 - Email\n");
        printf("3 - Numero de telephone\n");
        printf("Choix : ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Nouveau mot de passe : ");
                scanf("%s", newPassword);
                strcpy(user->password, newPassword);
                printf("Mot de passe modifie avec succes.\n");
                break;
            case 2:
                printf("Nouvel email : ");
                scanf("%s", newEmail);
                strcpy(user->email, newEmail);
                printf("Email modifie avec succes.\n");
                break;
            case 3:
                printf("Nouveau numéro de telephone : ");
                scanf("%s", newPhone);
                strcpy(user->phone, newPhone);
                printf("Numéro de telephone modifie avec succes.\n");
                break;
            default:
                printf("Choix invalide.\n");
        }
    } else {
        printf("Utilisateur non trouve.\n");
    }
}


void deleteAuthenticatedAccount(User **userList, char *username) {
    User *current = *userList;
    User *prev = NULL;
    while (current != NULL && strcmp(current->username, username) != 0) {
        prev = current;
        current = current->next;
    }
    if (current != NULL) {
        if (prev == NULL) {
            *userList = current->next;
        } else {
            prev->next = current->next;
        }
        free(current);
        printf("Compte supprimé avec succès.\n");
    } else {
        printf("Utilisateur non trouvé.\n");
    }
}

int authenticate(User *userList, char *username, char *password) {
    User *user = findUser(userList, username);
    if (user != NULL && strcmp(user->password, password) == 0) {
        return 1;
    } else {
        return 0;
    }
}
void addMessage(Message **messageList, char *subject, char *sender, char *recipient, char *message) {
    // Allocate memory for the new message
    Message *newMessage = (Message *)malloc(sizeof(Message));
    if (newMessage == NULL) {
        printf("Erreur lors de l'allocation de mémoire pour le message.\n");
        exit(1);
    }

    // Copy the message details
    strcpy(newMessage->subject, subject);
    strcpy(newMessage->sender, sender);
    strcpy(newMessage->recipient, recipient);
    strcpy(newMessage->message, message);
    newMessage->next = NULL;

    // Add the message to the message list
    if (*messageList == NULL) {
        // If the message list is empty, set the new message as the head
        *messageList = newMessage;
    } else {
        // Otherwise, find the last message and append the new message
        Message *current = *messageList;
        while (current->next != NULL) {
            current = current->next;
        }
        current->next = newMessage;
    }
}
// Function to send a message
void sendMessage(User *userList, Message **messageList, char *sender, char *recipient) {
    char subject[MAX_SUBJECT_LENGTH];
    char message[MAX_MESSAGE_LENGTH];

    printf("Sujet du message : ");
    scanf("%s", subject);
    printf("Corps du message : ");
    scanf("%s", message);

    // Check if recipient exists
    User *receiver = findUser(userList, recipient);
    if (receiver == NULL) {
        printf("Destinataire non trouvé.\n");
        return;
    }

    // Add message to recipient's inbox
    addMessage(messageList, subject, sender, recipient, message);
    printf("Message envoyé avec succès à %s.\n", recipient);
}
void viewInbox(Message *messageList, char *username) {
    Message *current = messageList;
    int count = 0;

    printf("Messages dans la boîte de réception de %s :\n", username);
    while (current != NULL) {
        if (strcmp(current->recipient, username) == 0) {
            printf("De : %s\n", current->sender);
            printf("Sujet : %s\n", current->subject);
            printf("Message : %s\n", current->message);
            printf("----------------------------------\n");
            count++;
        }
        current = current->next;
    }

    if (count == 0) {
        printf("La boîte de réception est vide.\n");
    }
}

// Function to delete inbox messages for a user
void deleteInbox(Message **messageList, char *username) {
    Message *current = *messageList;
    Message *prev = NULL;
    while (current != NULL) {
        if (strcmp(current->recipient, username) == 0) {
            if (prev == NULL) {
                *messageList = current->next;
            } else {
                prev->next = current->next;
            }
            free(current);
            current = prev->next; // Move to the next message
        } else {
            prev = current;
            current = current->next;
        }
    }
    printf("Boîte de réception de %s supprimée avec succès.\n", username);
}

int main() {
    User *userList = NULL;
    Message *messageList = NULL; 
    int choice;
    char username[MAX_USERNAME_LENGTH];
    char password[MAX_PASSWORD_LENGTH];
    char email[MAX_EMAIL_LENGTH];
    char phone[MAX_PHONE_LENGTH];

    do {
        printf("\nMenu :\n");
        printf("1 - Creer un compte\n");
        printf("2 - Authentification\n");
        printf("3 - Modifier mon compte\n");
        printf("4 - Supprimer mon compte\n");
        printf("5 - Envoyer un message\n");
        printf("6 - Voir la boite de reception\n"); 
        printf("7 - Supprimer la boite de reception\n"); 
        printf("0 - Quitter\n");
        printf("Choix : ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Nom d'utilisateur : ");
                scanf("%s", username);
                do{
                    printf("Mot de passe : ");
                    scanf("%s", password);
                    if(PasswordValid(password)==0)
                    {
                        printf("Le mot de passe n'est pas valide \n");

                    }
                }while(PasswordValid(password)==0);
                
                do{
                    printf("Email : ");
                    scanf("%s", email);
                    if(EmailValid(email)==0)
                    {
                        printf("L'email n'est pas valide \n");
                    }
                }while(EmailValid(email)==0);
                printf("Numero de telephone : ");
                scanf("%s", phone);
                addUser(&userList, username, password, email, phone);
                break;
            case 2:
                printf("Nom d'utilisateur : ");
                scanf("%s", username);
                printf("Mot de passe : ");
                scanf("%s", password);
                if (authenticate(userList, username, password)) {
                    printf("Authentification reussie.\n");
                } else {
                    printf("Authentification echouée. Veuillez réessayer.\n");
                }
                break;
            case 3:
                printf("Modification de mon compte en cours...\n");
                modifyAccount(userList, username);
                break;
            case 4:
                printf("Suppression de mon compte en cours...\n");
                deleteAuthenticatedAccount(&userList, username);
                break;
            case 5:
                printf("Nom d'utilisateur : ");
                scanf("%s", username);
                char recipient[MAX_USERNAME_LENGTH];
                printf("Destinataire : ");
                scanf("%s", recipient);
                sendMessage(userList, &messageList, username, recipient);
                break;
            case 6:
                printf("Nom d'utilisateur : ");
                scanf("%s", username);
                viewInbox(messageList, username);
                break;
            case 7:
                printf("Nom d'utilisateur : ");
                scanf("%s", username);
                deleteInbox(&messageList, username);
                break;
            case 0:
                printf("Au revoir !\n");
                break;
            default:
                printf("Choix invalide. Veuillez réessayer.\n");
        }
    } while (choice != 0);
    User *tempUser;
    while (userList != NULL) {
        tempUser = userList;
        userList = userList->next;
        free(tempUser);
    }
    Message *tempMessage;
    while (messageList != NULL) {
        tempMessage = messageList;
        messageList = messageList->next;
        free(tempMessage);
    }
return 0;
}
