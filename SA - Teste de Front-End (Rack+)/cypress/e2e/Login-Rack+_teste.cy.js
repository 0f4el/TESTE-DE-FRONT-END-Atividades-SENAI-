// Define a suíte de testes para a página
describe('Teste E2E da página de Login do Rack+', () => {

  // Define a URL base para navegação
  const URL_login = 'http://127.0.0.1:5500/SA%20-%20Teste%20de%20Front-End%20(Rack+)/login/loginhtml.html'

  // Hook que é executado antes de cada teste (navegar para a página)
  beforeEach(() => {
    cy.visit(URL_login)
  })

// ====== TESTE PÁGINA DE LOGIN ====== //
 // --- Caso de Teste 1: Validação de Conteúdo e Elementos Estáticos ---
  describe('Deve carregar a página de login corretamente e verificar elementos visuais e estáticos', () => {
    
    it('Verificação do Conteúdo do Head', () => {
    
    // Verifica se o título da página está correto
    cy.title().should('eq', 'RACK+ Login')
    
    // Valida a codificação de caracteres
    cy.get('head meta[charset="UTF-8"]').should('exist')
    
    // Verifica a viewport
    cy.get('head meta[name="viewport"]')
      .should('have.attr', 'content')
      .and('include', 'width=device-width')

    // Verifia o Icone de Favicon
    cy.get('head link[rel="icon"]').should('have.attr', 'href').and('not.be.empty')

    // Verifica se o Stylesheet (Bootstrap/CSS) está Linkado
    cy.get('head link[rel="stylesheet"]').should('have.attr', 'href').and('not.be.empty')
    })
      
    it('Verificação do Conteúdo do Body', () => {
      // Logo
      cy.get('.logo-img').should('be.visible')
      cy.get('.logo-img').should('have.attr', 'alt')
      cy.get('.logo-img').should('have.attr', 'src').and('include', 'logo-lateral.png')

      // Título "Entrar"
      cy.get('h1')
        .should('be.visible')
        .and('contain.text', 'Entrar')

      // Campo de email
      cy.get('#email')
        .should('be.visible')
        .and('have.attr', 'type', 'email')
        .and('have.attr', 'required')

      // Label do campo email
      cy.get('label[for="email"]')
        .should('exist')
        .and('be.visible')
        .and('contain.text', 'E-mail')
        .and('have.class', 'form-label')
        .and('have.prop', 'htmlFor', 'email') // Propriedade for do elemento

      // Campo de senha
      cy.get('#password')
        .should('be.visible')
        .and('have.attr', 'type', 'password')
        .and('have.attr', 'required')

      // Label do campo senha
      cy.get('label[for="password"]')
        .should('exist')
        .and('be.visible')
        .and('contain.text', 'Senha')
        .and('have.class', 'form-label')
        .and('have.prop', 'htmlFor', 'password')

      // Botão de mostrar/ocultar senha
      cy.get('#togglePassword')
        .should('be.visible')
        .and('have.attr', 'style', 'cursor: pointer;')
        .and('have.attr', 'onclick')

      // Ícone do olho
      cy.get('#eyeIcon')
        .should('have.class', 'bi-eye-slash')

      // Botão de entrar
      cy.get('.btn-custom').should('be.visible')
      cy.get('.btn-custom').should('contain.text', 'Entrar')
      cy.get('.btn-custom').should('have.attr', 'onclick', 'fazer_login()')
      cy.get('.btn-custom').should('have.css', 'background-color', 'rgb(43, 101, 226)')

      // Links
      cy.contains('Não possui uma conta? Cadastre-se!')
        .should('be.visible')
        .and('have.attr', 'href')

      cy.contains('Esqueceu sua senha?')
        .should('be.visible')
        .and('have.attr', 'href')

      // Verifica se o Script está Linkado
      cy.get('script[src*="loginjs.js"]')
        .should('exist')
        .and('have.attr', 'src')
        .and('include', 'loginjs.js')

    })

    it('Deve ter responsividade correta', () => {
      // Teste em diferentes tamanhos de tela
      cy.viewport('iphone-x')
      cy.get('.logo-img').should('be.visible')

      cy.viewport('ipad-2')
      cy.get('.logo-img').should('be.visible')

      cy.viewport('macbook-15')
      cy.get('.logo-img').should('be.visible')
    })

    it('Deve ter estilos CSS aplicados corretamente', () => {
      // Fundo
      cy.get('body')
        .should('have.css', 'background')
        .and('include', 'teladefundo.png')

      // Card estilizado
      cy.get('.card')
        .should('have.css', 'border-radius', '15px')
        .and('have.css', 'box-shadow')

      // Simula hover
      cy.get('.btn-custom')
        .trigger('mouseenter')
        .trigger('mouseover')

      // Verifica se mudou (pode não funcionar em todos os navegadores)
      cy.get('.btn-custom')
        .should('have.css', 'background-color', 'rgb(43, 101, 226)') // Hover
    })
  })
 // --- Caso de Teste 2: Validação das Interações ---
  describe('Interações do Usuário na Página de Login', ()=> {
    it('Deve alternar visibilidade da senha ao clicar no ícone', () => {
      // Inicialmente como password
      cy.get('#password')
        .should('have.attr', 'type', 'password')
      cy.get('#eyeIcon')
        .should('have.class', 'bi-eye-slash')

      // Clica para mostrar senha
      cy.get('#togglePassword').click()
      cy.get('#password')
        .should('have.attr', 'type', 'text')
      cy.get('#eyeIcon')
        .should('have.class', 'bi-eye')

      // Clica para ocultar senha
      cy.get('#togglePassword').click()
      cy.get('#password')
        .should('have.attr', 'type', 'password')
      cy.get('#eyeIcon')
        .should('have.class', 'bi-eye-slash')
    });
    it('Deve mostrar mensagem de erro ao deixar campos vazios', () => {
      // Testa email vazio
      cy.get('#password').type('senha')
      cy.get('#mensagem')
        .should('exist')
        .and('be.empty')  // Está vazia inicialmente
      cy.get('#btn-login').click()
      cy.get('#mensagem')
        .should('have.text', 'Por favor, preencha todos os campos.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      // Testa senha vazia
      cy.get('#email').type('vazio@teste.com')
      cy.get('#password').clear()
      cy.get('#mensagem')
        .should('exist')
      cy.get('#btn-login').click()
      cy.get('#mensagem')
        .should('have.text', 'Por favor, preencha todos os campos.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    });

    it('Deve aplicar efeito de tremer na mensagem de erro', () => {
      cy.get('#btn-login').click()
      cy.get('#mensagem')
        .should('have.class', 'shake')     
      // Aguarda fim da animação
      cy.wait(500);
      cy.get('#mensagem')
        .should('not.have.class', 'shake')
    });

 // --- Caso de Teste 3: Validação do Fluxo de Login ---
  describe('Fluxo de Login', () => {
    it('Deve fazer login com credenciais corretas', () => {
      // Preenche com credenciais corretas
      cy.get('#email').type('indiano@gmail.com')
      cy.get('#password').type('Indiano*123')
      
      // Clica no botão de entrar
      cy.get('.btn-custom').click()

      // Verifica redirecionamento
      cy.url().should('include', '/homepage/homepagehtml.html')
    });

    it('Deve mostrar erro com credenciais incorretas', () => {
      // Credenciais incorretas
      cy.get('#email').type('errado@email.com')
      cy.get('#password').type('SenhaErrada')
      cy.get('#btn-login').click()

      cy.get('#mensagem')
        .should('exist')
        .and('have.text', 'E-mail ou senha incorretos.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      // Não deve redirecionar
      cy.url().should('not.include', '/homepage/')
    });
  });
  })
})
// ====== FIM DO TESTE DA PÁGINA DE LOGIN ====== //
