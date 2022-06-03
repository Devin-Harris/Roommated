Roommated helps you connect with your roomates on the fly

# Project technology overview

This is the **monorepo** for the Roommated project

-   Frontend: Angular + TailwindCSS
-   Backend: Nestjs + MySQL
-   Package management: Yarn
-   Monorepo management: Yarn workspace & Nx
-   Devops: Azure

# Setting up

## 1. Install some Global tool

```shell
npm install -g nx yarn @nestjs/cli typescript
```

## 2. Install project dependencies

After cloning the project, at the project's root:

```shell
yarn install
```

## 3. Run the project

Some VsCode Tasks have been added to help you not having to type long commands:

1.  Go to the "Terminal" menu on the top toolbar
2.  Choose "Run Task"
3.  Choose the appropriate tasks to run (Client Dev, Server Dev, or Dev)

If you prefer Command Line, specific commands can be found in the "package.json" of each app. Combined this with the utility provided by Yarn workspaces, these commands can be run right from the project's ROOT (without having to `cd` inside specific folders)

For example:

-   Start frontend: `yarn frontend start`
-   Start backend with watch: `yarn backend start:dev`
-   Compile shared: `yarn shared tsc --build`

Nx also provides tooling for quick run of these Npm commands right at the root

-   Frontend commands: `nx [command] @rmtd/frontend` (example: `nx start @rmtd/frontend`)
-   Backend commands: `nx [command] @rmtd/backend` (example: `nx start @rmtd/backend`)

Note that the entire name of the individual app must be used (i.e "@rmtd/frontend") in these Nx CLI commands

# The "shared/common" folder

The "shared" folder is for code that are to be shared between backend and frontend.

For example: Entity TS Interfaces, Local Urls, Common constants such as Project branding, etc.

Both "backend" and "frontend" have been configured to have included this "shared" dependency. Therefore, to import code from this "common" module, simply use:

```tsx
import { User, Post } from "@rmtd/common/interfaces";
// Or when you have name conflicts, you alias import
import { User as UserInterface } from "@rmtd/common/interfaces";
```

Note that the name of the module is actually **"common"** and it is necessary to access the right level of subfolder after `/common/`
