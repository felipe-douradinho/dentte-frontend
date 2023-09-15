### Dentte - Frontend
## Informações Preliminares

#### - Todo o código do projeto está no diretório `src/`
#### - O servidor web (`nginx`) utiliza a porta `3000`
#### - Caso utilize Windows, recomendamos o uso do `PowerShell` ou `Git Bash`
#### - As etapas abaixo serão necessárias somente na `primeira execução`
#### - Você precisará ter o `Docker` e o `Docker Compose` instalado (e iniciado)
#### - Ao final deste leia-me, você será capaz de acessar cada dominio `local` da seguinte maneira:

- http://local.app.dentte.com.br:3000


###

## Resumo (quick start)


```shell
cp .env.sample .env
```

```shell
cp src/.env.sample src/.env
```

```shell
docker-compose up -d
```

**_Importante_**: Adicione as entradas em seu arquivo de hosts (**_item 4_** abaixo)

Pronto! As URLs estão no ar conforme as URLs acima. Para mais detalhes, leia o conteúdo completo deste LEIA-ME.


###

## 1 - Projeto

#### Por favor, copie o arquivo `src/.env.sample` para `src/.env`

```shell
cp src/.env.sample src/.env
```

###
#### 2. Defina suas variáveis de ambiente dentro do novo arquivo `src/.env`


###
#### 3. Efetue login no _Gitlab Registry_

Para efetuar login no Gitlab Registry, crie um `Access Token` <a hred="https://gitlab.com/-/profile/personal_access_tokens">clicando aqui</a>. Para isso, em `Select scopes`, marque `read_registry` e `write_registry` e clique em `Create personal access token` e copie o  token gerado.

Em seguida, basta executar o seguinte (substitua `<username>` por seu login no gitlab e o `<token>` por seu token recém criado).

```shell
docker login registry.example.com -u <username> --password <token>
```

###
#### 4. Adicione uma entrada em seu arquivo de hosts para cada FQDN local:

- Windows: `C:\Windows\System32\Drivers\etc\hosts`
- Unix: `/etc/hosts`

```shell
127.0.0.1   local.app.dentte.com.br
```

## 2 - Docker Compose

###### O projeto utiliza _Docker_ e _Docker Compose_ para tentar manter o ambiente de desenvolvimento (entre os devs) e produção iguais.

#### 1. Por favor, copie o arquivo `.env.sample` para `.env` (na raíz deste repositório)

```shell
cp .env.sample .env
```

###
#### 2. Inicialize os containers:

```shell
docker-compose up -d
```

Se tudo correu bem, agora você já pode acessar qualquer um dos domínios locais:

- http://local.app.dentte.com.br:3000


###

### Se no futuro você precisar instalar alguma dependência do _node_, basta escolher o container desejado e executar:

###### Obs: Como todos os containers compartilham a mesma pasta, ao manusear o Node em qualquer container, todos serão igualmente afetados.

- Exemplos:

```shell
docker exec -it dentte_frontend pnpm add NOME_DO_PACOTE
```

## NOTAS:

- Você deve **REINICIAR** todos os seus contêineres sempre que precisar atualizar as variáveis de ambiente em `src/.env` (usando `docker-compose down && docker-compose up -d`)