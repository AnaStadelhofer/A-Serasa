import { faker } from '@faker-js/faker';
describe("Testes do endpoint Posts", () => {

  it("Dado que o usuário consulte todos os posts", () => {

    cy.getPosts().then((response) => {

      cy.log("Log da resposta: ", response);

      expect(response.status).to.eq(200);
      expect(response.statusText).to.be.eq("OK");
      expect(response.isOkStatusCode).to.be.true;

      expect(response.body).to.be.an("array").and.not.be.empty;

      //Notei que a API de teste retorna 100 posts, talvez seja regra de negócio da api
      expect(response.body).to.have.length(100);
    })
  })

  it("Dado que o usuário consulte um post específico", () => {

    cy.getPostById(1).then((response) => {

      cy.log("Log da resposta: ", response);

      expect(response.status).to.eq(200);
      expect(response.statusText).to.be.eq("OK");
      expect(response.isOkStatusCode).to.be.true;

      // Valida campos
      expect(response.body).to.have.all.keys("userId", "id", "title", "body");

      // Valida valores
      expect(response.body.id).to.be.eq(1);
      expect(response.body.userId).to.be.eq(1);
      expect(response.body.title).to.be.a("string").and.not.be.empty;
      expect(response.body.body).to.be.a("string").and.not.be.empty;
    })
  })

  it("Dado que o usuário crie um novo post", () => {
    const title = faker.lorem.paragraphs(1);
    const body = faker.lorem.paragraphs(1);

    cy.createPost({
      title: title,
      body: body,
      userId: 1
    }).then((response) => {

      cy.log("Log da resposta: ", response);

      expect(response.status).to.eq(201);
      expect(response.statusText).to.be.eq("Created");
      expect(response.isOkStatusCode).to.be.true;

      // Valida campos
      expect(response.body).to.have.all.keys("userId", "id", "title", "body");

      // Valida valores
      expect(response.body.title).to.be.eq(title);
      expect(response.body.body).to.be.eq(body);
      expect(response.body.userId).to.be.eq(1);
    })
  })

  it("Dado que o usuário atualize todos dados um post existente", () => {
    let oldTitle = "";
    let oldBody = "";

    cy.getPostById(1).then((response) => {
      expect(response.status).to.eq(200);

      oldTitle = response.body.title;
      oldBody = response.body.body;
    })

    const title = faker.lorem.paragraphs(1);
    const body = faker.lorem.paragraphs(1);

    cy.putPost({
      title: title,
      body: body,
      id: 1,
      userId: 1
    }, 1).then((response) => {
      cy.log("Log da resposta: ", response);

      expect(response.status).to.eq(200);
      expect(response.statusText).to.be.eq("OK");
      expect(response.isOkStatusCode).to.be.true;

      // Valida campos
      expect(response.body).to.have.all.keys("userId", "id", "title", "body");

      // Valida valores
      expect(response.body.title).to.be.eq(title);
      expect(response.body.body).to.be.eq(body);
      expect(response.body.userId).to.be.eq(1);
      expect(response.body.id).to.be.eq(1);

      expect(response.body.title).to.not.be.eq(oldTitle);
      expect(response.body.body).to.not.be.eq(oldBody);
    })
  })

  it("Dado que o usuário atualize parcialmente um post existente", () => {
    let oldTitle = "";
    let oldBody = "";

    cy.getPostById(1).then((response) => {
      expect(response.status).to.eq(200);

      oldTitle = response.body.title;
      oldBody = response.body.body;
    })

    const title = faker.lorem.paragraphs(1);

    cy.patchPost({
      id: 1,
      title: title
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.statusText).to.be.eq("OK");
      expect(response.isOkStatusCode).to.be.true;

      // Valida campos
      expect(response.body).to.have.all.keys("id", "title");

      // Valida valores
      expect(response.body.title).to.be.eq(title);
      expect(response.body.id).to.be.eq(1);

      expect(response.body.title).to.not.be.eq(oldTitle);

    })
  })

  it("Dado que o usuário delete um post existente", () => {
    cy.deletePost(1).then((response) => {
      cy.log("Log da resposta: ", response);

      expect(response.status).to.eq(200);
      expect(response.statusText).to.be.eq("OK");
      expect(response.isOkStatusCode).to.be.true;
    })

  })

  it("Dado que o usuário tente consultar um post inexistente", () => {
    cy.getPostById(999).then((response) => {
      cy.log("Log da resposta: ", response);

      expect(response.status).to.eq(404);
      expect(response.statusText).to.be.eq("Not Found");
      expect(response.isOkStatusCode).to.be.false ;
    })
  })



})