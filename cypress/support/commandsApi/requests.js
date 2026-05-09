
// Padrão de request
Cypress.Commands.add("apiRequest", (method, endpoint, body) => {
    const options = {
        method,
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        failOnStatusCode: false,
    }

    const methodsWithBody = ['POST', 'PUT', 'PATCH'];
    if (body && methodsWithBody.includes(method.toUpperCase())) {
        options.body = body
        options.headers = { 'Content-Type': 'application/json' }
    }

    return cy.request(options);
})

// Posts
Cypress.Commands.add("getPosts", () => {
    return cy.apiRequest('GET', 'posts');
})

Cypress.Commands.add("getPostById", (postId) => {
    return cy.apiRequest('GET', `posts/${postId}`);
})

Cypress.Commands.add("createPost", (postData) => {
    return cy.apiRequest('POST', 'posts', postData);
})

Cypress.Commands.add("putPost", (postData, id) => {
    return cy.apiRequest('PUT', `posts/${id}`, postData);
})

Cypress.Commands.add("patchPost", (postData, id) => {
    return cy.apiRequest('PATCH', `posts/${id}`, postData);
})

Cypress.Commands.add("deletePost", (id) => {
    return cy.apiRequest('DELETE', `posts/${id}`);
})

// Comments

Cypress.Commands.add("getComments", (idPost) => {
    return cy.apiRequest('GET', `posts/${idPost}/comments`);
})

Cypress.Commands.add("getCommentByParameter", (idPost) => {
    return cy.apiRequest('GET', `comments?postId=${idPost}`);
})