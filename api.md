FORMAT: 1A
HOST: http://localhost:3000

# API VUTTR (Very Useful Tools to Remember)

Um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags.

# Group Tool

## Tools [/tools{?tag}]

### Cadastrar ferramenta [POST]

+ Request Cadastrar uma ferramenta

    + Headers

            Accept: application/json
            Content-Type: application/json
    + Attributes (Tool)


+ Response 200 (application/json)
    + Attributes (ToolDB)

+ Response 400 (application/json)
    + Attributes (Error)

### Listar tools [GET]

+ Parameters
    + tag: planning (string, optional) - Tag a ser pesquisada

+ Response 200 (application/json)
    + Attributes (array[ToolDB])

+ Response 400 (application/json)
    + Attributes (Error)

## Tool [/tools/{toolId}]

+ Parameters
    + toolId: 5c60569be38f350dcad39f86 (string, required) - ID da ferramenta

### Ver ferramenta [GET]

+ Response 200 (application/json)
    + Attributes (ToolDB)

+ Response 400 (application/json)
    + Attributes (Error)


### Excluir ferramenta [DELETE]

+ Response 200 (application/json)

+ Response 400 (application/json)
    + Attributes (Error)



# Data Structures

## Tool (object)
+ title: Notion (string) - Título da ferramenta
+ link: Notion (string) - Link da ferramenta
+ description: All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. (string) - Descrição da ferramenta
+ tags: organization, planning, collaboration, writing, calendar (array) - Lista de tags relacionadas à ferramenta

## ToolDB (Tool)
+ id: `5c60569be38f350dcad39f86` (string) - Id gerado

## Id (object)
+ id: `5c60569be38f350dcad39f86` (string) - Id a ser processado

## Error (object)
+ code: 400 (number) - Código do status da requisição
+ error: Erro ao executar operação. (string) - Mensagem de erro