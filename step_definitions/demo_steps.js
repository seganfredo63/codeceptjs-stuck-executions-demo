const { I, request } = inject();

Given(/^I make a request \(and it fails\)$/, async () => {
    const requestPayload = {
        method: "GET",
        url: `https://google.com`,
        headers: {
            Cookie: "featureConfig=%7B%22enableCaptcha%22%3A%220%22%7D",
            "X-Requested-With": "XMLHttpRequest",
        },
        timeout: 1
    };

    await request.sendRequest(requestPayload);
});

Then(/^my test execution gets stuck$/, async () => {
    await I.say("Test execution never gets here...");
});