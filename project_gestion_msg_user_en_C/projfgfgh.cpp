#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<ctype.h>
#include <conio.h>

#define max_users 2000
#define max_username 100
#define max_password 100
#define max_messages  5000
#define max


//donne�s ta3 kol abed 
struct  user{
	char username[max_username];
	char password[max_password];
	
	struct user *next;
	
};

 
//ili nistha9ou lil msg
struct Message {
	char sender [max_username];
	char receiver[max_username];
	char the_message[max_messages];
	
	struct Message *next;
	
}; 
struct user *users =NULL;
struct messages *messagelist =NULL;

void authentification(){
	FILE* passfile=fopen ("user.dat","wb");
	int choose;
	char username[max_username];
	char password[max_password];
	
	printf("Give me your username:");
	scanf("%s",&username);
	
	printf("Give me your password:");
	scanf("%s",&password);
	
	struct u *modifyaccount;
	struct user *currentuser =users;
	while(currentuser !=NULL){
		printf("fct");
		if(strcmp(currentuser -> username,username)==0 && strcmp(currentuser->password,password)){
			printf("Successful Authentication. \n");
			do{
				printf("Choose an option: \n");
				printf("1- Edit your account: \n");
				printf("2- send messages: \n");
				printf("3- View your inbox: \n");
				printf("4- Delete your account: \n");
				printf("5- Logout: \n");
				scanf("%d",&choose);
			} while(true);
				
				
					switch (choose){
			case 1:
				//modifyaccount();
				printf("modif : ");
				break;
			case 2:
				//Sendmessages();
				printf("message : ");
				break;
			case 3:
				//Readmessages();
				printf("lecture message : ");
				break;}}}}
		/*	case 4;
				Deleteaccount();
			case 5;	
				return 0;
				
			default:
				printf("This choice doesn't exist.\n'")	;
		}
		while (true);		
			}
			currentuser = currentuser->next;
		}
		printf("Failed Authentification : Invalid password or username");
		
	}
	while (true);		
			}
			currentuser = currentuser->next;
		}
		printf("Failed Authentification : Invalid password or username");
	}*/
	
void create_your_account(){
	
	char username[max_username];
	char password[max_password];
	struct user *currentuser = users ;
	
	user *newuser = (user *)malloc(sizeof(user));
	//user *newuser = malloc(sizeof(user));
	printf("Give me your username: \n ");
	scanf("%s",newuser->username);
	printf("Give me your password: \n");
		scanf("%s",newuser->password);
	if (newuser->username ==NULL){
		printf(" Failed Allocation. \n ");
		return ;
	}
	
	
	while (newuser->username != NULL){
		if (strcmp(newuser->username , newuser->password)==0){
			printf("This username already used . \n Please choose another username. \n");
		//	free(username);
				printf("uuu. \n");
			return;
		}
		currentuser= currentuser->next;
	}
	/*do{
		printf("Give me your password: ");
		scanf("%s",password);
		
	}while(true);*/
	strcpy(newuser->username,username);
	strcpy(newuser->password,password);
	
		
	
	//saveusers();
    printf("Account Created successfully. \n");
}

/*void readmessages(){
	struct message *current =messagelist;
	int nbrmessages =0;
	printf("Messages for this user:    \n",);
	
	
}*/

void savemessages(){
	int num_messages;
	FILE *file= fopen("Messages.dat","wb");
	if(file==NULL){
		printf("c'ant open this file. \n");
		return ;
	}
//	fwrite(messages,sizeof(message),num_messages,file);
	fclose(file);
}


void saveusers(){
	FILE *file =fopen("users.dat","wb");
	if (file==NULL){
		printf("C'ant open this file. \n");
		return;
	}
	struct user *current = users;
	while(current != NULL){
		fwrite(current,sizeof(struct user),1,file);
		current =current->next;
	}
	fclose(file);
}


void loadusers(){
	FILE *file =fopen ("users.dat","rb");
	struct user *currentuser = users ;
	char tempuser;
	user *newuser = (user *)malloc(sizeof(user));
	if(file ==NULL){
		printf("this data doesn't exist. \n");
		return;
	}
//	struct user *tempuser=(struct user*)malloc(sizeof(struct user));
	
		
		if(newuser ==NULL){
			printf("Failed Allocation For This User. \n");
			fclose(file);
			return;
		}
		while(fread(&tempuser,sizeof(struct user),1,file)){
	}
	//free(tempuser);
	fclose(file);
}

/*void findUser(user *userList, char *username) {
    
    struct user *currentuser = users;
  //  struct user *current = userList;
    while (currentuser != NULL) {
        if (strcmp(current->username, username) == 0) {
            return current;
        }
        current = current->next;
    }
    return NULL;
}
*/
/*void modifyaccount(User *userList, char *username) {
    struct *user = findUser(userList, username);
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
}*/
	
	
	



int main() {
/*	loadMessages();*/
	//loadusers();
	int choose; 
//	printf("%c", getch());
   // return 0;
	
//il menu il mnadhim ili talbitou	
	do{
		printf("Menu: \n");
		printf("1- Log in: \n");
		printf("2- Create a new account: \n");
		printf("3- Rerset password: \n");
		printf("4- Exit: \n");
		printf("choix: \n");
		scanf("%d",&choose);
	
	
		
		switch (choose){
			case 1:
			
				printf("auth \n");
				authentification();
				break;
			case 2:
			
				printf("creation compte \n");
				create_your_account();
				break;
			case 3:
				
				printf("reset pwd \n");
			//	resetyourpassword();
				break;
			case 4:
				printf("Bye! \n");
				return 0;
				
			default:
				printf("This choice doesn't exist.\n'")	;
		}
		
		
		
	}while(true);
	
		
//return 0;

}

