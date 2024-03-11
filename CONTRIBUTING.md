# Table of content
- [Table of content](#table-of-content)
  - [Contributing](#contributing)
  - [Issues and PRs](#issues-and-prs)
  - [Feature requests](#feature-requests)
  - [Our branching strategy](#our-branching-strategy)
  - [Submitting a pull request for frontend code](#submitting-a-pull-request-for-frontend-code)
  - [Submitting a pull request for supabase edge functions](#submitting-a-pull-request-for-supabase-edge-functions)
  - [Resources](#resources)

## Contributing

Hi there! We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

Please note that this project is released with a <a href="CODE_OF_CONDUCT.md">code of conduct</a>. By participating in this project you agree to abide by its terms.

## Issues and PRs

If you have encountered an bug during usage of this application or whilst developing, you found an bug, please open an issue report and detail your issue. Have a look at our <a href="">lovely developers</a> to decide which developer to assign this issue to first then proceed to create an issue by clicking <a href="">here</a>

## Feature requests

If you have a feature idea and you would like to pitch it, please create an feature request by clicking <a href="">here</a>

## Our branching strategy

![Git trunk based strategy!](/images/GitFlow_trunk.png "Git trunk based strategy")
image source: https://blog.mergify.com/trunk-based-development-vs-git-flow-when-to-use-which-development-style/

## Submitting a pull request for frontend code

1. Make sure you have <a href="https://nodejs.org/en/download/current">Node</a> installed.
2. Clone the repository.
3. Configure and install the dependencies:
```
npm install
```
4. Make sure the tests pass on your machine: 
```
npm test
```
5. Run the linter with:
```
npm lint
```
6. Switch to develop and create a new branch from develop: 
```git checkout -b feature-name``` 
Please note that your branch name should not be a 'named' branch but rather a feature based branch so that other developers are able to tell what it does without having to constantly ask you. Please make the name as descriptive as possible for what it is doing. You can also create the branch using the web-gui on github.
7. Make your changes in the <a href="/src">src folder</a>, add <a href="">tests(following this model)</a>, and make sure all the tests still pass.
8. Push to your branch and open a pull request to the dev branch. In your pull request description, please describe what it is you have changed. A simple template to build upon for pull requests is available <a href="pull_request_template.md">here</a>. Please reference <a href="https://www.markdownguide.org/basic-syntax/#overview">this</a> to write the correct markdown syntax
9. Pat your self on the back and wait for your pull request to be reviewed and merged😄.
10. In some cases, your code may be rejected and you may thus need to fix your code before pushing to your pull request.

Here are a few things you can do that will increase the likelihood of your pull request being accepted:

- Follow the <a href="https://standardjs.com/">style</a> which is using standard. Any linting errors should be shown when running `npm test`.
- Write and update tests.
- Keep your changes as focused as possible. If there are multiple changes you would like to make that are not dependent upon each other, consider submitting them as separate pull requests.
- Write a <a href="http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html">good commit message</a>.

Work in Progress pull requests are also welcome to get feedback early on, or if there is something blocked you. This simply means, you can draft a pull request just to met other developers to make sure you are on the right track before eventually converting it to a full pull request.

## Submitting a pull request for supabase edge functions

1. Make sure you have <a href="https://docs.deno.com/runtime/manual/getting_started/installation">deno</a> installed.
2. Clone the repository. You will be working from the <a href="/supabase/">supabase folder</a>
3. Configure and install the dependencies:
```
npm install
```
4. Make sure the tests pass on your machine: 
```
npm test
```
5. Switch to develop and create a new branch from develop: 
```git checkout -b feature-name``` 
Please note that your branch name should not be a 'named' branch but rather a feature based branch so that other developers are able to tell what it does without having to constantly ask you. Please make the name as descriptive as possible for what it is doing. You can also create the branch using the web-gui on github.
6. Please note that since supabase cli only exists within the context of this application, you will have to use ```npx``` before every ```supabase``` command you use from the docs.
7. If you want to create a new function, type:
```
npx supabase functions new <function-name-goes-here>
```
8. For more functionality, follow <a href="https://supabase.com/docs/guides/functions/quickstart">quickstart</a> and <a href="https://supabase.com/docs/guides/functions/unit-test#testing-in-deno">writing unit tests for edge functions</a>

## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)