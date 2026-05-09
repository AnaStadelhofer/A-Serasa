describe("Testes do endpoint Comments", () => {

    it("Dado que o usuário consulte todos os comentários", () => {
        cy.getComments(1).then((response) => {

            cy.log("Log da resposta: ", response);

            expect(response.status).to.eq(200);
            expect(response.statusText).to.be.eq("OK");
            expect(response.isOkStatusCode).to.be.true;

            expect(response.body).to.be.an("array").that.is.not.empty;
            expect(response.body).to.have.length(5);
            expect(response.body[0]).to.have.all.keys("postId", "id", "name", "email", "body");
        })
    })

    it("Dado que o usuário consulta todos comentários enviando por parâmetro o id do post", () => {
        cy.getCommentByParameter(1).then((response) => {

            cy.log("Log da resposta: ", response);

            expect(response.status).to.eq(200);
            expect(response.statusText).to.be.eq("OK");
            expect(response.isOkStatusCode).to.be.true;

            expect(response.body).to.be.an("array").that.is.not.empty;
            expect(response.body).to.have.length(5);
            expect(response.body[0]).to.have.all.keys("postId", "id", "name", "email", "body");
        })
    })
})