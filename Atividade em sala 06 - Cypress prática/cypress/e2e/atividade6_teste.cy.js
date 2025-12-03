// Define a suíte de testes para a página de cadastro
describe('Validação do Formulário de Cadastro de Usuário', () => {

  // Define a URL base para navegação
  const CADASTRO_URL = 'http://127.0.0.1:5500/Atividades/Atividade%20em%20sala%2006%20-%20Cypress%20pr%C3%A1tica/index.html' // Altere para a URL real da sua aplicação

  // Hook que é executado antes de cada teste (navegar para a página)
  beforeEach(() => {
    cy.visit(CADASTRO_URL)
  })

  // --- Caso de Teste 1: Validação de Conteúdo e Elementos Estáticos ---
  it('Deve carregar a página corretamente e verificar elementos visuais e estáticos', () => {
    
    // 1. Verificação do Conteúdo do Head
    
    // Verifica se o título da página está correto
    cy.title().should('eq', 'Formulário de Cadastro Simples')
    
    // Valida a codificação de caracteres
    cy.get('head meta[charset="UTF-8"]').should('exist')
    
    // Verifica a viewport
    cy.get('head meta[name="viewport"]')
      .should('have.attr', 'content')
      .and('include', 'width=device-width')

    // 2. Verificação do Cabeçalho e Título Principal
    cy.get('h2').should('be.visible').and('contain', 'Cadastro de Usuário')

    // 3. Verificação da Estrutura do Container
    
    cy.get('.container').should('be.visible')
    cy.get('.container').should('have.css', 'background-color', 'rgb(255, 255, 255)')
  })

  // --- Caso de Teste 2: Validação de Elementos Interativos (Form) ---
  it('Deve verificar a presença e o estado inicial dos campos do formulário', () => {
    
    // 1. Nome
    cy.get('#nome').as('campoNome')
    cy.get('@campoNome')
      .should('be.visible')
      .and('have.attr', 'type', 'text')
      .and('have.value', '')
      .and('not.be.disabled')

    // Verifica o label
    cy.get('label[for="nome"]')
      .should('be.visible')
      .and('contain', 'Nome:')

    // 2. Email
    cy.get('#email').as('campoEmail')
    cy.get('@campoEmail')
      .should('be.visible')
      .and('have.attr', 'type', 'text')
      .and('have.value', '')
      .and('not.be.disabled')

    cy.get('label[for="email"]')
      .should('be.visible')
      .and('contain', 'Email:')

    // 3. Usuário
    cy.get('#usuario').as('campoUsuario')
    cy.get('@campoUsuario')
      .should('be.visible')
      .and('have.attr', 'type', 'text')
      .and('have.value', '')
      .and('not.be.disabled')

    cy.get('label[for="usuario"]')
      .should('be.visible')
      .and('contain', 'Usuário:')

    // 4. Senha
    cy.get('#senha').as('campoSenha')
    cy.get('@campoSenha')
      .should('be.visible')
      .and('have.attr', 'type', 'password')
      .and('have.attr', 'minlength', '8')
      .and('have.value', '')
      .and('not.be.disabled')

    cy.get('label[for="senha"]')
      .should('be.visible')
      .and('contain', 'Senha (mín. 8 dígitos):')

    // 5. Confirmar Senha
    cy.get('#confirmaSenha').as('campoConfirmaSenha')
    cy.get('@campoConfirmaSenha')
      .should('be.visible')
      .and('have.attr', 'type', 'password')
      .and('have.value', '')
      .and('not.be.disabled')

    cy.get('label[for="confirmaSenha"]')
      .should('be.visible')
      .and('contain', 'Confirmar Senha:')

    // 6. Botão de Cadastro
    cy.get('#btnCadastrar').as('btnCadastrar')
    cy.get('@btnCadastrar')
      .should('be.visible')
      .and('have.attr', 'type', 'submit')
      .and('contain', 'Cadastrar')
      .and('not.be.disabled')

    // 7. Área de Mensagem (deve estar oculta inicialmente)
    cy.get('#mensagem')
      .should('exist')
      .and('have.css', 'display', 'none')
  })

  // --- Caso de Teste 3: Validação de Style e Aparência ---
  it('Deve verificar os estilos visuais e a aparência dos elementos', () => {
    
    // Verifica Style do container
    cy.get('.container')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)')
      .and('have.css', 'border-radius', '8px')
      .and('have.css', 'box-shadow') // Verifica se tem sombra

    // Verifica style do botão
    cy.get('#btnCadastrar')
      .should('have.css', 'background-color', 'rgb(0, 123, 255)')
      .and('have.css', 'color', 'rgb(255, 255, 255)')
      .and('have.css', 'border-radius', '4px')

    // Verifica style dos campos de input
    cy.get('input[type="text"]').first()
      .should('have.css', 'border-radius', '4px')
      .and('have.css', 'border')

    // Verifica se todos os form-groups estão presentes
    cy.get('.form-group').should('have.length', 5)
  })

  // --- Caso de Teste 4: Validação de Funcionalidades - Cenários de Sucesso ---
  it('Deve permitir o cadastro com dados válidos', () => {
    
    cy.get('#nome').type('Everson')
    cy.get('#email').type('everson.galo@email.com')
    cy.get('#usuario').type('eversonGol')
    cy.get('#senha').type('senha12345')
    cy.get('#confirmaSenha').type('senha12345')

    cy.get('#btnCadastrar').click()

    // Verifica mensagem de sucesso
    cy.get('#mensagem')
      .should('be.visible')
      .and('have.class', 'sucesso')
      .and('contain', 'Cadastro realizado com sucesso!')

    // Verifica style da mensagem de sucesso
    cy.get('#mensagem.sucesso')
      .should('have.css', 'background-color', 'rgb(212, 237, 218)')
      .and('have.css', 'color', 'rgb(21, 87, 36)')
  })

  // --- Caso de Teste 5: Validação de Validações - Campos Obrigatórios ---
  it('Deve mostrar erro quando campos obrigatórios estão vazios', () => {
    
    cy.get('#btnCadastrar').click()

    // Verifica mensagem de erro
    cy.get('#mensagem')
      .should('be.visible')
      .and('have.class', 'erro')
      .and('contain', 'Erro: Por favor, preencha todos os campos.')

    // Verifica style da mensagem de erro
    cy.get('#mensagem.erro')
      .should('have.css', 'background-color', 'rgb(248, 215, 218)')
      .and('have.css', 'color', 'rgb(114, 28, 36)')
  })

  // --- Caso de Teste 6: Validação de Email Inválido ---
  it('Deve mostrar erro para email com formato inválido', () => {
    
    // Preenche formulário com email inválido
    cy.get('#nome').type('Biel')
    cy.get('#email').type('email-invalido')
    cy.get('#usuario').type('BielLixo')
    cy.get('#senha').type('senha12345')
    cy.get('#confirmaSenha').type('senha12345')

    cy.get('#btnCadastrar').click()

    cy.get('#mensagem')
      .should('be.visible')
      .and('have.class', 'erro')
      .and('contain', 'Erro: Por favor, insira um endereço de e-mail válido.')
  })

  // --- Caso de Teste 7: Validação de Tamanho Mínimo da Senha ---
  it('Deve mostrar erro para senha com menos de 8 caracteres', () => {
    
    // Preenche formulário com senha curta
    cy.get('#nome').type('Hulk Paraiba')
    cy.get('#email').type('hulk@galo.com')
    cy.get('#usuario').type('HUlk777')
    cy.get('#senha').type('1234567')
    cy.get('#confirmaSenha').type('1234567')

    cy.get('#btnCadastrar').click()

    cy.get('#mensagem')
      .should('be.visible')
      .and('have.class', 'erro')
      .and('contain', 'Erro: A senha deve ter pelo menos 8 dígitos.')
  })

  // --- Caso de Teste 8: Validação de Confirmação de Senha ---
  it('Deve mostrar erro quando as senhas não forem iguais', () => {
    
    // Preenche formulário com senhas diferentes
    cy.get('#nome').type('Rafael Eloisio')
    cy.get('#email').type('rafa@email.com')
    cy.get('#usuario').type('fael')
    cy.get('#senha').type('senha12345')
    cy.get('#confirmaSenha').type('senhaDiferente')

    cy.get('#btnCadastrar').click()

    cy.get('#mensagem')
      .should('be.visible')
      .and('have.class', 'erro')
      .and('contain', 'Erro: As senhas não coincidem.')
  })

// --- Caso de Teste 9: Validação de Comportamento de Limpeza ---
it('Deve limpar a mensagem de erro ao começar a corrigir os dados', () => {
    
    cy.get('#btnCadastrar').click()
    
    cy.get('#mensagem')
      .should('be.visible')
      .and('have.class', 'erro')
      .and('contain', 'Erro: Por favor, preencha todos os campos.')

    // Começa a preencher um campo
    cy.get('#nome').type('Teste')
    
    // Verifica que a mensagem não está mais visível
    cy.get('#mensagem').should('not.be.visible')
})

  // --- Caso de Teste 10: Validação de Múltiplos Envios ---
  it('Deve permitir múltiplos envios', () => {
    
    // Primeiro cadastro
    const dados1 = {
      nome: 'Usuario 1',
      email: 'usuario1@example.com',
      usuario: 'user1',
      senha: 'senha12345'
    }

    cy.get('#nome').type(dados1.nome)
    cy.get('#email').type(dados1.email)
    cy.get('#usuario').type(dados1.usuario)
    cy.get('#senha').type(dados1.senha)
    cy.get('#confirmaSenha').type(dados1.senha)

    cy.get('#btnCadastrar').click()
    cy.get('#mensagem.sucesso').should('be.visible')

    // Segundo cadastro
    const dados2 = {
      nome: 'Usuario 2',
      email: 'usuario2@example.com',
      usuario: 'user2',
      senha: 'outrasenha'
    }

    cy.get('#nome').clear().type(dados2.nome)
    cy.get('#email').clear().type(dados2.email)
    cy.get('#usuario').clear().type(dados2.usuario)
    cy.get('#senha').clear().type(dados2.senha)
    cy.get('#confirmaSenha').clear().type(dados2.senha)

    cy.get('#btnCadastrar').click()
    cy.get('#mensagem.sucesso').should('be.visible')
  })
})