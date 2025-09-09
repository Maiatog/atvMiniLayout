// Seleção dos elementos do DOM para as telas da calculadora e os botões
const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

// Definição da classe Calculadora
class Calculator{
    // O constructor inicializa os elementos de texto e a operação atual
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    // Adiciona um dígito à operação atual, verificando se já existe um ponto decimal
    addDigit(digit) {
        //verifica se o dígito é um ponto e se já existe um ponto na tela atual. Se sim, não faz nada.
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        // Atribui o dígito à propriedade da operação atual e atualiza a tela 
        this.currentOperation = digit
        this.updateScreen()
    }

    // Processa a operação da calculadora (soma, subtração, divisão e multiplicação)
    processOperation(operation){

        // Se a tela atual estiver vazia e a operação não for "C", verifica se deve mudar a operação
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            // Se a tela anterior não estiver vazia, altera a operação
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return;
        }

        // Declaração de variável para o valor da operação
        let operationValue
        //Converte o valor da tela anterior para número, removendo o operador final
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        //Converte o valor da tela atual para o número
        const current = +this.currentOperationText.innerText;

        //Estrutura de controle para diferentes tipos de operação
        switch(operation){
            case "+": //Caso seja uma soma
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-"://Caso seja uma subtração
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/"://Caso seja uma divisão
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*"://Caso seja uma multiplicação
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL"://Caso seja a operação de "apagar"
                this.processDelOperator();
                break;
            case "CE"://Caso seja a operação de "limpar entrada"
                this.processClearCurrentOperation();
                break;
            case "C"://Caso seja a operação de "limpar tudo"
                this.processClearOperation();
                break;
            case "="://Caso seja operação de "igual"
                this.processCalcValue();
                break;
            default:
                return;
        }
    }


    //Atualiza o conteúdo da tela da calculadora
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
    ) {

        //Se o valor da operação for nulo, significa que está apenas adicionando um dígito
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else { //Se não for nulo, significa que uma operação foi concluída
            //Se o valor anterior for 0, a operação atual é o resultado
            if(previous ===0) {
                operationValue = current
            }
            //Exibe o resultado da operação na tela de cima e o operador
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            //Limpa a tela de baixo para receber um novo número
            this.currentOperationText.innerText = "";
        }
    }

    //Muda o operador da operação anterior
    changeOperation(operation) {

        //Array com os operadores matemáticos válidos
        const mathOperations = ["*", "/", "+", "-"]
        //Verifica se a operação é válida, se não for, retorna
        if(!mathOperations.includes(operation)) {
            return;
        }

        //Remove o último caractere (operador antigo) e adiciona o novo
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //Processa a operação de apagar o último digito
    processDelOperator() {
        //Remove o último caractere da tela atual
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    //Processa a operação de limpar apenas a entrada atual
    processClearCurrentOperation() {
        //Limpa o conteúdo da tela atual
        this.currentOperationText.innerText = "";
    }

    //Processa a operação de limpar tudo
    processClearOperation() {
        //Limpa ambas as telas
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    //Processa o cálculo final quando o botão de igual é pressionado
    processCalcValue(){
        //pega o operador da operação anterior
        const operation = previousOperationText.innerText.split(" ")[1]

        //Chama o método `processOperation`para realizar o cálculo
        this.processOperation(operation);
    }
}


//Cria uma nova instância da classe Calculator
const calc = new Calculator(previousOperationText, currentOperationText);

//Adiciona um evento de clique a cada botão da calculadora
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        //Obtém o texto interno do botão clicado
        const value = e.target.innerText;

        //Se o valor for um número ou um ponto , adiciona como dígito
        if(+value >= 0 || value === ".") {
            calc.addDigit(value)
        } else { //Caso contrário, processa como uma operação
            calc.processOperation(value);
        }
    });
});