# trusat-frontend

TruSat is an open-source space sustainability tool created by the team at [ConsenSys Space](https://consensys.space). Check out the project [here](https://trusat.org).

## Get Started

This repo was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app). To get started clone the repo, `cd` into it and run the following commands:

```
git checkout --track origin/dev

yarn install && yarn start
```

## Tests

Run the tests with the following command:

```
yarn test
```

## Contributing

We very much welcome contributions, especially those that tackle open issues. If you wish to contribute, either open an issue then make a pull request or make a pull request against a currently open issue. Check out this [Style Guide](https://github.com/agis/git-style-guide) for some tips on best practices when contributing.

## Directory Structure

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
            ├── RoundedButton.js
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
