![TruSat banner](https://trusat-assets.s3.amazonaws.com/readme-banner.jpg)

# trusat-frontend

## An open-source space sustainability tool

<img align="right" width="250" height="250" src="https://trusat-assets.s3.amazonaws.com/trusat-posat-animation-540x540.gif">

[TruSat](https://trusat.org) is a citizen-powered satellite catalog, crowdsourcing observations of satellites to form an independent record of objects orbiting Earth.

This repo contains the frontend code for TruSat’s [catalog app](https://trusat.org/catalog/priorities), providing citizen-scientists with orbit predictions to help them spot satellites and capture data. Anyone can submit their own satellite observations to automatically update the catalog’s orbit predictions.

- Visit [TruSat.org](https://trusat.org) to see the live app
- View the [docs](http://learn.trusat.org/) to learn more about the project
- Join the [Discord](https://discord.gg/HfT62G) to follow the development discussion

## Get Started

This repo was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app). You can clone the repo, install all the dependencies and run the app in development mode with the following commands in your Terminal:

```
git clone https://github.com/TruSat/trusat-frontend.git trusat-frontend
cd trusat-frontend
yarn install && yarn start
```

Open http://localhost:3000 to view it in the browser. The page will automatically reload if you make changes to the code.

<img src="https://trusat-assets.s3.amazonaws.com/trusat-readmes-catalog_comp-200424.jpg">

## Structure

```
trusat-frontend
├── node_modules
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── app
        ├── components
            ├── App.css
            ├── BurgerMenu.js
            ├── Button.js
            ├── ChatIcon.js
            ├── CookieBanner.js
            ├── CopyText.js
            ├── DiscourseChatIcon.js
            ├── Footer.js
            ├── JoinButton.js
            ├── MailingListForm.js
            ├── MobileHeader.js
            ├── NavBar.js
            ├── ObjectBadge.js
            ├── Partners.js
            ├── ScrollToTop.js
            ├── SocialIcons.js
            ├── Spinner.js
            ├── TablePaginator.js
            ├── TestPilots.js
        ├── app-helpers.js
        ├── app-styles.scss
    ├── assets
        ├── Arrow.svg
        ├── CircleCheck.svg
        ├── ConditionBad.svg
        ├── ConditionExcellent.svg
        ├── ConditionFair.svg
        ├── ConditionGood.svg
        ├── ConditionPoor.svg
        ├── ConditionTerrible.svg
        ├── DeleteStation.svg
        ├── Globe.svg
        ├── icon-arrow-up.svg
        ├── icon-chat.svg
        ├── icon-eye.svg
        ├── icon-globe.svg
        ├── icon-light.svg
        ├── icon-location.svg
        ├── icon-lock.svg
        ├── icon-lowlight.svg
        ├── icon-question.svg
        ├── icon-relaxing.svg
        ├── icon-rocket.svg
        ├── icon-satellite.svg
        ├── icon-time.svg
        ├── icon-trash.svg
        ├── icon-user.svg
        ├── icon-wave.svg
        ├── ProfileAvatar.svg
        ├── QuestionMark.svg
        ├── SatSymbol.svg
        ├── SketchLarge.js
        ├── SketchSmall.js
        ├── TrusatLogoBig.svg
        ├── TrusatLogoSmallBlack.svg
        ├── TrusatLogoSmallWhite.svg
    ├── auth
        ├── components
            ├── LoginForm.js
            ├── LoginOptions.js
            ├── MetaMask.js
            ├── SignupForm.js
            ├── SignupOptions.js
        ├── auth-context.js
        ├── auth-helpers.js
        ├── auth-styles.scss
        ├── auth.test.js
    ├── catalog
        ├── components
            ├── CatalogNavBar.js
            ├── CatalogNavDropdown.js
            ├── CatalogTable.js
            ├── DownloadCatalogFilterTleButton.js
            ├── FilterDescription.js
            ├── HowToParticipate.js
        ├── catalog-styles.scss
    ├── objects
        ├── components
            ├── DownloadObjectTleButton.js
            ├── FilterDescription.js
            ├── HistoryMonthTable.js
            ├── HistoryYearDropdown.js
            ├── HowToSeeIt.js
            ├── InfluenceTable.js
            ├── Info.js
            ├── ObservationsFilter.js
            ├── UserSightingsTable.js
        ├── objects-context.js
        ├── objects-styles.scss
    ├── profile
        ├── components
            ├── ObjectsCollectedTable.js
            ├── ObservationsTable.js
            ├── ProfileHeader.js
        ├── profile-context.js
        ├── profile-styles.scss
    ├── styles
        ├── base
            ├── _base.scss
            ├── _reset.scss
            ├── _typography.scss
        ├── helpers
            ├── _mixins.scss
            ├── _variables.scss
        ├── main.scss
    ├── submissions
        ├── components
            ├── MultipleObservationForm.js
            ├── SingleObservationForm.js
        ├── submission-styles.scss
    ├── user
        ├── components
            ├── EditProfileSettingInput.js
            ├── PrivacySettings.js
            ├── ProfileSettings.js
            ├── SavedLocations.js
            ├── SecuritySettings.js
            ├── StepFive.js
            ├── StepFour.js
            ├── StepOne.js
            ├── StepThree.js
            ├── StepTwo.js
        ├── user-styles.scss
    ├── views
        ├── About.js
        ├── AccountSettings.js
        ├── AddStation.js
        ├── Catalog.js
        ├── Charter.js
        ├── ClaimAccount.js
        ├── FAQ.js
        ├── HowTo.js
        ├── HowToPhoto.js
        ├── Join.js
        ├── LogIn.js
        ├── MetamaskImport.js
        ├── ObjectInfo.js
        ├── PrivacyPolicy.js
        ├── Profile.js
        ├── SignUp.js
        ├── Submit.js
        ├── SubscriptionConfirmed.js
        ├── Terms.js
        ├── TestPilotConfirmed.js
        ├── VerifyClaimAccount.js
        ├── Welcome.js
        ├── Whitepaper.js
    ├── App.js
    ├── App.test.js
    ├── index.js
    ├── serviceWorker.js
├── .gitignore
├── firebase.json
├── LICENSE
├── package.json
├── README.md
├── yarn.lock
```

Inspired by this [post](https://marmelab.com/blog/2015/12/17/react-directory-structure.html), the files in the `src` directory are grouped by domain. For example, within the `submissions` directory you will find all components (and their accompanying styles) related to the domain of observation submissions. At the time of writing this includes the `MultipleObservationForm` and `SingleObservationForm` components.

The `assets` directory contains all the `svg` files that are utilized by the front end. Other image files are hosted externally on AWS.

## Tests

Run the tests with the following command:

```
yarn test
```

## Contributing

We very much welcome contributions, especially those that tackle open issues! If you wish to contribute, either open an issue then make a pull request or make a pull request against a currently open issue.

#### Branch naming convention

Our team uses the following convention for naming branches:

- `master` - The production environment
- `dev` - The branch used for deploying to the development/staging server environment
- `feature/{name-of-feature}` - A feature branch
- `bugfix/{name-of-bug-being-fixed}` - Fixing a bug larger in scope than a hotfix
- `hotfix/{name-of-hotfix}` - Hotfix changes for production issues (branches off master)
- `chore/{summary-of-chore}` - Cleaning up / organizing the code
- `wip/{name-of-wip}` - Branched out for some “work in progress” stuff (not ready, can be experimental and you want to keep a remote copy)

And here are some examples:

- `feature/single-iod-form`
- `feature/single-iod-form-styles`
- `bugfix/whitepaper-not-rendering-on-ipad`
- `hotfix/typo-on-welcome-page`
- `chore/removing-unused-imports`
- `wip/add-3box-for-authentication`

#### Branch creation to opening a PR

- Referencing the branch naming convention outlined above determine the group and name for your branch then run `git checkout -b {group}/{name-of-group}` to create the new branch and check it out.
- Commit early and commit often with clear and concise comments. All commits should remain focused in scope so try to avoid submitting PR's that contain unrelated commits.
- Run `git push --set-upstream origin <your-new-branch>` to add your new branch to the remote repo when you feel the work completed warrants a back up.
- When ready to open a PR, use `git push` to add all your latest commits to the remote copy.
- Do not open a PR without directing it to an open issue on GitHub. If an issue does not exist, create it and add a label. Here's an example:

```
The "How To" page content is out of date when compared to the latest communication content found in the TruSat discuss forum
```

- When ready click the green "New pull request" button on the "Pull requests" page for the repo on GitHub, making sure you are requesting to merge your branch into the development branch, and not master. The only branches that can open a PR to the “master” branch are those grouped as “hotfix” or “dev”.
- Assign at least one reviewer to your PR.
- Add detailed comments to outline what your PR achieves and make sure to reference the issue that will be closed by this PR by utilizing the issue number. Bulleted lists are preferred. For example:

```
- Updates the “how to” view with the latest comms content
- New styles added including a change of font to the headers which matches the latest changes to the "About" page.
- This closes #32.
```

- Do not open the PR if there are merge conflicts found. Instead - push a fix to your branch that clears the conflicts.
- If no merge conflicts are found, open the PR.

## License

TruSat is open source software [licensed as Apache License 2.0](https://github.com/consensys-space/trusat-frontend/blob/master/LICENSE).
