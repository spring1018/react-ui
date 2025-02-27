export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator("component", {
    description: "Create a new component",
    prompts: [
      {
        type: "input",
        name: "path",
        message:
          "Where do you want to create the component? (e.g. atoms)",
      },
      {
        type: "input",
        name: "name",
        message: "What is the name of the component?",
      },
    ],
    actions: [
    //   {
    //     type: "add",
    //     path: "{{path}}/{{pascalCase name}}/index.tsx",
    //     templateFile: "utils/plop-templates/component/component.tsx.hbs",
    //   },
    //   {
    //     type: "add",
    //     path: "{{path}}/{{pascalCase name}}/{{pascalCase name}}.spec.tsx",
    //     templateFile: "utils/plop-templates/component/component.spec.tsx.hbs",
    //   },
      {
        type: "add",
        path: "components/{{path}}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
        templateFile: "utils/plop-templates/component/component.stories.tsx.hbs",
      },
    //   {
    //     type: "add",
    //     path: "{{path}}/{{pascalCase name}}/{{pascalCase name}}.module.css",
    //     templateFile: "utils/plop-templates/component/component.module.css.hbs",
    //   },
    ],
  });
}
