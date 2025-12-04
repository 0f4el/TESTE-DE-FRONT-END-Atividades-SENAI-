# RACK+

## Visão Geral

O **RACK+** é um sistema web de monitoramento de salas de servidores. A aplicação oferece uma interface responsiva e intuitiva para visualização do status de múltiplas salas de servidores, com navegação adaptada para desktop e dispositivos móveis.

## Requisitos

- Node.js
- Navegador web moderno
- Visual Studio Code (recomendado) ou outro editor

## Funcionalidades

### Layout Responsivo
- **Desktop (≥768px)**: Barra lateral com ícones de navegação
- **Mobile (<768px)**: Menu lateral com offcanvas navigation
- **Grid Adaptativo**: Cards se reorganizam automaticamente (3 colunas desktop / 2 colunas mobile)

### Componentes Principais
1. **Barra Lateral Desktop**
   - Logotipo
   - Ícones: Pesquisar, Dashboard, Logs, Configurações, Pokémon
   - Design fixo à esquerda

2. **Cards de Monitoramento**
   - 6 salas monitoradas (1304-1309)
   - Indicadores visuais de status:
     - Vermelho: Status Danger (Há algo de errado, desde algum device desconectado ou fora de lugar)
     - Verde: Status Sucess (Tudo está dentro dos conformes)
   - Imagens representativas com overlay informativo

3. **Menu Mobile**
   - Offcanvas navigation
   - Campo de pesquisa integrado

## Passo 1: Preparação
1. Verificar se o Node.js está instalado:  
node --version
- Deve mostrar: v14.x.x ou superior
- Se não tiver, instale:  
Windows: https://nodejs.org/
Mac: brew install node
Linux: sudo apt install nodejs
2. Abra o cmd em uma Pasta de Referencia
- Use o seguinte comando para clonar o git: git clone https://github.com/seu-usuario/SA-Teste-Front-End-Rack-.git
3. Na pasta do projeto (cmd), execute:
npm init -y
4. Instalar Cypress (cmd)
npm install cypress --save-dev
5. Verificar instalação
- no cmd execute
npx cypress --version
- Deve mostrar algo como: Cypress 13.0.0

### Passo 2: Executar a Aplicação

**Live Server (Recomendada):**
1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `loginhtml.html`
3. Selecione "Open with Live Server"
4. Assim vai abrir a Página em um Server

### Passo 3: Executar os Testes

1. Abra o cmd novamente na pasta do Projeto
2. Execute o comando:
npx cypress open
3. Devera abrir a Interface do Cypress
4. Escolha o Teste E2E
5. Escolha qual navegador vai executar o Software
6. Dentre os specs escolha qual teste devera roda ( tanto "Homepage-Rack+_teste.cy" , quanto "Login-Rack+_teste.cy")

## TEESTE REALIZADOS  

## CASO DE TESTE 1 > Validação de Conteúdo e Elementos Estáticos  
### Verificação do Conteúdo do Head
- Metadados (charset, viewport, título)
- Recursos externos (Bootstrap, CSS)
- Favicon 

### Verificação do Conteúdo do Body
#### Resposividade Desktop
- Barra lateral visível
- Grid de 3 colunas para cards
- Navegação completa com 6 ícones

#### Responsividade mobile
- Navbar móvel com 3 ícones (Menu, Logo, Usuário)
- Menu offcanvas funcional
- Grid de 2 colunas para cards
- Campo de pesquisa visível

#### Conteúdo Principal
- 6 cards de salas com estrutura completa
- Status correto para cada sala
- Links funcionais com segurança (rel="noopener noreferrer")

## CASO DE TESTE 2 > Teste de Componentes Interativos e suas Funcionalidades
#### Teste se links externos abrem em nova aba com segurança
- Proteção contra links externos
- Validação de atributos `target="_blank"` e `rel="noopener noreferrer"`

#### Testa se o link para página Pokémon funciona
- Acesso à página Pokémon a partir da barra lateral

#### Testa se a barra lateral mobile aparece quando clicado no botão menu
- Menu offcanvas funcional (abre/fecha corretamente)


