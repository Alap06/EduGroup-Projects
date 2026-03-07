#include <stdio.h>
#include <stdlib.h>

int main() {
    int c;
    printf("Enter an integer value: ");
    if(scanf("%d", &c) != 1){
        printf("Invalid input. Please enter an integer.\n");
        return 1;
    }
    
    if(c == 0){
        exit(0);
    }else{
        int compile_status = system("gcc -o programme_externe main.c");
        if(compile_status != 0){
            printf("Error: Compilation failed.\n");
            return 1;
        }
        
        int execution_status = system("./programme_externe");
        if(execution_status != 0){
            printf("Error: Execution failed.\n");
            return 1;
        }
    }

    return 0;
}