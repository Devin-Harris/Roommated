# Developer guides

Some guidelines to help us work smoother inside Sunrise Destruction Inc.

## Monorepo using Yarn workspaces

Our project structure is a **monorepo**: An encompassing **project** that contains many **apps** together right inside 1 repository

Benefits:

-   Folders stay close together, and we easily share code between apps
-   Every commit reflects the Git tree and status of the entire project, thus making releases more integral
-   One single central "node_modules" to help prevent duplicated dependencies

## Commands to work with Yarn Workspaces

Yarn provides some nice commands to directly interact with the apps/packages. Specifically, to run a `yarn` command for a specific app, you can prefix with `yarn workspace <workspace_fullname>` without having to `cd` into the specific folder

For example: `yarn workspace @rmtd/frontend add axios`

"Aliases" have been added in the form of "scripts" to help reduce the command length:

-   `backend`: "`yarn workspace @rmtd/backend`"
-   `frontend`: "`yarn workspace @rmtd/frontend`"
-   `shared`: "`yarn workspace @rmtd/common`"

Some example Yarn commands for typical use cases are listed below:

-   Install all dependencies

```shell
yarn install
```

-   Add/remove dependencies for app

```shell
yarn <backend|frontend|shared> add/remove <package_name> <options>

# Example: yarn shared add ts-node-dev --dev
```

For the list of "options", visit the [yarn add doc](https://yarnpkg.com/cli/add#options)

-   Run package.json commands

```shell
yarn <backend|frontend|shared> <command> <args>

# Example: yarn backend start:dev
```

-   Clear cache

```shell
yarn cache clear
```

## Git conventions

-   Commit often. Try to make your commits small and atomic
-   Make your commit message short, concise, but detailed enough (like a headline).
    -   Start with a verb and use PRESENT tense
    -   Include any extra information in a newline
    -   Example:
        -   ❌ "Updated backend"
        -   ✅ "Add Controllers for Post routes"
-   Prefer "Rebase and merge" when completing Pull Requests.
    -   Before trying to create a PR, do `git rebase main` first to check for conflicts
    -   Alternatively, if conflicts happen when you're trying to create a PR, use `git rebase main` on your local git, resolve the conflicts, and then `git push` to reflect these conflict resolutions onto the PR
-   Do not push to `main`:
    -   Always create a feature branch
