// Define a suíte de testes para a página
describe('Teste E2E da página Homepage do Rack+', () => {

  // Define a URL base para navegação
  const URL_login = 'http://127.0.0.1:5500/SA%20-%20Teste%20de%20Front-End%20(Rack%2B)/homepage/homepagehtml.html'

  // Hook que é executado antes de cada teste (navegar para a página)
  beforeEach(() => {
    cy.visit(URL_login)
  })
// ====== TESTE PÁGINA HOMEPAGE ====== //
    // --- Caso de Teste 1: Validação de Conteúdo e Elementos Estáticos ---
    describe('Deve carregar a página homepage corretamente e verificar elementos visuais e estáticos', () => {

      it('Verificação do Conteúdo do Head', () => {

      // Verifica se o título da página está correto
      cy.title().should('eq', 'RACK+ Homepage')})
})
