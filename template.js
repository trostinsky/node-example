const template = (data) => `
    <h1>Template</h1>
    <ul>
        ${data.map((item) => {
            return `<li>${item}</li>`;
        })}
    </ul>
`;