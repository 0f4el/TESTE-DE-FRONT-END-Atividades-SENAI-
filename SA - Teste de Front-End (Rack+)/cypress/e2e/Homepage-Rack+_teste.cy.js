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
      cy.title().should('eq', 'RACK+ Homepage')
        
    
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
  describe('Verificação do Conteúdo do Body', () => {
    
    it('Responsividade Desktop', () => {
      cy.viewport(1024, 768) // Tamanho desktop
      
      // Logo desktop
      cy.get('#logoMenor').should('be.visible')
        .and('have.attr', 'src')
        .and('include', '.png')
      
      // Barra lateral desktop deve estar visível
      cy.get('.barra-lateral-desktop')
        .should('be.visible')
      
      // Conteúdo principal com margin-left
      cy.get('.conteudo-principal')
        .should('have.css', 'margin-left')
        .and('not.equal', '0px')
      
      // Cabeçalho desktop
      cy.get('.d-none.d-md-flex h1')
        .should('be.visible')
        .and('contain.text', 'Salas')
      
      // Grid 3 colunas em desktop
      cy.get('.col-md-4')
        .should('have.length.at.least', 1)
      
      // Verifica layout de desktop específico
      cy.get('nav.d-md-none').should('not.be.visible')
    })
    
    it('Responsividade Mobile', () => {
      cy.viewport(375, 667) // Tamanho mobile
      
      // Navbar mobile deve estar visível
      cy.get('nav.d-md-none')
        .should('be.visible')
        .and('have.class', 'sticky-top')
      
      // Logo mobile
      cy.get('#logoMenorMobile')
        .should('have.css', 'width')
        .then((width) => {
          // Converte para número e verifica se está próximo de 30
          expect(parseFloat(width)).to.be.closeTo(30, 0.1)
        })
      
      // Botão menu que abre barra lateral
      cy.get('a[data-bs-toggle="offcanvas"]')
        .should('be.visible')
        .within(() => {
          cy.get('img[alt="Menu"]')
            .should('have.attr', 'src', '../pngs/icon-menu.png')
        })
      
      // Barra de busca mobile
      cy.get('.d-md-none form.input-group')
        .should('be.visible')
        .within(() => {
          cy.get('input[type="text"]')
            .should('have.attr', 'placeholder', 'PESQUISAR...')
        })
      
      // Grid 2 colunas em mobile
      cy.get('.col-6')
        .should('have.length.at.least', 1)
      
      // Barra lateral desktop não deve estar visível
      cy.get('.barra-lateral-desktop').should('not.be.visible')
      
      // Offcanvas existe mas fechado inicialmente
      cy.get('#menuMobile')
        .should('exist')
        .and('not.have.class', 'show')
    })
    
    it('Conteúdo Principal', () => {
      // Título principal
      cy.get('h1')
        .should('exist')
        .and('contain.text', 'Salas')
      
      // Grid de cards
      cy.get('.row.g-3.g-lg-4')
        .should('exist')
        .children()
        .should('have.length', 6) // 6 salas
      
      // Verifica cada card
      cy.get('.card.text-decoration-none')
        .should('have.length', 6)
        .each(($card, index) => {
          cy.wrap($card)
            .should('have.class', 'shadow-sm')
            .and('have.class', 'border-0')
            .and('have.class', 'rounded-4')
            .within(() => {
              // Imagem da sala
              cy.get('.card-sala-imagem img')
                .should('have.attr', 'src', '../pngs/icon-sala.png')
                .and('have.css', 'object-fit', 'cover')
              
              // Overlay com nome
              cy.get('.card-img-overlay')
                .should('exist')
                .within(() => {
                  cy.get('span.fw-bold').should('not.be.empty')
                  cy.get('.indicador-status')
                    .should('have.css', 'border-radius', '50%')
                })
            })
        })
      
      // Status das salas específicas
      const salasComStatus = [
        { nome: 'Sala 1304', status: 'danger' },
        { nome: 'Sala 1305', status: 'success' },
        { nome: 'Sala 1306', status: 'success' },
        { nome: 'Sala 1307', status: 'success' },
        { nome: 'Sala 1308', status: 'success' },
        { nome: 'Sala 1309', status: 'danger' }
      ]
      
      salasComStatus.forEach((sala) => {
        cy.contains('span.fw-bold', sala.nome)
          .parent() // .card-img-overlay
          .within(() => {
            cy.get(`.bg-${sala.status}`).should('exist')
          })
      })
      
      // Links funcionais
      cy.get('a')
        .should('have.attr', 'href', 'https://www.youtube.com/watch?v=La44ebRSy-Y')
        .and('have.attr', 'target', '_blank')
    })

    })
  })

   // --- Caso de Teste 2: Interações ---
  describe('Teste de Componentes Interativos e suas Funcionalidades', () => {
   it('Teste se links externos abrem em nova aba com segurança', () => {
      cy.get('a[target="_blank"]').each(($link) => {
        cy.wrap($link)
          .should('have.attr', 'target', '_blank')
          .and('have.attr', 'rel', 'noopener noreferrer')
      })
    })

    it('Testa se o link para página Pokémon funciona', () => {
      cy.get('a[href="../api/pokemonhtml.html"]').should('exist')
      cy.get('img[alt="pokemon"]').should('be.visible')
    })

        //Bootstrap JavaScript funciona (offcanvas)
    it('Testa se a barra lateral mobile aparece quando clicado no botão menu', () => {
      cy.viewport(375, 667)
      
      // 1. Estado inicial - menu fechado
      cy.get('#menuMobile')
        .should('exist')
        .and('not.have.class', 'show')
      
      // 2. Clica para abrir
      cy.get('[data-bs-toggle="offcanvas"]')
        .should('be.visible')
        .click({ force: true })
      
      // 3. Verifica que abriu - CORREÇÃO AQUI
      cy.get('#menuMobile')
        .should('have.class', 'show')
        .and('have.css', 'visibility', 'visible')
        // Mudar de 'none' para verificar que NÃO contém -90
        .and(($menu) => {
          const transform = $menu.css('transform')
          // Quando aberto: transform NÃO contém -90 (não está fora da tela)
          expect(transform).not.to.contain('-90')
        })
      
      // 4. Verifica conteúdo dentro do menu
      cy.get('#menuMobile').within(() => {
        cy.get('.offcanvas-body').should('be.visible')
        cy.get('img.icone-nav').should('have.length.at.least', 4)
      })
      
      // 5. Fecha o menu
      cy.get('#menuMobile .btn-close')
        .scrollIntoView()
        .click({ force: true })
      
      // 6. Verifica que fechou
      cy.get('#menuMobile')
        .should('not.have.class', 'show')
        // Quando fechado: transform contém -90 (fora da tela)
        .and(($menu) => {
          expect($menu.css('transform')).to.contain('-90')
        })
    })
  })
})
