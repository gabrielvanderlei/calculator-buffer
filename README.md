# Chat simples com Sockets
## Exemplo de uso
Instale as dependências

```bash
npm i
```

Inicie o servidor

```bash
node server.js
```

Inicie o cliente

```bash
node client.js
```

No cliente você irá precisar apenas definir um nome de usuário e pode começar a enviar mensagens.

## Comandos suportados
* Message (ou m) - Envia uma mensagem para todos. Exemplo: "m hi"
* Quit now - Sai do chat. Exemplo: "quit now"

## Configurações
No arquivo configuration.js você pode modificar as seguintes variáveis:
* PORT - Porta em que o servidor estara escutando
* HOST - Host do servidor
* DEBUG - Flag de debug, utilizada para verificação de erros ou informações adicionais