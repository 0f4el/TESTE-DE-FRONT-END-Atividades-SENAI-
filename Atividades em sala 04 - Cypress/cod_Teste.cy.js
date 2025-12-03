// Define a suíte de testes para a página de login
describe('Validação da Página de Login', () => {

  // Define a URL base para navegação
  const LOGIN_URL = 'http://127.0.0.1:5500/atividades%20-%20Teste%20de%20Front%20End/Atividades%20em%20sala%2004%20-%20Cypress/index.html'

  // Hook que executa antes de cada teste
  beforeEach(() => {
    cy.visit(LOGIN_URL)
  })

  // --- Caso de Teste 1 ---
  it('Deve carregar a página corretamente e verificar elementos visuais e estáticos', () => {

    cy.title().should('eq', 'Login | Nome da Aplicação')
    cy.get('head link[rel="icon"]').should('have.attr', 'href').and('not.be.empty')
    cy.get('.app-logo').should('be.visible')
    cy.get('.app-logo').should('have.attr', 'alt').and('not.be.empty')
    cy.get('h1').should('be.visible').and('contain', 'Entrar')

  })

  // --- Caso de Teste 2 ---
  it('Deve verificar a presença e o estado inicial dos campos do formulário', () => {

    cy.get('#username, #user').as('campoUsuario')
    cy.get('@campoUsuario')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Usuário ou E-mail')
      .and('have.value', '')
      .and('not.be.disabled')

    cy.get('#password').as('campoSenha')
    cy.get('@campoSenha')
      .should('be.visible')
      .and('have.attr', 'type', 'password')
      .and('have.value', '')

    cy.get('button[type="submit"]').as('btnSubmit')
    cy.get('@btnSubmit')
      .should('be.visible')
      .and('contain', 'Login')
      .and('not.be.disabled')

    cy.contains('a', 'esqueceu a senha').as('linkRecuperacao')
    cy.get('@linkRecuperacao')
      .should('be.visible')
      .and('have.attr', 'href')
      .and('not.be.empty')

  })

  // --- Teste do Footer ---
  it('Deve exibir o nome Rafael Eloisio Pereira Gomes no footer', () => {
    cy.get('footer p')
      .should('be.visible')
      .and('contain', 'Rafael Eloisio Pereira Gomes')
  })

})
