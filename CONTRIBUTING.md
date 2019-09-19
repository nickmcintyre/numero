Welcome! Glad you're considering contributing to número! 

Please be sure to review the project's [CODE OF CONDUCT](CODE_OF_CONDUCT.md).

Check out the development process below to get started. It's also a good idea to read over the official p5.js [libraries tutorial](https://github.com/processing/p5.js/blob/master/developer_docs/creating_libraries.md).

## Development Process
1. Install [node.js](http://nodejs.org/) and the [Yarn](https://yarnpkg.com) package manager.
2. [Fork](https://help.github.com/articles/fork-a-repo) the [número repository](https://github.com/nickmcintyre/numero) into your own GitHub account.
3. [Clone](https://help.github.com/articles/cloning-a-repository/) your new fork of the repository from GitHub onto your local computer.

   ```
   $ git clone https://github.com/YOUR_USERNAME/numero.git
   ```

4. Navigate into the project folder and install all its necessary dependencies with Yarn.

   ```
   $ cd numero
   $ yarn install
   ```

5. [webpack](https://webpack.js.org/) should now be installed, and you can use it to build the library from the source code.

   ```
   $ yarn run build
   ```

   If you're continuously changing files in the library, you may want to run `yarn run dev` to automatically rebuild the library for you whenever any of its source files change without you having to first type the command manually.

6. Make some changes locally to the codebase and [commit](https://help.github.com/articles/github-glossary/#commit) them with Git.

   ```
   $ git add -u
   $ git commit -m "YOUR COMMIT MESSAGE"
   ```

7. Run `yarn run all` again to make sure there are no syntax errors, test failures, or other problems.

8. [Push](https://help.github.com/articles/github-glossary/#push) your new changes to your fork on GitHub.

   ```
   $ git push
   ```

9. Once everything is ready, submit your changes as a [pull request](https://help.github.com/articles/creating-a-pull-request).
