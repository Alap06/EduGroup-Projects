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
struct  utilisateur{
	char username[max_username];
	char password[max_password];
};



int verify_existance(char username[] ,char password[]  ){
	FILE *fptr;
	char line[200];
	
	char file_username[100];
	char file_password[100];
	
	fptr = fopen("users.txt", "r");
	while (fgets(line, 200, fptr) != NULL) {
		
        char * user_token = strtok(line, "#");
		strcpy(file_username, user_token);
		
		user_token = strtok(NULL, "#");
		strcpy(file_password, user_token);

		file_password[strcspn(file_password,"\n") ]=0;

		
	

		/*printf("-------------DEBUGGING------------\n");
		printf("username: %s    usernameFILE: %s  res:%d  \n",username , file_username ,strcmp(username,file_username   ));
		printf("password: %s    passwordFILE: %s  res:%d  \n",password , file_password , strcmp(password,file_password   ) );

		printf("------------------------");*/




		
		if ( strcmp(username,file_username   ) == 0 && strcmp(password,file_password   ) == 0   ){
			fclose(fptr);
			return 1;

		}
		
        
    }
	fclose(fptr);	
	return 0 ;



}




void authentification(){
    struct  utilisateur user ; 

    printf("donner username:");
    scanf("%s", user.username);

    printf("donner password:");
    scanf("%s", user.password);


	if (verify_existance(user.username , user.password  ) ==1  ){
		printf("Seccussuflyy logged in as %s\n", user.username);
		Show_Menu();
		

	}else {
		printf("Invalid Input\n");
		
	}


}

void Add_User(char ch[]){
    FILE *fptr;
	
    fptr = fopen("users.txt", "a+");


    fprintf(fptr,  ch);
	fprintf(fptr,  "\n");

  
    fclose(fptr);
}



int  existance_user(char username[] ) {
	FILE *fptr;
	char line[200];
	
	fptr = fopen("users.txt", "r");
	while (fgets(line, 200, fptr) != NULL) {
        char * user_token = strtok(line, "#");
		if (   strcmp(username,user_token )==0  ){
			return 1;
		}
        
    }
	fclose(fptr);	
	return 0 ;
}



void create_your_account(){
    struct  utilisateur user ; 
    char ch[201] ;
    printf("donner username:");
    scanf("%s", user.username);

    printf("donner password:");
    scanf("%s", user.password);

    strcpy(ch, user.username);
    strcat(ch, "#");
    strcat(ch, user.password);

	if (existance_user(user.username) ==1  ){
		printf("username already exist\n");

	}else {
		Add_User(ch);
		Show_Menu();
		
	}
    

}


void Show_Menu(){
	int choose;		
	printf("-------Successful Authentication-----\n");
	
	printf("Choose an option: \n");
	printf("1- Edit your account: \n");
	printf("2- send messages: \n");
	printf("3- View your inbox: \n");
	printf("4- Delete your account: \n");
	printf("5- Logout: \n");
	printf("choose:");
	scanf("%d",&choose);
				
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
			break;
		}
}
		




int main() {

	int choose; 


	printf("Menu: \n");
	printf("1- Log in: \n");
	printf("2- Create a new account: \n");
	printf("3- Exit: \n");
	



	printf("choix:");
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
			printf("Bye! \n");
			return 0;
			
		default:
			printf("This choice doesn't exist.\n'")	;
			break;
	}	

		
	
	
		
		
	
		
			
	

}

