#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<ctype.h>

typedef struct {
    char* nom;
    char* email;
    char* password;
} CompteUtilisateur;

void verifierEmail(char* email) {
    char* at = strchr(email, '@');
    if (at == NULL) {
        printf("L'email doit contenir le symbole '@'.\n");
        exit(1);
    }
}

void creerCompteUtilisateur() {
    CompteUtilisateur compte;

    // Demande le nom
    printf("Entrez votre nom : ");
    char nom[100];
    scanf("%s", nom);

    // Vérifie que le nom n'est pas vide
    if (strlen(nom) == 0) {
        printf("Le nom ne peut pas être vide.\n");
        exit(1);
    }

    compte.nom = (char*)malloc(strlen(nom) + 1);
    strcpy(compte.nom, nom);

    // Demande l'email
    printf("Entrez votre email : ");
    char email[100];
    scanf("%s", email);

    // Vérifie l'email
    verifierEmail(email);

    compte.email = (char*)malloc(strlen(email) + 1);
    strcpy(compte.email, email);

    // Demande le mot de passe
    printf("Entrez votre mot de passe : ");
    char password[100];
    scanf("%s", password);

    compte.password = (char*)malloc(strlen(password) + 1);
    strcpy(compte.password, password);

    // Ouvre le fichier pour ajout
    FILE* fichier = fopen("compte_user", "a");
    if (fichier == NULL) {
        printf("Erreur lors de l'ouverture du fichier.\n");
        exit(1);
    }

    // Ecrit les informations dans le fichier
    fprintf(fichier, "Nom : %s\n", compte.nom);
    fprintf(fichier, "Email : %s\n", compte.email);
    fprintf(fichier, "Mot de passe : %s\n\n", compte.password);

    // Ferme le fichier
    fclose(fichier);

    // Libère la mémoire
    free(compte.nom);
    free(compte.email);
    free(compte.password);

    printf("Compte utilisateur créé avec succès.\n");
}

void updateEnServiceLog(char* email) {
    // Ouvrir le fichier en_service_log.txt en mode "w" (écriture)
    FILE* enServiceLog = fopen("en_service_log.txt", "w");
    if (enServiceLog == NULL) {
        printf("Erreur lors de l'ouverture du fichier en_service_log.txt.\n");
        return;
    }

    // Écrire la valeur de l'email dans la première ligne
    fprintf(enServiceLog, "%s\n", email);

    fclose(enServiceLog);
}

// Login account
void authentification() {
    // Demande l'email
    printf("Entrez votre email : ");
    char email[100];
    scanf("%s", email);

    // Demande le mot de passe
    printf("Entrez votre mot de passe : ");
    char password[100];
    scanf("%s", password);

    // Ouvre le fichier pour lecture
    FILE* fichier = fopen("compte_user", "r");
    if (fichier == NULL) {
        printf("Erreur lors de l'ouverture du fichier.\n");
        exit(1);
    }

    char ligne[256];
    int compteTrouve = 0;

    // Parcours le fichier ligne par ligne
    while (fgets(ligne, sizeof(ligne), fichier)) {
        // Recherche de la ligne contenant l'email et le mot de passe
        if (strstr(ligne, "Email :") && strstr(ligne, email)) {
            fgets(ligne, sizeof(ligne), fichier); // Récupère la ligne du mot de passe
            if (strstr(ligne, "Mot de passe :") && strstr(ligne, password)) {
                compteTrouve = 1;
                break;
            }
        }
    }

    // Ferme le fichier
    fclose(fichier);

    if (compteTrouve == 1) {
        updateEnServiceLog(email);
        printf("Authentification réussie.\n");
        // Compilation du fichier menu.c
        system("gcc -o menu menu.c");

        // Exécution du fichier menu.c
        system("menu");
    } else {
        printf("Identifiants invalides. Veuillez réessayer.\n");
    }
}

int main() {
    int choose;
    char retour;

    do {
        // Affichage du menu
        printf("\nMenu:\n");
        printf("1- Log in\n");
        printf("2- Create a new account\n");
        printf("3- Exit\n");
        printf("Choix : ");
        scanf("%d", &choose);

        switch (choose) {
            case 1:
                printf("\n--- Connexion ---\n");
                authentification();
                break;
            case 2:
                printf("\n--- Création de compte ---\n");
                creerCompteUtilisateur();
                break;
            case 3:
                printf("Bye!\n");
                return 0;
            default:
                printf("Ce choix n'existe pas.\n");
                break;
        }

        // Demande si l'utilisateur veut retourner au menu
        printf("\nVoulez-vous retourner au menu principal ? (o/n) : ");
        scanf(" %c", &retour); // Notez l'espace avant %c pour consommer les caractères restants (comme \n)

    } while (tolower(retour) == 'o'); // Continue si l'utilisateur entre 'o' ou 'O'

    printf("Bye!\n");
    return 0;
}