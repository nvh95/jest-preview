---
slug: what-is-jest-preview
title: What is Jest Preview and what problems does it solve?
description: TBD
authors: [nvh95]
tags: [jest-preview, testing, react, frontend, javascript]
# image: /img/nextjs-support.png
---

What make a software high quality, maintainable, reliable and scalable? Many factors. but one of the most important: Tests.
Software without test is not a very good software.
Why we need tests? To not break the existing features when we extending the product, do the A/B testing, experiment to explore the market... All the messy things could quickly turn software's source code into a tangled and fragile system.
But testing in FE is not similar to testing in other domains (TBD wording). It's a different kind of testing that is not only about the code but also about the user experience. But the importance of having a tests is still the same.

When it comes to FE testing, we have some types of tests (https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications):

- Static testing
- Unit testing
- Integration testing
- End-to-end testing

Between those, Integration testing might be the optimal one.

- Fast
- With a good strategy, integration tests with jest brings very high level of confidence, almost close to e2e testing.

But when test with Jest, it's not a good DX when a test fail (which is a scenario most of the time).
We have to see entire HTML, which is hard to read and imagine

Jest Preview was born to solve this problem.

Jest Preview open an external browser, and display your application's UI in jest in that browser.

All you need to do is `preview.debug()`

In the future, you don't have to do anything, application's snapshot will be automatically updated whenever test fails. Track progress at https://github.com/nvh95/jest-preview/pull/87

TODO: Insert diagram of Jest Preview Dashboard, Jest Preview Server, Jest process, browser and how they interact

Jest Preview help you writing test faster, debug tests faster (more intuitive), make you happier.

Jest help you reach closer to the level of confidence of e2e tests like cypress, but much much faster.

Eventually, Jest Preview hope to increase DX of front end engineers. => encourage them to write more tests => more better quality application

call to action: need help on contributing, documentation
