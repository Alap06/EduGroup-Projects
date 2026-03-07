#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

struct Enregistrement {
    char date[50];
    char utilisateur[50];
    char destination[50];
    char message[100];
};

void sauvegarderEnregistrement(struct Enregistrement enregistrement) {
    // Ouvrir le fichier message_send.dat en mode "ab" (ajout binaire)
    FILE* fichier = fopen("message_send.dat", "ab");
    if (fichier == NULL) {
        printf("Erreur lors de l'ouverture du fichier message_send.dat.\n");
        return;
    }

    // Écrire l'enregistrement dans le fichier
    fwrite(&enregistrement, sizeof(struct Enregistrement), 1, fichier);

    fclose(fichier);
}

void Sendmessages() {
    struct Enregistrement enregistrement;
    char email_dest[50];

    // Saisie du message
    printf("Entrez le message : ");
    scanf(" %[^\n]", enregistrement.message); // Lire toute la ligne, y compris les espaces

    // Saisie email destination
    printf("Entrez l'email de destination : ");
    scanf(" %[^\n]", email_dest);
    strcpy(enregistrement.destination, email_dest);

    // Lecture de la première ligne du fichier en_service_log.txt pour obtenir la date et le nom d'utilisateur
    FILE* enServiceLog = fopen("en_service_log.txt", "r");
    if (enServiceLog == NULL) {
        printf("Erreur lors de l'ouverture du fichier en_service_log.txt.\n");
        return;
    }

    fgets(enregistrement.utilisateur, sizeof(enregistrement.utilisateur), enServiceLog);
    strtok(enregistrement.utilisateur, "\n"); // Supprimer le saut de ligne

    fclose(enServiceLog);

    // Obtenir la date et l'heure actuelles
    time_t rawtime;
    struct tm* timeinfo;

    time(&rawtime);
    timeinfo = localtime(&rawtime);
    strftime(enregistrement.date, sizeof(enregistrement.date), "%Y-%m-%d %H:%M:%S", timeinfo);

    sauvegarderEnregistrement(enregistrement);

    printf("Le message a été enregistré avec succès dans le fichier message_send.dat.\n");
}


//menu acca  
void Show_Menu(){
	int choose;		
	printf("\n\n\n\n-------Successful Authentication-----\n");
	
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
			Sendmessages();
			
			break;
		case 3:
			//Readmessages();
			printf("lecture message : ");
			break;
	}
}

int main() {

	Show_Menu();
		
}