### 😶 Disclaimer : Read this before using it

For the moment, this **GitHub Action** doesn't work as properly as I would like. When GitHub adds the possibility to add *and/or* edit comments in Discussions, I will update the project.

I started this Action because I thought that it is a good idea to have a moderation tool in the Discussions part with the toxicity of comments.
So I did it thinking it would be feasible, but when I got to the end of the code part, I couldn't figure out how to create/edit comments.

___
# No Toxic Discussions

> A GitHub action that detects toxic messages in Discussions.

**No Toxic Discussions** uses the **Perspective API** by *Jigsaw* from Google.

[![](https://img.shields.io/badge/-Github_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/marketplace/actions/no-toxic-discussions)
[![Follow me on Twitter](https://img.shields.io/twitter/follow/Thomasbnt_?color=%231DA1F2&label=Follow%20me&logo=Twitter&style=for-the-badge)](https://twitter.com/Thomasbnt_)
[![Follow me on DEV](https://img.shields.io/badge/dev.to-%2308090A.svg?&label=Read%20me%20on&style=for-the-badge&logo=dev.to&logoColor=white&alt=devto)](https://dev.to/thomasbnt)

## Workflow 
Create the `.github/workflows/NoToxicDiscussions.yml` file with the following configuration :

```yml
name: No Toxic Discussions Here
on:
  discussion:
    # created type can be marked as an error BUT IT WORKS. See the docs :
    # https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows#discussion
    types: [ created, opened, edited, answered ]
  discussion_comment:
    types: [ created, edited ]
jobs:
  CheckIfToxicContent:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          PERSPECTIVE_API_KEY: ${{ secrets.PERSPECTIVE_API_KEY }}
      - name: Install dependencies
        run: |
          yarn install
          yarn add @actions/core @actions/github
      - name: Run the script
        run: |
          yarn run start
```

## Inputs

|                                                         `PERSPECTIVE_API_TOKEN`                                                              |
|:--------------------------------------------------------------------------------------------------------------------------------------------:|
| **Required** — This Action use the **Perspective API**. — [Get your key here ➡](https://developers.perspectiveapi.com/s/docs-enable-the-api) |


## How it works 

When anyone creates a new comment in a discussion or creates a new discussion, the script will check if the comment is toxic. 
If the author edits their comment, the Action will run again.

Output workflow : 

![Output workflow](https://user-images.githubusercontent.com/14293805/145136473-3fa03470-1856-404c-8b09-639e2d193b8a.png)

## Test locally 

You can test the [test/SampleRequestPerspectiveAPI.js](test/SampleRequestPerspectiveAPI.js) file.

1. Clone this project 
2. Create a .env file and put your GOOGLE_API_TOKEN
3. Write a bad comment at CONTENT (line 6)
4. Run with `yarn run test` or `npm run test` !

## Contribute 

**Anyone can contribute** to this GitHub Action. **Feel free** to discuss it [in the section provided for this purpose](/discussions). 👋🏼
Read the [contribution Guidelines](/contributing.md) first. You can also contribute by sharing this repository. 😄 

## Languages Supported

This Action is **only for the english language** for the moment. Maybe updates in the future will add others languages. 
We are based on **Perspective API** with only _TOXICITY_ attribute name to detect bad comments, [see the available languages on the official website](https://developers.perspectiveapi.com/s/about-the-api-attributes-and-languages)   

## Additional informations

- 📣 News : Follow me on [Twitter](https://twitter.com/Thomasbnt_)
- 🔗 See my [website](https://thomasbnt.dev) !
- 📨  [Send me a email !](https://thomasbnt.dev/contact)

## Donate 
Feel free to help [me](https://github.com/@thomasbnt) for the maintenance of this project !

[![GitHub Sponsors](https://img.shields.io/badge/Sponsor%20me-%23EA54AE.svg?&style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/thomasbnt)
[![Support me on Buy Me a Coffee](https://img.shields.io/badge/-Support%20me-%23FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/thomasbnt/?via=thomasbnt)


